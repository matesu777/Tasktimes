import "dotenv/config";
import fastify from "fastify";

const app = fastify();

app.get("/", async () => {
    return "test";
});

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen({
    port: typeof PORT === "string" ? Number(PORT) : 5050,
    host: typeof HOST === "string" ? HOST : "0.0.0.0",
}).then(() => {
    console.log(`Servidor rodando na url http://${HOST}:${PORT}`);
});
