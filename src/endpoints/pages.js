'use strict'

module.exports = {
  /*
  Create Pages
  @params: name(required), description, amount, slug, redirect_url, custom_fields
  */
  createPage: {
    method: 'POST',
    path: '/page',
    send_json: true,
    params: { name$: String, description: String, amount: Number, slug: String, redirect_url: String, custom_fields: Array },
    route_params: null
  },
  /*
  List Pages
  @params: perPage, page
  */
  listPages: {
    method: 'GET',
    path: '/page',
    send_json: false,
    params: { perPage: Number, page: Number },
    param_defaults: { perPage: 50, page: 1 },
    route_params: null
  },
  /*
  Fetch Page
  @params: id_or_slug
  */
  getPage: {
    method: 'GET',
    path: '/page/{:id_or_slug}',
    send_json: false,
    params: null,
    route_params: { id_or_slug: String }
  },
  /*
  Update Pages
  @params: id_or_slug, name, description, amount, active
  */
  updatePage: {
    method: 'PUT',
    path: '/page/{:id_or_slug}',
    send_json: true,
    params: { name$: String, description: String, amount: Number, active: Boolean },
    param_defaults: { active: true },
    route_params: { id_or_slug: String }
  },

  /*
  Check Availability Of Slug
  @params: slug
  */
  checkSlugAvailability: {
    method: 'GET',
    path: '/page/check_slug_availability/{:slug}',
    send_json: false,
    params: null,
    route_params: { slug: String }
  },

  /*
   Add Page Product
   @params: id, products
  */
  addPageProduct: {
    method: 'POST',
    path: '/page/{:id}/product',
    send_json: true,
    params: { products$: Array },
    route_params_numeric: true,
    route_params: { id: String }
  }
}
