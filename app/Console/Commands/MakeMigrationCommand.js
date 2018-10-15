import { Command, Error, Info } from './Command';
import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import moment from 'moment';

export default class MakeMigrationCommand extends Command {
  signature() {
    return 'make:migration <migration>';
  }

  description() {
    return 'Create migration file';
  }

  options() {
    return [{ key: 'override?', description: 'Override existing file' }, { key: 'create', description: 'Table to create' }, { key: 'update', description: 'Table to update' }];
  }

  async handle(migration, options) {
    const file = path.resolve(__dirname, '../../../database/migrations', `${moment().format('YYYYMMDD_HHmmss')}_${migration}.js`);
    if (fs.existsSync(file) && (options.override === undefined || options.override.toString() !== 'true')) {
      Error(`${migration} already exist`);
    }
    let content = '';

    if (!_.isNil(options.create) && options.create !== '') {
      content = `"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(function handleTransaction(t) {
          return Promise.all([
            queryInterface.createTable("${options.create}", {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                created_at: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updated_at: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            })
          ]) 
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(function handleTransaction(t) {
            return Promise.all([
                queryInterface.dropTable('${options.create}')
            ])
        })
    }
};`;
    } else if (!_.isNil(options.update) && options.update !== '') {
      content = `'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(function handleTransaction(t) {
            return Promise.all([
                // queryInterface.addColumn('${options.update}', 'column_name', {
                //     type: Sequelize.BOOLEAN,
                //     validate: {
                //         notEmpty: true
                //     },
                //     defaultValue: false
                // })
            ]);
          });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(function handleTransaction(t) {
            // return [queryInterface.removeColumn("${options.update}", "column_name")];
        });
    }
};`;
    } else {
      content = `"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(function handleTransaction(t) {
            return Promise.all([
                queryInterface.createTable("table_name", {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER
                    },
                    created_at: {
                        allowNull: false,
                        type: Sequelize.DATE
                    },
                    updated_at: {
                        allowNull: false,
                        type: Sequelize.DATE
                    }
                })
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(function handleTransaction(t) {
            return Promise.all([
                queryInterface.dropTable('table_name')
            ])
        })
    }
};`;
    }
    fse.outputFileSync(file, content);
    Info(`${file} is created`);
    process.exit();
  }
}
