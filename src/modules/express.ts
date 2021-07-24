import express from 'express';

export const app = express();

app.get('/', (_, res) => {
  res.send('hello world!');
});
