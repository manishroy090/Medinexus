import fastify, { type FastifyRequest, type FastifyReply } from "fastify";

import fastifyBcrypt from 'fastify-bcrypt';
import { UsersRepositories } from "../../../../Repositories/org/hoshpital/Users.repositories.js";



export class AuthController {

  private UsersRepositories: UsersRepositories;



  constructor(
    UsersRepositories: UsersRepositories,


  ) {

    this.UsersRepositories = UsersRepositories;



  }

  async signup(request: any, reply: any) {

    


  }


  async login(request: any, reply: any) {

   
  }



  async lang(request: any, reply: any) {



    // reply.status(200).send({ 'msg': request.multilingual.translate('hello') });

  }



}