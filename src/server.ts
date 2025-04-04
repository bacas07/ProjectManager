import express, { Request, RequestHandler, Response } from 'express';
//import { env } from './config/env.js';

const server = express();

server.use(express.json());

const helloHandler: RequestHandler = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello world TS' });
};

const checkHealthHandler: RequestHandler = (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toString() });
};

server.get('/', helloHandler);
server.get('/health', checkHealthHandler);

export default server;
