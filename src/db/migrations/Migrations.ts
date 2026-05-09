export class Migrations {



    private tablePrefix: string;

    constructor() {
        this.tablePrefix = "healthcare";
    }



    async commanMigration() {

        return [
            { name: "Roles" },
            { name: "Permissions" },
            { name: "Modules" },
            { name: "Submodules"},
            { name: "Users" },
            { name: "Users_permissions" }
        ]

    }





    async getmainDBMigrations() {

        return [
            { name: "Countries" },
            { name: "Modules" },
            { name: "Submodules" },
            { name: "Roles" },
            { name: "Permissions" },
            { name: "Users" },
            { name: "Users_permissions" },
            { name: "OrgStatus" },
            { name: "Organizations" },
            { name: "Tenants" },
            { name: "Schemas" },
            { name: "Hoshpitals" },
           

        ]

    }


    async getHoshpitalMigrations() {

        return [

            {
                uk: [
                    { name: "Doctors" },
                    { name: "Patients" },
                    { name: "Admission" },
                    { name: "Appointment" },
                    { name: "Bills" },
                    { name: "DoctorDepartments" },
                    { name: "MedicalRecords" },
                    { name: "Medicines" },
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