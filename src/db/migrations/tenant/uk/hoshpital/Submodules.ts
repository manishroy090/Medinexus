

import Config from "../../../../../Constants/Config.js"
export async function up(schemaName:string) {
    return `CREATE TABLE   ${schemaName}.${Config().TABLE_PREFIX}_submodules(
              id SERIAL PRIMARY KEY,
              module_id  BIGINT, 
              title VARCHAR(255) UNIQUE, 
              description TEXT,            
              is_active BOOLEAN DEFAULT TRUE,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
              CONSTRAINT fk_submodules_modules FOREIGN KEY (module_id) REFERENCES ${schemaName}.${Config().TABLE_PREFIX}_modules(id)
          )`


}



export async function down() {
      return `DROP TABLE ${Config().TABLE_PREFIX}_submodules`
}
