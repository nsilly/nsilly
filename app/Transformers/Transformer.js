import _ from 'lodash';
import { Exception } from '@nsilly/exceptions';

export default class Transformer {
  constructor(includes = []) {
    this.includes = includes;
  }

  item(obj, transformer) {
    if (_.isNil(obj)) {
      return null;
    }
    return { data: transformer.get(obj) };
  }

  collection(collection, transformer) {
    if (!_.isArray(collection)) {
      return [];
    }
    const data = _.map(collection, i => {
      return transformer.get(i);
    });
    return { data: data };
  }

  get(model) {
    const data = this.transform(model);
    if (this.includes.length > 0) {
      _.forEach(this.includes, include => {
        const f = _.camelCase(`include_${include}`);
        if (!_.isFunction(this[f])) {
          throw new Exception(`${f} function is missing`, 1000);
        }
        data[include] = this[f](model);
      });
    }
    return data;
  }

  with(include) {
    this.includes.push(include);
    return this;
  }
}
