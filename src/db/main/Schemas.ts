export async function up() {
    return `CREATE TABLE schemas(
              id SERIAL PRIMARY KEY,
              org_id VARCHAR(255),
              title VARCHAR(255),
              is_active BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              CONSTRAINT fk_schemas_orn FOREIGN KEY (org_id) REFERENCES organizations(id),
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL
          )`
}



export async function down() {
     return `DROP TABLE schemas`
}
