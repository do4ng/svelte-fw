/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import fs from 'fs-extra';
import path from 'path';
import rimraf from 'rimraf';
import logger from './logger/logger';
import readdir from './utils/readdir';
import TimeTaken from './utils/timeTaken';

// _build_

export default function BuildApp(rootDir: string) {
  const time = new TimeTaken();
  const buildDir = path.join(rootDir, 'build');
  const target = path.join(rootDir, 'pages');

  /* Create Directory */

  rimraf.sync(buildDir);
  fs.mkdirSync(buildDir, { recursive: true });

  /* Build App */

  const read = readdir(target);

  const $ = {
    _template: '',
    _notfound: '',
    routes: '',
    components: '',
  };

  Object.keys(read).forEach((element, index) => {
    const fn = element.substr(target.length + 1);
    const fileName = fn.substring(0, fn.length - 7);
    const fileContent = read[element];

    if (fileName.indexOf('_') === 0) {
      if (fileName === '_template') {
        $._template = fileContent;
        fs.outputFileSync(path.join(buildDir, './components/root.svelte'), fileContent);
      } else if (fileName === '_error') {
        $._notfound = fileContent;
        fs.outputFileSync(path.join(buildDir, './components/_404.svelte'), fileContent);
      }
    } else {
      let id = fileName.replace(/\[([^\]]+)\]/g, ':$1');
      id = id.replace(/\\/g, '/');
      const sp = id.split('/');
      if (sp[sp.length - 1] === 'index') {
        id = `${sp.slice(0, sp.length - 1).join('/')}`;
      }
      $.routes += `<Route path="/${id}" component={${`component${index}`}} />`;
      $.components += `import component${index} from './components/${index}.svelte';`;

      fs.outputFileSync(path.join(buildDir, `components/${index}.svelte`), fileContent);
    }
  });

  const data = `<script>export let url;import ComponentError from "./components/_404.svelte";import { Router, Route } from "svelte-routing";import Root from './components/root.svelte';${$.components}</script>\n<Router url="{url}"><Root>${$.routes}</Root></Router>`;

  fs.outputFileSync(path.join(buildDir, 'index.svelte'), data);

  /* Clone Template */

  const $template = fs.readFileSync(path.join(rootDir, 'assets/App.js'), 'utf8');

  fs.writeFileSync(path.join(buildDir, 'index.js'), $template);

  logger.info(`Done in ${String(time.get()) + 'ms'.bold}`);
}
