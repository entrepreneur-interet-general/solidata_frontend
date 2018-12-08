export default function ({ context, store, route, redirect }) {

	console.log("\n- - - Middleware : getListItems.js ...") ;
	
	console.log("- - - route.meta : ", route.meta ) ; 
	const route_meta 			= route.meta[0] ;
	const collections_list		= route_meta.collection ;
	const current_level 		= route_meta.level ;

	var promises_list = [] ;
	
	collections_list.forEach ( function (coll, index, initial_array ){
		console.log("- - - coll : ", coll ) ; 
		var temp_dispatch = store.dispatch('getListItems', coll ) ;
		promises_list.push(temp_dispatch) ;
	}) ;
	

	/// return promises to allow page to render
	return Promise.all (
		promises_list 
	) ;



	// // dispatch action to get prj
	// store.dispatch('prj/getList' )
	// 	.then(result => {
	// 		console.log("dispatch prj / ok..." ) ; 
	// 		// this.alert = {type: 'success', message: result.msg}
	// 	})
	// 	.catch(error => {
	// 		console.log("dispatch prj / error..." ) ; 
	// 		console.log("... error : ", error ) ; 

	// 		if (error.response && error.response.data) {
	// 			// store.state.prj.alert = { type: 'error', message : error } ;
	// 			store.state.prj.alert = { type: 'error', message: error.response.data.msg || error.reponse.status } ;
	// 			// this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
	// 		}
	// 	})

	// // dispatch action to get prj
	// store.dispatch('dmt/getList' )
	// 	.then(result => {
	// 		console.log("dispatch dmt / ok..." ) ; 
	// 		// this.alert = {type: 'success', message: result.msg}
	// 	})
	// 	.catch(error => {
	// 		console.log("dispatch dmt / error..." ) ; 
	// 		console.log("... error : ", error ) ; 

	// 		if (error.response && error.response.data) {
	// 			// store.state.dmt.alert = { type: 'error', message : error } ;
	// 			store.state.dmt.alert = { type: 'error', message: error.response.data.msg || error.reponse.status } ;
	// 			// this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
	// 		}
	// 	})

	// // dispatch action to get prj
	// store.dispatch('dsi/getList' )
	// .then(result => {
	// 	console.log("dispatch dsi / ok..." ) ; 
	// 	// this.alert = {type: 'success', message: result.msg}
	// })
	// .catch(error => {
	// 	console.log("dispatch dsi / error..." ) ; 
	// 	console.log("... error : ", error ) ; 

	// 	if (error.response && error.response.data) {
	// 		// store.state.dsi.alert = { type: 'error', message : error } ;
	// 		store.state.dsi.alert = { type: 'error', message: error.response.data.msg || error.reponse.status } ;
	// 		// this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
	// 	}
	// })

	// // dispatch action to get prj
	// store.dispatch('tag/getList' )
	// .then(result => {
	// 	console.log("dispatch tag / ok..." ) ; 
	// 	// this.alert = {type: 'success', message: result.msg}
	// })
	// .catch(error => {
	// 	console.log("dispatch tag / error..." ) ; 
	// 	console.log("... error : ", error ) ; 

	// 	if (error.response && error.response.data) {
	// 		// store.state.tag.alert = { type: 'error', message : error } ;
	// 		store.state.tag.alert = { type: 'error', message: error.response.data.msg || error.reponse.status } ;
	// 		// this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
	// 	}
	// })

}
