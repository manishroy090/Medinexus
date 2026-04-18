import { table_prefix } from "../../../Constants/App.js"

export async function up(schemaName:string) {
    return `CREATE TABLE ${schemaName}.${table_prefix}_users(
              id SERIAL PRIMARY KEY,
              role_id BIGINT,
              name VARCHAR(255),
              email VARCHAR(255),
              password  VARCHAR(255),
              is_active BOOLEAN,
              email_verified_at TIMESTAMP,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL
          )`


}



export async function down() {
    return `DROP TABLE ${table_prefix}_users`
}
