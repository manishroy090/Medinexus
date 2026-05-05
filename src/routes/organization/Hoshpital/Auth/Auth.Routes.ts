import {type FastifyInstance } from "fastify";
import { AuthController } from "../../../../controllers/Organization/Hoshpital/Auth/Auth.controller.js";
import { request } from "https";

import { UsersRepositories } from "../../../../Repositories/org/hoshpital/Users.repositories";

import { LoginSchema } from "../../../../validation/Hoshpital_validation/Login-validation.js";




export async function AuthRoutes(fastify: FastifyInstance){

  
 
  const UsersRep:UsersRepositories = new UsersRepositories();


  const controller  = new AuthController(UsersRep);


  fastify.post('/signup',controller.signup.bind(controller))
  fastify.post('/login',{schema:{body:LoginSchema}},controller.login.bind(controller));

  fastify.post('/lang',controller.lang.bind(controller));
  

}