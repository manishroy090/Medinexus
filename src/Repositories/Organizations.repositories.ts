// import { Roles } from "../entities/Roles";
import { Organization } from "../db/models/Organization.js";

export class OrganizationsRepository {


    public organization:any ;


    constructor() {
        this.organization = new Organization();
    }



    async createOrg(org:any){

       return await this.organization.create(org);

    }

    
}