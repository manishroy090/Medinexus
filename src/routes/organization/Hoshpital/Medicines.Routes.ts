import { type FastifyInstance } from "fastify";
import { request } from "https";
import { MedicinesController } from "../../../controllers/Organization/Hoshpital/Medicines.controller";


export async function MedicinesRoutes(fastify: FastifyInstance) {

    const controller = new MedicinesController();

    fastify.get('/', controller.index.bind(controller))

    fastify.post('/create', controller.create.bind(controller));

    fastify.get('/edit/:id', controller.edit.bind(controller));

    fastify.put('/update/:id', controller.update.bind(controller));

    fastify.delete('/delete/:id', controller.delete.bind(controller));

}
