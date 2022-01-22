import 'colors';
import GetTime from '../utils/time';

function LogInfo(message: string) {
  console.log(`${GetTime().gray} ${'info'.blue} ${message}`);
}

function LogError(message: string) {
  console.log(`${GetTime().gray} ${'error'.red} ${message}`);
}

function LogWarn(message: string) {
  console.log(`${GetTime().gray} ${'warn'.yellow} ${message}`);
}

export default {
  info: LogInfo,
  error: LogError,
  warn: LogWarn,
};
