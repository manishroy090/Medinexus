export async function up() {
    return `CREATE TABLE  hoshpital(
              id SERIAL PRIMARY KEY,
			  org_id  BIGINT,
              name VARCHAR(255),
              total_beds INT,
              is_active BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
              CONSTRAINT fk_hosh_org FOREIGN KEY (org_id) REFERENCES organizations(id)
          )`


}



export async function down() {
      return `DROP TABLE hoshpital`
}
