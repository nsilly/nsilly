import _ from 'lodash';
import { ServiceProvider } from '@nsilly/support';
import { App } from '@nsilly/container';

export default class EventServiceProvider extends ServiceProvider {
  register() {
    const eventEmitter = App.make('Event').eventEmitter;

    const listen = [];
    _.forEach(listen, item => {
      item.listeners.forEach(listener => {
        eventEmitter.on(item.event.getName(), new listener().handle);
      });
    });
  }
}
