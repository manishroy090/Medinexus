import { type FastifyRequest, type FastifyReply } from "fastify";
import { send } from "node:process";

export class RoleController {


    async index(request: FastifyRequest, reply: FastifyReply) {


        console.log('request' , request);
        try {
            reply.send({ 'names': 'Roles' });
        } catch (error) {
            

        }


    }


    async create(request: FastifyRequest, reply: FastifyReply) {


    }


    async edit(request: FastifyRequest, reply: FastifyReply) {

    }


    async update(request: FastifyRequest, reply: FastifyReply) {

    }



    async delete(request: FastifyRequest, reply: FastifyReply) {

    }


}