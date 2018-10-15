import { Command, Error, Info } from './Command';
import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';

export default class MakeRepositoryCommand extends Command {
  signature() {
    return 'make:repository <repository>';
  }

  description() {
    return 'Create new repository file';
  }

  options() {
    return [{ key: 'model', description: 'The name of model file' }, { key: 'override?', description: 'Override existing file' }];
  }

  async handle(repository, options) {
    const file = path.resolve(__dirname, '../../Repositories', `${repository}.js`);
    if (fs.existsSync(file) && (options.override === undefined || options.override.toString() !== 'true')) {
      Error(`${repository} already exist`);
    }
    const content = `import models from '../../models';
    import { Repository } from './Repository';
    
    export default class ${repository} extends Repository {
      Models() {
        return models.${options.model};
      }
    }
    
`;
    fse.outputFileSync(file, content);
    Info(`${file} is created`);
    process.exit();
  }
}
