// import { Roles } from "../entities/Roles";
import { Module } from "../db/models/Module.js";
import { pool } from "../db/models/Model.js";

export class SubmodulesRepository {

   
    async getHospitalSubmodule(){
        const query = `SELECT public.medinexus_submodules.id,
                       public.medinexus_submodules.module_id,
                       public.medinexus_submodules.title,
                       public.medinexus_submodules.description,
                       public.medinexus_submodules.is_active,
                       public.medinexus_submodules.created_at,
                       public.medinexus_submodules.updated_at,
                       public.medinexus_submodules.deleted_at
                       FROM public.medinexus_permissions
                       LEFT JOIN public.medinexus_submodules 
                       ON public.medinexus_permissions.sub_module_id=public.medinexus_submodules.id
                       Where role_id=3
                       GROUP BY public.medinexus_submodules.id, 
                       public.medinexus_submodules.title`

        const {rows} = await pool.query(query);

        return rows;
        
    }
    
}