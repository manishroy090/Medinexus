import { type FastifyRequest, type FastifyReply } from "fastify";
import { UsersRepositories } from "../../../Repositories/org/hoshpital/Users.repositories.js";
import { Patientsrepositories } from "../../../Repositories/org/hoshpital/Patients.repositories.js";
export class PatientController {

    private UsersRepositories: UsersRepositories;
    private PatientRep:Patientsrepositories;

     constructor() {
    
            this.UsersRepositories = new UsersRepositories();
            this.PatientRep = new Patientsrepositories();
          
    
        }



    async index(request: FastifyRequest, reply: FastifyReply) {

    }


    async create(request: any, reply: any) {

        const {body} = request;

        const {
            firstname,
            lastname,
            phonenumber,
            email,
            primary_doctor,
            dob,
            gender,
            bloodgroup,
            status,
            address_one,
            address_two,
            country,
            state,
            city,
            pinecode} =body;

        const password =await request.server.bcrypt.hash(await this.generateRandomPassword());


        const userDetails = {role_id:9 ,firstname:firstname ,lastname:lastname, email:email ,password:password};
        const createdUser = await this.UsersRepositories.createHoshpitalUser(userDetails);
        const patient = {phone_number:phonenumber,primary_doctor:primary_doctor,date_of_birth:dob,gender:gender,bloodgroup:bloodgroup,address_1:address_one,address_2:address_two,country_id:country,state:state,city:city,pin_code:pinecode,user_id:createdUser.id}
        const patientCreated = await this.PatientRep.createPatient(patient);


        console.log("userDetails",userDetails);


    }


    async edit(request: FastifyRequest, reply: FastifyReply) {

    }
    async update(request: FastifyRequest, reply: FastifyReply) {

    }



    async delete(request: FastifyRequest, reply: FastifyReply) {

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