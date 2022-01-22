"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function GetTime(date = new Date()) {
    return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
}
exports.default = GetTime;
