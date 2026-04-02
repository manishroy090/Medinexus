// import { Roles } from "../entities/Roles";

import { User } from "../db/models/User.js";

export class UsersRepositories{


    public user:any ;


    constructor() {
        this.user = new User();
    }



    async getAllusers(){
        return this.user.all();
    }


    async createUser (user:any){
        
      const result =   await  this.user.create(user);
      return result;

    }

    
}