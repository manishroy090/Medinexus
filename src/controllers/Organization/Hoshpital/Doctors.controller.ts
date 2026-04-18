import { type FastifyRequest, type FastifyReply } from "fastify";
import { isatty } from "node:tty";

export class DoctorsController {


    async index(request: FastifyRequest, reply: FastifyReply) {

    }


    async create(request:any, reply: any) {

        const {body} =request;

        const {
                first_name,
                password 
               ,last_name
               ,specialization
               ,phone
               ,email
               ,sub_specialization
               ,consultation_fee
               ,medical_license_number
               ,year_of_exp
               ,education
               ,role_id,
            } = body;

        const user = {role_id,first_name,email,password};

        //insert user here 



        const doctor = {user_id:' ',first_name ,last_name, specialization,phone,email,sub_specialization,consultation_fee,medical_license_number,year_of_exp,education,previous_work_history};

        //insert doctor here 

        console.log('request',body);


    }


    async edit(request: FastifyRequest, reply: FastifyReply) {

    }

    async update(request: FastifyRequest, reply: FastifyReply) {

    }


    async delete(request: FastifyRequest, reply: FastifyReply) {

    }


}