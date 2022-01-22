const logger = require('../framework/dist/logger/logger');

const build = require('../framework/dist/build');
const { join } = require('path');

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

  build.default(join(__dirname, '../'));

  cw.stdout.on('data', function (data) {
    process.stdout.write(data.toString());
  });

  cw.stderr.on('data', function (data) {
    process.stdout.write(data.toString());
  });

  exec(`${cmd} run frontend:dev`).stderr.on('data', function (data) {
    process.stdout.write(data.toString());
  });

  console.clear();
  console.log(`  Server Running: ${'http://localhost:3000'.green.bold}`);
} catch (e) {
  logger.default.error(`Error: ${e.message}`);
}
