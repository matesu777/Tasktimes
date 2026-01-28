import "dotenv/config";
import fastify from "fastify";
import { TaskRoute } from "./routes/route_task";

const app = fastify();
app.register(TaskRoute);

app.listen({
    port: typeof process.env.PORT === "string" ? Number(process.env.PORT) : 5050,
    host: typeof process.env.HOST === "string" ? process.env.HOST : "0.0.0.0",
}).then(() => {
    console.log(`Servidor rodando na url http://localhost:${process.env.PORT}`);
});
