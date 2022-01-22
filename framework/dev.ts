import chokidar from 'chokidar';
import { resolve } from 'path';
import BuildApp from './build';
import logger from './logger/logger';

chokidar
  .watch(resolve(__dirname, '../../pages'), {
    persistent: true,
    ignoreInitial: false,
    awaitWriteFinish: false,
    ignorePermissionErrors: false,
  })
  .on('change', (path) => {
    logger.info(`${path.bold} changed`);
    BuildApp(resolve(__dirname, '../../'));
  })
  .on('unlink', (path) => {
    logger.info(`${path.bold} removed`);
    BuildApp(resolve(__dirname, '../../'));
  });
