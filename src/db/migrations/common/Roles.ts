
import { table_prefix } from "../../../Constants/App.js"
export async function up(schemaName:string) {
    return `CREATE TABLE ${schemaName}.${table_prefix}_roles(
              id SERIAL PRIMARY KEY,
              title VARCHAR(255),
              description TEXT,
              is_active BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL
          )`
}



export async function down() {
     return `DROP TABLE ${table_prefix}_roles`
}
