import { roles } from "../data/superadmin/role.js";

export async function Authorization(req:any , reply:any){


  const {user} = req;


  if(!user){
    return reply.code(401).send({error:'Unauthorized'})
  }


  const rolesData = roles.map((item)=>item.title);

  if(!rolesData.includes('Hoshpital')){

       return reply.code(403).send({
          error:'Forbidden',
          message:`Required role : ${roles.join(' or')}`
       })

  }

}