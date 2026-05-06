// import { Roles } from "../entities/Roles";

import { Permission } from "../db/models/Permission.js";
import { pool } from "../db/models/Model.js";
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


    async getPermissionRoleWise(RoleId: String) {
        const result = await this.Permission.newWhere('role_id', RoleId).get();
        return result;
    }


    async getAuthUserPermission(email: String) {

        const query = `SELECT medinexus_users.name,medinexus_permissions.title FROM public.medinexus_users
                        LEFT JOIN public.medinexus_users_permissions
                        ON public.medinexus_users.id = public.medinexus_users_permissions.user_id
                        LEFT JOIN public.medinexus_permissions
                        ON public.medinexus_users_permissions.permission_id = public.medinexus_permissions.id
                        WHERE medinexus_users.email = $1
                        `;

        const {rows} = await  pool.query(query,[email]);


        return rows;

    }
}