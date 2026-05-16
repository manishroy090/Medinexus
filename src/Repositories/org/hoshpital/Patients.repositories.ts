// import { Roles } from "../entities/Roles";
import { Patient } from "../../../db/models/tenant/org/hoshpital/Patient.js";
export class Patientsrepositories {


    public patientrep: any;


    constructor() {
        this.patientrep = new Patient();
    }



    async getAllPatient() {
        try {
            return this.patientrep.all();

        } catch (error) {

            console.log("error", error);
        }
    }

    async createPatient(doctor: any) {
        return this.patientrep.create(doctor);
    }

    async getPatient(id: string) {
        const result = await this.patientrep.findById(id);
        return result[0];
    }


    async updatePatient(id: String, body: any) {
        const result = await this.patientrep.update(id, body);
        return result;
    }


    async deletePatient(id: String) {
        const result = await this.patientrep.delete(id);
        return result;

    }
}
