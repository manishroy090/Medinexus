
import Config from "../../../Constants/Config";
export async function up() {
    return `CREATE TABLE ${Config().TABLE_PREFIX}_organizations (
              id SERIAL PRIMARY KEY,
              name VARCHAR(255),
              user_id Integer,
              org_type VARCHAR(255),
              registration_number VARCHAR(255),
              emergency_contact VARCHAR(255),
              tax_id VARCHAR(255),
              website  VARCHAR(255),
              address_line1  VARCHAR(255),
              address_line2 VARCHAR(255),
              city VARCHAR(255),
              state VARCHAR(255),
              country_id BIGINT NOT NULL,
              postal_code VARCHAR(255),
              logo VARCHAR(255),
              description VARCHAR(255),
              continent VARCHAR(255),
              established_date TIMESTAMP,
              is_active BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
              CONSTRAINT fk_org_country FOREIGN KEY (country_id) REFERENCES ${table_prefix}_countries(id)
              ON DELETE CASCADE
              ON UPDATE CASCADE)`
}



export async function down() {
      return `
    DROP TABLE IF EXISTS ${Config().TABLE_PREFIX}_organizations;
  `;
}
