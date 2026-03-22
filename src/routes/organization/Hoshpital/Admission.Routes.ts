import { type FastifyInstance } from "fastify";
import { request } from "https";

import { AdmissionController } from "../../../controllers/Organization/Hoshpital/Admission.controller";


export async function AdmissionRoutes(fastify: FastifyInstance) {

    const controller = new AdmissionController();

    fastify.get('/', controller.index.bind(controller));

    fastify.post('/create', controller.create.bind(controller));


    fastify.get('/edit/:id', controller.edit.bind(controller));


    fastify.put('/update/:id', controller.update.bind(controller));

    fastify.delete('/delete/:id', controller.delete.bind(controller));

}
