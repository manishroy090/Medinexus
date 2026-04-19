import { Client } from 'pg';
import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';
import { Migrations} from '../db/migrations/Migrations.js';
import Config from '../Constants/Config.js';
import Scripts from '../logs/'






export class Database {
    adminClient: Client
    // orgClient: Client
    
    public mainDBName: any;
    private countryClient:any;
    private migrations:any;
    private ScriptLogs:any


    constructor() {

        this.mainDBName = Config().mainDatabase.DB_NAME

        this.adminClient = new Client({
            connectionString: `postgres://manish:secret@localhost:5432/${this.mainDBName}`
        });


         this.migrations = new Migrations();

    
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
        // const files = await fs.readdir(folderPath);
        const files = await this.migrations.getmainDBMigrations();
        await this.adminClient.connect();

        console.log('files',files); 

     
        for (const file of files) {
            const filePath = path.join(folderPath, `${file.name}.ts`);
            const module = await import(pathToFileURL(filePath).href);
            if (typeof module.up === 'function') {
                const table = await module.up();

                try {
                    await this.adminClient.query(table);
                    console.log(`${file.name} migration successfull`);

                } catch (error) {

                    console.log(`${file.name} migration failed`,error);
                }
            }
            else {
                console.log('Rollback your migration File')
            }


        }


        await this.adminClient.end();
    }

    async migrateTenantDBOrgSchema(){

      const SchemaName = "uk";
      const org = 'greenvallyhospital';

      const hoshpital =   await this.migrations.getHoshpitalMigrations();
      const countriesMigration = hoshpital.find((item:any)=>Object.keys(item).includes(SchemaName));
      const commanMigration = await this.migrations.commanMigration();
      const tenantSchema =Object.values(countriesMigration)[0] as {name:string}[];
      const table = [...tenantSchema,...commanMigration];
      const tenantfolderPath = path.join(process.cwd(),'src','db','migrations','tenant',SchemaName.toLowerCase(),'hoshpital');
      const commonFolderPath = path.join(process.cwd(),'src','db','migrations','common');
      const tenantfiles = await fs.readdir(tenantfolderPath);
      const commanfiles = await fs.readdir(commonFolderPath);

      this.switchToCountryDB('unitedkingdom');

      for( const file of tenantSchema){
        const filePath = path.join(tenantfolderPath,`${file.name}.ts`);
        const module = await import(pathToFileURL(filePath).href);

           if(typeof module.up === 'function'){
             const table = await module.up('greenvalleyhospital');

            try {
                
                const countryClient =  await this.countryClient.query(table);

                console.log('countryClient',countryClient);
                console.log(`${file.name} migration successfull`);

             } catch (error) {

                 console.log(`${file.name} migration failed` ,error);
                
            }
         }
        
      }



      for(const file of  commanMigration){

         const filePath = path.join(commonFolderPath,`${file.name}.ts`);
         const module = await import(pathToFileURL(filePath).href);

         if(typeof module.up === 'function'){
               const table = await module.up('greenvalleyhospital');
               try {

               const countryClient =  await this.countryClient.query(table);

                console.log('countryClient',countryClient);
                console.log(`${file.name} migration successfull`);

                
               } catch (error) {

                 console.log(`${file.name} common migration failed` ,error);

                
               }
         }

         console.log('filePath',module);

      }


    

    

      
      console.log('commanfiles',tenantfiles);


    //   console.log('tenantfiles',tenantfiles);
    //   console.log('commanfiles',commanfiles);



    //   console.log('files',tenantfiles);
    //   console.log('folderPath',folderPath);




     // console.log('folderPath',folderPath);
    //   this.switchToCountryDB(SchemaName);





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

        this.adminClient.end();


    }

    async isCountryDatabaseExists(dbName:string) {
        console.log('isdbName',dbName);
        this.adminClient.connect();
        const result = await this.adminClient.query(`SELECT 1 FROM pg_database  WHERE datname = $1`, [dbName]);
        console.log('result');
        console.log('result');
        console.log('result');
        console.log('result');
        console.log('result');
        console.log('result',result);

        
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