import fastify from "fastify";
import { doctors } from "../data/org/hoshpital/doctors";
import { RolesRepository } from "../Repositories/Roles.repositories.js";
import { PemissionRepository } from "../Repositories/Permissions.repositories.js";
export async function RequiredPermission(req: any, reply: any) {

      const {user} = req;

      console.log("user",user);


      const roleRepo = new RolesRepository();
      const permissionRep = new PemissionRepository();

      const userRole = await roleRepo.getRoleByName("Hoshpital");


      if(!user){

        return reply.code(401).send({error:"Unauthorized"})

      }


      const permissions = await permissionRep.getPermissionRoleWise(userRole.id);

      console.log("permissions", permissions);

      //get role id according to userRole;



   //   const hoshpitalPermissions = permissions.filter((item:any)=>item.role_id==rep.id);


   //   const permissionsArray = hoshpitalPermissions.map((item:any)=>item.title);



   //   if(!permissionsArray.includes('permissionsArray')){
   //      return reply.code(403).send({
   //         'error':"Forbidden",
   //         'message':`Required permission :${permissionsArray}`
   //      })
   //   }

}