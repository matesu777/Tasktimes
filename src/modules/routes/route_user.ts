import type { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user_controller";

export const UserRoute = async (user: FastifyInstance) => {
    user.get("/users", UserController.getAll);
    user.post("/users", UserController.create);
    user.get("/user/:id", UserController.getUser);
    user.delete("/user/:id", UserController.delete);
    user.put("/user/:id", UserController.update);
};
