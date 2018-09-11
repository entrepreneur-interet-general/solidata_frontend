


export default function ({ context, store, redirect, route, params}) {


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


	// get item by dispatching action in store corresponding to collection and level
	const current_item = store.dispatch( current_collection + "/getItem", item_id ) ;
	return Promise.all ([ 
		current_item,
	]) ;

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