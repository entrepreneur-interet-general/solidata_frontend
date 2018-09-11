

// cf : https://itnext.io/custom-social-auth-flow-with-auth-nuxtjs-org-daa836676587
// cf : https://axios.nuxtjs.org/extend.html

// import axios from 'axios'

export default function ({ $axios, redirect, store }) {

	$axios.onRequest(config => {
		console.log('\n> > > plugin axios / Making request to : ' + config.method + " -> " + config.url) ;
		// config.headers['Content-Type'] = 'application/json';
		// config.headers['Authorization'] = store.state.auth.access_token ;
		config.headers['Access-Control-Allow-Origin'] = "*";
		// config.headers['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept";
		// config.headers['Access-Control-Allow-Credentials'] = true ;

		// console.log('\n> > > plugin axios / config : \n', config) ; 
	
	})

	$axios.onResponse(response => {
		console.log('\n> > > plugin axios / response.status : ', 	response.status )
		console.log('> > > plugin axios / response.data : ', 		response.data )
		console.log('> > > plugin axios / response.headers : ', 	response.headers )
		console.log('> > > plugin axios / response.config : ', 		response.config )
		console.log("\n")
		// config.headers['Content-Type'] = 'application/json';
		// config.headers['Access-Control-Allow-Origin'] = "*";
	})

	//  cf : https://stackoverflow.com/questions/48402747/nuxt-js-vue-js-setting-axios-auth-token-in-vuex-store-resets-after-refresh
	// $axios.interceptors.request.use(request => {
		
	//     request.baseURL = 'https://api.com/api/'
	
	//     // Get token from auth.js store
	//     const token = store.state.token
	
	//     // Update token axios header
	//     if (token) {
	//       request.headers.common['Authorization'] = token
	//     }
	//     return request
	// })

	$axios.onError(error => {

		const code = parseInt(error.response && error.response.status)
		console.log('\n> > > plugin axios / error - code : ', code ); 
		console.log('\n> > > plugin axios / error : ', error ); 

		if (code === 404) {
			redirect('/404')
		}

		if (code === 500) {
			redirect('/')
		}

		// if (code === 403) {
		// 	redirect('/login')
		// }

		// return error.response
	})

}