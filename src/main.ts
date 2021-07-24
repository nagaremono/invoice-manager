import { ENV } from './config/env';
import { app } from './modules/express';

function main() {
  app.listen(ENV.PORT, () => {
    console.log(`Server running on *:%i`, ENV.PORT);
  });
}
main();
