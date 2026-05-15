import { type FastifyRequest, type FastifyReply } from "fastify";
import { isatty } from "node:tty";
import { UsersRepositories } from "../../../Repositories/org/hoshpital/Users.repositories.js";
import { Doctorrepositories } from "../../../Repositories/org/hoshpital/Doctor.repositories.js";
import { DoctorSessionrepositories } from "../../../Repositories/org/hoshpital/DoctorSession.repositories.js";
import { DoctorEductionCertification } from "../../../Repositories/org/hoshpital/DoctorEductionCertification.repositories.js";
import { Awardrepositories } from "../../../Repositories/org/hoshpital/Award.repositories.js";
import { Certificationrepositories } from "../../../Repositories/org/hoshpital/Certification.repositories.js";

import Config from '../../../Constants/Config.js';

export class DoctorsController {

    private UsersRepositories: UsersRepositories;
    private DoctorRepositories: Doctorrepositories;
    private DoctorSessionRep:DoctorSessionrepositories;
    private doctorEducationCertificatinRep:DoctorEductionCertification;
    private awardrepositories:Awardrepositories;
    private certificationrepositories:Certificationrepositories;



    constructor(UsersRepositories: UsersRepositories, Doctorrepositories: Doctorrepositories) {

        this.UsersRepositories = UsersRepositories;
        this.DoctorRepositories = Doctorrepositories;
        this.DoctorSessionRep = new DoctorSessionrepositories();
        this.doctorEducationCertificatinRep = new DoctorEductionCertification();
        this.awardrepositories = new Awardrepositories();
        this.certificationrepositories = new Certificationrepositories();

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
            sessions,
            educations,
            awards,
            certifications,
            firstname,
            lastname
        } = body;



       



        try {
             const userDetails = {
            role_id: 2,
            "email": email,
            password:await request.server.bcrypt.hash(await this.generateRandomPassword()),
            "firstname":firstname,
            "lastname":lastname
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
                "address":address,
                "address_2":address_2,
                "country_id":country_id,
                "city":city,
                "state":state,
                "pin_code":pin_code,
            }


           const createdDoctor = await this.DoctorRepositories.createDoctor(doctor);
           const doctorSession = sessions.map((session: any) => ({doctor_id:createdDoctor?.id,no_patient: session.patients,start_time: session.start_time,end_time: session.end_time,day_name: session.day}));
           const doctortSesseion = await this.DoctorSessionRep.createDoctorSession(doctorSession);
           const doctorEductaion = educations.map((eduation:any)=>({medical_degree:eduation.degree,doctor_id:createdDoctor.id,university_collage_name:eduation.university,from_year:eduation.from ,end_year:eduation.to}));
           const doctorEducations = await this.doctorEducationCertificatinRep.createDoctorEducationCertification(doctorEductaion);
           const doctorAwards = awards.map((item:any)=>({"title":item?.name,"doctor_id":createdDoctor?.id,"award_from":item?.from}));
           await this.awardrepositories.createAward(doctorAwards);
           const doctorCertification = certifications.map((item:any)=>({"title":item.name, doctor_id:createdDoctor.id,certification_from:createdDoctor.from}));
           this.certificationrepositories.createCertification(doctorCertification);
           reply.status(201).send({"message":"Doctor Onboarded successfully",doctordetails:body})

        } catch (error) {

           reply.status(500).send({"message":"Something went wrong"})

        }

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