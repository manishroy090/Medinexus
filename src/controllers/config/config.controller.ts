import { type FastifyRequest, type FastifyReply } from "fastify";
import { send } from "node:process";
import { Countriesrepositories } from "../../Repositories/Countries.repositories";

export class ConfigController {


    private  Countriesrepositories:Countriesrepositories;

    constructor(Countriesrepositories:Countriesrepositories){
        this.Countriesrepositories = Countriesrepositories;
    }


    async getAllCountry(request:any , reply:any) {
      const Countries = await this.Countriesrepositories.getAllCountry();
      reply.status(200).send({'message':"country fetched successfully","countries":Countries}) 
    }


}