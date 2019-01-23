// import api from '~/api'
// import axios from 'axios'

import Cookie from 'js-cookie'

// var cookieparser = require('cookieparser')

const anonymousInfos = {

  _id: null,

  infos: {

    email: null,
    name: 'anonymous',
    pseudo: 'anon',
    surname: 'anon-surname',
    password: 'anon-password'

  }
}

export const state = () => ({

  isLogged: false,
  isAnonymous: true,

  user_id: anonymousInfos._id,
  user_infos: anonymousInfos.infos,

  access_token: null,
  refresh_token: null,
  salt_token: ''

})

// export const getters = {

// }

export const mutations = {

  set_isLogged (store, data) {
    store.isLogged = data
  },

  set_isAnonymous (store, data) {
    store.isAnonymous = data
  },

  set_user (store, data) {
    store.user_infos = data.infos
    store.user_id = data._id
  },

  set_tokens (store, data) {
    console.log('\n...store/auth -mutation- set_tokens...')
    // console.log("\n...store/auth -mutation- set_tokens : ", data) ;
    store.access_token = data.access_token
    store.refresh_token = data.refresh_token
    store.salt_token = data.salt_token
  },

  set_access_token (store, data) {
    console.log('\n...store/auth -mutation- set_access_tokens...')
    // console.log("\n...store/auth -mutation- set_access_token : ", data) ;
    store.access_token = data.access_token
  },

  reset_user (store) {
    store.user_infos = null
    store.isAnonymous = true
    store.isLogged = false
    store.user_infos = anonymousInfos.infos
    store.user_id = anonymousInfos._id
    store.access_token = null
    store.refresh_token = null
    store.salt_token = ''
  }
}

