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
       const result =  await pool.query(`DELETE FROM ${this.tableName} WHERE id=${id}`);
       return result;

    }


    async update(id:string,data:any) {
        const dataArray = Object.entries(data);
        let Colmn:any = [];
        dataArray.map((item, key)=>{
            const keyName =`${item[0]}`;
            const value = `'${item[1]}'`;
            Colmn[key] =  keyName.concat('=',value);
            // Colmn = keyName.concat("=",value);
        });
        const check = Colmn.join();
        const result = await pool.query(`UPDATE ${this.tableName} SET ${check} WHERE id=${id}`);
          console.log(result);

    }

}