// import { Roles } from "../entities/Roles";

import { Schema } from "../db/models/Schema.js";
export class SchemaRepository {


    public Schema:any;


    constructor() {
        this.Schema = new Schema();
    }



    async getAllSchema(){
        return await this.Schema.all();
    }

    async createSchema(schema:any){
        console.log('schema',schema);
        const schemaDetails = await this.Schema.create(schema);
        return schemaDetails;        
    }


  
  
}