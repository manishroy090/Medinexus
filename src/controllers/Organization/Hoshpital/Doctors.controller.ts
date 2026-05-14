import { type FastifyRequest, type FastifyReply } from "fastify";
import { isatty } from "node:tty";
import { UsersRepositories } from "../../../Repositories/org/hoshpital/Users.repositories.js";
import { Doctorrepositories } from "../../../Repositories/org/hoshpital/Doctor.repositories.js";
import Config from '../../../Constants/Config.js';

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
            user_id,
            phonenumber,
            email,
            dob,
            year_of_experience,
            department_id,
            designation,
            medical_licese_number,
            language_spoken,
            blood_group,
            gender,
            bio,
            feature_on_website,
            address,
            address_2,
            country_id,
            city,
            state,
            pin_code,
            is_active,
            firstname,
            lastname
        } = body;



       



        try {
             const userDetails = {
            role_id: 2,
            "email": email,
            name: "",
            password:await request.server.bcrypt.hash(await this.generateRandomPassword()),
            // "firstname":firstname,
            // "lastname":lastname
            }

            const createdUser = await this.UsersRepositories.createHoshpitalUser(userDetails);

            const doctor= {
                "user_id":createdUser?.id,
                "phone_number":phonenumber,
                "email":email,
                "dob":dob,
                "year_of_exp":year_of_experience,
                "department_id":department_id,
                "designation":designation,
                "medical_license_number":medical_licese_number,
                "language_spoken":language_spoken,
                "blood_group":blood_group,
                "gender":gender,
                "bio":bio,
                "feature_on_website":'null',
                "address":'null',
                "address_2":'null',
                "country_id":1,
                "city":'null',
                "state":'null',
                "pin_code":'null',
            }


         






             const createdDoctor = this.DoctorRepositories.createDoctor(doctor);

             console.log("createdDoctor",createdDoctor)



        } catch (error) {

            console.log("error", error);

        }

      


   

        // const doctor = {
        //     user_id: createdUser.id,
        //     first_name,
        //     last_name,
        //     specialization,
        //     phone,
        //     email,
        //     sub_specialization,
        //     consultation_fee,
        //     medical_license_number
        // };



        // reply.status(201).send({
        //     message: "Doctor is created",
        //     createdDoctor: createdDoctor,
        // });

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


    async generateRandomPassword(length = 12) {
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

        let password = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }

        return password;
    }


}