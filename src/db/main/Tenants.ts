export async function up() {
    return `CREATE TABLE tenants(
              id SERIAL PRIMARY KEY,
              org_id BIGINT NOT NULL,
              db_names VARCHAR(255),
              schema_names VARCHAR(255),
              is_active BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
              CONSTRAINT fk_tenant_orn
              FOREIGN KEY (org_id) REFERENCES organizations(id)
              ON DELETE CASCADE
              ON UPDATE CASCADE
          )`


}



export async function down() {
     return `DROP TABLE IF EXISTS tenants`
}
