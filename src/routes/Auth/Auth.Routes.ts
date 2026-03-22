import {type FastifyInstance } from "fastify";
import { AuthController } from "../../controllers/Auth/Auth.controller";
import { request } from "https";


export async function AuthRoutes(fastify: FastifyInstance){

  const controller  = new AuthController();
  fastify.post('/signup', controller.signup.bind(controller))
  fastify.post('/login',controller.login.bind(controller));

}