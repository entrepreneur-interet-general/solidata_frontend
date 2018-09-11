import Cookie from 'js-cookie'
var cookieparser = require('cookieparser')


export default function ({ context, store, app, redirect }) {

	console.log("- - - Middleware : checkTokens.js ...") ;
	console.log("context : ", context )
	// const cookieTokens = store.dispatch("auth/checkCookieTokens") ;

	var accessToken = null ;
	var refreshToken = null ;
	
	// // check if access_token and refresh_token in cookies
	// if ( context.req.headers.cookie ) {

	// 	var parsed = cookieparser.parse( context.req.headers.cookie );
	// 	console.log("plugins : checkTokens / parsed :", parsed) ; 
		
	// 	var tokens = JSON.parse(parsed.tokens);
	// 	console.log("plugins : checkTokens / tokens :", tokens) ; 

	// 	accessToken = tokens.access_token ;
	// 	console.log("plugins : checkTokens / accessToken :", accessToken) ; 
		
	// 	refreshToken = tokens.refresh_token ;
	// 	console.log("plugins : checkTokens / refreshToken :", refreshToken) ; 

	//  }
	

	// // If the user has no access_token at all, get an anonymous access_token
	// if ( accessToken == null ) {
	// 	// if neither tokens in cookie nor store consider user as anonymous and get anonymous access_token 
	// 	console.log("plugins : checkTokens / no access_token detected") ;
		const anon_disp = store.dispatch("auth/loginAnonymous")
	// }

	// // If the user an access_token test it
	// else {
		
	// 	console.log("plugins : checkTokens / access_token detected") ; 
	// 	console.log("plugins : checkTokens / store.state.auth.access_token : ", store.state.auth.access_token ) ; 
	
	// }

	return Promise.all ([ anon_disp ]) ; 

}
