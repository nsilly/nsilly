import { Command, Error, Info } from './Command';
import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';

export default class MakeModelCommand extends Command {
  signature() {
    return 'make:model <model>';
  }

  description() {
    return 'Create new model file';
  }

  options() {
    return [{ key: 'override?', description: 'Override existing file' }];
  }

  async handle(model, options) {
    const file = path.resolve(__dirname, '../../../app/Models', `${model}.js`);
    if (fs.existsSync(file) && (options.override === undefined || options.override.toString() !== 'true')) {
      Error(`${model} already exist`);
    }
    const content = `import Sequelize from 'sequelize';
    import sequelize from '../../config/sequelize';
    
    const ${path.basename(file, '.js')} = sequelize.define(
      '${path.basename(file, '.js').toLowerCase()}',
      {
        // column: {
        //     type: Sequelize.STRING,
        //     allowNull: false,
        //     defaultValue: ''
        // }
      },
      {
        underscored: true,
        paranoid: false
      }
    );
    
    export default ${path.basename(file, '.js')};
      
`;
    fse.outputFileSync(file, content);
    Info(`${file} is created`);
    process.exit();
  }
}
