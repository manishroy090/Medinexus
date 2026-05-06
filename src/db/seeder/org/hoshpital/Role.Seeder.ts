
import { Role } from "../../../models/tenant/org/hoshpital/Role.model.js"
import { hospital_roles } from "../../../../data/org/hoshpital/roles.js";
export class RoleSeeder   {





    async run(){
        const role = new Role();
        const data = await role.create(hospital_roles);
        console.log('seeded',data);

    }


    async down(){




    }



}