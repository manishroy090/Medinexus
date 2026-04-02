import {type  FastifyRequest, type FastifyReply } from "fastify";
import { HOSHPITAL } from "../../Constants/App.js";

import { UsersRepositories } from "../../Repositories/Users.repositories.js";
import { OrganizationsRepository } from "../../Repositories/Organizations.repositories.js";
import { Hoshpitalsrepositories } from "../../Repositories/Hoshpitals.repositories.js";

export class AuthController {

     private  UsersRepositories:UsersRepositories ;
     private OrganizationsRepository:OrganizationsRepository;
     public Hoshpitalsrepositories:Hoshpitalsrepositories;


    constructor (UsersRepositories:UsersRepositories ,OrganizationsRepository:OrganizationsRepository , Hoshpitalsrepositories:Hoshpitalsrepositories){
        this.UsersRepositories =  UsersRepositories;
        this.OrganizationsRepository = OrganizationsRepository;
        this.Hoshpitalsrepositories =  Hoshpitalsrepositories;

    }

    async signup (request:any , reply:any){
        
        const  {body} = request;

        const {email,name ,password} = body;
          const  user = {email,name ,password};
          const  {id} = await this.UsersRepositories.createUser(user);

          const {registration_number,emergency_contact,tax_id,website,address_line1,address_line2,city,state,country_id,postal_code,logo ,description,continent,established_date,total_beds}  = body
          const org =  {
            name:name,
            user_id:id,
            org_type:body.org_type,
            registration_number,
            emergency_contact,
            tax_id,
            website,
            address_line1:address_line1 || '',
            address_line2,
            city,
            state,
            country_id,
            postal_code,
            logo,
            description,
            continent,
            established_date
        }


        const createdOrg = await this.OrganizationsRepository.createOrg(org);

        if(body?.org_type.toLowerCase()==HOSHPITAL.toLowerCase()){
            const {id:org_id}  = createdOrg ;
            const hoshpital = {org_id,total_beds};
            const createdHoshpital =   this.Hoshpitalsrepositories.createHoshpital(hoshpital);
        }
    }


    async login(request:FastifyRequest, reply:FastifyReply){
        
    }




}