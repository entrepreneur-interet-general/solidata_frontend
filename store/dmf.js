
export const state = () => ({

	msg 			: null,
	alert			: {}, 

	parameters 		:  {
		page 		: 1,
		per_page   	: 5 // choices=[2, 5, 10, 20, 30, 40, 50, 100],
	},

	query_current 	: null,
	current 		: {},
	
	list_query 		: null,
	list 			: [],
	list_counts 	: null
	
})

export const getters = {

}

export const mutations = {

	set_list (store, data) {
		
		console.log("\n... store/dmf : set_list...")

		store.msg 			= data.msg
		store.list 			= data.data
		store.list_query 	= data.query_resume
		store.list_counts 	= data.counts

	},
	
	set_current (store, data) {
		console.log("\n... store/dmf : set_current...")
		store.current 		= data.data
	},

}

export const actions = {

	// getList ({commit, state, rootState}) {
	// 	console.log("\n... store/dmf : getList...");
	// 	console.log("... store/dmf : parameters : ", state.parameters);
	// 	const config = { 
	// 		headers : { 'Authorization' : rootState.auth.access_token },
	// 		params	: state.parameters
	// 	} ;

	// 	console.log("... store/dmf : config : ", config );

	// 	return this.$axios.$get('dmf/infos/list', config )
	// 	  .then(response => {
	// 		console.log("... store/dmf : response : ", response);
	// 		// console.log("... store/dmf : response.data : ", response.data);
	// 		commit('set_list', response);
	// 		return response
	// 	  })
	// },

	// async getItem ({commit, state, rootState}, item_id) {
	// 	console.log("\n... store/dmt : getItem...");
	// 	var config = { 
	// 		headers : { 'Authorization' : rootState.auth.access_token },
	// 	}
	// 	console.log("... store/dmt : config : ", config );
		
	// 	return this.$axios.$get('dmt/infos/get_one/'+item_id , config )
	// 	  .then(response => {
	// 		console.log("... store/dmt : response : ", response);
	// 		commit('set_current', response);
	// 		return response
	// 	  })
	// 	  .catch(error => {
	// 		console.log(error.response)
	// 		return error
	// 	  })
	// },

}