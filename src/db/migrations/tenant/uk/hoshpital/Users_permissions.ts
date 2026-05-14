import Config from "../../../../../Constants/Config.js"

export async function up(schemaName:string) {
    return `CREATE TABLE ${schemaName}.${Config().TABLE_PREFIX}_users_permissions(
        id SERIAL PRIMARY KEY,
        user_id BIGINT NOT NULL,
        permission_id BIGINT NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,

        CONSTRAINT fk_userpermission_user_id 
            FOREIGN KEY (user_id) 
            REFERENCES ${schemaName}.${Config().TABLE_PREFIX}_users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,

        CONSTRAINT fk_userpermission_permission_id 
            FOREIGN KEY (permission_id) 
            REFERENCES ${schemaName}.${Config().TABLE_PREFIX}_permissions(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
    )`
}

export async function down() {
    return `DROP TABLE IF EXISTS ${Config().TABLE_PREFIX}_users_permissions`
}