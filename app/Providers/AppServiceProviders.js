import { Authenticate } from '@nsilly/auth';
import { RequestParser, ServiceProvider } from '@nsilly/support';
import { App } from '@nsilly/container';
import User from '../Models/User';

export default class AppServiceProvider extends ServiceProvider {
  register() {
    App.singleton('Auth', Authenticate);
    App.singleton('Request', RequestParser);
  }
  boot() {
    App.make('Auth').setModel(User);
  }
}
