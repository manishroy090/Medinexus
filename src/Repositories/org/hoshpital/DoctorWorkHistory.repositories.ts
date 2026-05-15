import { Doctor_Work_History } from "../../../db/models/tenant/org/hoshpital/Doctor_Work_History";
export class DoctorWorkHistoryrepositories{


    public doctorworkhistory:any ;


    constructor() {
        this.doctorworkhistory = new Doctor_Work_History();
    }



    async getalldoctorworkhistory(){
        return this.doctorworkhistory.all();
    }

    async createDoctorworkhistory(country:any){
        return this.doctorworkhistory.create(country);
    }

    async getDoctorworkhistory(id:string){
      const result = await this.doctorworkhistory.findById(id);
      return result[0];
    }
    
}