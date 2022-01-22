"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar_1 = __importDefault(require("chokidar"));
const path_1 = require("path");
const build_1 = __importDefault(require("./build"));
const logger_1 = __importDefault(require("./logger/logger"));
chokidar_1.default
    .watch((0, path_1.resolve)(__dirname, '../../pages'), {
    persistent: true,
    ignoreInitial: false,
    awaitWriteFinish: false,
    ignorePermissionErrors: false,
})
    .on('change', (path) => {
    logger_1.default.info(`${path.bold} changed`);
    (0, build_1.default)((0, path_1.resolve)(__dirname, '../../'));
})
    .on('unlink', (path) => {
    logger_1.default.info(`${path.bold} removed`);
    (0, build_1.default)((0, path_1.resolve)(__dirname, '../../'));
});
