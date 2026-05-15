// import { Roles } from "../entities/Roles";
import {Doctor_Award} from "../../../db/models/tenant/org/hoshpital/DoctorAward.js";
export class Awardrepositories{


    public award:any ;


    constructor() {
        this.award = new Doctor_Award();
    }



    async getAllAward(){
        return this.award.all();
    }

    async createAward(doctor:any){
        return this.award.create(doctor);
    }

    async getAward(id:string){
      const result = await this.award.findById(id);
      return result[0];
    }
    

    async updateAward(id:String , body:any){
        const result = await this.award.update(id,body);
        return result;
    }


    async deleteAward(id:String){
         const result = await this.award.delete(id);
         return result;

    }
}
