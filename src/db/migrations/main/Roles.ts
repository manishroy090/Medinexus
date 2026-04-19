
import Config from "../../../Constants/Config"
export async function up() {
    return `CREATE TABLE ${Config().TABLE_PREFIX}_roles(
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
     return `DROP TABLE ${Config().TABLE_PREFIX}_roles`
}
