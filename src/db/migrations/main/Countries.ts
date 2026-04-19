
import Config from "../../../Constants/Config"
export async function up() {
    return `CREATE TABLE ${Config().TABLE_PREFIX}_countries(
              id SERIAL PRIMARY KEY,
              title VARCHAR(255),
              code VARCHAR(255),
              code3 VARCHAR(255),
              number VARCHAR(255),
              postalcode_format VARCHAR(255),
              postalcode_len VARCHAR(255),
              postalcode_example VARCHAR(255),
              timezone VARCHAR(255),
              utc VARCHAR(255),
              mobile_code VARCHAR(255),
              description TEXT,
              is_active BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL
          )`
}



export async function down() {
     return `DROP TABLE ${Config().TABLE_PREFIX}_countries`
}
