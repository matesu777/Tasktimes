import type { FastifyInstance } from "fastify";
import type { UserCreateInput } from "../../generated/prisma/models";
import { prisma } from "../lib/prisma";

export const UserRoute = async (user: FastifyInstance) => {
    user.post("/user", async (req, res) => {
        const dataBody = req.body as UserCreateInput;

        const User = await prisma.user.create({
            data: dataBody,
        });

        return res.send(User);
    });
};
