"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const rimraf_1 = __importDefault(require("rimraf"));
const logger_1 = __importDefault(require("./logger/logger"));
const readdir_1 = __importDefault(require("./utils/readdir"));
const timeTaken_1 = __importDefault(require("./utils/timeTaken"));
function BuildApp(rootDir) {
    const time = new timeTaken_1.default();
    const buildDir = path_1.default.join(rootDir, 'build');
    const target = path_1.default.join(rootDir, 'pages');
    /* Create Directory */
    rimraf_1.default.sync(buildDir);
    fs_extra_1.default.mkdirSync(buildDir, { recursive: true });
    /* Build App */
    const read = (0, readdir_1.default)(target);
    const $ = {
        _template: '',
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
                fs_extra_1.default.outputFileSync(path_1.default.join(buildDir, './components/root.svelte'), fileContent);
            }
        }
        else {
            let id = fileName.replace(/\[([^\]]+)\]/g, ':$1');
            id = id.replace(/\\/g, '/');
            const sp = id.split('/');
            if (sp[sp.length - 1] === 'index') {
                id = `${sp.slice(0, sp.length - 1).join('/')}`;
            }
            $.routes += `<Route path="/${id}" component={${`component${index}`}} />`;
            $.components += `import component${index} from './components/${index}.svelte';`;
            fs_extra_1.default.outputFileSync(path_1.default.join(buildDir, `components/${index}.svelte`), fileContent);
        }
    });
    const data = `<script>export let url;import { Router, Route } from "svelte-routing";import Root from './components/root.svelte';${$.components}</script>\n<Router url="{url}"><Root>${$.routes}</Root></Router>`;
    fs_extra_1.default.outputFileSync(path_1.default.join(buildDir, 'index.svelte'), data);
    /* Clone Template */
    const $template = fs_extra_1.default.readFileSync(path_1.default.join(rootDir, 'assets/App.js'), 'utf8');
    fs_extra_1.default.writeFileSync(path_1.default.join(buildDir, 'index.js'), $template);
    logger_1.default.info(`Done in ${String(time.get()) + 'ms'.bold}`);
}
exports.default = BuildApp;
