import fastify, { type FastifyRequest, type FastifyReply } from "fastify";
import { HOSHPITAL } from "../../Constants/App.js";
import fastifyBcrypt from 'fastify-bcrypt';
import { UsersRepositories } from "../../Repositories/Users.repositories.js";
import { OrganizationsRepository } from "../../Repositories/Organizations.repositories.js";
import { Hoshpitalsrepositories } from "../../Repositories/Hoshpitals.repositories.js";
import OrganizationSchema from "../../Services/OrganizationSchema.js";
import { TenantRepository } from "../../Repositories/Tenants.repositories.js";
import { SchemaRepository } from "../../Repositories/Schemas.repositories.js";
import { Signup } from "../../types/Auth/Hoshpital/Signup.js";
import { pool } from "../../db/models/Model.js";
import Database from "../../Services/Database.js";
import { UsersRepositories as TenantUserRep } from "../../Repositories/org/hoshpital/Users.repositories.js";

export class AuthController {

  private UsersRepositories: UsersRepositories;
  private OrganizationsRepository: OrganizationsRepository;
  private Hoshpitalsrepositories: Hoshpitalsrepositories;
  private TenantRepository: TenantRepository;
  private SchemaRepository: SchemaRepository;
  private Database: Database;


  constructor(
    UsersRepositories: UsersRepositories,
    OrganizationsRepository: OrganizationsRepository,
    Hoshpitalsrepositories: Hoshpitalsrepositories,
    TenantRepository: TenantRepository,
    SchemaRepository: SchemaRepository

  ) {

    this.UsersRepositories = UsersRepositories;
    this.OrganizationsRepository = OrganizationsRepository;
    this.Hoshpitalsrepositories = Hoshpitalsrepositories;
    this.TenantRepository = TenantRepository;
    this.SchemaRepository = SchemaRepository;
    this.Database = new Database();

  }

  async signup(request: any, reply: any) {

    const { body } = request;
    const client = pool.connect();

    try {
      const { email, name, password } = body;
      const hashPassword = await request.server.bcrypt.hash(password);
      const user = { email, name, 'password': hashPassword, "role_id": 3 };

      (await client).query("BEGIN")
      const userExists = await this.UsersRepositories.getUserByEmail(email);
      if (userExists) {
        (await client).query("ROLLBACK")
        reply.status(422).send({ "message": "User already exists with this email" });
        return;
      }

      const orgExists = await this.UsersRepositories.getUserByName(name);
      if (orgExists) {
        (await client).query("ROLLBACK")
        reply.status(422).send({ "message": "Hoshpital Allready Exists" });
        return;

      }

      const { id } = await this.UsersRepositories.createUser(user);

      const { registration_number, emergency_contact, tax_id, website, address_line1, address_line2, city, state, country_id, postal_code, logo, description, continent, established_date, total_beds } = body
      const org = {
        name: name,
        user_id: id,
        org_type: "Hoshpital",
        registration_number,
        emergency_contact,
        tax_id,
        website,
        address_line1: address_line1 || '',
        address_line2,
        city,
        state,
        country_id,
        postal_code,
        logo: null,
        description: null,
        status: 2,
        continent: null,
        established_date
      }



      const createdOrg = await this.OrganizationsRepository.createOrg(org);
      const countryRep = await request.server.repositories.Countriesrep.getCountry(createdOrg?.country_id);
      const countryName = countryRep?.title.toLowerCase().replaceAll(" ", "");


      const isDatabaseExists = await request.server.services.db.isCountryDatabaseExists(countryName);
      const orgName = createdOrg?.name.toLowerCase().replaceAll(" ", "");
      console.log('query hitted till here');

      console.log('isDatabaseExists', isDatabaseExists);

      let tenantDB: any;
      if (!isDatabaseExists) {

        await request.server.services.db.createCountryDatabase(countryName);
        const tenantDb = { country_id: createdOrg?.country_id, db_names: countryName }
        tenantDB = await this.TenantRepository.createTenant(tenantDb);
      }
      else {
        tenantDB = await this.TenantRepository.getTenantByDBName(countryName);

      }



      const organizationSchema = new OrganizationSchema(countryName);
      const isSchemaExists = await organizationSchema.isScheamaExists(orgName);

      if (!isSchemaExists) {
        organizationSchema.createSchema(orgName);
        const Schema = { org_id: createdOrg?.id, title: createdOrg?.name, tenant_id: tenantDB?.id }
        const SchemaCreated = await this.SchemaRepository.createSchema(Schema);
      }
      const { id: org_id } = createdOrg;
      const hoshpital = { org_id, total_beds };
      const createdHoshpital = await this.Hoshpitalsrepositories.createHoshpital(hoshpital);
      await this.Database.migrateTenantDBOrgSchema(countryName, orgName);
      const token = request.server.jwt.sign({ email, role: "Hoshpital" });
      (await client).query("COMMIT")

      reply.setCookie("ACCESS_TOKEN", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
      }).send({ success: true });


      // reply.status(200).send({ message: "Account created" })
    } catch (error) {

    }


  }


  async login(request: any, reply: any) {

    try {


      const { body } = request;

      const { email, password } = body;


      let user = await this.UsersRepositories.getUserByEmail(email);

      let dbDetails = null;



      if (user.role_id == 3 && user) {
        if (request.headers.origin) {
          const url = new URL(request.headers.origin);
          const subdomain = url.hostname.split(".")[0];
          if (subdomain) {
            dbDetails = await this.UsersRepositories.getOrgDbDetails(url.origin);
            const SchemaName = dbDetails.user_name.replace(/\s+/g, '').toLowerCase();
            const tenanatPool = await this.Database.switchToOrgSchema(dbDetails.country_name.toLowerCase(), SchemaName);
            request.dbDetails = tenanatPool;

          }
        }

      }



      // this logic for other user of hoshpital
      if (!user) {
        if (request.headers.origin) {
          const url = new URL(request.headers.origin);
          const subdomain = url.hostname.split(".")[0];

          if (subdomain) {
            dbDetails = await this.UsersRepositories.getOrgDbDetails(url.origin);
            const SchemaName = dbDetails.user_name.replace(/\s+/g, '').toLowerCase();
            const tenanatPool = await this.Database.switchToOrgSchema(dbDetails.country_name.toLowerCase(), SchemaName);
            request.dbDetails = tenanatPool;


            const tenantrepo = new TenantUserRep();
            user = await tenantrepo.getUserByEmail(email);
          }
        }
      }


      if (!user) {
        reply.status(401).send({ 'message': "Invalid Credentials" });
        return;
      }

      const isMatched = await request.server.bcrypt.compare(password, user.password);

      const token = request.server.jwt.sign({ email, role: "Hoshpital", "dbDetails": dbDetails });


      if (!user || !isMatched) {

        reply.status(401).send({ 'message': "Invalid Credentials" });

      }


      reply.setCookie("ACCESS_TOKEN", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
      }).send({ success: true });


    } catch (error) {

      console.log('error', error);

    }

  }


}