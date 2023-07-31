const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf, simple, colorize } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
  file: combine(
    label({
      label: "백엔드 맛보기",
    }),
    //colorize(),
    timestamp({
      format: "YYYY-MM-DD HH:mm:dd",
    }),
    printFormat
  ),
  console: combine(colorize(), simple()),
};

const opts = {
  file: new transports.File({
    filename: "access.log",
    dirname: "./logs",
    level: "info",
    format: printLogFormat.file,
  }),
  console: new transports.Console({
    level: "info",
    format: printLogFormat.console,
  }),
};

const logger = createLogger({
  transports: [opts.file],
});

//실제 서비스중인 서버 인지, 개발중인 서버인지 체크 (production -> 실제 서비스중)
if (process.env.NODE_ENV !== "production") {
  logger.add(opts.console);
}

logger.stream = {
  write: (message) => logger.info(message),
};

module.exports = logger;
