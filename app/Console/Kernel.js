import MakeCommandCommand from './Commands/MakeCommandCommand';
import MakeEventCommand from './Commands/MakeEventCommand';
import MakeListenerCommand from './Commands/MakeListenerCommand';
import MakeMigrationCommand from './Commands/MakeMigrationCommand';
import MakeModelCommand from './Commands/MakeModelCommand';
import MakeRepositoryCommand from './Commands/MakeRepositoryCommand';
import MakeRouterCommand from './Commands/MakeRouterCommand';
import MakeSeederCommand from './Commands/MakeSeederCommand';
import MakeTransformerCommand from './Commands/MakeTransformerCommand';
import MakeValidatorCommand from './Commands/MakeValidatorCommand';

export class Kernel {
  commands() {
    return [
      MakeCommandCommand,
      MakeEventCommand,
      MakeListenerCommand,
      MakeMigrationCommand,
      MakeModelCommand,
      MakeRepositoryCommand,
      MakeRouterCommand,
      MakeSeederCommand,
      MakeTransformerCommand,
      MakeValidatorCommand
    ];
  }
}
