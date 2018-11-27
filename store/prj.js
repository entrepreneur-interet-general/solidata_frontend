
export const state = () => ({

	msg 			: null,
	alert			: {}, 
	edit_mode		: false,

	parameters 		:  {
		page 		: 1,
		per_page   	: 5  // choices=[2, 5, 10, 20, 30, 40, 50, 100],
	},

	query_current 	: null,
	current 		: {},
	current_new 	: {},

	list_query 		: null,
	list 			: [],
	list_counts 	: null
	
})

export const getters = {

	get_params : state =>  {
		return state.parameters
	},

	// get_params (state)  {
	// 	return state.parameters
	// },



	// get_config (state)  {

	// 	const usr_access_token = rootState.auth.access_token ;
	// 	if (usr_access_token) {
	// 		const config = { 
	// 			headers : { 'Authorization' : rootState.auth.access_token },
	// 			params	: state.parameters
	// 		}
	// 	}
	// 	else {
	// 		const config = { 
	// 			params	: state.parameters
	// 		}
	// 	}
	// 	return config
	// }

}

export const mutations = {

	set_list (store, data) {
		console.log("\n... store/prj : set_list...")
		store.msg 			= data.msg
		store.list 			= data.data
		store.list_query 	= data.query_resume
		store.list_counts 	= data.counts
	},

	set_current (store, data) {
		console.log("\n... store/prj : set_current...")
		store.current 		= data.data
	},
}

export const actions = {

	// async getList ({commit, state, rootState}) {
		
	// 	console.log("\n... store/prj : getList...");
	// 	console.log("... store/prj : parameters : ", state.parameters);

	// 	// const config = get_config ;
	// 	// var usr_access_token = rootState.auth.access_token ;
	// 	// console.log("... store/prj : getList... usr_access_token :", usr_access_token );
	// 	// if ( rootState.auth.access_token != null ) {
	// 	// if ( !rootState.auth.isAnonymous ) {
	// 	// 	var config = { 
	// 	// 		headers : { 'Authorization' : rootState.auth.access_token },
	// 	// 		params	: state.parameters
	// 	// 	}
	// 	// }
	// 	// else {
	// 	var config = { 
	// 		headers : { 'Authorization' : rootState.auth.access_token },
	// 		// withCredentials: true,
	// 		params	: state.parameters
	// 	}
	// 	// }
	// 	console.log("... store/prj : config : ", config );

	// 	return this.$axios.$get('prj/infos/list', config )
	// 	  .then(response => {
	// 		console.log("... store/prj : response : ", response);
	// 		commit('set_list', response);
	// 		return response
	// 	  })
	// 	  .catch(error => {
	// 		console.log(error.response)
	// 		return error
	// 	  })

	// },

	// async getItem ({commit, state, rootState}, item_id) {
	// 	console.log("\n... store/prj : getItem...");
	// 	var config = { 
	// 		headers : { 'Authorization' : rootState.auth.access_token },
	// 	}
	// 	console.log("... store/prj : config : ", config );
		
	// 	// return this.$axios.$get('prj/infos/get_one/'+item_id , config )
	// 	return this.$axios.$get(`prj/infos/get_one/${item_id}` , config )
	// 		.then(response => {
	// 			console.log("... store/prj : response : ", response);
	// 			commit('set_current', response);
	// 			return response
	// 		})
	// 		.catch(error => {
	// 			console.log(error.response)
	// 			return error
	// 		})
	// },



	// async nuxtServerInit ({dispatch}) {
	// 	console.log("... store/prj : getList as nuxtServerInit...");
	// 	const loaded = dispatch("getList") ;
	// },

}

/*
MODEL PRJ IN DB : 
{
	"_id" : ObjectId"5b560da80a82865c2b78de99",
	"infos" : {
		"title" : "2017_communes_fr_com_code.csv",
		"licence" : "MIT",
		"description" : "description"
	},
	"public_auth" : {
		"guests_can_see" : true,
		"guests_can_edit" : false
	},
	"specs" : {
		"doc_type" : "dsi",
		"src_link" : "2017_communes_fr_com_code.csv",
		"src_type" : "csv"
	},
	"log" : {
		"created_at" : "2018-07-23T17:17:28.061159",
		"created_by" : "5b55fee90a828659a93e9fc6",
		"is_running" : false,
		"is_loaded" : false
	},
	"modif_log" : [],
	"uses" : {
		"by_usr" : [],
		"by_prj" : []
	},
	"team" : [],
	"datasets" : {
		"dsr_list" : [ 
			{
				"oid_dsr" : "5b560da80a82865c2b78de9a",
				"added_by" : "5b55fee90a828659a93e9fc6",
				"added_at" : ISODate("2018-07-23T17:17:28.224Z")
			}, 
			{
				"oid_dsr" : "5b560da80a82865c2b78de9b",
				"added_by" : "5b55fee90a828659a93e9fc6",
				"added_at" : ISODate("2018-07-23T17:17:28.298Z")
			}, 
		],
		"tag_list" : []
	}
}

*/