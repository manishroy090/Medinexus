import { type FastifyInstance } from "fastify";
import { request } from "https";

import { ConfigController } from "../../../controllers/Organization/Hoshpital/Config.controller.js";
import { Authentication } from "../../../middleware/Authentication.middleware.js";


export async function ConfigRoutes(fastify: FastifyInstance) {

    const controller =  new ConfigController();

    fastify.get('/getallcountries',{preHandler:[Authentication]},controller.getAllCountry.bind(controller));
    fastify.get('/getalldepartments',{preHandler:[Authentication]}, controller.getAllHoshpitalDepartment.bind(controller));
    fastify.get('/getallbloodgroup',{preHandler:[Authentication]}, controller.getAllBloodGroup.bind(controller));





}
