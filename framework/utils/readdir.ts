import fs from 'fs';
import path from 'path';

function isdir(dir) {
  try {
    return fs.lstatSync(dir).isDirectory();
  } catch (e) {
    return false;
  }
}

let output = {};

function read(dir, out) {
  const p = fs.readdirSync(dir);
  p.forEach((e) => {
    if (isdir(path.join(dir, e))) {
      if (!fs.existsSync(path.join(out, e))) {
        fs.mkdirSync(path.join(out, e));
      }
      read(path.join(dir, e), path.join(out, e));
    } else {
      output[path.join(out, e)] = fs.readFileSync(path.join(dir, e), 'utf8');
    }
  });
}

export default function readdir(dir) {
  output = {};
  read(dir, dir);
  return output;
}
