import AppServiceProvider from '../Providers/AppServiceProviders';
import EventServiceProvider from '../Providers/EventServiceProvider';
import { LoggerServiceProvider } from '@nsilly/log';

const Providers = [AppServiceProvider, LoggerServiceProvider, EventServiceProvider];

export default Providers;
