import express from 'express';
import { pingRouter } from '../routes/ping';
import { requestLogger } from '../middlewares/requestLogger';
import v1Routes from '../routes/v1';

export const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(pingRouter);
app.use('/v1', v1Routes);
