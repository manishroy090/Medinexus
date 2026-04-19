
import Config from "../../../../../Constants/Config"
export async function up(schemaName:String) {
    return `CREATE TABLE  ${schemaName}.${Config().TABLE_PREFIX}_medicalrecords(
              id SERIAL PRIMARY KEY,
              patient_id  BIGINT,
              doctor_id  BIGINT,
              visit_type VARCHAR(255),
              diagnosis VARCHAR(255),
              prescription VARCHAR(255),
              notes VARCHAR(255),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL
          )`


}



export async function down() {
      return `DROP TABLE ${Config().TABLE_PREFIX}_hoshpital`
}
