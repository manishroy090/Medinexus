import { table_prefix } from "../../../../../Constants/App.js"

export async function up(schemaName:String) {
    return `CREATE TABLE  ${schemaName}.${table_prefix}_appointment(
              patient_id SERIAL PRIMARY KEY,
              doctor  VARCHAR(255),
              appointment_date VARCHAR(255),
              status BOOLEAN,
              notes VARCHAR(255),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL
              )`


}



export async function down() {
      return `DROP TABLE ${table_prefix}_hoshpital`
}
