// import { Roles } from "../entities/Roles";
import { Role } from "../../../db/models/tenant/org/hoshpital/Role.model.js";

export class RolesRepository {


    public role: any;


    constructor() {
        this.role = new Role();
    }



    async getAllRoles() {
        const role = await this.role.all();

        return role;

    }

    async createRole(role: any) {
        const result = await this.role.create(role);
        return result;
    }


    async getRole(id: string) {
        const result = await this.role.findById(id);
        return result
    }

    async updateRole(id: string, body: any) {
        const result = await this.role.update(id, body);
        return result;
    }


    async deleteRole(id: String) {
        return await this.role.delete(id);
    }


    async getAllRoleWithPermission() {
 

        try {

          const allRoleWithPermission = `
                              SELECT 
                              medinexus_roles.id,
                              medinexus_roles.title,
                              null AS permissions
                              FROM medinexus_roles
                             `;


            const { rows } = await this.role.pool.query(allRoleWithPermission);

        


            return rows;

        } catch (error) {

            throw error;

        }



    }







}