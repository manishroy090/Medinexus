// import { Roles } from "../entities/Roles";

import { Permission } from "../../../db/models/tenant/org/hoshpital/Permission.js";
export class PemissionRepository {


    public Permission: any;


    constructor() {
        this.Permission = new Permission();
    }



    async getAllPermission() {
        try {

            const query =
                `SELECT medinexus_modules.title AS module,
                         medinexus_permissions.title ,
                         medinexus_permissions.id,
                         medinexus_submodules.title AS submodules
                         FROM medinexus_roles_permissions
                         JOIN medinexus_permissions 
                         ON medinexus_roles_permissions.permission_id = medinexus_permissions.id
                         JOIN medinexus_modules
                         ON medinexus_permissions.module_id = medinexus_modules.id
                         JOIN medinexus_submodules
                         ON medinexus_permissions.sub_module_id = medinexus_submodules.id
                         ORDER BY medinexus_roles_permissions.id ASC `

            const { rows } = await this.Permission.pool.query(query);

            return rows;

        } catch (error) {

            console.log("error", error)

            return error;

        }
    }

    async createPermission(role: any) {
        const permission = await this.Permission.create(role);
        return permission;
    }


    async getPermission(id: string) {
        const permission = await this.Permission.findById(id);
        return permission;
    }

    async updatePermission(id: string, body: any) {
        const permission = await this.Permission.update(id, body);
        return permission;
    }


    async deletePermission(id: String) {
        return await this.Permission.delete(id);
    }


    async getAuthUserPermission(email: String) {

        const query = `
                       SELECT 
                       medinexus_permissions.title
                       FROM medinexus_users
                       LEFT JOIN medinexus_users_permissions
                       ON medinexus_users.id = medinexus_users_permissions.user_id
                       LEFT JOIN medinexus_permissions
                       ON medinexus_users_permissions.permission_id = medinexus_permissions.id
                       WHERE medinexus_users.email = $1
                      `;

        const { rows } = await this.Permission.pool.query(query, [email]);

        return rows;

    }


    async getPermissionsRoleWise(id: any) {

        try {

            const query =
                `SELECT medinexus_modules.title AS module,
                         medinexus_permissions.title ,
                         medinexus_permissions.id,
                         medinexus_submodules.title AS submodules
                         FROM medinexus_roles_permissions
                         JOIN medinexus_permissions 
                         ON medinexus_roles_permissions.permission_id = medinexus_permissions.id
                         JOIN medinexus_modules
                         ON medinexus_permissions.module_id = medinexus_modules.id
                         JOIN medinexus_submodules
                         ON medinexus_permissions.sub_module_id = medinexus_submodules.id
                         WHERE medinexus_roles_permissions.role_id=$1
                         ORDER BY medinexus_roles_permissions.id ASC `

            const { rows } = await this.Permission.pool.query(query, [id]);

            return rows;

        } catch (error) {

            console.log("error", error)

            return error;

        }


    }
}