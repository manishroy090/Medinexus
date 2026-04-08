// import { Roles } from "../entities/Roles";

import { Tenant } from "../db/models/Tenant.js";
export class TenantRepository {


    public Tenant:any;


    constructor() {
        this.Tenant = new Tenant();
    }



    async getAllTenant(){
        return await this.Tenant.all();
    }

    async createTenant(tenant:any){
        const tenantDetails = await this.Tenant.create(tenant);
        return tenantDetails;        
    }


    async getTenant(id:string){
       const tenant = await this.Tenant.findById(id);
       return tenant;
    }

    async getTenantByDBName(name:String){

       const result = await this.Tenant.where('db_names',name);

       return result;

    }

    async updateTenant(id:string,body:any){
         const tenant = await this.Tenant.update(id,body);
         return tenant;
    }


    async deleteTenant(id:String){
      return  await this.Tenant.delete(id);
    }
}