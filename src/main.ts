import { ENV } from './config/env';
import { app } from './modules/express';
import logger from './utils/logger';

function main() {
  app.listen(ENV.PORT, () => {
    logger.info(`Server running on *:${ENV.PORT}`);
  });
}
main();
