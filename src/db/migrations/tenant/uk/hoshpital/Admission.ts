
import Config from "../../../../../Constants/Config.js"
export async function up() {
    return `CREATE TABLE  ${Config().TABLE_PREFIX}_admission(
              id SERIAL PRIMARY KEY,
              patient_id  BIGINT,
              doctor_id  BIGINT,
              appointment_date  BIGINT,
              status  BOOLEAN,
              notes  VARCHAR(255),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL
          )`


}



export async function down() {
      return `DROP TABLE ${Config().TABLE_PREFIX}_hoshpital`
}
