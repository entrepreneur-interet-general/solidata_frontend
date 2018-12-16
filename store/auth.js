// import api from '~/api'
// import axios from 'axios'

import Cookie from 'js-cookie'

var cookieparser = require('cookieparser')
// const cookieparser = process.server ? require('cookieparser') : undefined

const anonymousInfos = {
	_id : null, 
	infos : {
		email: null, 
		name: "anonymous",
		pseudo: "anon",
		surname: "anon-surname",
		password: "anon-password",
	}
};

export const state = () => ({

	isLogged      : false,
	isAnonymous   : true,

	user_id       : anonymousInfos._id ,
	user_infos    : anonymousInfos.infos ,
	
	access_token  : null,
	refresh_token : null

})


export const getters = {

}

export const mutations = {

	set_isLogged (store, data) {
		store.isLogged = data
	},

	set_isAnonymous (store, data) {
		store.isAnonymous = data
	},

	set_user (store, data) {
		store.user_infos  = data.infos ;
		store.user_id     = data._id
	},

	set_tokens (store, data) {
		console.log("\n...store/auth -mutation- set_tokens : ", data) ;
		store.access_token  = data.access_token ;
		store.refresh_token = data.refresh_token
	},

	set_access_token (store, data) {
		console.log("\n...store/auth -mutation- set_access_token : ", data) ;
		store.access_token  = data.access_token ;
	},

	reset_user (store) {
		store.user_infos    = null 
		store.isAnonymous   = true
		store.isLogged      = false
		store.user_infos    = anonymousInfos.infos
		store.user_id       = anonymousInfos._id
		store.access_token  = null ;
		store.refresh_token = null
	}
}

