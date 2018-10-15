import { AbstractValidator, REQUIRED, IS_EMAIL, IS_INT } from './Validator';
import constants from '../../constants';
import { Exception } from '@nsilly/exceptions';
import _ from 'lodash';

export const CREATE_USER_RULE = 'create_user';
export const RULE_SAVE_USER_IMAGE = 'save_user_image';
export const CHANGE_PASSWORD = 'change_password';

export class UserValidator extends AbstractValidator {
  static getRules() {
    return {
      [CREATE_USER_RULE]: {
        email: [REQUIRED, IS_EMAIL],
        password: [REQUIRED, 'min:6', 'max:20'],
        first_name: [REQUIRED, 'max:40'],
        last_name: [REQUIRED, 'max:40'],
        role_id: [REQUIRED, IS_INT],
        gender: [
          gender => {
            if (!_.includes(constants.GENDER, gender)) {
              throw new Exception(`gender allow those value ${constants.GENDER.join(', ')} only`, 1000);
            }
            return true;
          }
        ]
      },
      [RULE_SAVE_USER_IMAGE]: {
        url: [REQUIRED],
        type: [REQUIRED]
      },
      [CHANGE_PASSWORD]: {
        password: [REQUIRED, 'min:6', 'max:40']
      }
    };
  }
}
