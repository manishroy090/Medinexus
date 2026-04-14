
import Database from "../Services/Database.js";
import chalk from "chalk";
import {  Seeder } from "../db/seeder/Seeder.js";
import { boolean } from "zod";
import { argv } from "node:process";

class App {

    constructor() {
        const command = process.argv[2];
        const params = process.argv[3];

  

        // npm run migrate tenantName schemaname;


        const database = new Database();
        

        switch (command) {
            case "welcome":
                console.log('run welcome script')
                break;
            case "developerinfo":
                console.log(chalk.cyan.bold("\n DEVELOPER PROFILE\n"));
                console.log(chalk.yellow("👤 Name   : ") + "Manish Ray");
                console.log(chalk.yellow("📧 Email  : ") + "manishkuyadav090@gmail.com");
                console.log(chalk.yellow("💻 GitHub : ") + chalk.underline.blue("https://github.com/manishroy090"));
                console.log("\n" + chalk.gray("────────────────────────────────────\n"));

                break;
            case "migrate":
              
              const tenantName  = process.argv[3];
              const schemaName = process.argv[4];

              
                if (params && params !== 'rollback' && !tenantName) {
                    const tableName = params;
                    console.log('migrate single table');
                }

                else if (params == 'rollback') {

                    //This Script will rollback all the table from adminDatabase
                    database.rollbackAdminDb();
                }
                else if(tenantName && schemaName ){

                     database.migrateTenantDBOrgSchema();


                }
                else {

                    //THIS SCRIPT WILL RUN TO MIGRATE ALL THE TALBE
                    database.migrateToAdminDb();
                }

                break;
            case "seed":
                if (params) {
                    const seederName = params;
                    const seeder = new Seeder(seederName);
                    const seederExists = seeder.isSeederExists();
                    if(seederExists){
                        seeder.SeedIndividualSeeder(seederName)

                    }
                }
                else {

                    console.log('seed all seeder');
                }
                break;


            default:
                break;
        }

        // console.log(params);

        // console.log(command);

    }


}

new App();