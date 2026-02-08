import type { FastifyInstance } from "fastify";
import { TaskController } from "../controllers/task_controller";

export const TaskRoute = async (app: FastifyInstance) => {
    app.get("/tasks", TaskController.getAll);
    app.post("/tasks", TaskController.create);
    app.put("/tasks/:id", TaskController.update);
    app.patch("/tasks/:id/status", TaskController.updateStatus);
};
