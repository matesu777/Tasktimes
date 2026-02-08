import type { UserCreateInput, UserUpdateInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

prisma;
export class UserService {
    static async getAll() {
        return prisma.user.findMany();
    }
    static async create(data: UserCreateInput) {
        return prisma.user.create({
            data: {
                ...data,
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
