import { table_prefix } from "../../../Constants/App.js"

export async function up() {
    return `CREATE TABLE ${table_prefix}_schemas(
              id SERIAL PRIMARY KEY,
              org_id BIGINT,
              tenant_id BIGINT,
              title VARCHAR(255),
              is_active BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              CONSTRAINT fk_schemas_orn FOREIGN KEY (org_id) REFERENCES ${table_prefix}_organizations(id),
              CONSTRAINT fk_schemas_ten FOREIGN KEY (tenant_id) REFERENCES ${table_prefix}_tenants(id),
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL
          )`
}



export async function down() {
     return `DROP TABLE ${table_prefix}_schemas`
}
