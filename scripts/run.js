const logger = require('../framework/dist/logger/logger');
const ConsoleScreen = require('console-screen');
const chokidar = require('chokidar');
const { join } = require('path');

const screen = new ConsoleScreen();

try {
  // @ts-ignore
  if (process.platform === 'win32') {
    var cmd = 'yarn.cmd -s';
  } else {
    var cmd = 'yarn -s';
  }
  const exec = require('child_process').exec;

  // @ts-ignore
  const cw = exec(`${cmd} run framework:dev`);

  cw.stdout.on('data', function (data) {
    process.stdout.write(data.toString());
  });

  cw.stderr.on('data', function (data) {
    process.stdout.write(data.toString());
  });

  exec(`${cmd} run frontend:dev`);

  let index = 0;
  let pr = '';
  console.clear();
  console.log(`  Server Running: ${'http://localhost:3000'.green.bold}`);
} catch (e) {
  logger.default.error(`Error: ${e.message}`);
}
