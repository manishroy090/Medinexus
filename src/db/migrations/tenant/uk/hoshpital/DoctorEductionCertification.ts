import Config from "../../../../../Constants/Config.js"

export async function up() {

    return `CREATE TABLE ${Config().TABLE_PREFIX}_doctor_education_certifications(
              id SERIAL PRIMARY KEY,
              medical_degree VARCHAR(255),
              doctor_id BIGINT,
              university_collage_name VARCHAR(255),
              from_year VARCHAR(255),
              end_year VARCHAR(255),
              status BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
              CONSTRAINT fk_doctor_education_doctor
                 FOREIGN KEY (doctor_id)
                 REFERENCES ${Config().TABLE_PREFIX}_doctors(id)
                 ON DELETE CASCADE
                 ON UPDATE CASCADE
          )`
}

export async function down() {
    return `DROP TABLE ${Config().TABLE_PREFIX}_doctor_education_certification`
}