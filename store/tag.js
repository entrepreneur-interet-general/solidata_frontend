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
	
	tagsListName (state)  {
		// return state.list.filter(list => list.title)
		return state.list.map(a => a.infos.title)
	},

}

export const mutations = {

	set_list (store, data) {
		
		console.log("\n... store/dmt : set_list...")

		store.msg 			= data.msg
		store.list 			= data.data
		store.list_query 	= data.query_resume
		store.list_counts 	= data.counts

	  },

}

export const actions = {

	getList ({commit, state, rootState}) {
		console.log("\n... store/dmt : getList...");
		console.log("... store/dmt : parameters : ", state.parameters);
		const config = { 
			headers : { 'Authorization' : rootState.auth.access_token },
			params	: state.parameters
		} ;

		console.log("... store/dmt : config : ", config );

		return this.$axios.$get('dmt/infos/list', config )
		  .then(response => {
			console.log("... store/dmt : response : ", response);
			commit('set_list', response);
			return response
		  })
	  },

}