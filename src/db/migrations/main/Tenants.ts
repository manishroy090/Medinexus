import { table_prefix } from "../../../Constants/App.js"

export async function up() {
    return `CREATE TABLE ${table_prefix}_tenants(
              id SERIAL PRIMARY KEY,
              country_id BIGINT NOT NULL,
              db_names VARCHAR(255),
              is_active BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
              CONSTRAINT fk_tenant_country FOREIGN KEY (country_id) REFERENCES ${table_prefix}_countries(id)
              ON DELETE CASCADE
              ON UPDATE CASCADE
          )`


}



export async function down() {
    return `DROP TABLE IF EXISTS ${table_prefix}_tenants`
}
