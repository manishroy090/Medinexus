import Fastify from 'fastify'
const fastify = Fastify({ logger: true });
import fastifyPostgres from '@fastify/postgres';
import { Result } from 'pg';
import { Client } from 'pg';





//Admin Db
fastify.register(fastifyPostgres, {
  connectionString: 'postgres://manish:secret@localhost:5432/cruddb'
})

fastify.post('/auth/signup', async (request, reply) => {

  const client = await fastify.pg.connect();
  const dbName = `UK`;
  const HoshpitalName = 'LLDN group';

  const isDatabaseExists = await client.query(`
     SELECT 1 
     FROM pg_database 
     WHERE datname = $1
    `, [dbName]);


  if (isDatabaseExists.rowCount === 0) {
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log('Database created');
  }

  client.release();

  //Database Schema  creating for the tenant_user
  const tenantClient = new Client({
    connectionString: `postgres://manish:secret@localhost:5432/${dbName}`
  });
  await tenantClient.connect();
  const checkSchema = await tenantClient.query(
    `SELECT 1 FROM information_schema.schemata WHERE schema_name = $1`,
    [HoshpitalName]
  );

  if (checkSchema.rowCount === 0) {


    console.log(`Creating Schema For Hoshpital : ${HoshpitalName}`, { 'case': 'No Scheam Exists', 'status': "pending" });

    await tenantClient.query(`CREATE SCHEMA "${HoshpitalName}"`);

    console.log(`Creating Schema successfully For Hoshpital : ${HoshpitalName} `, { 'case': 'No Scheam Exists', 'status': "fullfilled" });

    console.log(`Table creating foor HealthCareOrg : ${HoshpitalName}`, { 'case': 'Scheam creating', 'status': "pending" })

    await tenantClient.query(`CREATE TABLE "${HoshpitalName}".roles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT
    )`);
    console.log(`Table creating  succesfully for HealthCareOrg : ${HoshpitalName}`, { 'case': 'Scheam creating', 'status': "fullfilled" })


  }
  else {
    console.log('Table creating');

    await tenantClient.query(`CREATE TABLE ${HoshpitalName}.roles (
        id int PRIMARY KEY,
        title varchar,
        description TEXT
       )`);

    console.log('table created');
  }

  console.log(isDatabaseExists);
  //  const datbase = await client.query(`CREATE DATABASE ${dbName}`);

  //  try {
  //   // await client.query(`CREATE DATABASE ${dbName}`);

  //   await client.query(`CREATE TABLE ${dbName}.us
  //     ( id SERIAL PRIMARY KEY , name TEXT)`);


  // } finally {

  //   client.release();

  // }

  // return dbName;
})


fastify.post('/createdatabase', async (request, reply) => {

  console.log('route called');

     const adminClint = new Client({
         connectionString: `postgres://manish:secret@localhost:5432/cruddb`
      });

      adminClint.connect();

      try {
         await adminClint.query(`
            CREATE TABLE rggs (
              id SERIAL PRIMARY KEY,
              title VARCHAR(255),
              description TEXT
          )`);
        
          console.log('Table is inserted in the main db');


      } catch (error) {

        console.log('error',error);
        
      }

      



  await adminClint.end();







})

const start = async () => {
  try {
    await fastify.listen({ port: 8080 });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();