import * as winston from "winston";

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.json(),
    ),
    level: "info",
});

logger.add(new winston.transports.Console({
    format: winston.format.simple(),
}));

export default logger;

export const morganLogger = {
    write: (message, encoding) => {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};
