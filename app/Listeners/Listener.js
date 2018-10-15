import path from 'path';
import { Exception } from '@nsilly/exceptions';
export class Listener {
  static getName() {
    return path.resolve(__dirname, __filename);
  }

  handle() {
    throw new Exception('method is not implemented');
  }
}
