import { FastifyReply } from "fastify";

export const sendError = (reply: FastifyReply, errorMessage: string, statusCode: number) => {
    reply.statusCode = statusCode;
    reply.send({ errorMessage });
}
