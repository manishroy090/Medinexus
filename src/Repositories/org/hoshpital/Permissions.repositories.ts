// import { Roles } from "../entities/Roles";

import { Permission } from "../db/models/Permission.js";
export class PemissionRepository {


    public Permission:any ;


    constructor() {
        this.Permission = new Permission();
    }



    async getAllPermission(){
        return await this.Permission.all();
    }

    async createPermission(role:any){
        const permission = await this.Permission.create(role);
        return permission;        
    }


    async getPermission(id:string){
       const permission = await this.Permission.findById(id);
       return permission;
    }

    async updatePermission(id:string,body:any){
         const permission = await this.Permission.update(id,body);
         return permission;
    }


    async deletePermission(id:String){
      return  await this.Permission.delete(id);
    }
}