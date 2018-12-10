import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import { RequestParser } from '@nsilly/support';
import { App } from '@nsilly/container';
import { ExceptionHandler } from '@nsilly/exceptions';
import config from '../config/app';

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

config.providers.map(provider => {
  const instance = new provider();
  instance.register();
  if (instance.boot) {
    instance.boot();
  }
});

app.use(function(req, res, next) {
  const reqd = App.make(RequestParser).createFromRequest(req, res, next);
  reqd.add(req);
  reqd.add(res);
  reqd._req = req;
  reqd.run(next);
});

app.use(ExceptionHandler);

export default app;
