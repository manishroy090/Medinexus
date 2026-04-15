import { table_prefix } from "../../../../../Constants/App.js"

export async function up() {
    return `CREATE TABLE  ${table_prefix}_patients(
              id SERIAL PRIMARY KEY,
              first_name VARCHAR(255),
              last_name VARCHAR(255),
              gender VARCHAR(255),
              date_of_birth TIMESTAMP,
              phone VARCHAR(255),
              email VARCHAR(255),
              address VARCHAR(255),
              bloodGroup VARCHAR(255),
              emergencyContact VARCHAR(255),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
          )`


}



export async function down() {
      return `DROP TABLE ${table_prefix}_hoshpital`
}
