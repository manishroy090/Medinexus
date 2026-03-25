import { Client } from 'pg';
import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';




export class Database {
    adminClient: Client
    // orgClient: Client

    constructor() {
        this.adminClient = new Client({
            connectionString: `postgres://manish:secret@localhost:5432/UK`
        });

    }

    async migrateToAdminDb() {
        const folderPath = path.join(process.cwd(), 'src', 'db', 'main');
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
        // console.log(files);

        //   console.log(folderPath);

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

    async isCountryDatabaseExists() {



    }


    async createCountryDatabase() {



    }

    async isScheamaExists() {





    }

    async createSchemaonAdminDB() {



    }


    async getAdminClient() {

      return  this.adminClient = new Client({
            connectionString: `postgres://manish:secret@localhost:5432/UK`
        });

    }


    async getOrgDB(dbName: String) {

        // this.orgClient = new Client({
        //     connectionString: `postgres://manish:secret@localhost:5432/${dbName}`
        // });

    }

}

export default Database;