
export const state = () => ({

	msg 			: null,
	alert			: {}, 
	edit_mode		: false,

	parameters 		:  {
		page 		: 1,
		per_page   	: 5, // choices=[2, 5, 10, 20, 30, 40, 50, 100],
		cardSizes	: "xs12 sm4 md3 l2"
	},

	query_current 	: null,
	current 		: {},

	// current_new 	: {},
	current_new 	: {
		"infos"			: { 
			"title"			: "your new datamodel field", 
			"description"	: null 
		},
		"public_auth"	: { 
			"open_level_edit": "open_data", 
			// "open_level_show": "open_data" 
		}, 
		// "specs": { 
		// 	"doc_type": "dmf" 
		// }, 
		// "log": { 
		// 	"created_at": "2018-11-20T14:20:47.661000+00:00", 
		// 	"created_by": "5b55fee90a828659a93e9fc6" 
		// }, 
		// "translations": [
		// ], 
		"data_raw": { 
			"f_code"		: "", 
			"f_object"		: "", 
			"f_type"		: "text", 
			"f_comments"	: null, 
			"f_is_required"	: false 
		}, 
		// "modif_log": [
		// ], 
		// "datasets": { 
		// 	"tag_list": [] 
		// }, 
		// "_id": "5bf4183f0a8286180b53183c", 
		// "team": [ 
		// 	{ 
		// 		"oid_usr": "5b55fee90a828659a93e9fc6", 
		// 		"edit_auth": "owner", 
		// 		"added_at": "2018-11-20T14:20:47.661000+00:00", 
		// 		"added_by": "5b55fee90a828659a93e9fc6" 
		// 	} 
		// ], 
		// "uses": { 
		// 	"by_usr": [ 
		// 		{ 
		// 			"used_by": "5b55fee90a828659a93e9fc6", 
		// 			"used_at": [ "2018-11-20T14:20:47.661000+00:00" ] 
		// 		} 
		// 	], 
		// 	"by_dmt": [

		// 	] 
		// }
	},

	list_query 		: null,
	list 			: [],
	list_counts 	: null,
	
	// dmf types
	dmf_types 			: [
		'text',
		'name',
		'float',
		'integer',
		'date',
		'price',
		'adress',
		'latitude',
		'longitude',
		'other'
	],


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

	// set a temporary new 
	set_current_new (store, data) {
		console.log("\n... store/dmf : set_current_new...")
		console.log("\n... store/dmf - data : ", data )
		store.current_new[data.parentField][data.subField] = data.item_data
	},

}

export const actions = {

	// getList ({commit, state, rootState}) {
	// 	console.log("\n... store/dmf : getList...")
	// }, 

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