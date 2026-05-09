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


    async getAllRoleWithPermission(){

         const allRoleWithPermission = `
         SELECT silveroakhospital.medinexus_roles.title,
         STRING_AGG(silveroakhospital.medinexus_permissions.title, ', ') AS permissions
         FROM silveroakhospital.medinexus_permissions 
         LEFT JOIN silveroakhospital.medinexus_roles 
         ON silveroakhospital.medinexus_permissions.role_id = silveroakhospital.medinexus_roles.id
         GROUP BY silveroakhospital.medinexus_roles.id, silveroakhospital.medinexus_roles.title;`
         const {rows} = await this.role.pool.query(allRoleWithPermission);

      
         return rows;

    }

   

  
  

  
}