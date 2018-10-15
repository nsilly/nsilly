import { BadRequestHttpException } from '@nsilly/exceptions';
import _ from 'lodash';
import Validator from 'validator';

// check if the value is required
export const REQUIRED = 'required';
// check if the string is an email.
export const IS_EMAIL = 'isEmail';
// check if the string contains ASCII chars only.
export const IS_ASCII = 'isAscii';
// check if a string is base64 encoded.
export const IS_BASE64 = 'isBase64';
// check if a string is a boolean.
export const IS_BOOLEAN = 'isBoolean';
// check if the string's length (in UTF-8 bytes) falls in a range.
export const IS_BYTE_LENGTH = 'isByteLength';
// check if the string is a credit card.
export const IS_CREDIT_CARD = 'isCreditCard';
// check if the string is a data uri format.
export const IS_DATA_URI = 'isDataURI';
// check if the string represents a decimal number, such as 0.1, .3, 1.1, 1.00003, 4.0, etc.
export const IS_DECIMAL = 'isDecimal';
// check if the string has a length of zero.
export const IS_EMPTY_STRING = 'isEmpty';
// check if the string is a fully qualified domain name (e.g. domain.com).
export const IS_FQDN = 'isFQDN';
// check if the string is a float.
export const IS_FLOAT = 'isFloat';
// check if the string is a hexadecimal color.
export const IS_HEX_COLOR = 'isHexColor';
// check if the string is a hexadecimal number.
export const IS_HEX_DECIMAL = 'isHexadecimal';
// check if the string is an IP (version 4 or 6).
export const IS_IP = 'isIP';
// check if the string is an ISBN (version 10 or 13).
export const IS_ISBN = 'isISBN';
// check if the string is an ISSN.
export const IS_ISSN = 'isISSN';
// check if the string is a valid ISO 8601 date.
export const IS_ISO_DATE = 'isISO8601';
// check if the string is an integer.
export const IS_INT = 'isInt';
// check if the string is lowercase.
export const IS_LOWER_CASE = 'isLowercase';
// check if the string is a MAC address.
export const IS_MAC_ADDRESS = 'isMACAddress';
// check if the string is a MD5 hash
export const IS_MD5 = 'isMD5';
// check if the string matches to a valid MIME type format
export const IS_MIME_TYPE = 'isMimeType';
// check if the string contains only numbers.
export const IS_NUMBERIC = 'isNumeric';
// check if the string is a valid port number.
export const IS_PORT = 'isPort';
// check if the string is a postal code
export const IS_POSTAL_CODE = 'isPostalCode';
// check if the string is an URL
export const IS_URL = 'isURL';
// check if the string is a UUID (version 3, 4 or 5)
export const IS_UUID = 'isUUID';
// check if the string is uppercase
export const IS_UPPER_CASE = 'isUppercase';

const minLengthPattern = /^min:(\d+)$/;
const maxLengthPattern = /^max:(\d+)$/;

export class AbstractValidator {
  static isValid(data, key) {
    const rule = this.getRule(key);
    for (const field in rule) {
      if (!_.isArray(rule[field])) {
        throw new BadRequestHttpException('Validation rule should be an array', 4009);
      }
      _.forEach(rule[field], criteria => {
        const isValid = this.validate(criteria, data[field]);
        if (_.isBoolean(isValid) && !isValid) {
          let message = 'Validation error';
          switch (criteria) {
            case REQUIRED:
              message = `The ${field} is required`;
              break;
            case IS_EMAIL:
              message = `The ${field} must be a valid email address.`;
              break;
            case IS_ASCII:
              message = `The ${field} must contains ASCII chars only`;
              break;
            case IS_BASE64:
              message = `The ${field} must contains base64 encoded.`;
              break;
            case IS_BOOLEAN:
              message = `The ${field} field must be true or false.`;
              break;
            case IS_CREDIT_CARD:
              message = `The ${field} field must be credit card string`;
              break;
            case IS_DECIMAL:
              message = `The ${field} field must be a decimal number`;
              break;
            case IS_FLOAT:
              message = `The ${field} field must be a float number`;
              break;
            case IS_HEX_COLOR:
              message = `The ${field} field must be a hexadecimal color`;
              break;
            case IS_HEX_DECIMAL:
              message = `The ${field} field must be a hexadecimal number`;
              break;
            case IS_IP:
              message = `The ${field} field must be an IP (version 4 or 6)`;
              break;
            case IS_ISO_DATE:
              message = `The ${field} field must be a valid ISO 8601 date`;
              break;
            case IS_INT:
              message = `The ${field} field must be a integer`;
              break;
            case IS_LOWER_CASE:
              message = `The ${field} field must be a lowercase string`;
              break;
            case IS_MAC_ADDRESS:
              message = `The ${field} field must be a MAC address`;
              break;
            case IS_MD5:
              message = `The ${field} field must be a md5 hash`;
              break;
            case IS_URL:
              message = `The ${field} field must be a valid url`;
              break;
            case IS_UPPER_CASE:
              message = `The ${field} field must be a uppercase string`;
              break;
          }
          if (minLengthPattern.test(criteria)) {
            message = `The ${field} must be at least ${criteria.match(minLengthPattern)[1]} characters`;
          }
          if (maxLengthPattern.test(criteria)) {
            message = `The ${field} may not be greater than ${criteria.match(maxLengthPattern)[1]} characters`;
          }
          throw new BadRequestHttpException(message, 1000);
        }
      });
    }
  }

  static validate(criteria, value) {
    if (_.isUndefined(value)) {
      if (criteria !== REQUIRED) {
        return true;
      } else {
        return false;
      }
    } else {
      if (_.isString(criteria)) {
        value = value + '';
        if (criteria === REQUIRED) {
          return !_.isNil(value) && value !== '';
        }
        if (minLengthPattern.test(criteria)) {
          return value.length >= criteria.match(minLengthPattern)[1];
        }
        if (maxLengthPattern.test(criteria)) {
          return value.length <= criteria.match(maxLengthPattern)[1];
        }
        return Validator[criteria].apply(null, [value]);
      } else if (_.isFunction(criteria)) {
        return criteria.apply(null, [value]);
      } else {
        throw new BadRequestHttpException('Validation criteria should be a supported method or a function', 4010);
      }
    }
  }
  static getRule(key) {
    const rules = this.getRules();
    if (_.isUndefined(rules[key])) {
      throw new BadRequestHttpException('Can not find validation', 4008);
    }
    return rules[key];
  }
}
