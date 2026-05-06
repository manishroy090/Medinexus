import fastify from "fastify";
import { doctors } from "../data/org/hoshpital/doctors";
import { RolesRepository } from "../Repositories/Roles.repositories.js";
import { PemissionRepository } from "../Repositories/Permissions.repositories.js";
export const RequiredPermission = (permission: String) => {

  return async (req: any, reply: any) => {

    const { user } = req;
    if (!user) {

      return reply.code(401).send({ error: "Unauthorized" })

    }

    const permissionRep = new PemissionRepository();

    const UsersPermissions = await permissionRep.getAuthUserPermission(user.email);

    
    const PermissionArray = UsersPermissions.map((item) => item.title);
   
    console.log("PermissionArray",PermissionArray);

    console.log("permission",permission)

    if (!PermissionArray.includes(permission)) {

      return reply.code(403).send({
        'error': "Forbidden",
        'message': `Required permission :${permission}`
      })

    }

  }

}