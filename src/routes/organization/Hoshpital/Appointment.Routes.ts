import { type FastifyInstance } from "fastify";
import { request } from "https";
import { AppointmentController } from "../../../controllers/Organization/Hoshpital/Appointment.controller";


export async function AppointmentRoutes(fastify: FastifyInstance) {


    const controller = new AppointmentController();

    fastify.get('/', controller.index.bind(controller))

    fastify.post('/create', controller.create.bind(controller));

    fastify.get('/edit/:id', controller.edit.bind(controller));

    fastify.put('/update/:id', controller.update.bind(controller));

    fastify.delete('/delete/:id', controller.delete.bind(controller));

}
