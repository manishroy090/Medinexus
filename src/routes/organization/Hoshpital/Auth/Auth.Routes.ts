import {type FastifyInstance } from "fastify";
import { AuthController } from "../../../../controllers/Organization/Hoshpital/Auth/Auth.controller.js";
import { request } from "https";
import { UsersRepositories } from "../../../../Repositories/org/hoshpital/Users.repositories.js";
import { Authentication } from "../../../../middleware/Authentication.middleware.js";
import { RequiredPermission } from "../../../../middleware/RequiredPermission.middleware.js";




export async function AuthRoutes(fastify: FastifyInstance){

  
 
  const UsersRep:UsersRepositories = new UsersRepositories();


  const controller  = new AuthController(UsersRep);


  fastify.post('/signup',{preHandler:[Authentication,RequiredPermission("user.create")]},controller.signup.bind(controller))

}