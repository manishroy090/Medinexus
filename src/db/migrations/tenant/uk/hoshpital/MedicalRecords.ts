import { table_prefix } from "../../../../../Constants/App.js"

export async function up() {
    return `CREATE TABLE  ${table_prefix}_hoshpitals(
              id SERIAL PRIMARY KEY,
              patient_id  BIGINT,
              doctor_id  BIGINT,
              visit_type VARCHAR(255),
              diagnosis VARCHAR(255),
              prescription VARCHAR(255),
              notes VARCHAR(255),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
          )`


}



export async function down() {
      return `DROP TABLE ${table_prefix}_hoshpital`
}
