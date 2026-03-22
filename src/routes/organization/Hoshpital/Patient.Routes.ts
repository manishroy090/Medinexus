import { type FastifyInstance } from "fastify";
import { request } from "https";

import { PatientController } from "../../../controllers/Organization/Hoshpital/Patient.controller";


export async function PatientRoutes(fastify: FastifyInstance) {

    const controller = new PatientController();

    fastify.get('/', controller.index.bind(controller))

    fastify.post('/create',controller.create.bind(controller));

    fastify.get('/edit/:id', controller.edit.bind(controller));

    fastify.put('/update/:id', controller.update.bind(controller));

    fastify.delete('/delete/:id', controller.delete.bind(controller));

}
