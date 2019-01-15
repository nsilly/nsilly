import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import AppRouter from './routes';
import adapters from './config/logging';
import config from './config/app';
import { Logger } from '@nsilly/log';
import { ExceptionHandler, Exception } from '@nsilly/exceptions';
import { App } from '@nsilly/container';
import httpContext from 'express-http-context';

require('dotenv').config();

var app = express();
/**
 * Parse request
 */
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(httpContext.middleware);

/**
 * Register all service that declared in /app/Configs/Providers
 */
config.providers.map(provider => {
  const instance = new provider();
  instance.register();
  if (instance.boot) {
    instance.boot();
  }
});

App.make(Logger).setAdapters(adapters);

app.use(function(req, res, next) {
  httpContext.set('data', req);
  next();
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
