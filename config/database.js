require('dotenv').config();

let config;
if (process.env.DB_SOCKET_PATH !== undefined && process.env.DB_SOCKET_PATH !== '') {
  config = {
    development: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: process.env.DB_CONNECTION,
      port: process.env.DB_PORT,
      dialectOptions: { socketPath: process.env.DB_SOCKET_PATH }
    },
    test: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: process.env.DB_CONNECTION,
      port: process.env.DB_PORT,
      dialectOptions: { socketPath: process.env.DB_SOCKET_PATH }
    },
    production: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: process.env.DB_CONNECTION,
      port: process.env.DB_PORT,
      dialectOptions: { socketPath: process.env.DB_SOCKET_PATH },
      logging: false
    }
  };
} else {
  config = {
    development: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: process.env.DB_CONNECTION,
      port: process.env.DB_PORT
    },
    test: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: process.env.DB_CONNECTION,
      port: process.env.DB_PORT
    },
    production: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: process.env.DB_CONNECTION,
      port: process.env.DB_PORT,
      logging: false
    }
  };
}
module.exports = config;
