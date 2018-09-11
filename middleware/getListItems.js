export default function ({ context, store, redirect }) {

	console.log("- - - Middleware : getListItems.js ...") ;
	
	const prj_dispatch = store.dispatch('prj/getList' ) ;
	const dmt_dispatch = store.dispatch('dmt/getList' ) ;
	const dsi_dispatch = store.dispatch('dsi/getList' ) ;
	const tag_dispatch = store.dispatch('tag/getList' ) ;

	return Promise.all ([ 
		prj_dispatch,
		dmt_dispatch,
		dsi_dispatch,
		tag_dispatch 
	]) ;



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
