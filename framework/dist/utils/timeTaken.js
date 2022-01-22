"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimeTaken {
    constructor() {
        this.startTime = Date.now();
    }
    get() {
        return Date.now() - this.startTime;
    }
}
exports.default = TimeTaken;
