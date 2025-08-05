// src/lib/logger.ts
import pino from 'pino';
import fs from 'fs';

const logDir = './logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = pino({
  level: process.env.LOG_LEVEL || 'debug',
  transport: {
    targets: [
      {
        level: 'info',
        target: 'pino/file',
        options: {
          destination: `${logDir}/info.log`,
        },
      },
      {
        level: 'error',
        target: 'pino/file',
        options: {
          destination: `${logDir}/error.log`,
        },
      },
      {
        level: 'debug',
        target: 'pino/file',
        options: {
          destination: `${logDir}/debug.log`,
        },
      },
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    ],
  },
});

export default logger;

