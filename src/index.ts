import Fastify from 'fastify'
import fastifyPostgres from '@fastify/postgres';

import type {ZodTypeProvider} from 'fastify-type-provider-zod';
import {serializerCompiler , validatorCompiler} from 'fastify-type-provider-zod';

//Super Admin Routes Namespace
import { AuthRoutes } from './routes/Auth/Auth.Routes.js';
import { PermissionRoutes } from './routes/Auth/Permission.Routes.js';
import { RolesRoutes } from './routes/Auth/Roles.Routes.js';

//Hoshpital Routes file 
import { HoshpitalRoutes } from './routes/organization/Hoshpital/Hoshpital.Routes.js';
import Config from './Constants/Config.js';
import jwt from '@fastify/jwt'

//Pugins namespace
import fastifyBcrypt from 'fastify-bcrypt';
import servicesPlugin  from './plugins/Services.js';
import repositoriesPlugin from './plugins/repositories.js';


//make it seprate file and rename it to app
const fastify = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();



//Validation Compiler
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);


//implement Plugins here
fastify.register(fastifyBcrypt,{saltWorkFactor:12});
fastify.register(jwt,{secret: Config().JWT_SECRET});
fastify.register(servicesPlugin);
fastify.register(repositoriesPlugin);




//validation error code
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





//Authentication Routes
fastify.register(AuthRoutes,{prefix:'/api/v1/auth'});

//Super Admin Authorization Routes
fastify.register(PermissionRoutes,{prefix:'/api/v1/permissions'});
fastify.register(RolesRoutes,{prefix:'/api/v1/roles'});


//Hoshpital Routes
fastify.register(HoshpitalRoutes, {prefix:'api/v1/hoshpital'})


//Blood Donation Routes



//Clinic Routes



//laboratory  Routes



const start = async () => {
  try {
    await fastify.listen({ port: 8080 });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();