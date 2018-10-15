import { Command, Error, Info } from './Command';
import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';

export default class MakeListenerCommand extends Command {
  signature() {
    return 'make:listener <listener>';
  }

  description() {
    return 'Create new listener file';
  }

  options() {
    return [{ key: 'override?', description: 'Override existing file' }];
  }

  async handle(listener, options) {
    const file = path.resolve(__dirname, '../../../app/Listeners', `${listener}.js`);
    if (fs.existsSync(file) && (options.override === undefined || options.override.toString() !== 'true')) {
      Error(`${listener} already exist`);
    }
    const content = `import { Listener } from './Listener';
    
    export class ${path.basename(file, '.js')} extends Listener {
      async handle(event) {}
    }
`;
    fse.outputFileSync(file, content);
    Info(`${file} is created`);
    process.exit();
  }
}
