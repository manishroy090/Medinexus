
import Config from "../../../../../Constants/Config.js"
export async function up() {
    return `CREATE TABLE  ${Config().TABLE_PREFIX}_medicalrecords(
              id SERIAL PRIMARY KEY,
              patient_id  BIGINT,
              doctor_id  BIGINT,
              visit_type VARCHAR(255),
              diagnosis VARCHAR(255),
              prescription VARCHAR(255),
              notes VARCHAR(255),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
              CONSTRAINT fk_medicalrecords_patient 
                 FOREIGN KEY (patient_id) 
                 REFERENCES ${Config().TABLE_PREFIX}_patients((id)
                 ON DELETE CASCADE
                 ON UPDATE CASCADE
              CONSTRAINT fk_medicalrecords_doctor 
                  FOREIGN KEY (doctor_id) 
                  REFERENCES ${Config().TABLE_PREFIX}_doctors((id)
                  ON DELETE CASCADE
                  ON UPDATE CASCADE
          )`


}



export async function down() {
      return `DROP TABLE ${Config().TABLE_PREFIX}_hoshpital`
}
