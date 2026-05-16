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
      const query =  `SELECT medinexus_users.firstname,
        medinexus_users.lastname,
        medinexus_roles.title,
        medinexus_users.email ,
        medinexus_users.is_active,
        medinexus_users.email_verified_at
        FROM medinexus_users
        LEFT JOIN medinexus_roles
        ON medinexus_users.role_id = medinexus_roles.id`

        const {rows} = await this.user.pool.query(query);

        return rows;
    }
    
}
