import { type FastifyRequest, type FastifyReply } from "fastify";
import { send } from "node:process";
import { RolesRepository } from "../../Repositories/Roles.repositories";

export class RoleController {


    private  RolesRepository:RolesRepository;

    constructor(RolesRepository:RolesRepository){
        this.RolesRepository = RolesRepository;
    }


    async index(request: FastifyRequest, reply: FastifyReply) {


        // console.log('request' , request);

        // this.RolesRepository.createRoles(request);

        try {
            reply.send({ 'names': 'Roles' });
        } catch (error) {
            

        }


    }


    async create(request: FastifyRequest, reply: FastifyReply) {
        const {body} = request;
        this.RolesRepository.createRole(body);
        console.log('request' , body);


    }


    async edit(request: FastifyRequest, reply: FastifyReply) {
        // const {id} = request.params;
        this.RolesRepository.getRole('1');
        // console.log('request',request);
       
    }


    async update(request: FastifyRequest, reply: FastifyReply) {
        const {body} = request;
        this.RolesRepository.updateRole('2',body);

    }



    async delete(request: FastifyRequest, reply: FastifyReply) {
        this.RolesRepository.deleteRole('1');

    }


   


}