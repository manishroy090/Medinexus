import Database from "../Services/Database.js";
import { FastifyInstance } from "fastify";
import fp from 'fastify-plugin';


import fastify from "fastify";

async function servicesPlugin(fastify:FastifyInstance ,opts:any) {
    fastify.decorate('services',{db:new Database()}); 
}

export default fp(servicesPlugin);