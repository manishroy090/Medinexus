// import { Roles } from "../entities/Roles";
import { Hoshpital } from "../db/models/Hoshpital.js";

export class Hoshpitalsrepositories{


    public hoshpital:any ;


    constructor() {
        this.hoshpital = new Hoshpital();
    }



    async getAllhoshpitals(){
        return this.hoshpital.all();
    }

    async createHoshpital(hoshpital:any){
        return this.hoshpital.create(hoshpital);
    }
    
}