import { Repository } from './Repository';
import User from '../../models/User';

export default class UserRepository extends Repository {
  Models() {
    return User;
  }
}
