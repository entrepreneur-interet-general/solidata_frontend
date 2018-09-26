

export const state = () => ({

	edit_mode		: false,

	current : {},
	list 	: [
		{ title: 'Usr one', 	id:"DSQFGH" },
		{ title: 'Usr two',		id:"azghjrue" },
	],

})

export const getters = {

}

export const mutations = {
	
	set_list (store, data) {
		
		console.log("\n... store/usr : set_list...")
	
		store.msg 			= data.msg
		store.list 			= data.data
		store.list_query 	= data.query_resume
		store.list_counts 	= data.counts
	
	},
	
	set_current (store, data) {
		console.log("\n... store/usr : set_current...")
		store.current 		= data.data
	},

}

export const actions = {

	// async getItem ({commit, state, rootState}, item_id) {
	// 	console.log("\n... store/usr : getItem...");
	// 	var config = { 
	// 		headers : { 'Authorization' : rootState.auth.access_token },
	// 	}
	// 	console.log("... store/usr : config : ", config );
		
	// 	return this.$axios.$get('usr/infos/get_one/'+item_id , config )
	// 	  .then(response => {
	// 		console.log("... store/usr : response : ", response);
	// 		commit('set_current', response);
	// 		return response
	// 	  })
	// 	  .catch(error => {
	// 		console.log(error.response)
	// 		return error
	// 	  })
	// },
}