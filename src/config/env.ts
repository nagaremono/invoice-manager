import dotenvSafe from 'dotenv-safe';
dotenvSafe.config();

export const ENV = {
  PORT: parseInt(process.env.PORT, 10),
};
