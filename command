#!/usr/bin/env node

import program from 'commander';
import { Kernel } from './app/Console/Kernel';
import _ from 'lodash';
import { Exception } from '@nsilly/exceptions';
// App.resolveAppProviders();

program.version('1.0.0');
const kernel = new Kernel();
const commands = kernel.commands();

_.forEach(commands, command => {
  const instance = new command();
  if (_.isFunction(instance.options) && _.isArray(instance.options()) && instance.options().length > 0) {
    const options = instance.options();
    for (const option of options) {
      if (_.isUndefined(option.key)) {
        throw new Exception('Option key is required', 1);
      }
      if (_.isUndefined(option.description)) {
        throw new Exception(`"${option.key}" option must have description`, 1);
      }
    }
    switch (options.length) {
      case 1:
        program
          .command(instance.signature())
          .description(instance.description())
          .option(options[0].key.slice(-1) === '?' ? `--${options[0].key.slice(0, -1)}` : `--${options[0].key} <${options[0].key}>`, options[0].description)
          .action(instance.handle);
        break;
      case 2:
        program
          .command(instance.signature())
          .description(instance.description())
          .option(options[0].key.slice(-1) === '?' ? `--${options[0].key.slice(0, -1)}` : `--${options[0].key} <${options[0].key}>`, options[0].description)
          .option(options[1].key.slice(-1) === '?' ? `--${options[1].key.slice(0, -1)}` : `--${options[1].key} <${options[1].key}>`, options[1].description)
          .action(instance.handle);
        break;
      case 3:
        program
          .command(instance.signature())
          .description(instance.description())
          .option(options[0].key.slice(-1) === '?' ? `--${options[0].key.slice(0, -1)}` : `--${options[0].key} <${options[0].key}>`, options[0].description)
          .option(options[1].key.slice(-1) === '?' ? `--${options[1].key.slice(0, -1)}` : `--${options[1].key} <${options[1].key}>`, options[1].description)
          .option(options[2].key.slice(-1) === '?' ? `--${options[2].key.slice(0, -1)}` : `--${options[2].key} <${options[2].key}>`, options[2].description)
          .action(instance.handle);
        break;
      case 4:
        program
          .command(instance.signature())
          .description(instance.description())
          .option(options[0].key.slice(-1) === '?' ? `--${options[0].key.slice(0, -1)}` : `--${options[0].key} <${options[0].key}>`, options[0].description)
          .option(options[1].key.slice(-1) === '?' ? `--${options[1].key.slice(0, -1)}` : `--${options[1].key} <${options[1].key}>`, options[1].description)
          .option(options[2].key.slice(-1) === '?' ? `--${options[2].key.slice(0, -1)}` : `--${options[2].key} <${options[2].key}>`, options[2].description)
          .option(options[3].key.slice(-1) === '?' ? `--${options[3].key.slice(0, -1)}` : `--${options[3].key} <${options[3].key}>`, options[3].description)
          .action(instance.handle);
        break;
      case 5:
        program
          .command(instance.signature())
          .description(instance.description())
          .option(options[0].key.slice(-1) === '?' ? `--${options[0].key.slice(0, -1)}` : `--${options[0].key} <${options[0].key}>`, options[0].description)
          .option(options[1].key.slice(-1) === '?' ? `--${options[1].key.slice(0, -1)}` : `--${options[1].key} <${options[1].key}>`, options[1].description)
          .option(options[2].key.slice(-1) === '?' ? `--${options[2].key.slice(0, -1)}` : `--${options[2].key} <${options[2].key}>`, options[2].description)
          .option(options[3].key.slice(-1) === '?' ? `--${options[3].key.slice(0, -1)}` : `--${options[3].key} <${options[3].key}>`, options[3].description)
          .option(options[4].key.slice(-1) === '?' ? `--${options[4].key.slice(0, -1)}` : `--${options[4].key} <${options[4].key}>`, options[4].description)
          .action(instance.handle);
        break;
      default:
        program
          .command(instance.signature())
          .description(instance.description())
          .option(options[0].key.slice(-1) === '?' ? `--${options[0].key.slice(0, -1)}` : `--${options[0].key} <${options[0].key}>`, options[0].description)
          .option(options[1].key.slice(-1) === '?' ? `--${options[1].key.slice(0, -1)}` : `--${options[1].key} <${options[1].key}>`, options[1].description)
          .option(options[2].key.slice(-1) === '?' ? `--${options[2].key.slice(0, -1)}` : `--${options[2].key} <${options[2].key}>`, options[2].description)
          .option(options[3].key.slice(-1) === '?' ? `--${options[3].key.slice(0, -1)}` : `--${options[3].key} <${options[3].key}>`, options[3].description)
          .option(options[4].key.slice(-1) === '?' ? `--${options[4].key.slice(0, -1)}` : `--${options[4].key} <${options[4].key}>`, options[4].description)
          .option(options[5].key.slice(-1) === '?' ? `--${options[5].key.slice(0, -1)}` : `--${options[5].key} <${options[5].key}>`, options[5].description)
          .action(instance.handle);
        break;
    }
  } else {
    program
      .command(instance.signature())
      .description(instance.description())
      .action(instance.handle);
  }
});
program.parse(process.argv);
