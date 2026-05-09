// import { Roles } from "../entities/Roles";
import { Organization } from "../db/models/Organization.js";
import { pool } from "../db/models/Model.js";


export class ModulesRepository {



    async getHoshpitalModule() {
           const query =`SELECT public.medinexus_modules.id,
                     public.medinexus_modules.title ,
                     public.medinexus_modules.description,
                     public.medinexus_modules.is_active,
                     public.medinexus_modules.created_at,
                     public.medinexus_modules.updated_at,
                     public.medinexus_modules.deleted_at
                     FROM public.medinexus_permissions
                     LEFT JOIN public.medinexus_modules ON public.medinexus_permissions.module_id=public.medinexus_modules.id
                     Where role_id=3
                     GROUP BY public.medinexus_modules.id, public.medinexus_modules.title`

          const {rows} =  await pool.query(query)

          return rows;

    }



}