import { Command, Error, Info } from './Command';
import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';

export default class MakeTransformerCommand extends Command {
  signature() {
    return 'make:transformer <transformer>';
  }

  description() {
    return 'Create new transformer file';
  }

  options() {
    return [{ key: 'override?', description: 'Override existing file' }];
  }

  async handle(transformer, options) {
    const file = path.resolve(__dirname, '../../Transformers', `${transformer}.js`);
    if (fs.existsSync(file) && (options.override === undefined || options.override.toString() !== 'true')) {
      Error(`${transformer} already exist`);
    }
    const content = `import Transformer from './Transformer';
    
export default class ${transformer} extends Transformer {
    transform(model) {
    return {};
    }
}    
`;
    fse.outputFileSync(file, content);
    Info(`${file} is created`);
    process.exit();
  }
}
