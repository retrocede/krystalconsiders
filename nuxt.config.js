import GhostContentAPI from '@tryghost/content-api'
const nodeExternals = require('webpack-node-externals')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const api = new GhostContentAPI({
  url: 'https://ghost.krystalconsiders.com',
  key: process.env.KRYSTAL_GHOST_API_KEY,
  version: 'v2'
})

function generateRoutes () {
  return api.posts
    .browse()
    .then(posts => {
      return posts.map(post => {
        return {
          route: `/${post.slug}`,
          payload: post
        }
      })
    })
}

module.exports = {
  /*
  ** env vars
  */
  env: {
    ghostApiKey: process.env.KRYSTAL_GHOST_API_KEY || ''
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'krystalconsiders',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Krystals Blog Frontend' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/ghost-api.js'
  ],
  css: ['~/assets/style/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Generate configuration
  */
  generate: {
    routes: generateRoutes
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^vuetify/],
    plugins: [
      new VuetifyLoaderPlugin()
    ],
    extractCSS: true,
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
