import { Doctor_Session } from "../../../db/models/tenant/org/hoshpital/Doctor_Session.js";
export class DoctorSessionrepositories{


    public doctorsession:any ;


    constructor() {
        this.doctorsession = new Doctor_Session();
    }



    async getalldoctorSession(){
        return this.doctorsession.all();
    }

    async createDoctorSession(country:any){
        return this.doctorsession.create(country);
    }

    async getDoctorSession(id:string){
      const result = await this.doctorsession.findById(id);
      return result[0];
    }
    
}