'use strict'

module.exports = {
  /*
   List Card
   @param: perPage, page
  */
  listBanks: {
    method: 'GET',
    path: '/bank',
    send_json: true,
    params: { perPage: Number, page: Number },
    param_defaults: { perPage: 50, page: 1 },
    route_params: null
  }
}
