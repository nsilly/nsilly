import { ColorfulConsoleAdapter } from '@nsilly/log';

let adapters = [];
if (process.env.APP_ENV === 'production') {
  adapters = [];
} else {
  adapters = [new ColorfulConsoleAdapter()];
}

export default adapters;