export const actions = {

	// fetch ({commit}) {
	//   return api.auth.me()
	//     .then(response => {
	//       commit('set_user', response.data.result)
	//       return response
	//     })
	//     .catch(error => {
	//       commit('reset_user')
	//       return error
	//     })
	// },

	// checkCookieTokens ({ commit, dispatch }, { req }) {

	// 	console.log("\n...store/auth : checkCookieTokens ...")
	// 	let accessToken   = null ;
	// 	let refreshToken  = null ;

	// 	// check if access_token and refresh_token in cookies
	// 	if ( req.headers.cookie ) {

	// 		var parsed = cookieparser.parse( req.headers.cookie );
	// 		console.log("plugins : checkCookieTokens / parsed :", parsed) ; 
			
	// 		var tokens = JSON.parse(parsed.tokens);
	// 		console.log("plugins : checkCookieTokens / tokens :", tokens) ; 

	// 		accessToken = tokens.access_token ;
	// 		console.log("plugins : checkCookieTokens / accessToken :", accessToken) ; 
			
	// 		refreshToken = tokens.refresh_token ;
	// 		console.log("plugins : checkCookieTokens / refreshToken :", refreshToken) ; 

	// 	}

	// },

	confirm_access({commit, dispatch, state}) {

		console.log("\n...store/auth : confirm_access...");
		const config = { "headers" : { 'Authorization': state.access_token }} ;
		
		return this.$axios.$get('auth/tokens/confirm_access', config )

			.then(response => {
				// access_token is still valid
				console.log("\n...store/auth/confirm_access : response : ", response);
				commit('set_isLogged',    true);
				commit('set_user',        response.data) ;
				return response
			})

			.catch(error => {

				console.log("\n...store/auth/confirm_access : ERROR / msg : ",  error.response.data.msg ) ; 
				console.log("...store/auth/confirm_access : ERROR / statusText : ",  error.response.statusText ) ; 
				console.log("...store/auth/confirm_access : ERROR / status : ",  error.response.status ) ;
				console.log("...store/auth/confirm_access : ERROR / sub_status : ",  error.response.data.sub_status ) ;
				
				var response_code = null;

				// error detected 
				if ( error.response.data.sub_status == 42 ){

					console.log("\n...store/auth/confirm_access : TOKEN EXPIRED " ) ;
					console.log("...store/auth/confirm_access : dispatch('newAccessToken') " ) ;
					// dispatch("newAccessToken")

					return response_code = dispatch("newAccessToken")

						.then(resp => {
							console.log("...store/auth/confirm_access : resp : ", resp)
							return resp
						})
						
						.catch(err => {
							console.log("...store/auth/confirm_access : ERROR / statusText : ",  err.response.data ) ; 
							return err.response.data
						}) 
						
				}

				else if ( error.response.status == 401 && error.response.data.sub_status != 42 ) {
					console.log("\n...store/auth/confirm_access : UNAUTHORIZED " ) ;
					dispatch("loginAnonymous") ;
					response_code = 401
					// return error.response.data
				}

				else if ( error.response.data.status == 403 ){
					console.log("\n...store/auth/confirm_access : FORRBIDDEN " ) ;
					dispatch("loginAnonymous") ;
					response_code = 401
					// return error.response.data
				}

				else {
					console.log("\n...store/auth/confirm_access : ERROR / status : ",  error.response.status ) ;
					console.log("...store/auth/confirm_access : ERROR / data : ",  error.response.data ) ;
					dispatch("loginAnonymous") ;
					response_code = 401
					// return error.response.data
				} ;

				return response_code
				
			})
	},




	login ({commit, dispatch, state}, data) {

		console.log("\n...store/auth : login...");
		console.log("\n...store/auth/login : data : ", data);
		// 
		return dispatch('loginAnonymous')

			.then( resp_anonymoous => {

				console.log("\n...store/auth/login : resp_anonymoous : ", resp_anonymoous);
				// needs an anonymous access_token to login 
				const config = { "headers" : { 'Authorization': state.access_token }} ;
				
				return this.$axios.$post('auth/login/', data, config )

					.then(response => {
						console.log("\n...store/auth/login : response : ", response);
						var user_login_infos = response.data ;
						commit('set_isAnonymous', false);
						commit('set_isLogged',    true);
						commit('set_user',        user_login_infos) ;
						commit('SET_LANG',        user_login_infos.profile.lang, { root: true }) ;
						commit('set_tokens',      response.tokens)
						
						Cookie.set("access_token",		response.tokens.access_token )
						Cookie.set("refresh_token",		response.tokens.refresh_token )
						// Cookie.set("tokens",      response.tokens) // saving token in cookie for server rendering
						
						Cookie.set("lang",        user_login_infos.profile.lang ) // saving lang in cookie for server rendering
						
						return response 
					})

					.catch(error => {
						console.log("\n...store/auth/login : error status : ",  error.response.status )
					})
			})
	},

	logout ({commit, dispatch}) {

		console.log("\n...store/auth : logout...");

		return new Promise ((resolve, reject) => {

			console.log("\n...store/auth/logout : logout / promise...");
			commit('reset_user');
			dispatch('loginAnonymous');

			localStorage.removeItem("tokens");
			// localStorage.removeItem("access_token");
			// localStorage.removeItem("refresh_token");
			Cookie.remove('tokens');
			Cookie.remove('access_token');
			Cookie.remove('refresh_token');

			// localStorage.removeItem("lang");
			// Cookie.remove("lang");

			resolve()
		})

		.catch(error => {
			console.log("\n...store/auth/logout : error status : ",  error.response.status )
		})

	},


	loginAnonymous ({commit, rootState}) {

		console.log("\n...store/auth : loginAnonymous...");

		return this.$axios.$get('auth/login/anonymous/')

			.then(response => {
				console.log("\n...store/auth/loginAnonymous : response : ", response);
				commit('set_isAnonymous', true)
				commit('set_isLogged',    false);
				commit('set_user',        anonymousInfos )
				commit('set_tokens',      response.tokens)

				Cookie.set("access_token",		response.tokens.access_token )
				// Cookie.set("refresh_token",		response.tokens.refresh_token )
				// Cookie.set('tokens',      response.tokens)
				
				// Cookie.set('lang',        rootState.locale ) // saving lang

				// localStorage.removeItem("tokens");
				// Cookie.remove("tokens");
				// resolve()
				return response

			})

	},




	register ({commit, state}, data) {

		console.log("\n...store/auth : register...");
		console.log("\n...store/auth/register : data : ", data);

		// needs an anonymous access_token to create new user 
		const config = { "headers" : { 'Authorization': state.access_token }} ;
		
		return this.$axios.$post('usr/register/', data, config)

			.then(response => {

				console.log("\n...store/auth/register : response : ", response);
				commit('set_isAnonymous', false);
				commit('set_isLogged',    true);
				commit('set_user',        response)
				// commit('SET_LANG',        response.profile.lang, { root: true }) ;
				commit('set_tokens',      response.tokens)
				// Cookie.set("tokens",      response.tokens)

				Cookie.set("access_token",		response.tokens.access_token )
				Cookie.set("refresh_token",		response.tokens.refresh_token )

				return response

			})
		},
		
	forgotpwd ({commit, state}, data) {

		console.log("\n...store/auth : forgotpwd...");
		console.log("\n...store/auth : data : ", data);
		
		// needs an anonymous access_token to create new user 
		const config = { "headers" : { 'Authorization': state.access_token }} ;
		return this.$axios.$post('auth/password/password_forgotten', data, config)

			.then(response => {
				console.log("\n...store/auth : response : ", response);
				// commit('set_isAnonymous', false);
				// commit('set_isLogged',    true);
				// commit('set_user',        response)
				// commit('set_tokens',      response.tokens)
				// // commit('SET_LANG',        response.profile.lang, { root: true }) ;
				// Cookie.set('tokens',      response.tokens)
				return response

			})
	},
		

	newAccessToken ({commit, state}) {

		console.log("\n...store/auth/newAccessToken...");
		console.log("...store/auth/newAccessToken - state.refresh_token :", state.refresh_token);
		const config = { "headers" : { 'Authorization': state.refresh_token }} ;
		
		return this.$axios.$get( 'auth/tokens/new_access_token', config )

			.then(response => {

				console.log("...store/auth/newAccessToken : response... ");
				// console.log("...store/auth/newAccessToken : response : ", response);
				commit('set_access_token',	response.tokens) ;
				commit('set_isLogged',    true);
				commit('set_user',        response.data) ;
				Cookie.set("access_token",	response.tokens.access_token )
				return response
			})

			.catch(error => {
				console.log("\n...store/auth/newAccessToken : error...");
				console.log("...store/auth/newAccessToken : error.response.status : ", error.response.status);
				// console.log("\n...store/auth/newAccessToken : error : ", error);
			})
	},

	newRefreshToken ({commit, state}, data) {
		
		console.log("\n...store/auth : refreshAccessToken...");
		const config = { "headers" : { 'Authorization': state.refresh_token }} ;
		
		return this.$axios.$post('auth/tokens/new_access_token', data)
			
			.then(response => {
				console.log("...store/auth/refreshAccessToken : response...");
				// console.log("...store/auth/refreshAccessToken : response : ", response);
				commit('set_access_token', response.tokens) ;
				return response
			})
	},

	// reset ({commit}) {
	//   commit('reset_user')
	//   return Promise.resolve()
	// }
}


