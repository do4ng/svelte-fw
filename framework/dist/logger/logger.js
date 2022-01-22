"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const time_1 = __importDefault(require("../utils/time"));
function LogInfo(message) {
    console.log(`${(0, time_1.default)().gray} ${'info'.blue} ${message}`);
}
function LogError(message) {
    console.log(`${(0, time_1.default)().gray} ${'error'.red} ${message}`);
}
function LogWarn(message) {
    console.log(`${(0, time_1.default)().gray} ${'warn'.yellow} ${message}`);
}
exports.default = {
    info: LogInfo,
    error: LogError,
    warn: LogWarn,
};
