import { Command, Error, Info } from './Command';
import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';

export default class MakeCommandCommand extends Command {
  signature() {
    return 'make:command <command>';
  }

  description() {
    return 'Create new command';
  }

  options() {
    return [{ key: 'override?', description: 'Override existing file' }];
  }

  async handle(command, options) {
    const file = path.resolve(__dirname, '../../Console/Commands', `${command}.js`);
    if (fs.existsSync(file) && (options.override === undefined || options.override.toString() !== 'true')) {
      Error(`${command} already exist`);
    }
    const content = `import { Command } from './Command';

export default class ${command} extends Command {
    signature() {
    // The command signature is required
    // You may pass how many argument you want
    return 'command <first_argument> <second_argument>';
    }

    description() {
    // Description is optional
    return 'The description for your command here';
    }

    options() {
    // The array of your option, it's optional
    // There are two types of options: those that receive a value and those that don't.
    // If the option_name come with ? at the end, it mean this option don't want to receive any value, it will be boolean value
    // Now command support max 6 options
    // return [{ key: 'option_name?', description: 'The description for option here' }];
    }

    async handle(first_argument, second_argument, options) {
    // Your code goes here
    }
}`;
    fse.outputFileSync(file, content);
    Info(`${file} is created`);
    process.exit();
  }
}
