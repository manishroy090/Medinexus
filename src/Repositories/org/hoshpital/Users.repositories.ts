// import { Roles } from "../entities/Roles";
import {User} from "../../../db/models/tenant/org/hoshpital/User.js";
export class UsersRepositories{


    public user:any ;


    constructor() {
        this.user = new User();
    }



    async getHoshpitalUsers(){
        return this.user.all();
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
    
}
