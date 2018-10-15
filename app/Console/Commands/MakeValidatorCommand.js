import { Command, Error, Info } from './Command';
import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';

export default class MakeValidatorCommand extends Command {
  signature() {
    return 'make:validator <validator>';
  }

  description() {
    return 'Create validator file';
  }

  options() {
    return [{ key: 'override?', description: 'Override existing file' }];
  }

  async handle(validator, options) {
    const file = path.resolve(__dirname, '../../Validators', `${validator}.js`);
    if (fs.existsSync(file) && (options.override === undefined || options.override.toString() !== 'true')) {
      Error(`${validator} already exist`);
    }
    const content = `import { AbstractValidator } from './Validator';
export class ${validator} extends AbstractValidator {
  static getRules() {
    return {
      create: {}
    };
  }
}
`;
    fse.outputFileSync(file, content);
    Info(`${file} is created`);
    process.exit();
  }
}
