// import { Roles } from "../entities/Roles";

import { Permission } from "../../../db/models/tenant/org/hoshpital/Permission.js";
export class PemissionRepository {


    public Permission: any;


    constructor() {
        this.Permission = new Permission();
    }



    async getAllPermission() {
        return await this.Permission.all();
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
}