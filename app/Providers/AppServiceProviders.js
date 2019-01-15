import { RequestParser, ServiceProvider } from '@nsilly/support';
import { App } from '@nsilly/container';

export default class AppServiceProvider extends ServiceProvider {
  register() {
    App.singleton('Request', RequestParser);
  }
}
