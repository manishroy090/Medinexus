import Config from "../../../../../Constants/Config.js"

export async function up(schemaName: string) {

    return `CREATE TABLE ${schemaName}.${Config().TABLE_PREFIX}_verification_compliance(
              id SERIAL PRIMARY KEY,
              government_issued VARCHAR(255),
              doctor_id BIGINT,
              medical_council_registration VARCHAR(255),
              license_validity_expiry VARCHAR(255),
              upload_document VARCHAR(255),
              background_verification VARCHAR(255),
              status BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,

              CONSTRAINT fk_verification_compliance_doctor 
                  FOREIGN KEY (doctor_id) 
                  REFERENCES ${schemaName}.${Config().TABLE_PREFIX}_doctors(id)
                  ON DELETE CASCADE
                  ON UPDATE CASCADE
          )`
}

export async function down(schemaName: string) {
    return `DROP TABLE ${schemaName}.${Config().TABLE_PREFIX}_verification_compliance`
}