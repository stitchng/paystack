'use strict'

module.exports = {
  /*
    List Disputes
    @params: from, to, page, perPage, transaction
  */
  listDisputes: {
    method: 'GET',
    path: '/dispute',
    send_json: false,
    params: { from: Date, to: Date, page: Number, perPage: Number, transaction: Number },
    param_defaults: { page: 1, perPage: 10 },
    route_params: null
  }
}
