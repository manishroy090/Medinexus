// import { Roles } from "../entities/Roles";
import { Country } from "../db/models/Country.js";
export class Countriesrepositories{


    public country:any ;


    constructor() {
        this.country = new Country();
    }



    async getAllCountry(){
        return this.country.all();
    }

    async createCountry(country:any){
        return this.country.create(country);
    }

    async getCountry(id:string){
      const result = await this.country.findById(id);
      return result[0];
    }
    
}
