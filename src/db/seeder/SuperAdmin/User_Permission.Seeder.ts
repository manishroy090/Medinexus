
import { Permission as PermissionModel } from "../../models/Permission.js";
import { User_permission } from "../../../data/superadmin/User_permission.js";
import { Users_Permission } from "../../models/Users_Permission.js";

export class User_Permission{

    async run(){
       const permissions = new Users_Permission();
       const data=  await permissions.create(User_permission);
       console.log('seeded',data);
    }


    async down(){




    }



}