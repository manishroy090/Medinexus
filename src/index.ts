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
  const SchemaName = 'RBC group';

  const isDatabaseExists = await client.query(`
     SELECT 1 
     FROM pg_database 
     WHERE datname = $1
    `, [dbName]);


  if (isDatabaseExists.rowCount === 0) {
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log('Database created');
  }
  else {
    console.log('Database already exists');
  }
  client.release();

  const tenantClient = new Client({
    connectionString: `postgres://manish:secret@localhost:5432/${dbName}`
  });
  await tenantClient.connect();
  const checkSchema = await tenantClient.query(
    `SELECT 1 FROM information_schema.schemata WHERE schema_name = $1`,
    [SchemaName]
  );

  if (checkSchema.rowCount === 0) {
    await tenantClient.query(`CREATE SCHEMA "${SchemaName}"`);
    console.log('Schema created');
  }
  else {
    console.log('Schema already exists');
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


fastify.post('createdatabase', async(request , reply)=>{
 CREATE TABLE cruddb.roles {
  id int PRIMARY KEY,
  title varchar
  description LONGTEXT
}
  

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