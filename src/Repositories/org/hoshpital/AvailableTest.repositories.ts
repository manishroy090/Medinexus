// import { Roles } from "../entities/Roles";
import {Available_test} from "../../../db/models/tenant/org/hoshpital/Available_test.js";
export class AvailableTestrepositories{


    public available_test:any ;


    constructor() {
        this.available_test = new Available_test();
    }



    async getAllAvailableTest(){
        return this.available_test.all();
    }

    async createAvailableTest(doctor:any){
        return this.available_test.create(doctor);
    }

    async getAvailableTest(id:string){
      const result = await this.available_test.findById(id);
      return result[0];
    }
    

    async updateAvailableTest(id:String , body:any){
        const result = await this.available_test.update(id,body);
        return result;
    }


    async deleteAvailableTest(id:String){
         const result = await this.available_test.delete(id);
         return result;

    }
}
