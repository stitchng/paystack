'use strict'

module.exports = {
    /*
      Create Subscription
      @param: customer, plan, authorization, start_date
    */
    createSubscription:{
      method:'POST',
      plan:'/subscription',
      send_json: true,
      params:{ customer$: String, plan$: String, authorization$: String, start_date: Date },
      route_params: null
    }
}
