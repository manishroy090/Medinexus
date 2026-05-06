
import { Role } from "../../models/Role.model.js";
import { superadmin_roles } from "../../../data/superadmin/role.js";
export class RoleSeeder   {





    async run(){
        const role = new Role();
        const data = await role.create(superadmin_roles);
        console.log('seeded',data);

    }


    async down(){




    }



}