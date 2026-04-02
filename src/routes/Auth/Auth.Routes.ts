import {type FastifyInstance } from "fastify";
import { AuthController } from "../../controllers/Auth/Auth.controller.js";
import { request } from "https";
import {OrganizationsRepository} from "../../Repositories/Organizations.repositories.js";
import { Hoshpitalsrepositories } from "../../Repositories/Hoshpitals.repositories.js";
import { UsersRepositories } from "../../Repositories/Users.repositories.js";


export async function AuthRoutes(fastify: FastifyInstance){

  
  const OrganizationsRep:OrganizationsRepository = new OrganizationsRepository();
  const HoshpitalRep:Hoshpitalsrepositories = new Hoshpitalsrepositories();
  const UsersRep:UsersRepositories = new UsersRepositories();

  const controller  = new AuthController(UsersRep,OrganizationsRep,HoshpitalRep);


  fastify.post('/signup', controller.signup.bind(controller))
  fastify.post('/login',controller.login.bind(controller));

}