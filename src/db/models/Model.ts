    import Database from "../../Services/Database.js";
import { Client } from 'pg';
import { Pool } from 'pg';
import { table_prefix } from "../../Constants/App.js";
import { check } from "zod";


const mainDBName = "Healthcare";

export const pool = new Pool({
    connectionString: `postgres://manish:secret@localhost:5432/${mainDBName}`
});
export abstract class Model {

    private readonly tableName: String;

    private readonly tablePrefix:String = table_prefix;

    constructor() {

        if(this.constructor.name =="Country"){
            this.tableName = `${this.tablePrefix}_${"countr".toLowerCase()}ies`;
        }
        else{
            this.tableName = `${this.tablePrefix}_${this.constructor.name.toLowerCase()}s`;
        }

    }


    async all() {
        const { rows } = await pool.query(`SELECT * FROM ${this.tableName}`);
        console.log(rows);
        
        return rows;

    }

    async create(item: Object) {
        const keys = Object.keys(item);
        const values = Object.values(item)
            .map(val => typeof val === 'string' ? `'${val}'` : val)
            .join(', ');

        try {

           const query = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${values}) RETURNING *`;

           console.log('query');
           console.log('query');
           console.log('query');


          console.log('query',query);
           const result = await pool.query(`INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${values}) RETURNING *`);

           return result.rows[0]

        } catch (error) {

            console.log('database_error', error);

        }


    }


    async findById(id: string) {
        try {
            const { rows } = await pool.query(`SELECT * FROM ${this.tableName}  WHERE id=${id}`);
        
            return rows;

        } catch (error) {

            console.log('database_error', error)

        }
    }


    async findUserByEmail(email: string){

         try {
            const { rows } = await pool.query(`SELECT * FROM "${this.tableName}"  WHERE email=$1`,[email]);
            return rows;

        } catch (error) {
            console.log('database_error', error)
        }


    }


    async delete(id: string) {
        const result = await pool.query(`DELETE FROM ${this.tableName} WHERE id=${id} RETURNING *`);
        return result.rows[0];
    }


    async update(id: string, data: any) {
        const dataArray = Object.entries(data);
        let Colmn: any = [];
        dataArray.map((item, key) => {
            const keyName = `${item[0]}`;
            const value = `'${item[1]}'`;
            Colmn[key] = keyName.concat('=', value);
            // Colmn = keyName.concat("=",value);
        });
        const check = Colmn.join();
        const result = await pool.query(`UPDATE ${this.tableName} SET ${check} WHERE id=${id} RETURNING *`);
        return result.rows[0]
    }


    async where(parmfst:any ,parmsec:any=null){

        let conditionQuery:String;
        if(parmsec!==null){
            conditionQuery = `${parmfst} = '${parmsec}'`;
        }
        else{
            let Colmn: any = [];
            parmfst.map((item:any, key:any) => {
                const keyName = `${item[0]}`;
                const condition = `${item[1]}`
                const value = `'${item[2]}'`;
                Colmn[key] = `${keyName} `.concat(condition , value);
            // Colmn = keyName.concat("=",value);
            });

            conditionQuery = Colmn.join("AND ");
        }

          try {
              const { rows } = await pool.query(`SELECT  * FROM ${this.tableName}  WHERE ${conditionQuery} LIMIT 1`);
              return rows[0];

          } catch (error) {

            console.log('ERROR',error);
            
          }

    }

}