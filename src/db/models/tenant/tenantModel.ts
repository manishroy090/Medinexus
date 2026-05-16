import { Pool } from 'pg';
import { table_prefix } from "../../../Constants/App.js";
import { RequestContext } from "../../../context/RequestContext.js";


export abstract class Model {

    private readonly tableName: String;

    private readonly tablePrefix: String = table_prefix ;



      protected get pool(): Pool {
        const db = RequestContext.get()?.dbDetails;


        if (!db) {
            throw new Error("DB pool not initialized in RequestContext");
        }

    
        return db;
    }

    constructor() {

        

        if (this.constructor.name == "Country") {
            this.tableName = `${this.tablePrefix}_${"countr".toLowerCase()}ies`;
        }
        else if (this.constructor.name == "Patient_Status"){
            this.tableName = `${this.tablePrefix}_${"patient_status".toLowerCase()}es`
        }
        else {
            this.tableName = `${this.tablePrefix}_${this.constructor.name.toLowerCase()}s`;
        }

    }

   

    async all() {
        const { rows } = await this.pool.query(`SELECT * FROM ${this.tableName}`);

        return rows;

    }

    async create(item: any) {
          let query = '';
  
          // Safely escape a single value for SQL
          const escape = (val: any): string => {
              if (val === null || val === undefined) return 'NULL';
              if (typeof val === 'boolean') return val.toString();
              if (typeof val === 'number') return val.toString();
              if (val instanceof Date) {
                  return `'${val.toISOString().replace('T', ' ').slice(0, 19)}'`;
              }
              // Everything else (strings, postal codes, etc.) → quoted, escape internal single quotes
              return `'${String(val).replace(/'/g, "''")}'`;
          };
  
          const isArray = Array.isArray(item);
  
          if (isArray && item.length > 0) {
              const keys = Object.keys(item[0]);
              const values = item.map((row: any) => {
                  const rowValues = Object.values(row).map(escape).join(', ');
                  return `(${rowValues})`;
              });
              query = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES ${values.join(', ')} RETURNING *`;
          } else if (!isArray) {
              const keys = Object.keys(item);
              const values = Object.values(item).map(escape).join(', ');
              query = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${values}) RETURNING *`;
          } else {
              throw new Error('create() called with an empty array');
          }
  
          try {
              console.log('query', query);
              const result = await this.pool.query(query);
              return isArray ? result.rows : result.rows[0];
          } catch (error) {
              console.log('database_error', error);
          }
      }
  


    async findById(id: string) {
        try {
            const { rows } = await this.pool.query(`SELECT * FROM ${this.tableName}  WHERE id=${id}`);

            return rows;

        } catch (error) {

            console.log('database_error', error)

        }
    }


    async findUserByEmail(email: string) {

        try {
            const { rows } = await this.pool.query(`SELECT * FROM "${this.tableName}"  WHERE email=$1`, [email]);


            return rows;

        } catch (error) {
            console.log('database_error', error)
        }


    }


    async delete(id: string) {
        const result = await this.pool.query(`DELETE FROM ${this.tableName} WHERE id=${id} RETURNING *`);
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


        const result = await this.pool.query(`UPDATE ${this.tableName} SET ${check} WHERE id=${id} RETURNING *`);
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
            const { rows } = await this.pool.query(`SELECT  * FROM ${this.tableName}  WHERE ${conditionQuery} LIMIT 1`);
            return rows[0];

        } catch (error) {

            console.log('ERROR', error);

        }

    }

}