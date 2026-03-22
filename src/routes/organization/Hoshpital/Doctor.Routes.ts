import { type FastifyInstance } from "fastify";
import { request } from "https";
import { DoctorsController } from "../../../controllers/Organization/Hoshpital/Doctors.controller";


export async function DoctorRoutes(fastify: FastifyInstance) {

    const controller = new DoctorsController();

    fastify.get('/', controller.index.bind(controller))

    fastify.post('/create', controller.create.bind(controller));

    fastify.get('/edit/:id', controller.edit.bind(controller));

    fastify.put('/update/:id', controller.update.bind(controller));

    fastify.delete('/delete/:id', controller.delete.bind(controller));

}