export const actions = {

  confirm_access ({commit, dispatch, state}) {
    console.log('\n...store/auth : confirm_access...')
    // console.log("...store/auth : state.access.access_token : \n", state.access_token );
    const config = {'headers': { 'Authorization': state.access_token }}

    return this.$axios.$get('auth/tokens/confirm_access', config)

      .then(response => {
        // access_token is still valid
        console.log('\n...store/auth/confirm_access : response : \n', response)
        commit('set_isLogged', true)
        commit('set_user', response.data)
        return response
      })

      .catch(error => {
        console.log('\n...store/auth/confirm_access : ERROR / error.response : ', error.response)
        console.log('\n...store/auth/confirm_access : ERROR / msg : ', error.response.data.msg)
        console.log('...store/auth/confirm_access : ERROR / statusText : ', error.response.statusText)
        console.log('...store/auth/confirm_access : ERROR / status : ', error.response.status)
        console.log('...store/auth/confirm_access : ERROR / sub_status : ', error.response.data.sub_status)

        // let responseCode = null

        // error detected
        if (error.response.data.sub_status === 42) {
          console.log('\n...store/auth/confirm_access : TOKEN EXPIRED ')
          console.log("...store/auth/confirm_access : --> dispatch('newAccessToken') ")

          return dispatch('newAccessToken')
          // return responseCode
          // dispatch('newAccessToken')

          //   .then(resp => {
          //     console.log('...store/auth/confirm_access : resp : ', resp)
          //     return resp
          //   })

          //   .catch(err => {
          //     console.log('...store/auth/confirm_access : ERROR / statusText : ', err.response.data)
          //     return err.response.data
          //   })
        } else if (error.response.status === 401 && error.response.data.sub_status !== 42) {
          console.log('\n...store/auth/confirm_access : UNAUTHORIZED ')
          dispatch('loginAnonymous')
          // responseCode = 401
          return error.response.data
        } else if (error.response.data.status === 403) {
          console.log('\n...store/auth/confirm_access : FORRBIDDEN ')
          dispatch('loginAnonymous')
          // responseCode = 401
          return error.response.data
        } else {
          console.log('\n...store/auth/confirm_access : ERROR / status : ', error.response.status)
          console.log('...store/auth/confirm_access : ERROR / data : ', error.response.data)
          dispatch('loginAnonymous')
          // responseCode = 401
          return error.response.data
        }
        // return responseCode
      })
  },

  login ({commit, dispatch, state}, data) {
    console.log('\n...store/auth : login...')
    console.log('\n...store/auth/login : data : ', data)

    return dispatch('loginAnonymous')

      .then(respAnonymous => {
        console.log('\n...store/auth/login : respAnonymous : ', respAnonymous)
        // needs an anonymous access_token to login
        const config = {'headers': { 'Authorization': state.access_token }}

        return this.$axios.$post('auth/login/', data, config)

          .then(response => {
            console.log('\n...store/auth/login : response : ', response)
            const userLoginInfos = response.data

            commit('set_isAnonymous', false)
            commit('set_isLogged', true)
            commit('set_user', userLoginInfos)
            commit('SET_LANG', userLoginInfos.profile.lang, { root: true })
            commit('set_see_agreement_cgu', !userLoginInfos.profile.agreement, { root: true })
            commit('set_tokens', response.tokens)

            // cf documentation js-cookie : https://github.com/js-cookie/js-cookie
            Cookie.set('access_token', response.tokens.access_token)
            Cookie.set('refresh_token', response.tokens.refresh_token)
            Cookie.set('salt_token', response.tokens.refresh_token)
            Cookie.set('lang', userLoginInfos.profile.lang) // saving lang in cookie for server rendering
            Cookie.set('agreement', !userLoginInfos.profile.agreement) // saving agreement in cookie for server rendering

            return response
          })

          .catch(error => {
            console.log('\n...store/auth/login : error status : ', error.response.status)
          })
      })
  },

  logout ({commit, dispatch}) {
    console.log('\n...store/auth : logout...')

    return new Promise((resolve, reject) => {
      console.log('\n...store/auth/logout : logout / promise...')
      commit('reset_user')
      commit('set_see_agreement_cgu', true, { root: true })

      dispatch('loginAnonymous')

      localStorage.removeItem('tokens')
      // localStorage.removeItem("access_token");
      // localStorage.removeItem("refresh_token");

      // cf documentation js-cookie : https://github.com/js-cookie/js-cookie
      Cookie.remove('access_token')
      Cookie.remove('refresh_token')
      Cookie.remove('salt_token')
      Cookie.remove('agreement')
      // Cookie.remove("lang");

      // localStorage.removeItem("lang");

      resolve()
    })

      .catch(error => {
        console.log('\n...store/auth/logout : error : \n', error)
        // console.log("\n...store/auth/logout : error status : ",  error.response.status )
        return error
      })
  },

  loginAnonymous ({commit, dispatch, rootState}) {
    console.log('\n...store/auth : loginAnonymous...')

    // var logout = dispatch('logout');

    return this.$axios.$get('auth/login/anonymous/')

      .then(response => {
        console.log('\n...store/auth/loginAnonymous : response : ', response)
        commit('set_isAnonymous', true)
        commit('set_isLogged', false)
        commit('set_user', anonymousInfos)
        commit('set_tokens', response.tokens)

        // cf documentation js-cookie : https://github.com/js-cookie/js-cookie
        Cookie.set('access_token', response.tokens.access_token)
        Cookie.set('refresh_token', response.tokens.refresh_token)
        Cookie.set('salt_token', response.tokens.salt_token)

        // localStorage.removeItem("tokens");
        // resolve()
        return response
      })

      .catch(error => {
        return error
      })
  },

  register ({commit, state}, data) {
    console.log('\n...store/auth : register...')
    console.log('\n...store/auth/register : data : ', data)

    // needs an anonymous access_token to create new user
    const config = {'headers': { 'Authorization': state.access_token }}

    return this.$axios.$post('usr/register/', data, config)

      .then(response => {
        console.log('\n...store/auth/register : response : ', response)
        const userLoginInfos = response.data

        commit('set_isAnonymous', false)
        commit('set_isLogged', true)
        commit('set_user', userLoginInfos)
        commit('set_tokens', response.tokens)
        commit('SET_LANG', userLoginInfos.profile.lang, { root: true })

        Cookie.set('access_token', response.tokens.access_token)
        Cookie.set('refresh_token', response.tokens.refresh_token)
        Cookie.set('salt_token', response.tokens.salt_token)

        return response
      })
  },

  forgotpwd ({commit, state}, data) {
    console.log('\n...store/auth : forgotpwd...')
    console.log('\n...store/auth : data : ', data)

    // needs an anonymous access_token to create new user
    const config = {'headers': { 'Authorization': state.access_token }}
    return this.$axios.$post('auth/password/password_forgotten', data, config)

      .then(response => {
        console.log('\n...store/auth : response : ', response)
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
    console.log('\n...store/auth/newAccessToken...')
    // console.log("...store/auth/newAccessToken - state.refresh_token : \n", state.refresh_token);
    const config = {'headers': { 'Authorization': state.refresh_token }}

    return this.$axios.$get('auth/tokens/new_access_token', config)

      .then(response => {
        console.log('...store/auth/newAccessToken : response... ')
        // console.log("...store/auth/newAccessToken : response : ", response);
        commit('set_access_token', response.tokens)
        commit('set_isLogged', true)
        commit('set_user', response.data)
        Cookie.set('access_token', response.tokens.access_token)
        return response
      })

      .catch(error => {
        console.log('...store/auth/newAccessToken : error...')
        // console.log("...store/auth/newAccessToken : error.response.status : ", error.response.status);
        console.log('\n...store/auth/newAccessToken : error : ', error)
        // dispatch('loginAnonymous');
      })
  },

  newRefreshToken ({commit, state}, data) {
    console.log('\n...store/auth : refreshAccessToken...')
    // const config = {'headers': { 'Authorization': state.refresh_token }}

    return this.$axios.$post('auth/tokens/new_access_token', data)

      .then(response => {
        console.log('...store/auth/refreshAccessToken : response...')
        // console.log("...store/auth/refreshAccessToken : response : ", response);
        commit('set_access_token', response.tokens)
        return response
      })
  }

  // reset ({commit}) {
  //   commit('reset_user')
  //   return Promise.resolve()
  // }
}
