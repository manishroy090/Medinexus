import Config from "../../../../../Constants/Config"
export async function up(schemaName:String) {
    return `CREATE TABLE  ${schemaName}.${Config().TABLE_PREFIX}_hoshpitals(
              id SERIAL PRIMARY KEY,
              doctor_id  BIGINT,
              hoshpital_id BIGINT
           
          )`


}



export async function down() {
      return `DROP TABLE ${Config().TABLE_PREFIX}_hoshpital`
}
