'use strict'

module.exports = {
  /*
  Create Pages
  @params: name, description, amount, slug, redirect_url, custom_fields
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
  @params:
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
  @params:
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
  @params: name, description, amount, active
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
    params: null,
    route_params: { slug: String }
  }
}
