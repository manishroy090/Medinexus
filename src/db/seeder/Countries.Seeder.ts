
import { Country } from "../models/Country.js";
import { countries } from "../../data/countries.js";

export class CountrySeeder  {





    async run(){

       const country = new Country();
       const data=  await country.create(countries);
       console.log('seeded',data);
       




    }


    async down(){




    }



}