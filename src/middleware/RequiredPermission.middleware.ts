import fastify from "fastify";
import { doctors } from "../data/org/hoshpital/doctors";
import { Permissions } from "../data/superadmin/permission.js";

export async function RequiredPermission(req: any, reply: any) {

      const {user} = req;


      if(!user){

        return reply.code(401).send({error:"Unauthorized"})

      }


      //get role id according to userRole;


     const hoshpitalPermissions = Permissions.filter((item)=>item.role_id=='2');
     const permissionsArray = hoshpitalPermissions.map((item)=>item.title);

     if(!permissionsArray.includes('permissionsArray')){
        return reply.code(403).send({
           'error':"Forbidden",
           'message':`Required permission :${permissionsArray}`
        })
     }

}