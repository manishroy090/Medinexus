// import { Roles } from "../entities/Roles";
import { Role } from "../db/models/Role.model.js";

export class RolesRepository {


    public role:any ;


    constructor() {
        this.role = new Role();
    }



    async getAllRoles(){
        return this.role.all();
    }

    async createRole(role:any){
        const result = await this.role.create(role);
        return result;
    }


    async getRole(id:string){
       const result = await this.role.findById(id);
       return result
    }

    async updateRole(id:string,body:any){
         const result = await this.role.update(id,body);
         return result;
    }


    async deleteRole(id:String){
      return  await this.role.delete(id);
    }
}