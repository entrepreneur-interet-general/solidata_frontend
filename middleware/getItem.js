// import axios from 'axios'

export default function ({context, store, redirect, route, params, $axios}) {
  console.log('\n- - - Middleware : getItem...')

  console.log('- - - params : ', params)
  // console.log("- - - route : ", route ) ;
  console.log('- - - route.meta : ', route.meta)

  // get item ID from route
  const itemId = params.id

  // Get collection for matched routes (with children routes too)
  const routeMeta = route.meta[0]
  const currentCollection = routeMeta.collection
  const currentLevel = routeMeta.level
  // const current_colleciton = route.meta[0].map((meta) => {
  // if (meta.collection && typeof meta.auth.collection !== 'undefined')
  //  return meta.auth.collection
  //  return 0
  // })

  console.log('- - - currentCollection : ', currentCollection)
  console.log('- - - currentLevel : ', currentLevel)

  // SET UP CONFIG
  var config = {
    headers: { 'Authorization': store.state.auth.access_token }
  }
  console.log('- - - getItem : config : ', config)

  // API CALL
  const currentItem = $axios.get(`${currentCollection}/infos/get_one/${itemId}`, config)

    .then(response => {
      console.log('... getItem : response : ', response.data)
      store.commit(`${currentCollection}/set_current`, response.data)
      // store.dispatch(`${current_collection}/dispatch_current`, response.data);
      return response
    })

    .catch(error => {
      console.log(error.response)
      return error
    })

  return Promise.all([
    currentItem
  ])

  // get item by dispatching action in store corresponding to collection and level
  // const currentItem = store.dispatch( current_collection + "/getItem", item_id ) ;
  // return Promise.all ([
  // currentItem,
  // ]) ;

  // return store.dispatch( current_collection + "/getItem", item_id )
  // .then(response => {
  //  console.log("response : ", response)
  //  return response
  // })
  //  .catch(error => {
  //  console.log("error : ", error)
  //  return error
  // }) ;
}
