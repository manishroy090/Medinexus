import { CountrySeeder } from "./SuperAdmin/Countries.Seeder.js";
import { HoshpitalSeeder } from "./SuperAdmin/Hoshpital.Seeder.js";
import { OrgStatusSeeder } from "./SuperAdmin/OrgStatus.Seeder.js";
import { PermissionSeeder } from "./SuperAdmin/Permission.Seeder.js";


export class Seeder {


    private readonly SeedersName: any = [
        'CountrySeeder'
        ,'HoshpitalSeeder',
        'OrgStatusSeeder',
        'PermissionSeeder'
    ];

    private readonly seederMap: any = {
        CountrySeeder: CountrySeeder,
        HoshpitalSeeder: HoshpitalSeeder,
        OrgStatusSeeder: OrgStatusSeeder,
        PermissionSeeder: PermissionSeeder
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



    SeedIndividualSeeder = async (seederName: any) => {

        console.log("individual Seeder method called");
        const seederClass = new this.seederMap[seederName]();

        console.log()
        await seederClass.run();
    }



}