import { Command, Error, Info } from './Command';
import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';

export default class MakeEventCommand extends Command {
  signature() {
    return 'make:event <event>';
  }

  description() {
    return 'Create new event file';
  }

  options() {
    return [{ key: 'override?', description: 'Override existing file' }];
  }

  async handle(event, options) {
    const file = path.resolve(__dirname, '../../../app/Events', `${event}.js`);
    if (fs.existsSync(file) && (options.override === undefined || options.override.toString() !== 'true')) {
      Error(`${event} already exist`);
    }
    const content = `import { Event } from './Event';
    import path from 'path';
    
    export class ${path.basename(file, '.js')} extends Event {
      // constructor() {
      //   super();
      // }
    
      static getName() {
        return path.resolve(__dirname, __filename);
      }
    
      getName() {
        return path.resolve(__dirname, __filename);
      }
    }
`;
    fse.outputFileSync(file, content);
    Info(`${file} is created`);
    process.exit();
  }
}
