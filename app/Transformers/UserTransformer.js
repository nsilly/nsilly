import Transformer from './Transformer';
import CustomerTransformer from './CustomerTransformer';
import RoleTransformer from './RoleTransformer';
import OrderTransformer from './OrderTransformer';
import RetailerTransformer from './RetailerTransformer';
import ImageTransformer from './ImageTransformer';
import MerchantTransformer from './MerchantTransformer';

export default class UserTransformer extends Transformer {
  transform(model) {
    return {
      id: model.id,
      email: model.email,
      status: model.status,
      created_at: model.created_at,
      updated_at: model.updated_at,
      last_login: model.last_login
    };
  }

  includeCustomer(model) {
    return this.item(model.customer, new CustomerTransformer());
  }

  includeRetailer(model) {
    return this.item(model.retailer, new RetailerTransformer());
  }
  includeMerchant(model) {
    return this.item(model.merchant, new MerchantTransformer());
  }

  includeRoles(model) {
    return this.collection(model.roles, new RoleTransformer(['permissions']));
  }

  includeOrders(model) {
    return this.collection(model.orders, new OrderTransformer());
  }

  includeImages(model) {
    return this.collection(model.images, new ImageTransformer());
  }
}
