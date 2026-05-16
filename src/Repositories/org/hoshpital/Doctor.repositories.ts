// import { Roles } from "../entities/Roles";
import { Doctor } from "../../../db/models/tenant/org/hoshpital/Doctor.js";
export class Doctorrepositories {


    public doctor: any;


    constructor() {
        this.doctor = new Doctor();
    }



    async getAllDoctor() {

        try {
            const query = `SELECT 
              d.id AS doctor_id,
              d.user_id,
              u.firstname,
              u.lastname,
              u.email AS user_email,
              d.email AS doctor_email,
              d.phone_number,
              d.designation,
              d.department_id,
              d.year_of_exp,
              d.gender,
              d.city,
              d.state,
              d.is_active,
              d.created_at
              FROM medinexus_doctors d
              INNER JOIN medinexus_users u
              ON d.user_id = u.id
              ORDER BY d.id ASC`
            const { rows } = await this.doctor.pool.query(query);

            return rows;

        } catch (error) {

            console.log("error",error)
        }


    }

    async createDoctor(doctor: any) {
        return this.doctor.create(doctor);
    }

    async getDoctor(id: string) {
        const result = await this.doctor.findById(id);
        return result[0];
    }


    async updateDoctor(id: String, body: any) {
        const result = await this.doctor.update(id, body);
        return result;
    }


    async deleteDoctor(id: String) {
        const result = await this.doctor.delete(id);
        return result;

    }
}