/*
MODEL USR IN DB : 
{
		"_id" : ObjectId("5b55fee90a828659a93e9fc6"),
		"infos" : {
				"name" : "Elinor",
				"surname" : "Ostrom",
				"email" : "elinor.ostrom@emailna.co"
		},
		"profile" : {
				"lang" : "en",
				"usr_profiles" : []
		},
		"professional_infos" : [],
		"log" : {
				"created_at" : ISODate("2018-07-23T16:14:33.267Z"),
				"created_by" : "elinor.ostrom@emailna.co",
				"login_count" : 205
		},
		"specs" : {
				"doc_type" : "usr"
		},
		"modif_log" : [ 
				{
						"modif_at" : ISODate("2018-07-23T16:13:50.980Z"),
						"modif_for" : "confirm_email"
				}
		],
		"team" : [],
		"datasets" : {
				"prj_list" : [],
				"dmt_list" : [],
				"dmf_list" : [],
				"dsi_list" : [ 
						{
								"oid_dsi" : "5b560da80a82865c2b78de99",
								"added_by" : "5b55fee90a828659a93e9fc6",
								"added_at" : ISODate("2018-07-23T17:17:29.668Z"),
								"is_fav" : true
						}, 
						{
								"oid_dsi" : "5b598b100a82863d164a84a1",
								"added_by" : "5b55fee90a828659a93e9fc6",
								"added_at" : ISODate("2018-07-26T08:49:20.968Z"),
								"is_fav" : true
						}
				],
				"rec_list" : [],
				"tag_list" : []
		},
		"auth" : {
				"pwd" : "sha256$bi5qHYF4$653d4d86d827c6eccbf07b1b6aee69fae164a50f8b374cf7cca8754e02f360ec",
				"conf_usr" : true,
				"role" : "registred",
				"refr_tok" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MzIzNjI0ODYsIm5iZiI6MTUzMjM2MjQ4NiwianRpIjoiYjE0OGMxMmEtMGIyNC00MjlhLWJmYzQtMDMyOTQ4NTNjZGU0IiwiZXhwIjoxNTM1MDQwODg2LCJpZGVudGl0eSI6ImVsaW5vci5vc3Ryb21AZW1haWxuYS5jbyIsInR5cGUiOiJyZWZyZXNoIn0.5BbGpDlGrMdkoW9XcPSnSB7hHSCN1F9M4cBYNO7rtAM",
				"is_blacklisted" : false
		}
}

*/