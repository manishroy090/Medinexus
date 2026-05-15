import { Doctor_Education_Certification } from "../../../db/models/tenant/org/hoshpital/Doctor_Education_Certification.js";

export class DoctorEductionCertification{

    public doctoreducationcertification:any;

    constructor (){

        this.doctoreducationcertification = new Doctor_Education_Certification();

    }

    async getAllDoctorEducationCertification(){

        return await this.doctoreducationcertification.all();

    }


    async createDoctorEducationCertification(DoctorEducationCertification:any){

        return  await this.doctoreducationcertification.create(DoctorEducationCertification)

    }


    async getDoctorEducationCertification(id:string){
      const result = await this.doctoreducationcertification.findById(id);
      return result[0];

    }


}