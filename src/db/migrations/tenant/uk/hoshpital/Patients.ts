
import Config from "../../../../../Constants/Config.js"
export async function up() {
    return `CREATE TABLE  ${Config().TABLE_PREFIX}_patients(
              id SERIAL PRIMARY KEY,
            user_id BIGINT,
              phone_number VARCHAR(255),
              primary_doctor BIGINT,
              date_of_birth TIMESTAMP,
              gender VARCHAR(255),
              bloodGroup VARCHAR(255),
              address_1 VARCHAR(255),
              address_2 VARCHAR(255),
              country_id VARCHAR(255),
              state VARCHAR(255),
              city VARCHAR(255),
              pin_code VARCHAR(255),
              is_active BOOLEAN,
              status BIGINT,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL
          )`


}



export async function down() {
      return `DROP TABLE ${Config().TABLE_PREFIX}_hoshpital`
}
