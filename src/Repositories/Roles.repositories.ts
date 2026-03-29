import { BaseRepository } from "./base/BaseRepository.js";
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
        const resut = await this.role.create(role);

        console.log('result',resut);
        // console.log(this.role.all());
        
    }


    async getRole(id:string){
       const result = await this.role.findById(id);
    }

    async updateRole(id:string,body:any){
         const result = await this.role.update(id,body);
    }


    async deleteRole(id:String){
        await this.role.delete(id);
    }
}