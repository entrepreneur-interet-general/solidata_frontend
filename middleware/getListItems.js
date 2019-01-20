export default function ({ context, store, route, redirect }) {
  console.log('\n- - - Middleware : getListItems.js ...')

  console.log('- - - route.meta : ', route.meta)
  const routeMeta = route.meta[0]
  const collectionsList = routeMeta.collection
  const currentLevel = routeMeta.level

  var promisesList = []

  collectionsList.forEach(function (coll, index, initial_array) {
    console.log('- - - coll : ', coll)

    // create parameters vars for later request in $store
    var parameters = store.state[coll].parameters
    var input = {
      coll: coll,
      level: currentLevel,
      q_params: parameters
    }

    var tempDispatch = store.dispatch('getListItems', input)

    promisesList.push(tempDispatch)
  })

  /// return promises to allow page to render
  return Promise.all(
    promisesList
  )

  // // dispatch action to get prj
  // store.dispatch('prj/getList' )
  //  .then(response => {
  //   console.log("dispatch prj / ok..." ) ;
  //   // this.alert = {type: 'success', message: response.msg}
  //  })
  //  .catch(error => {
  //   console.log("dispatch prj / error..." ) ;
  //   console.log("... error : ", error ) ;

  //   if (error.response && error.response.data) {
  // // store.state.prj.alert = { type: 'error', message : error } ;
  // store.state.prj.alert = { type: 'error', message: error.response.data.msg || error.reponse.status } ;
  // // this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
  //   }
  //  })

  // // dispatch action to get prj
  // store.dispatch('dmt/getList' )
  //  .then(response => {
  //   console.log("dispatch dmt / ok..." ) ;
  //   // this.alert = {type: 'success', message: response.msg}
  //  })
  //  .catch(error => {
  //   console.log("dispatch dmt / error..." ) ;
  //   console.log("... error : ", error ) ;

  //   if (error.response && error.response.data) {
  // // store.state.dmt.alert = { type: 'error', message : error } ;
  // store.state.dmt.alert = { type: 'error', message: error.response.data.msg || error.reponse.status } ;
  // // this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
  //   }
  //  })

  // // dispatch action to get prj
  // store.dispatch('dsi/getList' )
  // .then(response => {
  //  console.log("dispatch dsi / ok..." ) ;
  //  // this.alert = {type: 'success', message: response.msg}
  // })
  // .catch(error => {
  //  console.log("dispatch dsi / error..." ) ;
  //  console.log("... error : ", error ) ;

  //  if (error.response && error.response.data) {
  //   // store.state.dsi.alert = { type: 'error', message : error } ;
  //   store.state.dsi.alert = { type: 'error', message: error.response.data.msg || error.reponse.status } ;
  //   // this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
  //  }
  // })

  // // dispatch action to get prj
  // store.dispatch('tag/getList' )
  // .then(response => {
  //  console.log("dispatch tag / ok..." ) ;
  //  // this.alert = {type: 'success', message: response.msg}
  // })
  // .catch(error => {
  //  console.log("dispatch tag / error..." ) ;
  //  console.log("... error : ", error ) ;

  //  if (error.response && error.response.data) {
  //   // store.state.tag.alert = { type: 'error', message : error } ;
  //   store.state.tag.alert = { type: 'error', message: error.response.data.msg || error.reponse.status } ;
  //   // this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
  //  }
  // })
}
