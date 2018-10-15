import { Command, Error, Info } from './Command';
import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

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
    const file = path.resolve(__dirname, '../../../models', `${model}.js`);
    if (fs.existsSync(file) && (options.override === undefined || options.override.toString() !== 'true')) {
      Error(`${model} already exist`);
    }
    const content = `export default function(sequelize, DataTypes) {
    const opt = {};
    var ${model} = sequelize.define(
    '${_.snakeCase(model)}',
    {
        // column: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     defaultValue: ''
        // }
    },
    sequelize.stUtil.defaultOptions(opt, {
        // freezeTableName: true,
        underscored: true
    })
    );
    // ${model}.associate = models => {};
    return ${model};
}  
`;
    fse.outputFileSync(file, content);
    Info(`${file} is created`);
    process.exit();
  }
}
