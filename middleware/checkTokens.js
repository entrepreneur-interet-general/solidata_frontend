import Cookie from 'js-cookie'
var cookieparser = require('cookieparser')

export default function ({ req, store, app, redirect }) {

	console.log("\n- - - Middleware : checkTokens...") ; 

	var accessToken = null ;
	var refreshToken = null ;

	// 1 // TOKENS VALUES
	// check token values in cookie
	if (process.server) {

		console.log("- - - checkTokens : process.server == TRUE ") ; 
		
		// check if access_token and refresh_token in cookies
		if ( req.headers.cookie ) {

			// if (req.headers.cookie.tokens ) {
			
				console.log("- - - checkTokens : COOKIE DETECTED ") ; 
				console.log("- - - checkTokens : COOKIE : ", req.headers.cookie ) ; 

				var parsed = cookieparser.parse( req.headers.cookie );
				console.log("- - - checkTokens / parsed :", parsed) ; 
				
				try {
					// var tokens = JSON.parse(parsed.tokens);
					// console.log("- - - checkTokens / tokens :", tokens) ; 

					// accessToken = tokens.access_token ;
					// accessToken =  JSON.parse(parsed.access_token);
					var accessToken =  parsed.access_token;
					console.log("- - - checkTokens / accessToken :", accessToken) ; 
					
					// refreshToken = tokens.refresh_token ;
					// refreshToken =  JSON.parse(parsed.refresh_token);
					var refreshToken =  parsed.refresh_token;
					console.log("- - - checkTokens / refreshToken :", refreshToken) ; 

					var lang_cookie =  parsed.lang;
					console.log("- - - checkTokens / lang_cookie :", lang_cookie) ; 

					// set store auth tokens
					store.commit('auth/set_tokens', 
						{ 	
							access_token 	: accessToken, 
							refresh_token 	: refreshToken
						} 
					) ;

					store.commit('SET_LANG', lang_cookie, { root: true }) ;
		
				}
				catch(error) {
					console.log("- - - ... fucking error : ", error)
				}

			}
		// }
	 }
	
	// no cookie, just take the tokens values from store
	else {
		console.log("- - - checkTokens : process.server == FALSE ") ; 
		accessToken 	= store.state.auth.access_token ;
		refreshToken 	= store.state.auth.refresh_token ;
	}


	// 2 // TOKENS VERIFICATION
	// If the user has no access_token at all, get an anonymous access_token
	// if ( accessToken == null || store.state.auth.isAnonymous ) {
	if ( accessToken == null ) {

		// if neither tokens in cookie nor store consider user as anonymous and get anonymous access_token 
		console.log("- - - checkTokens / no access_token detected") ;
		const access_anonymous = store.dispatch("auth/loginAnonymous") ;
		return Promise.all([ access_anonymous ]) ;
	}

	// If the user an access_token and a test them
	else {

		console.log("- - - checkTokens / access_token detected") ; 
		// console.log("- - - checkTokens / store.state.auth.access_token : ", store.state.auth.access_token ) ; 
		// console.log("- - - checkTokens / store.state.auth.refresh_token : ", store.state.auth.refresh_token ) ; 
		
		// test access_token properties -> 
		return store.dispatch("auth/confirm_access")
			.then (response => {
				console.log("\n- - - checkTokens / response from 'auth/confirm_access' : ", response ) ;
				return response
			})

		// const access_confirm = store.dispatch("auth/confirm_access") ;
		// console.log("- - - checkTokens / access_confirm : ", access_confirm ) ; 
		// return Promise.all([ access_confirm ]) ;
		
		// -> anonymous access_token
			// store.dispatch("auth/logout") ;
			// store.dispatch("auth/loginAnonymous") ;
		
		// -> expired access_token -> refresh access_token
			// -> accepted -> automatic log
			// -> refresh_token expired -> logout + redirect to login

		// declare user as logged
		// store.commit('auth/set_isLogged', true )

	
	}


}
