import Transformer from './Transformer';

export default class UserTransformer extends Transformer {
  transform(model) {
    return {
      id: model.id,
      email: model.email,
      status: model.status,
      created_at: model.created_at,
      updated_at: model.updated_at
    };
  }
}
