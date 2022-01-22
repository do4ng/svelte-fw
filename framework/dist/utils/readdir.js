"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function isdir(dir) {
    try {
        return fs_1.default.lstatSync(dir).isDirectory();
    }
    catch (e) {
        return false;
    }
}
let output = {};
function read(dir, out) {
    const p = fs_1.default.readdirSync(dir);
    p.forEach((e) => {
        if (isdir(path_1.default.join(dir, e))) {
            if (!fs_1.default.existsSync(path_1.default.join(out, e))) {
                fs_1.default.mkdirSync(path_1.default.join(out, e));
            }
            read(path_1.default.join(dir, e), path_1.default.join(out, e));
        }
        else {
            output[path_1.default.join(out, e)] = fs_1.default.readFileSync(path_1.default.join(dir, e), 'utf8');
        }
    });
}
function readdir(dir) {
    output = {};
    read(dir, dir);
    return output;
}
exports.default = readdir;
