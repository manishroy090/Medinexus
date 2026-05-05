
import { Permission as PermissionModel } from "../../models/Permission.js";
import { Permissions as permissionData } from "../../../data/superadmin/permission.js";
import { Permissions as hoshpitalPermision} from "../../../data/org/hoshpital/permissions.js";


export class PermissionSeeder{

    async run(){
       const permissions = new PermissionModel();

       hoshpitalPermision.map((item)=>{
          permissionData.push(item);
       })

       const data=  await permissions.create(permissionData);
       console.log('seeded',data);
    }


    async down(){




    }



}