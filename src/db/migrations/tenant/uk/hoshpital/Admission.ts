
import Config from "../../../../../Constants/Config"
export async function up(schemaName:String) {
    return `CREATE TABLE  ${schemaName}.${Config().TABLE_PREFIX}_admission(
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
