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
            { name: "Role_permission" },
            { name: "Users_permissions" },
            { name: "Countries" }
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
                    { name: "Roles" },
                    { name: "Permissions" },
                    { name: "Modules" },
                    { name: "Submodules"},
                    { name: "Users" },
                    { name: "Role_permission" },
                    { name: "Users_permissions" },
                    { name: "Countries" },
                    { name: "Department"},
                    { name: "Doctors" },
                    { name: "DoctorSession"},
                    { name: "DoctorWorkHistory"},
                    { name: "DoctorEductionCertification"},
                    { name: "Patients" },
                    { name: "VerificationCompliance"},
                    { name: "Admission" },
                    { name: "Appointment" },
                    { name: "Bills" }
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