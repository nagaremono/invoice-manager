import { Request } from 'express';
import morgan from 'morgan';

morgan.token('body', (req: Request) => {
  return JSON.stringify(req.body);
});

export const requestLogger = morgan(
  '[:date[iso]] :method :url :status :res[content-length] - :response-time ms :body'
);
