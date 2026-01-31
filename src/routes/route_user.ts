import type { FastifyInstance } from "fastify";
import type { UserCreateInput } from "../../generated/prisma/models";
import { prisma } from "../lib/prisma";

export const UserRoute = async (user: FastifyInstance) => {
    user.post<{ Body: UserCreateInput }>("/user", async (req, res) => {
        const User = await prisma.user.create({
            data: req.body,
        });
        if (!User || null || undefined) {
            return res.status(401).send({ message: "Usuario não criado." });
        }
        return res.status(200).send(User);
    });
    user.get("/users", async (req, res) => {
        const User = await prisma.user.findMany();
        if (!User || null || undefined) {
            return res.status(401).send({ message: "Usuarios não encontrados." });
        }
        return res.status(200).send(User);
    });
    user.delete<{ Params: { id: string } }>("/user/:id", async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).send({ message: "ID invalido" });
        }
        try {
            const user = await prisma.user.delete({ where: { id } });
            return res.status(200).send({ message: "User deletado", user });
        } catch (err) {
            return res.status(400).send({ message: "Erro inesperado ao deletar user", err });
        }
    });
    user.get<{ Params: { id: string } }>("/user/:id", async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.send("ID invalido").status(400);
        }
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            return res.status(200).send({ user });
        } catch (err) {
            return res.status(400).send({ err: err });
        }
    });
};
