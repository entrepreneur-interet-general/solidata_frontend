// import axios from 'axios'


export default function ({ context, store, redirect, route, params, $axios}) {


	console.log("\n- - - Middleware : getItem...") ; 
	
	console.log("- - - params : ", params ) ; 
	// console.log("- - - route : ", route ) ; 
	console.log("- - - route.meta : ", route.meta ) ; 

	// get item ID from route
	const item_id = params.id 

	// Get collection for matched routes (with children routes too)
	const route_meta 			= route.meta[0] ;
	const current_collection 	= route_meta.collection ;
	const current_level 		= route_meta.level ;
	// const current_colleciton = route.meta[0].map((meta) => {
	// 	if (meta.collection && typeof meta.auth.collection !== 'undefined')
	// 		return meta.auth.collection
	// 		return 0
	// })

	console.log('- - - current_collection : ', current_collection ) ;
	console.log('- - - current_level : ', current_level ) ;


	var config = { 
		headers : { 'Authorization' : store.state.auth.access_token },
	}
	console.log("- - - getItem : config : ", config );
	
	const current_item = $axios.get(`${current_collection}/infos/get_one/${item_id}` , config )
	
		.then(response => {
			console.log("... getItem : response : ", response.data);
			store.commit(`${current_collection}/set_current`, response.data);
			// store.dispatch(`${current_collection}/dispatch_current`, response.data);
			return response
		})
		.catch(error => {
			console.log(error.response)
			return error
		})
	
	return Promise.all([
		current_item
	]) ;




	// get item by dispatching action in store corresponding to collection and level
	// const current_item = store.dispatch( current_collection + "/getItem", item_id ) ;
	// return Promise.all ([ 
	// 	current_item,
	// ]) ;

	// return store.dispatch( current_collection + "/getItem", item_id )
	// 	.then(response => {
	// 		console.log("response : ", response)
	// 		return response
	// 	})
	// 	.catch(error => {
	// 		console.log("error : ", error)
	// 		return error
	// 	}) ;

}