import express from 'express';
import { pingRouter } from '../routes/ping';
import { requestLogger } from '../middlewares/requestLogger';

export const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(pingRouter);
