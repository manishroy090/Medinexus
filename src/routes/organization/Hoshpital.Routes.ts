import { type FastifyInstance } from "fastify";
import { request } from "https";
import { RolesRoutes } from "../organization/Hoshpital/Auth/Roles.Routes.js";
import { AuthRoutes } from "./Hoshpital/Auth/Auth.Routes.js";
import { PermissionRoutes } from "./Hoshpital/Auth/Permission.Routes.js";
import { DoctorRoutes } from "./Hoshpital/Doctor.Routes.js";
import { ConfigRoutes } from "../organization/Hoshpital/Config.Routes.js";





export async function HoshpitalRoutes(fastify: FastifyInstance) {
      fastify.register(RolesRoutes, { prefix: '/roles' });
      fastify.register(AuthRoutes, { prefix: '/auth' });
      fastify.register(PermissionRoutes, { prefix: '/permission' });
      fastify.register(DoctorRoutes,{prefix:'/doctors'})
      fastify.register(ConfigRoutes,{prefix:'/config'})

}
