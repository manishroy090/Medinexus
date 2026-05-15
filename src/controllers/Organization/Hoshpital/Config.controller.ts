import { type FastifyRequest, type FastifyReply } from "fastify";
import { send } from "node:process";
import { Countriesrepositories } from "../../../Repositories/org/hoshpital/Countries.repositories.js";
import { Departmentrepositories } from "../../../Repositories/org/hoshpital/Department.repositories.js";
import { Bloodgrouprepositories } from "../../../Repositories/org/hoshpital/Bloodgroup.repositories.js";

export class ConfigController {


    private  Countriesrepositories:Countriesrepositories;
    private departmentrepositories:Departmentrepositories;
    private bloodGrouprepositories:Bloodgrouprepositories

    constructor(){
        this.Countriesrepositories = new Countriesrepositories();
        this.departmentrepositories = new Departmentrepositories();
        this.bloodGrouprepositories = new Bloodgrouprepositories();
    }


    async getAllCountry(request:any , reply:any) {

        try {
            const Countries = await this.Countriesrepositories.getAllCountry();
            reply.status(200).send({'message':"country fetched successfully","countries":Countries}) 
            
        } catch (error) {

          reply.status(500).send({'message':"Something went wrong","error":error}) 
        }
    }


    async getAllHoshpitalDepartment(request:any , reply:any){
        try {
            
            const departments =  await this.departmentrepositories.getAllDepartment();
            reply.status(200).send({"departments":departments})

        } catch (error) {

            console.log("error",error);
            
        }

    }


    async getAllBloodGroup(request:any , reply:any){

        try {

            const bloodgroups = await this.bloodGrouprepositories.getAllBloodGroup();
            reply.status(200).send({"bloodgroups":bloodgroups});
            
        } catch (error) {

            console.log("error",error);
            
        }

    }


}