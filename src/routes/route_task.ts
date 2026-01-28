import { FastifyInstance } from "fastify";

export const TaskRoute = async (task: FastifyInstance) => {
    task.get("/tasks", async (req, res) => {
        return "Retorna todas as tasks";
    });
    task.post("/tasks", async (req, res) => {
        return "cria task";
    });

    task.put("/tasks/:id", async (req, res) => {
        const id = req.params as { id: string };
    });
    task.patch("/tasks/:id/:path", async (req, res) => {
        const id = req.params as { id: string };
        const path = req.params as { path: string };
    });
};
