import fastify, { type FastifyRequest, type FastifyReply } from "fastify";

import fastifyBcrypt from 'fastify-bcrypt';
import { UsersRepositories } from "../../../../Repositories/org/hoshpital/Users.repositories.js";
import { RolesRepository } from "../../../../Repositories/org/hoshpital/Roles.repositories.js";

export class AuthController {

  private UsersRepositories: UsersRepositories;
  private roleRepository: RolesRepository



  constructor(
    UsersRepositories: UsersRepositories,


  ) {

    this.UsersRepositories = UsersRepositories;

    this.roleRepository = new RolesRepository();



  }

  async signup(request: any, reply: any) {

    const { body } = request;

    const { role_id, name, email, password, is_active } = body;
    const hashPassword = await request.server.bcrypt.hash(password);

    const user = {
      "role_id": role_id,
      "name": name,
      "email": email,
      "password": hashPassword,
      "is_active": is_active
    }

    this.UsersRepositories.createHoshpitalUser(user);
    const roleDetails = await this.roleRepository.getRole(role_id);
    const token = request.server.jwt.sign({ email, role: roleDetails[0].title });
    reply.setCookie("ACCESS_TOKEN", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    }).send({ success: true });

  }


  async login(request: any, reply: any) {


  }



  async lang(request: any, reply: any) {



    // reply.status(200).send({ 'msg': request.multilingual.translate('hello') });

  }



}