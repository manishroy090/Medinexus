

import Config from "../../../Constants/Config.js"
export async function up() {
    return `CREATE TABLE  ${Config().TABLE_PREFIX}_hoshpitals(
              id SERIAL PRIMARY KEY,
			  org_id  BIGINT,
              name VARCHAR(255),
              total_beds INT,
              is_active BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
              CONSTRAINT fk_hosh_org FOREIGN KEY (org_id) REFERENCES ${Config().TABLE_PREFIX}_organizations(id)
          )`


}



export async function down() {
      return `DROP TABLE ${Config().TABLE_PREFIX}_hoshpital`
}
