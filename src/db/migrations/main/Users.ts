import Config from "../../../Constants/Config.js"
export async function up() {
    return `CREATE TABLE ${Config().TABLE_PREFIX}_users(
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
    return `DROP TABLE ${Config().TABLE_PREFIX}_users`
}
