import { table_prefix } from "../../../../../Constants/App.js"

export async function up() {
    return `CREATE TABLE  ${table_prefix}_appointment(
              patient_id SERIAL PRIMARY KEY,
              doctor  VARCHAR(255),
              appointment_date VARCHAR(255),
              status BOOLEAN,
              notes VARCHAR(255),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
              CONSTRAINT fk_hosh_org FOREIGN KEY (org_id) REFERENCES ${table_prefix}_organizations(id)
          )`


}



export async function down() {
      return `DROP TABLE ${table_prefix}_hoshpital`
}
