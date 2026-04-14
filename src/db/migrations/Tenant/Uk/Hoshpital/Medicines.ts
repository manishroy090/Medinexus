import { table_prefix } from "../../../../../Constants/App.js"

export async function up() {
    return `CREATE TABLE  ${table_prefix}_hoshpitals(
              id SERIAL PRIMARY KEY,
              bill_id  BIGINT,
              item_name VARCHAR(255),
              quantity INT,
              unit_price VARCHAR(255),
              total_price VARCHAR(255),
              is_active BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
          )`


}



export async function down() {
      return `DROP TABLE ${table_prefix}_hoshpital`
}
