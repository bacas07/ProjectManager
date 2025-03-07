import express, { NextFunction, Request, RequestHandler, Response}  from "express";
import bodyParser from "body-parser";
import { env } from "./config/env.js"

const server = express();

server.use(bodyParser.json());

const helloHandler: RequestHandler = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello world TS' });
};

const checkHealthHandler: RequestHandler = (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toString() });
};

server.get('/', helloHandler);
server.get('/health', checkHealthHandler);

const PORT = env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Servidor listo en: http://localhost:${PORT}
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
    PID: ${process.pid}`)
});