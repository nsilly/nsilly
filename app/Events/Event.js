import path from 'path';

export class Event {
  static getName() {
    return path.resolve(__dirname, __filename);
  }

  getName() {
    return path.resolve(__dirname, __filename);
  }
}
