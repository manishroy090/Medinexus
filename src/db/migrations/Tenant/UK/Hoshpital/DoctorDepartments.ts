import { table_prefix } from "../../../../../Constants/App.js"

export async function up() {
    return `CREATE TABLE  ${table_prefix}_hoshpitals(
              id SERIAL PRIMARY KEY,
              doctor_id  BIGINT,
              hoshpital_id BIGINT
           
          )`


}



export async function down() {
      return `DROP TABLE ${table_prefix}_hoshpital`
}
