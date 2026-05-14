// import { Roles } from "../entities/Roles";
import {Department} from "../../../db/models/tenant/org/hoshpital/Department.js";
export class Departmentrepositories{


    public department:any ;


    constructor() {
        this.department = new Department();
    }



    async getAllDepartment(){
        return this.department.all();
    }

    async createDepartment(department:any){
        return this.department.create(department);
    }

    async getDepartment(id:string){
      const result = await this.department.findById(id);
      return result[0];
    }
    

    async updateDepartment(id:String , body:any){
        const result = await this.department.update(id,body);
        return result;
    }


    async deleteDepartment(id:String){
         const result = await this.department.delete(id);
         return result;

    }
}
