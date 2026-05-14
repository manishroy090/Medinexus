import Config from "../../../../../Constants/Config.js"

export async function up() {
    return `CREATE TABLE ${Config().TABLE_PREFIX}_roles_permissions(
        id SERIAL PRIMARY KEY,
        role_id BIGINT NOT NULL,
        permission_id BIGINT NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,

        CONSTRAINT fk_rolepermission_role_id 
            FOREIGN KEY (role_id) 
            REFERENCES ${Config().TABLE_PREFIX}_roles(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,

        CONSTRAINT fk_userpermission_permission_id 
            FOREIGN KEY (permission_id) 
            REFERENCES ${Config().TABLE_PREFIX}_permissions(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
    )`
}

export async function down() {
    return `DROP TABLE IF EXISTS ${Config().TABLE_PREFIX}_users_permissions`
}