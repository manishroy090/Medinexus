import { table_prefix } from "../../../../../Constants/App.js"

export async function up() {
    return `CREATE TABLE  ${table_prefix}_bills(
              id SERIAL PRIMARY KEY,
              patient_id  BIGINT,
              admission_id  BIGINT,
              appointment_id  BIGINT,
              total_amount  INT,
              paid_amount  INT,
              status BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
              CONSTRAINT fk_hosh_org FOREIGN KEY (org_id) REFERENCES ${table_prefix}_organizations(id)
          )`


}



export async function down() {
      return `DROP TABLE ${table_prefix}_hoshpital`
}
