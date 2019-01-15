import AppServiceProvider from '../app/Providers/AppServiceProviders';
import EventServiceProvider from '../app/Providers/EventServiceProvider';
import { LoggerServiceProvider } from '@nsilly/log';
import { AuthServiceProvider } from '../app/Providers/AuthServiceProvider';

export default {
  providers: [AppServiceProvider, AuthServiceProvider, LoggerServiceProvider, EventServiceProvider]
};
