// import Cookie from 'js-cookie'
var cookieparser = require('cookieparser')

export default function ({ req, store, app, redirect }) {
  console.log('\n- - - Middleware : checkTokens...')

  let accessToken = null
  let refreshToken = null
  let saltToken = null
  let langCookie = null

  console.log('\n- - - checkTokens : process : \n', process)
  console.log('\n- - - checkTokens : process.env : \n', process.env)
  console.log('\n- - - checkTokens : process.config : \n', process.config)

  // 1 // TOKENS VALUES
  // 1a // SERVER SIDE RENDERDED
  if (process.server) {
    // let navigator

    console.log('- - - checkTokens : process.server == TRUE ')
    console.log('store.DEBUG :', store.state.DEBUG)
    // var jsencrypt = require('jsencrypt')

    // check if access_token and refresh_token in cookies
    if (req.headers.cookie) {
      console.log('- - - checkTokens (server-side) : COOKIE DETECTED ')
      // console.log("- - - checkTokens : COOKIE : ", req.headers.cookie ) ;

      var cookie = req.headers.cookie
      var parsed = cookieparser.parse(cookie)
      console.log('- - - checkTokens / parsed :\n', parsed)

      try {
        accessToken = parsed.access_token
        console.log('- - - checkTokens / accessToken :', accessToken)

        refreshToken = parsed.refresh_token
        console.log('- - - checkTokens / refreshToken :', refreshToken)

        saltToken = parsed.salt_token
        console.log('- - - checkTokens / saltToken :', saltToken)

        var agreementCookie = parsed.agreement
        console.log('- - - checkTokens / agreementCookie :', agreementCookie)

        // set store auth tokens
        store.commit('auth/set_tokens',
          {
            access_token: accessToken,
            refresh_token: refreshToken,
            salt_token: saltToken
          }
        )

        store.commit('set_see_agreement_cgu', !agreementCookie, { root: true })
      } catch (error) {
        console.log('- - - ... fucking error in parsing cookie with process.server == true : \n', error)
      }

      // try {
      // 	 langCookie 	= parsed.lang;
      // 	console.log("- - - checkTokens /  langCookie :",  langCookie) ;
      // 	store.commit('SET_LANG',  langCookie, { root: true }) ;
      // }
      // catch(error) {
      // 	console.log("- - - ... fucking error in parsing cookie with process.server == true : \n", error)
      // }
    }
  }

  // 1b // CLIENT SIDE RENDERED
  // process.browser == true || process.client == true
  else {
    console.log('- - - checkTokens : process.server == FALSE ')

    // check if access_token and refresh_token in cookies

    let cookie = document.cookie
    let parsed = cookieparser.parse(cookie)

    console.log('- - - checkTokens (client-side) : COOKIE DETECTED ')
    // console.log("- - - checkTokens : COOKIE : ", cookie ) ;
    console.log('- - - checkTokens / parsed :', parsed)

    try {
      accessToken = parsed.access_token
      console.log('- - - checkTokens / accessToken :', accessToken)

      refreshToken = parsed.refresh_token
      console.log('- - - checkTokens / refreshToken :', refreshToken)

      saltToken = parsed.salt_token
      console.log('- - - checkTokens / saltToken :', saltToken)

      langCookie = parsed.lang
      console.log('- - - checkTokens /  langCookie :', langCookie)

      agreementCookie = parsed.agreement
      console.log('- - - checkTokens / agreementCookie :', agreementCookie)

      // set store auth tokens
      store.commit('auth/set_tokens',
        {
          access_token: accessToken,
          refresh_token: refreshToken,
          salt_token: saltToken
        }
      )

      if (store.state.isLogged) {
        // store.commit('SET_LANG',  langCookie, { root: true }) ;
        store.commit('set_see_agreement_cgu', !agreementCookie, { root: true })
      }
    } catch (error) {
      console.log('- - - ... error while parsing cookie with process.client == true : \n', error)

      // try getting access and refresh tokens from store as last resort
      accessToken = store.state.auth.access_token
      refreshToken = store.state.auth.refresh_token
      saltToken = store.state.auth.salt_token
    }
  }

  // 2 // TOKENS VERIFICATION
  // 2a // If the user has no access_token at all, get an anonymous access_token
  // if ( accessToken == null || store.state.auth.isAnonymous ) {
  if (accessToken == null) {
    // if neither tokens in cookie nor store consider user as anonymous and get anonymous access_token
    console.log('- - - checkTokens / no access_token detected')
    const accessAnonymous = store.dispatch('auth/loginAnonymous')
    return Promise.all([ accessAnonymous ])
  } else {
    // 2b // If the user an access_token and a test them
    console.log('- - - checkTokens / access_token and refresh_token detected')
    // console.log("- - - checkTokens / store.state.auth.access_token : ", store.state.auth.access_token ) ;
    // console.log("- - - checkTokens / store.state.auth.refresh_token : ", store.state.auth.refresh_token ) ;

    // test access_token properties ->
    return store.dispatch('auth/confirm_access')
      .then(response => {
        console.log("\n- - - checkTokens / response from 'auth/confirm_access' : \n", response)
        return response
      })
  }
}
