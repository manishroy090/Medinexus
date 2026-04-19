// import { Roles } from "../entities/Roles";
import {Doctor} from "../../../db/models/tenant/org/hoshpital/Doctor.js";
export class Doctorrepositories{


    public doctor:any ;


    constructor() {
        this.doctor = new Doctor();
    }



    async getAllDoctor(){
        return this.doctor.all();
    }

    async createDoctor(doctor:any){
        return this.doctor.create(doctor);
    }

    async getDoctor(id:string){
      const result = await this.doctor.findById(id);
      return result[0];
    }
    

    async updateDoctor(id:String , body:any){
        const result = await this.doctor.update(id,body);
        return result;
    }


    async deleteDoctor(id:String){
         const result = await this.doctor.delete(id);
         return result;

    }
}
