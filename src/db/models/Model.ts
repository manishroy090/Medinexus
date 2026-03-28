import Database from "../../Services/Database.js";
import { Client } from 'pg';
import { Pool } from 'pg';


const pool = new Pool({
    connectionString: `postgres://manish:secret@localhost:5432/UK`
});
export abstract class Model {

    private readonly tableName: String;

    constructor() {
        this.tableName = `${this.constructor.name.toLowerCase()}s`;
    }


    async all() {
        const { rows } = await pool.query(`SELECT * FROM ${this.tableName}`);
        return rows ;

    }

    async create(item: Object) {
        const keys = Object.keys(item);
        const values = Object.values(item)
            .map(val => typeof val === 'string' ? `'${val}'` : val)
            .join(', ');
        await pool.query(`INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${values})`);
       
    }


    async findById(id:string) {
      const {rows}  = await pool.query(`SELECT * FROM ${this.tableName}  WHERE id=${id}`);
      return rows;
      

    }


    async delete(id:string) {
       const result =  await pool.query(`DELETE FROM ${this.tableName} WHERE id=${1}`);
       return result;

    }


    async update(id:string,data:any) {
        const formatedData = new  Map(Object.entries(data));


        console.log('data',formatedData)



     

        const result = await pool.query(`UPDATE ${this.tableName} SET ${formatedData} WHERE id=${id}`);

        return result;



    }

}