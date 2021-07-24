import express from 'express';
import { requestLogger } from '../middlewares/requestLogger';

export const app = express();

app.use(requestLogger);

app.get('/', (_, res) => {
  res.send('hello world!');
});
