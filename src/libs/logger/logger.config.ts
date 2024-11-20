import * as winston from 'winston'
import 'winston-daily-rotate-file'

import { consoleFormat } from './console-log.format'

export interface LoggerConfiguration {
  directory: string
  daysToKeepLogs: string
  fileLogLevel: string
  consoleLogLevel: string
}

export async function initializeLogger(config: LoggerConfiguration) {
  const { directory, daysToKeepLogs, fileLogLevel, consoleLogLevel } = config

  const transports: any[] = []

  const logFileOptions = {
    dirname: directory,
    zippedArchive: false,
    maxSize: '10m',
    createSymlink: true,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'HH:mm:ss.SSS' }),
      winston.format.prettyPrint(),
    ),
  }

  if (fileLogLevel && fileLogLevel !== 'null') {
    transports.push(
      new winston.transports.DailyRotateFile({
        ...logFileOptions,
        datePattern: 'YYYY-MM-DD',
        maxFiles: daysToKeepLogs,
        symlinkName: `current.log`,
        filename: `%DATE%.log`,
        level: fileLogLevel,
      }),
    )

    transports.push(
      new winston.transports.DailyRotateFile({
        ...logFileOptions,
        datePattern: 'YYYY-MM-DD',
        maxFiles: daysToKeepLogs,
        symlinkName: `errors.log`,
        filename: `err-%DATE%.log`,
        level: 'error',
      }),
    )
  }

  if (consoleLogLevel && consoleLogLevel !== 'null') {
    transports.push(
      new winston.transports.Console({
        format: consoleFormat,
        level: consoleLogLevel,
      }),
    )
  }

  const exceptionHandlers = new winston.transports.DailyRotateFile({
    ...logFileOptions,
    datePattern: 'YYYY-MM-DD',
    maxFiles: daysToKeepLogs,
    symlinkName: `exceptions.log`,
    filename: `exception-%DATE%.log`,
    level: 'error',
  })

  const logger = winston.createLogger({
    format: winston.format.json(),
    transports,
    exceptionHandlers,
  })

  return logger
}
