import { Client } from 'pg';
import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';
import { Config } from '../Constants/App.js';





 class OrganizationSchema {

       countryClient: Client;

    

    constructor(countryName:string) {

        // console.log('clientDatabase',countryName);
        // this.mainDBName = "uk"

        this.countryClient = new Client({
            connectionString: `postgres://manish:secret@localhost:5432/${countryName}`
        });

        this.countryClient.connect();

    }



    async isScheamaExists(schemaName:string) {   
        
        const result = await this.countryClient.query(
             `SELECT 1 FROM information_schema.schemata WHERE schema_name = $1`,
             [schemaName]
         );

       return (result.rowCount ?? 0) > 0;

    }


     async createSchema(schema:string) {
       
         await this.countryClient.query(`CREATE SCHEMA "${schema}"`);

    }


}

export default OrganizationSchema;