import { Client } from 'pg';
import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';
import { Config } from '../Constants/App.js';


export class Database {
    adminClient: Client
    // orgClient: Client
    
    public mainDBName: any;
    private countryClient:any;

    constructor() {


        this.mainDBName = "Healthcare"

        this.adminClient = new Client({
            connectionString: `postgres://manish:secret@localhost:5432/${this.mainDBName}`
        });

        this.adminClient.connect();

    }

    async switchToCountryDB(country:string){

        this.adminClient.end();

        this.countryClient = new Client({
            connectionString: `postgres://manish:secret@localhost:5432/${country}`
        });

        this.countryClient.connect();
    }

    async migrateToAdminDb() {
        const folderPath = path.join(process.cwd(), 'src', 'db', 'migrations', 'main');
        const files = await fs.readdir(folderPath);
        await this.adminClient.connect();
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const module = await import(pathToFileURL(filePath).href);
            if (typeof module.up === 'function') {
                const table = await module.up();

                try {
                    await this.adminClient.query(table);
                } catch (error) {

                    console.log(`Migration failed for ${file}`, error)
                }
            }
            else {
                console.log('Refactor your migration File')
            }


        }


        await this.adminClient.end();
    }

    async rollbackAdminDb() {
        const folderPath = path.join(process.cwd(), 'src', 'db', 'main');
        const files = await fs.readdir(folderPath);
        this.adminClient.connect();
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const module = await import(pathToFileURL(filePath).href);
            if (typeof module.down === 'function') {
                const table = await module.down();
                this.adminClient.query(table);

            }

            else {
                console.log('Refactor your migration File')
            }


        }

    }

    async isCountryDatabaseExists(dbName:string) {
        const result = await this.adminClient.query(`SELECT 1 FROM pg_database  WHERE datname = $1`, [dbName]);
        return (result.rowCount ?? 0) > 0;

    }


    async createCountryDatabase(dbName:string) {
        const db = await this.adminClient.query(`CREATE DATABASE ${dbName}`);
        return dbName;

    }

    async isScheamaExists(countryName:string,schemaName:string) {   
        this.adminClient.end();

        const result = await this.countryClient.query(
            `SELECT 1 FROM information_schema.schemata WHERE schema_name = $1`,
            [schemaName]
        );

      return (result.rowCount ?? 0) > 0;

    }

}

export default Database;