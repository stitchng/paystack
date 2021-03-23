'use strict'

/* Charging banks & cards are split into two separate method APIs */

module.exports = {
  /*
   Bulk Charge
   @param: (array of objects)
  */
  bulkCharge: {
    method: 'POST',
    path: '/bulkcharge',
    send_json: true,
    params: { },
    param_defaults: null,
    route_params: null
  }
}
