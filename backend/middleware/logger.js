import winston from "winston";
import expressWinston from "express-winston";
// The winston.format function allows us to customize how our logs
// are formatted. In this case, we are using a built-in timestamp
// format, as well as Winston's generic printf method.
const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.colorize(), // Adds colors to the levels (npm test will look even better!)
  winston.format.printf(
    ({ level, message, meta, timestamp }) =>
      // Added a check for meta to prevent crashes
      `${timestamp} ${level}: ${meta?.error?.stack || message}`,
  ),
);

// The request logger, with two different "transports". One transport
// logs to a file, the other logs to the console.
export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: "request.log",
      format: winston.format.json(),
    }),
  ],
  // This ensures the metadata is actually captured
  meta: true, 
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true, // Use the default Express log format
  colorize: false,     // Keep this false for file logs/json
});

// error logger
export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: "error.log",
      format: winston.format.json(),
    }),
  ],
});
