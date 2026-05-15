import { BloodGroup } from "../../../db/models/tenant/org/hoshpital/BloodGroup.js";
export class Bloodgrouprepositories{


    public bloodGroup:any ;


    constructor() {
        this.bloodGroup = new BloodGroup();
    }



    async getAllBloodGroup(){
        return await this.bloodGroup.all();
    }

    async createBloodGroup(country:any){
        return await this.bloodGroup.create(country);
    }

    async getBloodgroup(id:string){
      const result = await this.bloodGroup.findById(id);
      return result[0];
    }
    
}
