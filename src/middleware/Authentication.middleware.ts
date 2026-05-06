import fastify from "fastify";
import Database from "../Services/Database.js";
import { Model } from "../db/models/tenant/tenantModel.js";

export async function Authentication(req: any, reply: any) {

    const token = req.headers['authorization']


    if (!token) {
        reply.status(401).send({
            message: 'Access Denied"',
        });

    }


    try {
        const decoded = req.server.jwt.verify(token);
        req.log.info(`Token verified. Foo is ${JSON.stringify(decoded)}`);
        (req as any).user = decoded;
      

          const database = new Database();
          const SchemaName = decoded.dbDetails.user_name.replace(/\s+/g, '').toLowerCase();
          console.log("SchemaName",SchemaName);
          const tenanatPool = await database.switchToOrgSchema(decoded.dbDetails.country_name.toLowerCase(), SchemaName);
          (req as any).dbDetails =tenanatPool;



    } catch (error) {
        return reply.status(401).send({
            message: 'Invalid token',
            err: error
        });
    }

}