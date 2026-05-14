import Config from "../../../../../Constants/Config.js"

export async function up(schemaName: string) {

    return `CREATE TABLE ${schemaName}.${Config().TABLE_PREFIX}_doctor_session(
              id SERIAL PRIMARY KEY,
              day_name VARCHAR(255),
              doctor_id BIGINT,
              session_name VARCHAR(255),
              start_time VARCHAR(255),
              end_time VARCHAR(255),
              status BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
              CONSTRAINT fk_doctor_session_doctor 
                 FOREIGN KEY (doctor_id) 
                 REFERENCES ${schemaName}.${Config().TABLE_PREFIX}_doctors(id)
                 ON DELETE CASCADE
                 ON UPDATE CASCADE
          )`
}

export async function down(schemaName: string) {
    return `DROP TABLE ${schemaName}.${Config().TABLE_PREFIX}_doctor_session`
}