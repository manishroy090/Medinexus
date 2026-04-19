
import Config from "../../../Constants/Config"

export async function up(schemaName:string) {
    return `CREATE TABLE ${schemaName}.${Config().TABLE_PREFIX}_permissions(
              id SERIAL PRIMARY KEY,
              title VARCHAR(255),
              role_id BIGINT,
              is_active BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL
          )`
}



export async function down() {
      return `DROP TABLE ${Config().TABLE_PREFIX}_Permissions`
}
