const chooseAPIbaseUrl = (ENVPROD) => {
  const NUXT_ENV_API_DEV = 'http://localhost:4000/api'
  const NUXT_ENV_API_PREPROD = 'https://solidata-preprod-api.co-demos.com/api'
  const NUXT_ENV_API_PROD = 'https://solidata-api.co-demos.com/api'
  if (ENVPROD === 'local') {
    return NUXT_ENV_API_DEV
  } else if (ENVPROD === 'preprod') {
    return NUXT_ENV_API_PREPROD
  } else if (ENVPROD === 'prod') {
    return NUXT_ENV_API_PROD
  }
}
const choosePort = (ENVPROD) => {
  const NUXT_ENV_PORT_DEV = 3000
  const NUXT_ENV_PORT_PREPROD = 8000
  const NUXT_ENV_PORT_PROD = 3000
  if (ENVPROD === 'local') {
    return NUXT_ENV_PORT_DEV
  } else if (ENVPROD === 'preprod') {
    return NUXT_ENV_PORT_PREPROD
  } else if (ENVPROD === 'prod') {
    return NUXT_ENV_PORT_PROD
  }
}
const configApp = {
  API_URL: chooseAPIbaseUrl(process.env.NUXT_ENV_API_VAR),
  port: choosePort(process.env.NUXT_ENV_API_VAR)
}
console.log('process.env :', process.env)
console.log('configApp :', configApp)
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
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css' },
      { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.2.0/dist/leaflet.css' }
    ]
  },

  // for build or dev
  // https://nuxtjs.org/faq/host-port/
  server: {
    port: configApp.port, // 3000
    host: 'localhost' // XXX.XX.XX.XX
  },

  // custom env variables for nuxt
  // cf : https://github.com/nuxt/nuxt.js/issues/1789
  env: {
    DEBUG: process.env.NODE_ENV === 'development'
    // CONFIG_APP: configApp
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
    '~plugins/core-components.js',

    {src: '~/plugins/vue-leaflet', ssr: false},

    {src: '~/plugins/vueParticles.js', ssr: false},
    // '@/plugins/vueParticles.js',

    // '~plugins/vue-scroll',

    // '~/plugins/utils/objectCleaner.js',
    // {src: '~/plugins/utils/objectCleaner', ssr: false},

    // {src: '~/plugins/utils/checkDocUserAuth', ssr: false},
    '~/plugins/utils/checkDocUserAuth',
    {src: '~/plugins/utils/objectFormatterCreate', ssr: false},
    // '~/plugins/utils/objectFormatterUpdate.js',
    {src: '~/plugins/utils/objectFormatterUpdate', ssr: false},

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
    // baseURL: 'http://localhost:4000/api',
    baseURL: configApp.API_URL,
    // baseURL: 'http://solidata-preprod-api.co-demos.com/api' || 'http://localhost:4000/api',
    // baseURL: process.env.API_PROD || process.env.API_PREPROD || process.env.API_DEV,
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
