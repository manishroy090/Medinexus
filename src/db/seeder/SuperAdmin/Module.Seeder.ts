
import { Module } from "../../models/Module.js";
import { modules } from "../../../data/superadmin/module.js";

export class ModuleSeeder  {





    async run(){

       const module = new Module();
       const data=  await module.create(modules);
       console.log('seeded',data);
       
    }


    async down(){




    }



}