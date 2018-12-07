
module.exports = {

	mode : "universal",

	/*
	** Headers of the page
	*/
	head: {
		title: 'solidata',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
		],
		link: [
			// { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
			{ rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css' },
		]
	},

	router: {
		middleware: [
			'i18n',
			'checkTokens',
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
		'@nuxtjs/toast',
	],

	plugins: [
		'~/plugins/vuetify.js',
		'~/plugins/i18n.js',
		'~/plugins/axios',
		'~plugins/text_filters.js',
		// '~/api/init.js', 
		// '~plugins/auth.js',
		// '~plugins/uploadBtn.js',
		// '~plugins/spinners.js',
		// '~plugins/checkTokens',
		// '~plugins/getListItems',

	],

	// config axios
	axios: {
		baseURL:  "http://localhost:4000/api",
		debug: false,
		retry : {
			retries : 0
		},
		credentials: false ,
		proxyHeaders : false,

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
		color	: '#cf6c37', 
		height 	: '7px'
	},


	/*
	** Build configuration
	*/
	generate: {
		// dir: path.resolve(__dirname, '../../dist'),
		dir: '../../dist',
		
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
			callback:'/',
		}
	},



	build: {
		vendor: [
			'vuetify',
			'axios'
		],
		extractCSS: true,
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
		}
	}
}
