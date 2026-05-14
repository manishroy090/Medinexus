import Config from "../../../../../Constants/Config.js"

export async function up(schemaName: string) {

    return `CREATE TABLE ${schemaName}.${Config().TABLE_PREFIX}_doctors(
              id SERIAL PRIMARY KEY,
              user_id BIGINT,
              phone_number VARCHAR(255),
              email VARCHAR(255),
              dob VARCHAR(255),
              year_of_exp VARCHAR(255),
              department_id BIGINT NOT NULL,
              designation VARCHAR(255),
              medical_license_number VARCHAR(255),
              language_spoken VARCHAR(255),
              blood_group VARCHAR(255),
              gender VARCHAR(255),
              bio VARCHAR(255),
              feature_on_website VARCHAR(255),
              address VARCHAR(255),
              address_2 VARCHAR(255),
              country_id BIGINT NOT NULL,
              city VARCHAR(255),
              state VARCHAR(255),
              pin_code VARCHAR(255),
              is_active BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
              CONSTRAINT fk_doctor_department 
                  FOREIGN KEY (department_id) 
                  REFERENCES ${schemaName}.${Config().TABLE_PREFIX}_departments(id)
                  ON DELETE CASCADE
                  ON UPDATE CASCADE,
              CONSTRAINT fk_doctor_country 
                  FOREIGN KEY (country_id) 
                  REFERENCES ${schemaName}.${Config().TABLE_PREFIX}_countries(id)
                  ON DELETE CASCADE
                  ON UPDATE CASCADE
          )`
}

export async function down(schemaName: string) {
    return `DROP TABLE ${schemaName}.${Config().TABLE_PREFIX}_doctors`
}