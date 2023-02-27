const { format, createLogger, transports, addColors } = require("winston");
const { combine, timestamp, label, printf } = format;
require("winston-daily-rotate-file");

// Log Format
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

// Logger Transports
const transportsList = [
  new transports.Console(),
  new transports.DailyRotateFile({
      name: 'error',
      filename: 'logs/ERROR-%DATE%.log',
      datePattern: 'DD-MMM-YYYY',
      level: 'error',
      format: format.combine(format.uncolorize()),
  }),
  new transports.DailyRotateFile({
      name: 'info',
      filename: 'logs/INFO-%DATE%.log',
      datePattern: 'DD-MMM-YYYY',
      level: 'info',
      format: format.combine(format.uncolorize()),
  }),
  new transports.DailyRotateFile({
    name: 'debug',
    filename: 'logs/DEBUG-%DATE%.log',
    datePattern: 'DD-MMM-YYYY',
    level: 'debug',
    format: format.combine(format.uncolorize()),
    silent: process.env.ENV === 'production',
  })
];

// Levels
const logLevels = {
  levels: {
    info: 0,
    error: 1,
    debug: 2,
  },
  colors: {
    info: 'blue',
    error: 'red',
    debug: 'yellow',
  }
};

// Create Logger
const logger = createLogger({
  levels: logLevels.levels,
  format: combine(label({ label: 'Logger' }), timestamp(), logFormat),
  transports: transportsList,
});

// Pass Colours
addColors(logLevels.colors);

// Development Mode Logging Level Ternary
process.env.ENV === 'development' ? logger.level = 'debug' : null;

// Export Logger
module.exports = logger;
