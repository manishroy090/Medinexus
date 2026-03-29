export async function up() {
    return `CREATE TABLE bloodbanks(
              id SERIAL PRIMARY KEY,
              title VARCHAR(255),
              is_active BOOLEAN,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL
          )`


}



export async function down() {
      return `DROP TABLE bloodbanks`
}
