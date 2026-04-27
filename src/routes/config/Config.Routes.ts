
import { type FastifyInstance } from "fastify";
import { request } from "https";
import { ConfigController } from "../../controllers/config/config.controller.js";
import { Countriesrepositories } from "../../Repositories/Countries.repositories.js";



export async function ConfigRoutes(fastify: FastifyInstance) {

    const countriesRep = new Countriesrepositories();
    const controller = new ConfigController(countriesRep);

    fastify.get('/', controller.getAllCountry.bind(controller));



}
