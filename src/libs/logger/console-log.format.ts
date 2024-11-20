import * as winston from 'winston'

export const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.colorize(),
  winston.format.printf((info) => {
    const { message, level, timestamp } = info

    const formattedMessage = message
    const formattedLevel = level
    const formattedTimestamp = timestamp

    return `${formattedTimestamp} ${formattedLevel} ${formattedMessage}`
  }),
)
