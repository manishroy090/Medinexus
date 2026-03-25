import { type FastifyInstance } from "fastify";
import { request } from "https";
import { DepartmentsController } from "../../../controllers/Organization/Hoshpital/Departments.controller.js";


export async function DepartmentRoutes(fastify: FastifyInstance) {

    const controller = new DepartmentsController();

    fastify.get('/', controller.index.bind(controller));

    fastify.post('/create', controller.create.bind(controller));

    fastify.get('/edit/:id', controller.edit.bind(controller));

    fastify.put('/update/:id', controller.update.bind(controller));

    fastify.delete('/delete/:id', controller.delete.bind(controller));

}
