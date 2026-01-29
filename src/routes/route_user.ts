import type { FastifyInstance } from "fastify";
import type { UserCreateInput } from "../../generated/prisma/models";
import { prisma } from "../lib/prisma";

export const UserRoute = async (user: FastifyInstance) => {
    user.post("/user", async (req, res) => {
        const dataBody = req.body as UserCreateInput;

        const User = await prisma.user.create({
            data: dataBody,
        });

        return res.send(User).status(200);
    });
    user.get("/users", async (req, res) => {
        const User = await prisma.user.findMany();
        if (!User || null || undefined) {
            return res.status(401).send("Usuarios não encontrados.");
        }
        return res.send(User).status(200);
    });
    user.delete<{ Params: { id: string } }>("/user/:id", async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).send("ID invalido");
        }
        try {
            const user = await prisma.user.delete({ where: { id } });
            return res.send({ message: "User deletado", user });
        } catch (error) {
            return res.status(400).send({ error: error });
        }
    });
    user.get<{ Params: { id: string } }>("/user/:id", async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).send("ID invalido");
        }
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            return res.send({ user }).status(200);
        } catch (error) {
            return res.send({ error: error }).status(400);
        }
    });
};
