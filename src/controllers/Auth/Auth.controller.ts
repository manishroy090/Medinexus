import fastify, { type FastifyRequest, type FastifyReply } from "fastify";
import { HOSHPITAL } from "../../Constants/App.js";
import fastifyBcrypt from 'fastify-bcrypt';
import { UsersRepositories } from "../../Repositories/Users.repositories.js";
import { OrganizationsRepository } from "../../Repositories/Organizations.repositories.js";
import { Hoshpitalsrepositories } from "../../Repositories/Hoshpitals.repositories.js";
import OrganizationSchema from "../../Services/OrganizationSchema.js";

export class AuthController {

  private UsersRepositories: UsersRepositories;
  private OrganizationsRepository: OrganizationsRepository;
  public Hoshpitalsrepositories: Hoshpitalsrepositories;


  constructor(UsersRepositories: UsersRepositories, OrganizationsRepository: OrganizationsRepository, Hoshpitalsrepositories: Hoshpitalsrepositories) {
    this.UsersRepositories = UsersRepositories;
    this.OrganizationsRepository = OrganizationsRepository;
    this.Hoshpitalsrepositories = Hoshpitalsrepositories;

  }

  async signup(request: any, reply: any) {

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


    if (!isDatabaseExists) {

      await request.server.services.db.createCountryDatabase(countryName);
      
    }
    else {

      const organizationSchema = new OrganizationSchema(countryName);

      const isSchemaExists = await organizationSchema.isScheamaExists(orgName);

      if (!isSchemaExists) {
        organizationSchema.createSchema(orgName);
      }

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




}