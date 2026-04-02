import { type FastifyRequest, type FastifyReply } from "fastify";
import { send } from "node:process";
import { RolesRepository } from "../../Repositories/Roles.repositories";

export class RoleController {


    private  RolesRepository:RolesRepository;

    constructor(RolesRepository:RolesRepository){
        this.RolesRepository = RolesRepository;
    }


    async index(request: FastifyRequest, reply: FastifyReply) {

        try {

            const roles = await this.RolesRepository.getAllRoles();
            reply.status(200).send({'roles':roles});

        } catch (error) {
           
            reply.status(500).send({'server_error':error})
        }
    }


    async create(request: FastifyRequest, reply: FastifyReply) {

        const {body} = request;
        try {
           const role =  await this.RolesRepository.createRole(body);
           reply.status(200).send({role,'message':'Roles created successfully'});
            
        } catch (error) {
          
            reply.status(500).send({'server_error':error});

        }
       
    }


    async edit(request:any, reply:any) {

         const {id} = request.params;

         try {

            const role = await this.RolesRepository.getRole(id);
            reply.status(200).send({role,'message':"Role fetched successfully"});
             
         } catch (error) {

             reply.status(500).send({'server_error':error});

         }


        // console.log('request',request);
       
    }


    async update(request:any, reply:any) {
        const {body} = request;
        const {id} = request.params;

        try {
            const role =  await this.RolesRepository.updateRole(id,body);
            
            reply.status(200).send({role,'message':"Role updated successfully"});

        } catch (error) {
        
            reply.status(500).send({'server_error':error});

        }

    }



    async delete(request:any, reply:any) {
        const {id} = request.params;


        try {
          const role =  await this.RolesRepository.deleteRole(id);
          reply.status(200).send({role,'message':"Role deleted successfully"});

        } catch (error) {

          reply.status(500).send({'server_error':error});
    
        }

    }


   


}