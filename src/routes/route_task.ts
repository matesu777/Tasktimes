import { FastifyInstance } from "fastify";
import type { TaskCreateInput, TaskUpdateInput } from "../../generated/prisma/models";
import { prisma } from "../lib/prisma";

const VALID_STATUS = ["complete", "pending", "pause", "hard", "easy", "normal"] as const;
type TaskStatus = (typeof VALID_STATUS)[number];

export const TaskRoute = async (task: FastifyInstance) => {
    task.get("/tasks", async (req, res) => {
        const Task = await prisma.task.findMany();
        if (!Task || null || undefined) {
            return res.status(401).send({ message: "Tarefas não encontradas" });
        }
        return res.send(Task).status(200);
    });
    task.post<{ Body: TaskCreateInput }>("/tasks", async (req, res) => {
        const Task = await prisma.task.create({
            data: { ...req.body, author: { connect: { id: 3 } } },
        });
        return res.send(Task).status(200);
    });

    task.put<{ Params: { id: string }; Body: TaskUpdateInput }>("/tasks/:id", async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).send({ message: "ID invalido" });
        }
        try {
            const Task = await prisma.task.update({
                where: {
                    id: id,
                },
                data: req.body,
            });

            return res.status(200).send({ Task });
        } catch (err) {
            return res.status(400).send({ message: "Erro inesperado", err });
        }
    });
    task.patch<{ Params: { id: string }; Body: { status: TaskStatus } }>("/tasks/:id/status", async (req, res) => {
        const id = Number(req.params.id);
        const { status } = req.body;

        if (isNaN(id)) {
            return res.status(400).send({ message: "ID invalido" });
        }
        if (!VALID_STATUS.includes(status)) {
            return res.status(400).send({ message: "Status invalido" });
        }

        try {
            const Task = await prisma.task.update({ where: { id }, data: { status } });
            return res.status(200).send({ Task });
        } catch (err) {
            return res.status(400).send({ message: "Erro inesperado", err });
        }
    });
};
