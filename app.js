import express from 'express';
import path from 'path';
import morgan from 'morgan';
import rfs from 'rotating-file-stream';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import AppRouter from './routes';
import Providers from './app/Configs/Providers';
import adapters from './config/logging';
import { Logger } from '@nsilly/log';
import { ExceptionHandler, Exception } from '@nsilly/exceptions';
import { App } from '@nsilly/container';
import { RequestParser } from '@nsilly/support';

require('dotenv').config();

var app = express();
/**
 * Parse request
 */
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Register all service that declared in /app/Configs/Providers
 */
Providers.map(provider => {
  const instance = new provider();
  instance.register();
  if (instance.boot) {
    instance.boot();
  }
});

App.make(Logger).setAdapters(adapters);

/**
 * log all requests to /storages/logs/access.log
 */
if (process.env.APP_ENABLE_ACCESS_LOG === 'true') {
  var logDirectory = path.join(__dirname, 'storages', 'logs');
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
  var accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory
  });
  app.use(morgan('combined', { stream: accessLogStream }));
}

app.use(function(req, res, next) {
  const reqd = App.make(RequestParser).createFromRequest(req, res, next);
  reqd.add(req);
  reqd.add(res);
  reqd._req = req;
  reqd.run(next);
});

app.use(AppRouter);

app.use(ExceptionHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  // res.render("error");
  throw new Exception(err.message, 404);
});

module.exports = app;
