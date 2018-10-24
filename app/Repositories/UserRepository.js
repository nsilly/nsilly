import { Repository } from './Repository';
import User from '../Models/User';

export default class UserRepository extends Repository {
  Models() {
    return User;
  }
}
