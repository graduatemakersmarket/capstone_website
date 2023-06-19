const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'MM-DD-YY h:mm A' }), 
    winston.format.json()),
  transports: [new winston.transports.File({ filename: 'logs/makermarket.log' })],
});

module.exports = logger;