export class Migrations {



    private tablePrefix:string;

    constructor (){


        this.tablePrefix = "healthcare";

    }


  


   async  getmainDBMigrations(){

   return  [
        {name:"Countries"},
        {name:"Roles"},
        {name:"Permissions"},
        {name:"Users"},
        {name:"Organizations"},
        {name:"Tenants"},
        {name:"Schemas"},
        {name:"Hoshpitals"},
        // {name:"Bloodbanks"},

    ]

   }


   async getHoshpitalMigrations(){

   }




}