
import Config from "../../../../../Constants/Config.js"
export async function up(schemaName:String) {
    return `CREATE TABLE  ${schemaName}.${Config().TABLE_PREFIX}_appointment(
              patient_id SERIAL PRIMARY KEY,
              doctor_id  VARCHAR(255),
              appointment_type VARCHAR(255),
              accept_booking VARCHAR(255),
              appointment_duration VARCHAR(255),
              consulting_charge VARCHAR(255),
              max_booking_perslot  VARCHAR(255),
              status BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL
              )`


}



export async function down() {
      return `DROP TABLE ${Config().TABLE_PREFIX}_hoshpital`
}
