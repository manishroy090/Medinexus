import Database from "../../../Services/Database.js";
import { Client } from 'pg';
import { Pool } from 'pg';
import { table_prefix } from "../../../Constants/App.js";
import { check } from "zod";


const mainDBName = "unitedkingdom";

export const pool = new Pool({
    connectionString: `postgres://manish:secret@localhost:5432/${mainDBName}`
});
export abstract class Model {

    private readonly tableName: String;

    private readonly tablePrefix: String = table_prefix;

    private SchemaName = 'greenvalleyhospital';

    constructor() {

        if (this.constructor.name == "Country") {
            this.tableName = `${this.tablePrefix}_${"countr".toLowerCase()}ies`;
        }
        else {
            this.tableName = `${this.tablePrefix}_${this.constructor.name.toLowerCase()}s`;
        }

    }


    async all() {
        const { rows } = await pool.query(`SELECT * FROM ${this.SchemaName}.${this.tableName}`);
        return rows;

    }

    async create(item: any) {

        let keys: any = null;
        keys = Object.keys(item);
        let query = '';
        let values: any = undefined;
        values = Object.values(item)
            .map(val => typeof val === 'string' ? `'${val}'` : val)
            .join(', ');


        if (item.length > 0) {

            const items = item;

            //   checkkeys = {}; 


            keys = Object.keys(item[0]);


            values = [];
            items.map((item: any) => {
                const value = Object.values(item)
                    .map(val => {
                        // Handle null/undefined → NULL
                        if (val === null || val === undefined) {
                            return 'NULL';
                        }

                        // Handle Date object
                        if (val instanceof Date) {
                            const formatted = val.toISOString().replace("T", " ").slice(0, 19);
                            return `'${formatted}'`;
                        }

                        //  Handle timestamp string
                        if (typeof val === 'string' && !isNaN(Date.parse(val))) {
                            const formatted = new Date(val).toISOString().replace("T", " ").slice(0, 19);
                            return `'${formatted}'`;
                        }

                        if (typeof val === 'boolean') return val;
                        if (typeof val === 'number') return val;

                        return `'${val}'`;
                    })
                    .join(', ');

                values.push(`(${value})`);
            });



             query = `INSERT INTO ${this.SchemaName}.${this.tableName} (${keys.join(', ')}) VALUES ${values} RETURNING *`;
        }

        else{

           query = `INSERT INTO ${this.SchemaName}.${this.tableName} (${keys.join(', ')}) VALUES (${values}) RETURNING *`;


        }
        console.log('query', query);

        try {

    
            const result = await pool.query(query);
            return result.rows[0]

        } catch (error) {

            console.log('database_error', error);

        }


    }


    async findById(id: string) {
        try {
            const { rows } = await pool.query(`SELECT * FROM ${this.SchemaName}.${this.tableName}  WHERE id=${id}`);

            return rows;

        } catch (error) {

            console.log('database_error', error)

        }
    }


    async findUserByEmail(email: string) {

        try {
            const { rows } = await pool.query(`SELECT * FROM "${this.SchemaName}.${this.tableName}"  WHERE email=$1`, [email]);
            return rows;

        } catch (error) {
            console.log('database_error', error)
        }


    }


    async delete(id: string) {
        const result = await pool.query(`DELETE FROM ${this.SchemaName}.${this.tableName} WHERE id=${id} RETURNING *`);
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

   
        const result = await pool.query(`UPDATE ${this.SchemaName}.${this.tableName} SET ${check} WHERE id=${id} RETURNING *`);
        return result.rows[0]
    }


    async where(parmfst: any, parmsec: any = null) {

        let conditionQuery: String;
        if (parmsec !== null) {
            conditionQuery = `${parmfst} = '${parmsec}'`;
        }
        else {
            let Colmn: any = [];
            parmfst.map((item: any, key: any) => {
                const keyName = `${item[0]}`;
                const condition = `${item[1]}`
                const value = `'${item[2]}'`;
                Colmn[key] = `${keyName} `.concat(condition, value);
                // Colmn = keyName.concat("=",value);
            });

            conditionQuery = Colmn.join("AND ");
        }

        try {
            const { rows } = await pool.query(`SELECT  * FROM ${this.SchemaName}.${this.tableName}  WHERE ${conditionQuery} LIMIT 1`);
            return rows[0];

        } catch (error) {

            console.log('ERROR', error);

        }

    }

}