'use strict'

module.exports = {
  /*
      Create Product
      @param: name, description, price, currency, limited, quantity
    */
  createProduct: {
    method: 'POST',
    path: '/product',
    send_json: true,
    params: { name$: String, description: String, price$: Number, currency$: String, limited: Boolean, quantity: Number },
    param_defaults: { currency: 'NGN', limited: false },
    route_params: null
  },

  /*
      List Products
      @param:
    */
  listProduct: {
    method: 'GET',
    path: '/product',
    send_json: false,
    params: null,
    param_defaults: null,
    route_params: null
  },

  /*
      Fetch Product
      @param: id
    */
  getProduct: {
    method: 'GET',
    path: '/product/{:id}',
    send_json: false,
    params: null,
    param_defaults: null,
    route_params: { id: String }
  },

  /*
      Update Product
      @param: id, name, description, price, currency, limited, quantity
    */
  updateProduct: {
    method: 'PUT',
    path: '/product/{:id}',
    send_json: true,
    params: { name$: String, description: String, price$: Number, currency$: String, limited: Boolean, quantity: Number },
    param_defaults: { currency: 'NGN', limited: false },
    route_params: { id: String }
  }
}
