// import { Roles } from "../entities/Roles";
import { Module } from "../../../db/models/tenant/org/hoshpital/Module.js";

export class ModulesRepository {



    public module: any;


    constructor() {
        this.module = new Module();
    }


    async createHospitalModule(data:any) {
      const result = await this.module.create(data);
      return result;

    }



}