import type { TaskCreateInput, TaskUpdateInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const VALID_STATUS = ["pending", "pause"] as const;
export type TaskStatus = (typeof VALID_STATUS)[number];
const TASK_DIFFICULTY = ["easy", "medium", "hard"] as const;
export type TaskDifficulty = (typeof TASK_DIFFICULTY)[number];

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
    static async update(id: number, data: TaskUpdateInput) {
        return prisma.task.update({
            where: { id },
            data,
        });
    }
    static async updateStatus(id: number, status: TaskStatus) {
        if (!VALID_STATUS.includes(status)) {
            throw new Error("INVALID_STATUS");
        }
        return prisma.task.update({
            where: { id },
            data: { status },
        });
    }
    static async updateDifficulty(id: number, difficulty: TaskDifficulty) {
        if (!TASK_DIFFICULTY.includes(difficulty)) {
            throw new Error("INVALID_DIFFICULTY");
        }
        return prisma.task.update({
            where: { id },
            data: { difficulty },
        });
    }
}
