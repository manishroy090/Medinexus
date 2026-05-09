
import { Submodule } from "../../models/Submodule.js";
import { submodules as  submodulesData} from "../../../data/superadmin/submodules.js";

export class SubModuleSeeder  {





    async run(){

       const submodules = new Submodule();
       const data=  await submodules.create(submodulesData);
       console.log('submodules',data);
       
    }


    async down(){




    }



}