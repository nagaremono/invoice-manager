import express from 'express';

const pingRouter = express.Router();

pingRouter.get('/ping', (_, res) => {
  res.status(200).send('pong');
});

export { pingRouter };
