// import { Roles } from "../entities/Roles";
import { Patient_Status } from "../../../db/models/tenant/org/hoshpital/Patient_Status.js";
export class PatientStatusrepositories {


    public patientstatus: any;


    constructor() {
        this.patientstatus = new Patient_Status();
    }



    async getAllPatientStatus() {
        try {
            return this.patientstatus.all();

        } catch (error) {

            console.log("error", error);
        }
    }

    async createPatientStatus(doctor: any) {
        return this.patientstatus.create(doctor);
    }

    async getPatientStatus(id: string) {
        const result = await this.patientstatus.findById(id);
        return result[0];
    }


    async updatePatientStatus(id: String, body: any) {
        const result = await this.patientstatus.update(id, body);
        return result;
    }


    async deletePatientStatus(id: String) {
        const result = await this.patientstatus.delete(id);
        return result;

    }
}
