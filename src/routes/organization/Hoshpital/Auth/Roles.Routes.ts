import { type FastifyInstance } from "fastify";
import { request } from "https";
import { RoleController } from "../../../../controllers/Organization/Hoshpital/Auth/Role.controller.js";
import { RolesRepository } from "../../../../Repositories/org/hoshpital/Roles.repositories.js";
import { RoleSchema } from "../../../../validation/Roles-validation.js";
import { RequiredPermission } from "../../../../middleware/RequiredPermission.middleware.js";
import { Authentication } from "../../../../middleware/Authentication.middleware.js";



export async function RolesRoutes(fastify: FastifyInstance) {

     const rolesRepo: RolesRepository = new RolesRepository();

     const controller = new RoleController(rolesRepo);

     fastify.get('/',{preHandler:[Authentication,RequiredPermission("roles.index")]}, controller.index.bind(controller));

     fastify.post('/create', { schema: { body: RoleSchema },preHandler:[Authentication,RequiredPermission("roles.create")] }, controller.create.bind(controller));


     fastify.get('/edit/:id',{preHandler:[Authentication,RequiredPermission("roles.edit")] }, controller.edit.bind(controller));


     fastify.put('/update/:id', { schema: { body: RoleSchema } ,preHandler:[Authentication,RequiredPermission("roles.update")] }, controller.update.bind(controller));

     fastify.delete('/delete/:id',{preHandler:[Authentication,RequiredPermission("roles.delete")] }, controller.delete.bind(controller));

}
