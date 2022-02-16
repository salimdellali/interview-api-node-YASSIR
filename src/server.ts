import fastify, {
  FastifyServerOptions,
  FastifyLoggerInstance,
  FastifyInstance,
} from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import router from "./routes/router";

const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3000;

const serverOptions: FastifyServerOptions<Server, FastifyLoggerInstance> = {
  // Logger only for production
  logger: !!(process.env.NODE_ENV !== "development"),
};

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify(
  serverOptions
);

// Middleware: Router
app.register(router);

app.listen(FASTIFY_PORT);

console.log(`🚀  Fastify server running on port ${FASTIFY_PORT}`);
