import GhostContentAPI from '@tryghost/content-api'
import Vue from 'vue'

const api = new GhostContentAPI({
  url: 'https://ghost.krystalconsiders.com',
  key: process.env.KRYSTAL_GHOST_API_KEY,
  version: 'v2'
})

// inject as this.$ghost in vue components
Vue.prototype.$ghost = api

// inject into context for async data
export default ({ app }, inject) => {
  app.ghost = api
}
