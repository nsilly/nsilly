import MakeCommandCommand from './Commands/MakeCommandCommand';

export class Kernel {
  commands() {
    return [MakeCommandCommand];
  }
}
