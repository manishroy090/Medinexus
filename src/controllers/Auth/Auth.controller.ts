import fastify, { type FastifyRequest, type FastifyReply } from "fastify";
import { HOSHPITAL } from "../../Constants/App.js";
import fastifyBcrypt from 'fastify-bcrypt';
import { UsersRepositories } from "../../Repositories/Users.repositories.js";
import { OrganizationsRepository } from "../../Repositories/Organizations.repositories.js";
import { Hoshpitalsrepositories } from "../../Repositories/Hoshpitals.repositories.js";
import OrganizationSchema from "../../Services/OrganizationSchema.js";
import { TenantRepository } from "../../Repositories/Tenants.repositories.js";
import { SchemaRepository } from "../../Repositories/Schemas.repositories.js";
import {Signup } from "../../types/Auth/Hoshpital/Signup.js";

export class AuthController {

  private UsersRepositories: UsersRepositories;
  private OrganizationsRepository: OrganizationsRepository;
  private Hoshpitalsrepositories: Hoshpitalsrepositories;
  private TenantRepository: TenantRepository;
  private SchemaRepository:SchemaRepository;


  constructor(
    UsersRepositories: UsersRepositories, 
    OrganizationsRepository: OrganizationsRepository,
    Hoshpitalsrepositories: Hoshpitalsrepositories,
    TenantRepository:TenantRepository,
    SchemaRepository:SchemaRepository

    ) {

    this.UsersRepositories = UsersRepositories;
    this.OrganizationsRepository = OrganizationsRepository;
    this.Hoshpitalsrepositories = Hoshpitalsrepositories;
    this.TenantRepository = TenantRepository;
    this.SchemaRepository = SchemaRepository;

  }

  async signup(request:any, reply: any) {

   

    const { body } = request;

    const { email, name, password } = body;

    const hashPassword = await request.server.bcrypt.hash(password);
    const user = { email, name, 'password': hashPassword };
    const { id } = await this.UsersRepositories.createUser(user);

    const { registration_number, emergency_contact, tax_id, website, address_line1, address_line2, city, state, country_id, postal_code, logo, description, continent, established_date, total_beds } = body
    const org = {
      name: name,
      user_id: id,
      org_type: body.org_type,
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
      logo,
      description,
      continent,
      established_date
    }


    const createdOrg = await this.OrganizationsRepository.createOrg(org);
    const countryRep = await request.server.repositories.Countriesrep.getCountry(createdOrg?.country_id);
    const countryName = countryRep?.title.toLowerCase().replaceAll(" ", "");


    const isDatabaseExists = await request.server.services.db.isCountryDatabaseExists(countryName);
    const orgName = createdOrg?.name.toLowerCase().replaceAll(" ", "");

    let  tenantDB :any;
    if (!isDatabaseExists) {

     await request.server.services.db.createCountryDatabase(countryName);
     const tenantDb = {country_id:createdOrg?.country_id, db_names:countryName}
      tenantDB = await this.TenantRepository.createTenant(tenantDb);
    }
    else{
      tenantDB = await this.TenantRepository.getTenantByDBName(countryName);

    }
  
    

     const organizationSchema = new OrganizationSchema(countryName);
     const isSchemaExists = await organizationSchema.isScheamaExists(orgName);

      if (!isSchemaExists) {
        organizationSchema.createSchema(orgName);
           const Schema = {org_id:createdOrg?.id ,title:createdOrg?.name,tenant_id:tenantDB?.id}
           const SchemaCreated =  await this.SchemaRepository.createSchema(Schema);
      }

  


    if (body?.org_type.toLowerCase() == HOSHPITAL.toLowerCase()) {
      const { id: org_id } = createdOrg;
      const hoshpital = { org_id, total_beds };
      const createdHoshpital = this.Hoshpitalsrepositories.createHoshpital(hoshpital);
    }


  }


  async login(request: any, reply: any) {

    const { body } = request;
    const { email, password } = body;
    const user = await this.UsersRepositories.getUserByEmail(email);
    const isMatched = await request.server.bcrypt.compare(password, user.password);

    const token = request.server.jwt.sign({ email });

    if (!user || !isMatched) {

      reply.status(401).send({ 'message': "Invalid email or password" });

    }

    reply.status(200).send({ 'user': user, token: token });

  }



  async lang(request:any , reply:any){

  

    reply.status(200).send({'msg':request.multilingual.translate('hello')});

  }



}