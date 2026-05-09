// import { Roles } from "../entities/Roles";
import { Submodule } from "../../../db/models/tenant/org/hoshpital/Submodule.js";

export class SubmodulesRepository {


    public Submodule: any;

    constructor() {
        this.Submodule = new Submodule();
    }


    async createHospitalSubmodule(data:any) {

      const result =  await this.Submodule.create(data);
      return result;
    }

}