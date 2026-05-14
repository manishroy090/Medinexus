import { Pool } from 'pg';
import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';
import { Migrations } from '../db/migrations/Migrations.js';
import Config from '../Constants/Config.js';

export class Database {

    private adminPool: Pool;
    private tenantPools: Map<string, Pool> = new Map();

  
    private migrations: Migrations;

    constructor() {

        this.adminPool = new Pool({
            connectionString: `postgres://manish:secret@localhost:5432/${Config().mainDatabase.DB_NAME}`,
            max: 10,
        });

        this.migrations = new Migrations();
    }

    // -------------------------
    // ADMIN DB OPERATIONS
    // -------------------------

    async migrateToAdminDb() {


        const folderPath = path.join(process.cwd(), 'src', 'db', 'migrations', 'main');
        const files = await this.migrations.getmainDBMigrations();

        for (const file of files) {

            const filePath = path.join(folderPath, `${file.name}.ts`);
            const module = await import(pathToFileURL(filePath).href);

            if (typeof module.up === 'function') {

                const query = await module.up();

                try {
                    await this.adminPool.query(query);
                    console.log(`${file.name} migration success`);
                } catch (err) {
                    console.log(`${file.name} failed`, err);
                }
            }
        }
    }

    async isCountryDatabaseExists(dbName: string) {

        const result = await this.adminPool.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [dbName]
        );

        return (result.rowCount ?? 0) > 0;
    }

    async createCountryDatabase(dbName: string) {

        await this.adminPool.query(`CREATE DATABASE "${dbName}"`);
        return dbName;
    }

    // -------------------------
    // TENANT DB MANAGEMENT
    // -------------------------

    private getTenantPool(dbName: string, schema?: string): Pool {

        const key = `${dbName}:${schema ?? 'default'}`;

        if (!this.tenantPools.has(key)) {

            const pool = new Pool({
                connectionString: schema
                    ? `postgres://manish:secret@localhost:5432/${dbName}?options=-c search_path=${schema}`
                    : `postgres://manish:secret@localhost:5432/${dbName}`,
                max: 10,
            });

            this.tenantPools.set(key, pool);
        }

        return  this.tenantPools.get(key)!;
    }

    async switchToOrgSchema(countryName: string, schemaName: string) {

        return this.getTenantPool(countryName, schemaName);
    }

    async isSchemaExists(countryName: string, schemaName: string) {

        const pool = this.getTenantPool(countryName);

        const result = await pool.query(
            `SELECT 1 FROM information_schema.schemata WHERE schema_name = $1`,
            [schemaName]
        );

        return (result.rowCount ?? 0) > 0;
    }

    // -------------------------
    // TENANT MIGRATIONS
    // -------------------------

    async migrateTenantDBOrgSchema(countryName: string, orgName: string) {
        let schemaName = "uk"

        const pool = this.getTenantPool(countryName, orgName);

        const tenantMigrations = await this.migrations.getHoshpitalMigrations();
        const commonMigration = await this.migrations.commanMigration();

        const tenantSchema = Object.values(
            tenantMigrations.find((item: any) =>
                Object.keys(item).includes(schemaName)
            ) || {}
        )[0] as { name: string }[] || [];

        const folderPath = path.join(
            process.cwd(),
            'src',
            'db',
            'migrations',
            'tenant',
            schemaName.toLowerCase(),
            'hoshpital'
        );

        const commonFolderPath = path.join(
            process.cwd(),
            'src',
            'db',
            'migrations',
            'common'
        );

        console.log("tenantSchema",tenantSchema);
        // tenant migrations
        for (const file of tenantSchema) {

            const filePath = path.join(folderPath, `${file.name}.ts`);
            const module = await import(pathToFileURL(filePath).href);

            if (typeof module.up === 'function') {

                try {
                    const query = await module.up(orgName);
                    await pool.query(query);

                    console.log(`${file.name} success`);

                } catch (err) {
                    console.log(`${file.name} failed`, err);
                }
            }
        }

        console.log("code is out of loop");

        // // common migrations
        // for (const file of commonMigration) {

        //     const filePath = path.join(commonFolderPath, `${file.name}.ts`);
        //     const module = await import(pathToFileURL(filePath).href);

        //     if (typeof module.up === 'function') {

        //         try {
        //             const query = await module.up(orgName);
        //             await pool.query(query);

        //             console.log(`${file.name} success`);

        //         } catch (err) {
        //             console.log(`${file.name} failed`, err);
        //         }
        //     }
        // }

        return pool;
    }

   

    // -------------------------
    // CLEANUP (important)
    // -------------------------

    async closeAll() {

        await this.adminPool.end();

        for (const pool of this.tenantPools.values()) {
            await pool.end();
        }

        this.tenantPools.clear();
    }
}

export default Database;