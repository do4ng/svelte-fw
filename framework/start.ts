import path from 'path';
import logger from './logger/logger';
import 'colors';
import BuildApp from './build';

// _start

const root = path.resolve(__dirname, '../../');
(async function () {
  logger.info(`building app: (${root.bold})`);

  await BuildApp(root);
})();
