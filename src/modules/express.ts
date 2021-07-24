import express from 'express';
import { requestLogger } from '../middlewares/requestLogger';

export const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.send('hello world!');
});
