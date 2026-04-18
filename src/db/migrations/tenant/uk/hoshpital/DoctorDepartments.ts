import { table_prefix } from "../../../../../Constants/App.js"

export async function up(schemaName:String) {
    return `CREATE TABLE  ${schemaName}.${table_prefix}_hoshpitals(
              id SERIAL PRIMARY KEY,
              doctor_id  BIGINT,
              hoshpital_id BIGINT
           
          )`


}



export async function down() {
      return `DROP TABLE ${table_prefix}_hoshpital`
}
