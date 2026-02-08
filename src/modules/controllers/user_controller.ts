import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserCreateInput, UserUpdateInput } from "../../../generated/prisma/models";
import { UserService } from "../services/user_service";

export class UserController {
    static async getAll(_: FastifyRequest, reply: FastifyReply) {
        const users = await UserService.getAll();
        if (!users.length) {
            return reply.status(404).send({ message: "Users não encontrados" });
        }
        return reply.status(200).send(users);
    }
    static async create(req: FastifyRequest<{ Body: UserCreateInput }>, reply: FastifyReply) {
        const user = await UserService.create(req.body);
        return reply.status(201).send({ message: "User Criado" });
    }
    static async delete(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const id = Number(req.id);
        if (isNaN(id)) {
            return reply.status(400).send({ message: "ID invalido" });
        }
        const user = await UserService.delete(id);
        return reply.status(200).send({ message: "User delatado" });
    }
    static async getUser(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const id = Number(req.id);
        if (isNaN(id)) {
            return reply.status(400).send({ message: "ID invalido" });
        }
        const user = UserService.getUser(id);
        return reply.status(201).send(user);
    }
    static async update(req: FastifyRequest<{ Params: { id: string }; Body: UserUpdateInput }>, reply: FastifyReply) {
        const id = Number(req.id);
        if (isNaN(id)) {
            return reply.status(400).send({ message: "ID invalido" });
        }
        const user = UserService.update(id, req.body);
        return reply.status(201).send(user);
    }
}
