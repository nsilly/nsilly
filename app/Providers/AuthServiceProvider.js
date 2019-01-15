import { ServiceProvider } from '@nsilly/support';
import { strategy } from '../../config/auth';
import passport from 'passport';
import { App } from '@nsilly/container';
import { Authenticate } from '@nsilly/auth';

export class AuthServiceProvider extends ServiceProvider {
  register() {
    App.singleton('Auth', Authenticate);
    App.singleton('AuthStrategy', strategy);
    passport.use(App.make('AuthStrategy').get());
    App.useValue('AuthGate', passport);
  }
  boot() {}
}
