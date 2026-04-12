import {type FastifyInstance } from "fastify";
import { AuthController } from "../../controllers/Auth/Auth.controller.js";
import { request } from "https";
import {OrganizationsRepository} from "../../Repositories/Organizations.repositories.js";
import { Hoshpitalsrepositories } from "../../Repositories/Hoshpitals.repositories.js";
import { UsersRepositories } from "../../Repositories/Users.repositories.js";
import { TenantRepository } from "../../Repositories/Tenants.repositories.js";
import { SchemaRepository } from "../../Repositories/Schemas.repositories.js";
import { Authentication } from "../../middleware/Authentication.middleware.js";

export async function AuthRoutes(fastify: FastifyInstance){

  
  const OrganizationsRep:OrganizationsRepository = new OrganizationsRepository();
  const HoshpitalRep:Hoshpitalsrepositories = new Hoshpitalsrepositories();
  const UsersRep:UsersRepositories = new UsersRepositories();
  const TenantRep:TenantRepository = new TenantRepository();
  const SchemaRep:SchemaRepository = new SchemaRepository();

  const controller  = new AuthController(
    UsersRep
    ,OrganizationsRep
    ,HoshpitalRep
    ,TenantRep
    ,SchemaRep
  );


  fastify.post('/signup', controller.signup.bind(controller))
  fastify.post('/login',controller.login.bind(controller));

  fastify.post('/lang',{preHandler:[Authentication]},controller.lang.bind(controller));
  

}