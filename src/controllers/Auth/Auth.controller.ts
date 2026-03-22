import {type  FastifyRequest, type FastifyReply } from "fastify";

export class AuthController {

    async signup (request:FastifyRequest , reply:FastifyReply){

        reply.send('all okey')

    }


    async login(request:FastifyRequest, reply:FastifyReply){
        
    }




}