import { type FastifyInstance } from "fastify";
import { request } from "https";
import { RolesRoutes } from "../organization/Hoshpital/Auth/Roles.Routes.js";
import { AuthRoutes } from "./Hoshpital/Auth/Auth.Routes.js";




export async function HoshpitalRoutes(fastify: FastifyInstance) {
      fastify.register(RolesRoutes, { prefix: '/roles' });
      fastify.register(AuthRoutes, { prefix: '/auth' });

      // fastify.register(PermissionRoutes, { prefix: '/permissions' });


}
