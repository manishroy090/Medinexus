import Fastify from 'fastify'
import fastifyPostgres from '@fastify/postgres';
import { Result } from 'pg';
import { Client } from 'pg';
import type {ZodTypeProvider} from 'fastify-type-provider-zod';
import {serializerCompiler , validatorCompiler} from 'fastify-type-provider-zod';
import { AuthRoutes } from './routes/Auth/Auth.Routes.js';
import { PermissionRoutes } from './routes/Auth/Permission.Routes.js';

//Hoshpital Routes file 
import { HoshpitalRoutes } from './routes/organization/Hoshpital/Hoshpital.Routes.js';
import { RolesRoutes } from './routes/Auth/Roles.Routes.js';


const fastify = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();


fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);


fastify.setErrorHandler(function(error , request , reply){

     if(Array.isArray((error as any).validation)){

      const validationIssue = (error as any).validation;
      const errors = validationIssue.map((issue:{instancePath:string,message:string})=>({
        field:issue.instancePath.substring(1),
        message:issue.message
      }));

      reply.status(422).send({
        message:"Validation_errors",
        errors
      });



     }
});


//Admin Db
fastify.register(fastifyPostgres, {
  connectionString: 'postgres://manish:secret@localhost:5432/cruddb'
});


//Authentication Routes
fastify.register(AuthRoutes,{prefix:'/api/auth'});

//Admin Authorization Routes
fastify.register(PermissionRoutes,{prefix:'/api/permissions'});
fastify.register(RolesRoutes,{prefix:'/api/roles'});


//Hoshpital Routes
fastify.register(HoshpitalRoutes, {prefix:'api/hoshpital'})









// fastify.post('/auth/signup', async (request, reply) => {

//   const client = await fastify.pg.connect();
//   const dbName = `UK`;
//   const HoshpitalName = 'LLDN group';

//   const isDatabaseExists = await client.query(`
//      SELECT 1 
//      FROM pg_database 
//      WHERE datname = $1
//     `, [dbName]);


//   if (isDatabaseExists.rowCount === 0) {
//     await client.query(`CREATE DATABASE "${dbName}"`);
//     console.log('Database created');
//   }

//   client.release();

//   //Database Schema  creating for the tenant_user
//   const tenantClient = new Client({
//     connectionString: `postgres://manish:secret@localhost:5432/${dbName}`
//   });
//   await tenantClient.connect();
//   const checkSchema = await tenantClient.query(
//     `SELECT 1 FROM information_schema.schemata WHERE schema_name = $1`,
//     [HoshpitalName]
//   );

//   if (checkSchema.rowCount === 0) {


//     console.log(`Creating Schema For Hoshpital : ${HoshpitalName}`, { 'case': 'No Scheam Exists', 'status': "pending" });

//     await tenantClient.query(`CREATE SCHEMA "${HoshpitalName}"`);

//     console.log(`Creating Schema successfully For Hoshpital : ${HoshpitalName} `, { 'case': 'No Scheam Exists', 'status': "fullfilled" });

//     console.log(`Table creating foor HealthCareOrg : ${HoshpitalName}`, { 'case': 'Scheam creating', 'status': "pending" })

//     await tenantClient.query(`CREATE TABLE "${HoshpitalName}".roles (
//         id SERIAL PRIMARY KEY,
//         title VARCHAR(255),
//         description TEXT
//     )`);
//     console.log(`Table creating  succesfully for HealthCareOrg : ${HoshpitalName}`, { 'case': 'Scheam creating', 'status': "fullfilled" })


//   }
//   else {
//     console.log('Table creating');

//     await tenantClient.query(`CREATE TABLE ${HoshpitalName}.roles (
//         id int PRIMARY KEY,
//         title varchar,
//         description TEXT
//        )`);

//     console.log('table created');
//   }

//   console.log(isDatabaseExists);
//   //  const datbase = await client.query(`CREATE DATABASE ${dbName}`);

//   //  try {
//   //   // await client.query(`CREATE DATABASE ${dbName}`);

//   //   await client.query(`CREATE TABLE ${dbName}.us
//   //     ( id SERIAL PRIMARY KEY , name TEXT)`);


//   // } finally {

//   //   client.release();

//   // }

//   // return dbName;
// })


// fastify.post('/createdatabase', async (request, reply) => {

//   console.log('route called');

//      const adminClint = new Client({
//          connectionString: `postgres://manish:secret@localhost:5432/cruddb`
//       });

//       adminClint.connect();

//       try {
//          await adminClint.query(`
//             CREATE TABLE rggs (
//               id SERIAL PRIMARY KEY,
//               title VARCHAR(255),
//               description TEXT
//           )`);
        
//           console.log('Table is inserted in the main db');


//       } catch (error) {

//         console.log('error',error);
        
//       }

      



//   await adminClint.end();







// })

const start = async () => {
  try {
    await fastify.listen({ port: 8080 });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();