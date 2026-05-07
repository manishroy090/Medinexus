import { type FastifyInstance } from "fastify";
import { request } from "https";
import { PermissionController } from "../../../../controllers/Organization/Hoshpital/Auth/Permission.controller.js";
import { PemissionRepository } from "../../../../Repositories/org/hoshpital/Permissions.repositories.js";
import { RequiredPermission } from "../../../../middleware/RequiredPermission.middleware.js";
import { Authentication } from "../../../../middleware/Authentication.middleware.js";



export async function PermissionRoutes(fastify: FastifyInstance) {

    const permissionRepo:PemissionRepository = new PemissionRepository();
    const controller = new PermissionController(permissionRepo);

    fastify.get('/',{preHandler:[Authentication,RequiredPermission("permission.index")] }, controller.index.bind(controller))

    fastify.post('/create',{preHandler:[Authentication,RequiredPermission("permission.create")] }, controller.create.bind(controller));


    fastify.get('/edit/:id',{preHandler:[Authentication,RequiredPermission("permission.edit")] }, controller.edit.bind(controller));

    fastify.put('/update/:id',{preHandler:[Authentication,RequiredPermission("permission.update")] }, controller.update.bind(controller));

    fastify.delete('/delete/:id',{preHandler:[Authentication,RequiredPermission("permission.delete")] }, controller.delete.bind(controller))

}
