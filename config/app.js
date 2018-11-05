import AppServiceProvider from '../app/Providers/AppServiceProviders';
import EventServiceProvider from '../app/Providers/EventServiceProvider';
import { LoggerServiceProvider } from '@nsilly/log';

export default {
  providers: [AppServiceProvider, LoggerServiceProvider, EventServiceProvider]
};
