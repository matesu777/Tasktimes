import type { UserCreateInput, UserUpdateInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { hashPassword } from "../../utils/password";

export class UserService {
    static async getAll() {
        return prisma.user.findMany();
    }
    static async create(data: UserCreateInput) {
        const hashpass = await hashPassword(data.password);
        const userExists = await prisma.user.findFirst({
            where: {
                OR: [{ email: data.email }, { username: data.username }],
            },
        });

        if (userExists) {
            throw new Error("EMAIL_OR_USERNAME_ALREADY_EXISTS");
        }
        return prisma.user.create({
            data: {
                ...data,
                password: hashpass,
            },
        });
    }
    static async delete(id: number) {
        await prisma.task.deleteMany({
            where: { authorID: id },
        });
        return prisma.user.delete({ where: { id: id } });
    }
    static async getUser(id: number) {
        return prisma.user.findUnique({ where: { id: id } });
    }
    static async update(id: number, data: UserUpdateInput) {
        return prisma.user.update({
            where: { id },
            data: data,
        });
    }
}
