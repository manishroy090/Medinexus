
import Config from "../../../../../Constants/Config"
export async function up(schemaName:String) {


    return `CREATE TABLE  ${schemaName}.${Config().TABLE_PREFIX}_doctors(
              id SERIAL PRIMARY KEY,
              user_id BIGINT,
              first_name VARCHAR(255),
              last_name VARCHAR(255),
              specialization VARCHAR(255),
              phone VARCHAR(255),
              email VARCHAR(255),
              consultation_fee VARCHAR(255),
              Sub_specialization VARCHAR(255),
              medical_license_number VARCHAR(255),
              is_active BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL
          )`


}



export async function down() {
      return `DROP TABLE ${Config().TABLE_PREFIX}_hoshpital`
}
