export class Migrations {



    private tablePrefix: string;

    constructor() {
        this.tablePrefix = "healthcare";
    }



    async commanMigration() {

        return [
            { name: "Roles" },
            { name: "Permissions" },
            { name: "Users" },
        ]

    }





    async getmainDBMigrations() {

        return [
            { name: "Countries" },
            { name: "Roles" },
            { name: "Permissions" },
            { name: "Users" },
            { name: "Organizations" },
            { name: "Tenants" },
            { name: "Schemas" },
            { name: "Hoshpitals" },
            // {name:"Bloodbanks"},

        ]

    }


    async getHoshpitalMigrations() {

      return  [

            {
                uk: [
                    { name: "doctors" },
                    { name: "patients" },
                    { name: "admission" },
                    { name: "appointment" },
                    { name: "bills" },
                    { name: "doctor_department" },
                    { name: "medicalrecords" },
                    { name: "medicines" },
                ]
            }
            ,

            {
                Usa: [
                    { name: "doctors" },
                    { name: "patients" },
                    { name: "admission" },
                    { name: "appointment" },
                    { name: "bills" },
                    { name: "doctor_department" },
                    { name: "medicalrecords" },
                    { name: "medicines" },
                ]
            }

            ,

            {
                Canada: [
                    { name: "doctors" },
                    { name: "patients" },
                    { name: "admission" },
                    { name: "appointment" },
                    { name: "bills" },
                    { name: "doctor_department" },
                    { name: "medicalrecords" },
                    { name: "medicines" },
                ]
            }


        ]

    }




}