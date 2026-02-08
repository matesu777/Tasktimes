import "dotenv/config";
import fastify from "fastify";
import { TaskRoute } from "./modules/routes/route_task";
import { UserRoute } from "./modules/routes/route_user";

const app = fastify();
app.register(TaskRoute);
app.register(UserRoute);
app.get("/", (req, res) => {
    return res.send({
        message: "Servidor rodando",
        health: 100,
    });
});

app.listen({
    port: typeof process.env.PORT === "string" ? Number(process.env.PORT) : 5050,
    host: typeof process.env.HOST === "string" ? process.env.HOST : "0.0.0.0",
}).then(() => {
    console.log(`Servidor rodando na url http://localhost:${process.env.PORT}`);
});
