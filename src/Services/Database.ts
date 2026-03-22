import { Client } from 'pg';
import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';




export class Database {
    adminClient
    orgClient: any

    constructor() {
        this.adminClient = new Client({
            connectionString: `postgres://manish:secret@localhost:5432/cruddb`
        });

    }

    async migrateToAdminDb() {
        const folderPath = path.join(process.cwd(), 'src', 'db', 'main');
        const files = await fs.readdir(folderPath);
        this.adminClient.connect();
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const module = await import(pathToFileURL(filePath).href);
            if (typeof module.up === 'function') {
              const table =  await module.up();
               this.adminClient.query(table);    
            }

            else {
                console.log('Refactor your migration File')
            }


        }
        // console.log(files);

        //   console.log(folderPath);

    }

    async rollbackAdminDb(){

         const folderPath = path.join(process.cwd(), 'src', 'db', 'main');
        const files = await fs.readdir(folderPath);
        this.adminClient.connect();
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const module = await import(pathToFileURL(filePath).href);
            if (typeof module.down === 'function') {
              const table =  await module.down();
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


    async getOrgDB(dbName: String) {

        this.orgClient = new Client({
            connectionString: `postgres://manish:secret@localhost:5432/${dbName}`
        });

    }

}

export default Database;