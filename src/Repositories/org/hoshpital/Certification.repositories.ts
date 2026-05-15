// import { Roles } from "../entities/Roles";
import {Doctor_Certification} from "../../../db/models/tenant/org/hoshpital/Doctor_Certification.js";
export class Certificationrepositories{


    public certification:any ;


    constructor() {
        this.certification = new Doctor_Certification();
    }



    async getAllCertification(){
        return this.certification.all();
    }

    async createCertification(doctor:any){
        return this.certification.create(doctor);
    }

    async getCertification(id:string){
      const result = await this.certification.findById(id);
      return result[0];
    }
    

    async updateCertification(id:String , body:any){
        const result = await this.certification.update(id,body);
        return result;
    }


    async deleteCertification(id:String){
         const result = await this.certification.delete(id);
         return result;

    }
}
