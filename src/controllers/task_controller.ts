import type { FastifyReply, FastifyRequest } from "fastify";
import type { TaskCreateInput, TaskUpdateInput } from "../../generated/prisma/models";
import { TaskServices, type TaskStatus } from "../services/task_service";

export class TaskController {
    static async getAll(_: FastifyRequest, reply: FastifyReply) {
        const tasks = await TaskServices.getAll();
        if (!tasks.length) {
            return reply.status(404).send({ message: "Tarefas não encontradas" });
        }
        return reply.status(200).send(tasks);
    }
    static async create(req: FastifyRequest<{ Body: TaskCreateInput }>, reply: FastifyReply) {
        const task = await TaskServices.create(req.body);
        return reply.status(201).send({ message: "Tarefa Criada" });
    }
    static async update(req: FastifyRequest<{ Params: { id: string }; Body: TaskUpdateInput }>, reply: FastifyReply) {
        const id = Number(req.id);
        if (isNaN(id)) {
            return reply.status(400).send({ message: "ID invalido" });
        }
        const task = await TaskServices.update(id, req.body);
        return reply.status(201).send({ message: "Task Atualizada" });
    }
    static async updateStatus(
        req: FastifyRequest<{ Params: { id: string }; Body: { status: TaskStatus } }>,
        reply: FastifyReply,
    ) {
        const id = Number(req.id);
        if (isNaN(id)) {
            return reply.status(400).send({ message: "ID invalido" });
        }
        try {
            const task = await TaskServices.updateStatus(id, req.body.status);
            return reply.status(200).send(task);
        } catch (err) {
            return reply.status(400).send({ message: "Status inválido" });
        }
    }
}
