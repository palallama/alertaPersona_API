import { notFound } from "@hapi/boom";

export const notFoundMiddleware = (req, res) => {
    const { statusCode, payload } = notFound();
    res.status(statusCode).json(payload);
}