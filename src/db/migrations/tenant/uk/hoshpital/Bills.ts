
import Config from "../../../../../Constants/Config"
export async function up(schemaName:String) {
    return `CREATE TABLE  ${schemaName}.${Config().TABLE_PREFIX}_bills(
              id SERIAL PRIMARY KEY,
              patient_id  BIGINT,
              admission_id  BIGINT,
              appointment_id  BIGINT,
              total_amount  INT,
              paid_amount  INT,
              status BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL
          )`


}



export async function down() {
      return `DROP TABLE ${Config().TABLE_PREFIX}_hoshpital`
}
