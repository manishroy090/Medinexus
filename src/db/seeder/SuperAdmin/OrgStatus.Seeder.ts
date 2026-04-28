
import { OrgStatus } from "../../models/OrgStatus.js";
import { ORG_STATUSES } from "../../../data/superadmin/OrgStatus.js";

export class OrgStatusSeeder  {





    async run(){

       const orgStatus = new OrgStatus();
       const data=  await orgStatus.create(ORG_STATUSES);
       console.log('seeded',data);
       
    }


    async down(){




    }



}