
import { table_prefix } from "../../../Constants/App.js"
export async function up() {
    return `CREATE TABLE ${table_prefix}_permissions(
              id SERIAL PRIMARY KEY,
              title VARCHAR(255),
              role_id BIGINT,
              is_active BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL
          )`
}



export async function down() {
      return `DROP TABLE ${table_prefix}_Permissions`
}
