"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
var winston = require('winston');
require('winston-daily-rotate-file');
var postErrLevel1 = new winston.transports.DailyRotateFile({
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'post-info-%DATE%.log',
    dirname: './src/dailylog/post-error-log',
    maxFiles: 2,
    json: true,
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.prettyPrint())
});
var postErrLevel2 = new winston.transports.DailyRotateFile({
    level: 'error',
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'post-error-%DATE%.log',
    dirname: './src/dailylog/post-error-log',
    maxFiles: 2,
    json: true,
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.prettyPrint())
});
var postInfoLogger = winston.createLogger({
    level: 'info',
    transports: [
        postErrLevel1
    ]
});
var postErrorLogger = winston.createLogger({
    transports: [
        postErrLevel2
    ]
});
var userErrLevel1 = new winston.transports.DailyRotateFile({
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'user-info-%DATE%.log',
    dirname: './src/dailylog/user-error-log',
    maxFiles: 2,
    json: true,
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.prettyPrint())
});
var userErrLevel2 = new winston.transports.DailyRotateFile({
    level: 'error',
    datePattern: 'YYYY-MM-DD-HH-mm',
    filename: 'user-error-%DATE%.log',
    dirname: './src/dailylog/user-error-log',
    maxFiles: 2,
    json: true,
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.prettyPrint())
});
var userInfoLogger = winston.createLogger({
    level: 'info',
    transports: [
        userErrLevel1
    ]
});
var userErrorLogger = winston.createLogger({
    transports: [
        userErrLevel2
    ]
});
module.exports = { postInfoLogger, postErrorLogger, userInfoLogger, userErrorLogger };
