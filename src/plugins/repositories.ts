import Database from "../Services/Database.js";
import { FastifyInstance } from "fastify";
import { Countriesrepositories } from "../Repositories/Countries.repositories.js";
import fp from 'fastify-plugin';


async function repositoriesPlugin(fastify:FastifyInstance ,opts:any) {
    fastify.decorate('repositories',{Countriesrep:new Countriesrepositories()});
}

export default fp(repositoriesPlugin);