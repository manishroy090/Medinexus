import { type FastifyInstance } from "fastify";
import { request } from "https";
import { RoleController } from "../../controllers/Auth/Role.controller.js";
import { RolesRepository } from "../../Repositories/Roles.repositories.js";
import { RoleSchema } from "../../validation/Roles-validation.js";


export async function RolesRoutes(fastify: FastifyInstance) {

     const rolesRepo:RolesRepository = new RolesRepository();

     const controller = new RoleController(rolesRepo);

    fastify.get('/', controller.index.bind(controller));

    fastify.post('/create',{schema:{body:RoleSchema}}, controller.create.bind(controller));


    fastify.get('/edit/:id', controller.edit.bind(controller));


    fastify.put('/update/:id',{schema:{body:RoleSchema}}, controller.update.bind(controller));

    fastify.delete('/delete/:id',controller.delete.bind(controller));

}
