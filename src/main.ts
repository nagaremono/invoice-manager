import express from 'express';

const app = express();

app.get('/', (_, res) => {
  res.send('hello world!');
});

app.listen(4000, () => {
  console.log(`Server running on *:4000`);
});
