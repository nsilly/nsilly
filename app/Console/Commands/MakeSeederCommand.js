import { Command, Error, Info } from './Command';
import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';
import moment from 'moment';

export default class MakeSeederCommand extends Command {
  signature() {
    return 'make:seeder <seeder>';
  }

  description() {
    return 'Create new seeder file';
  }

  options() {
    return [{ key: 'override?', description: 'Override existing file' }];
  }

  async handle(seeder, options) {
    const file = path.resolve(__dirname, '../../../database/seeders', `${moment().format('YYYYMMDD_HHmmss')}_${seeder}.js`);
    if (fs.existsSync(file) && (options.override === undefined || options.override.toString() !== 'true')) {
      Error(`${seeder} already exist`);
    }
    const content = `'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
    let items = [];

    return queryInterface.bulkInsert('table_name', items.map(item => Object.assign(item, {created_at: new Date(), updated_at: new Date()})));
    },

    down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('table_name', null, {});
    }
};`;
    fse.outputFileSync(file, content);
    Info(`${file} is created`);
    process.exit();
  }
}
