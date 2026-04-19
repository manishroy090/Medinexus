import { type FastifyInstance } from "fastify";
import { request } from "https";
import { DoctorsController } from "../../../controllers/Organization/Hoshpital/Doctors.controller.js";
import { Doctorrepositories } from "../../../Repositories/org/hoshpital/Doctor.repositories.js";
import {UsersRepositories} from "../../../Repositories/org/hoshpital/Users.repositories.js";
import { User } from "../../../db/models/User.js";


export async function DoctorRoutes(fastify: FastifyInstance) {

    const docRep = new Doctorrepositories();
    const userRep = new UsersRepositories();

    const controller = new DoctorsController(userRep,docRep);

    fastify.get('/', controller.index.bind(controller))

    fastify.post('/create', controller.create.bind(controller));

    fastify.get('/edit/:id', controller.edit.bind(controller));

    fastify.put('/update/:id', controller.update.bind(controller));

    fastify.delete('/delete/:id', controller.delete.bind(controller));

}
