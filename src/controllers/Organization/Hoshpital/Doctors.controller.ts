import { type FastifyRequest, type FastifyReply } from "fastify";
import { isatty } from "node:tty";
import { UsersRepositories } from "../../../Repositories/org/hoshpital/Users.repositories.js";
import { Doctorrepositories } from "../../../Repositories/org/hoshpital/Doctor.repositories.js";
import  Config from '../../../Constants/Config.js';

export class DoctorsController {

    private UsersRepositories: UsersRepositories;
    private DoctorRepositories: Doctorrepositories;



    constructor(UsersRepositories: UsersRepositories, Doctorrepositories: Doctorrepositories) {

        this.UsersRepositories = UsersRepositories;
        this.DoctorRepositories = Doctorrepositories;

    }


    async index(request: any, reply: any) {


        try {

            const doctors = await this.DoctorRepositories.getAllDoctor();

            reply.status(200).send({
                message: "fetched successfully",
                doctors: doctors
            })

        } catch (error) {

            reply.status(500).send({
                message: "Something went wrong"
            })

        }





    }


    async create(request: any, reply: any) {

        const { body } = request;
        const {
            first_name,
            password
            , last_name
            , specialization
            , phone
            , email
            , sub_specialization
            , consultation_fee
            , medical_license_number
            , role_id,
        } = body;
        

        const hashPassword = await request.server.bcrypt.hash(password);
        const user = { role_id, name: first_name, email, 'password':hashPassword};
        const createdUser = await this.UsersRepositories.createHoshpitalUser(user);

        const doctor = {
            user_id: createdUser.id,
            first_name,
            last_name,
            specialization,
            phone,
            email,
            sub_specialization,
            consultation_fee,
            medical_license_number
        };


        const createdDoctor = this.DoctorRepositories.createDoctor(doctor);

        reply.status(201).send({
            message: "Doctor is created",
            createdDoctor: createdDoctor,
        });

    }


    async edit(request: any, reply: any) {

        const { id } = request.params;

        try {

            const doctor = await this.DoctorRepositories.getDoctor(id);
            reply.status(200).send({
                message: "Doctor fetched successfully",
                doctor: doctor
            });

        } catch (error) {

            reply.status(500).send({
                message: "Something Went Wrong",
            });

        }


    }

    async update(request: any, reply: any) {

        const { body } = request;
        const { id } = request.params;
        try {
            const doctor = await this.DoctorRepositories.updateDoctor(id, body);
            reply.status(200).send({
                message: "Doctor updated successfully",
                doctor: doctor
            })

        } catch (error) {
            reply.status(500).send({
                message: "Something Went wrong",
            })
        }




    }


    async delete(request: any, reply: any) {
        const { body } = request;
        const { id } = request.params;

        try {
            const doctor = await this.DoctorRepositories.deleteDoctor(id);

            reply.status(200).send({
                message: "Doctor deleted successfully",
                doctor: doctor
            })

        } catch (error) {

            reply.status(500).send({
                message: "Something Went wrong",
            })

        }

    }


}