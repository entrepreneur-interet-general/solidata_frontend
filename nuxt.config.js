const configApp = {
  port: process.env.NODE_ENV === 'production' ? 8000 : 3000
}
module.exports = {

  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'solidata',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'clean, transform, enrich and share your data' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico?v=3' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css' }
    ]
  },

  // for build or dev
  // https://nuxtjs.org/faq/host-port/
  server: {
    port: configApp.port, // 3000
    host: 'localhost' // XXX.XX.XX.XX
  },

  // dev: (process.env.NODE_ENV !== 'production'),

  // custom env variables for nuxt
  // cf : https://github.com/nuxt/nuxt.js/issues/1789
  env: {
    DEV_API: 'http://localhost:4000',
    PROD_API: '/solidata.api.co-demos.com',
    DEBUG: process.env.NODE_ENV === 'development',
    CONFIG_APP: configApp
  },

  router: {
    middleware: [
      'i18n',
      'checkTokens'
      // 'getListItems',
    ]
  },

  toast: {
    position: 'top-right',
    duration: 2000
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast'
  ],

  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/i18n.js',
    '~/plugins/axios',
    '~plugins/text_filters.js',
    {src: '@/plugins/vueParticles.js', ssr: false},

    // '~plugins/vue-scroll',

    {src: '~/plugins/encrypt', ssr: false}
    // '~/plugins/crypto',

    // '~plugins/vue-scroll-sync',
    // '~/api/init.js',
    // '~plugins/auth.js',
    // '~plugins/uploadBtn.js',
    // '~plugins/spinners.js',
    // '~plugins/checkTokens',
    // '~plugins/getListItems',

  ],

  // config axios
  axios: {
    baseURL: 'http://localhost:4000/api',
    debug: false,
    retry: {
      retries: 0
    },
    credentials: false,
    proxyHeaders: false

    // withCredentials: true,
    // credentials: 'same-origin',

    // requestInterceptor: (config, {store}) => {
    //   console.log("Making request tooo : ", config.url) ;
    //   // config.headers.common['Authorization'] = '';
    //   // config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;application/json';
    //   return config
    // }

  },

  // generate: {
  //   routes: ['/', '/fr', '/fr/inspire']
  // },

  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#cf6c37',
    height: '4px'
  },

  /*
  ** Build configuration
  */
  generate: {
    // dir: path.resolve(__dirname, '../../dist'),
    dir: './dist'

  },

  auth: {
    plugins: [
      //   {src: '~/plugins/axios.js', ssr: false}
    ],
    strategies: {
      //     local: {
      //       endpoints: {
      //         login: {url: '/user/login', method: 'post', propertyName:      'token' },
      //         logout: false,
      //         user: {url: '/user/user', method: 'get', propertyName: 'data'},
      //       },
      //       tokenRequired: true,
      //       tokenType: 'Bearer'
      //     },
      //     // facebook: {
      //     //   client_id: '',
      //     //   userinfo_endpoint: false,
      //     //   scope: ['public_profile', 'email'],
      //     //   redirect_uri:'http://localhost:3000/callback'
      //     // },
      //     // google: {
      //     //   client_id: '',
      //     //   user:false,
      //     //   redirect_uri:'http://localhost:3000/callback'

      //     // },
    },
    redirect: {
      login: '/?login=1',
      logout: '/',
      user: '/profile',
      callback: '/'
    }
  },

  build: {
    // vendor: [
    //   'vuetify',
    //   // 'crypto',
    //   'axios'
    // ],
    extractCSS: true,

    // check babel presets to strip console.log from built files et npm run build
    // cf : https://babeljs.io/docs/en/babel-plugin-transform-remove-console
    // cf :
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      //   if (ctx.isDev && ctx.isClient) {
      //     config.module.rules.push({
      //       enforce: 'pre',
      //       test: /\.(js|vue)$/,
      //       loader: 'eslint-loader',
      //       exclude: /(node_modules)/
      //     })
      //   }
      //   if (!ctx.isDev) {
      //     config.module.rules.push({
      //       enforce: 'pre',
      //       test: /\.(js|vue)$/,
      //       loader: 'eslint-loader',
      //       exclude: /(node_modules)/
      //     })
      //   }
    }
  }
}
