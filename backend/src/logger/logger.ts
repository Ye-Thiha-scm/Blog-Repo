// import { createLogger, format, Logger, transports } from 'winston';


import { format } from "winston";
var winston = require('winston');
require('winston-daily-rotate-file');
// import 'winston-daily-rotate-file';


// export const logger = createLogger({
//   transports: [
//     new transports.DailyRotateFile({
//       dirname:"logs",
//       filename: "api-%DATE%.log",
//       maxSize: '20m',
//       maxFiles: '1d',
//       format: format.combine(

//         format.json()),
//     }),
//     new transports.Console({
//       format: format.combine(
//         format.colorize(),
//         format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
//         format.printf(({ timestamp, level, message }) => {
//           return `[${timestamp}] ${level}: ${message}`;
//         })
//       ),
//     }),
//   ],
//   format: format.combine(
//     format.metadata(),
//     format.timestamp({format:'YYYY-MM-DD HH:mm:ss'})),
// });

var postErrLevel1 = new winston.transports.DailyRotateFile({
  datePattern: 'YYYY-MM-DD-HH-mm',
  filename: 'post-info-%DATE%.log',
  dirname: './src/dailylog/post-error-log',
  maxFiles: 2,
  json: true,
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var postErrLevel2 = new winston.transports.DailyRotateFile({
  level: 'error',
  datePattern: 'YYYY-MM-DD-HH-mm',
  filename: 'post-error-%DATE%.log',
  dirname: './src/dailylog/post-error-log',
  maxFiles: 2,
  json: true,
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
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
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
});

var userErrLevel2 = new winston.transports.DailyRotateFile({
  level: 'error',
  datePattern: 'YYYY-MM-DD-HH-mm',
  filename: 'user-error-%DATE%.log',
  dirname: './src/dailylog/user-error-log',
  maxFiles: 2,
  json: true,
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint())
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

module.exports = { postInfoLogger, postErrorLogger, userInfoLogger, userErrorLogger }

 