// import { Roles } from "../entities/Roles";
import {User} from "../../../db/models/tenant/org/hoshpital/User.js";
export class UsersRepositories{


    public user:any ;


    constructor() {
        this.user = new User();
    }



    async getHoshpitalUsers(){

         return await this.user.all();
    }

    async createHoshpitalUser(country:any){
        return await this.user.create(country);
    }

    async getHoshpitalUser(id:string){
      const result = await this.user.findById(id);
      return result[0];
    }

     async getUserByEmail(email: any) {

         const resutl = await this.user.findUserByEmail(email);
         return resutl[0];
    }

    async getTenantUser(){
      const query =  `SELECT silveroakhospital.medinexus_users.name,
        silveroakhospital.medinexus_roles.title,
        silveroakhospital.medinexus_users.email ,
        silveroakhospital.medinexus_users.is_active,
        silveroakhospital.medinexus_users.email_verified_at
        FROM silveroakhospital.medinexus_users
        LEFT JOIN silveroakhospital.medinexus_roles
        ON silveroakhospital.medinexus_users.role_id = silveroakhospital.medinexus_roles.id`

        const {rows} = await this.user.pool.query(query);

        return rows;
    }
    
}
