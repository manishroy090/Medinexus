import { type FastifyRequest, type FastifyReply } from "fastify";

import { PemissionRepository } from "../../Repositories/Permissions.repositories";
import { permission } from "node:process";


export class PermissionController {


  private PemissionRepository: PemissionRepository;


  constructor(PemissionRepository: PemissionRepository) {

    this.PemissionRepository = PemissionRepository;
  }

  async index(request: FastifyRequest, reply: FastifyReply) {

    try {

      const Permissions = await this.PemissionRepository.getAllPermission();

      reply.status(200).send({ 'permissions': Permissions });

    } catch (error) {

      reply.status(500).send({ 'server_error': error })
    }

  }


  async create(request: FastifyRequest, reply: FastifyReply) {

    const { body } = request;


    try {

      const permission = await this.PemissionRepository.createPermission(body);

      reply.status(200).send({ 'permission': permission, 'message': 'Permission created successfully' });

    } catch (error) {

      reply.status(500).send({ 'server_error': error })


    }


  }


  async edit(request: any, reply: any) {

    const { id } = request.params;


    try {

      const permission = await this.PemissionRepository.getPermission(id);

      reply.status(200).send({ "permission": permission, 'message': "Permission fetched successfully" });


    } catch (error) {

      reply.status(500).send({ 'server_error': error });

    }



  }

  async update(request: any, reply: any) {

    const { body } = request;
    const { id } = request.params;

    try {
      const permission = await this.PemissionRepository.updatePermission(id, body);
      reply.status(200).send({ "permission": permission, 'message': "Permission updated successfully" });

    } catch (error) {
      reply.status(500).send({ 'server_error': error });


    }



  }




  async delete(request: any, reply: any) {
    const { id } = request.params;

    try {
      const permission = this.PemissionRepository.deletePermission(id);
      reply.status(200).send({ 'permission': permission, 'message': "Permission deleted successfully" })


    } catch (error) {

      reply.status(500).send({ 'server_error': error })

    }

  }


}