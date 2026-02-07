import type { TaskCreateInput, TaskUpdateInput } from "../../generated/prisma/models";
import { prisma } from "../lib/prisma";

const VALID_STATUS = ["complete", "pending", "pause", "hard", "easy", "normal"] as const;
export type TaskStatus = (typeof VALID_STATUS)[number];

export class TaskServices {
    static async getAll() {
        return prisma.task.findMany();
    }
    static async create(data: TaskCreateInput) {
        return prisma.task.create({
            data: {
                ...data,
                author: { connect: { id: 2 } },
            },
        });
    }
    static async uptade(id: number, data: TaskUpdateInput) {
        return prisma.task.update({
            where: { id },
            data,
        });
    }
    static async uptadeStatus(id: number, status: TaskStatus) {
        if (!VALID_STATUS.includes(status)) {
            throw new Error("INVALID_STATUS");
        }
        return prisma.task.update({
            where: { id },
            data: { status },
        });
    }
}
