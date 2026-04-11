import { CountrySeeder } from "./Countries.Seeder.js";
import { HoshpitalSeeder } from "./Hoshpital.Seeder.js";


export class Seeder {


    private readonly SeedersName: any = [
        'CountrySeeder'
        , 'HoshpitalSeeder'
    ];

    private readonly seederMap: any = {
        CountrySeeder: CountrySeeder,
        HoshpitalSeeder: HoshpitalSeeder,
    };



    private SeederName: any = "";




    constructor(SeederName: String) {

        this.SeederName = SeederName;

    }


    isSeederExists = () => {
        const result = this.SeedersName.find((item: any) => item == this.SeederName);
        if (!result) return false;

        return true;

    }



    SeedIndividualSeeder = async(seederName:any) => {
          const seederClass = new this.seederMap[seederName]();
          await seederClass.run();
    }



}