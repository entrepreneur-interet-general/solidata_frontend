
export const state = () => ({

	msg 			: null,
	alert			: {}, 
	edit_mode		: false,

	parameters 		:  {
		page 		: 1,
		per_page   	: 0, //5, // choices=[0, 2, 5, 10, 20, 30, 40, 50, 100],
		cardSizes	: "xs12 sm4 md2 l2"
	},

	rowsPerPageItems: [ 6, 12, 24, 48 ],
	pagination: {
		rowsPerPage: 12
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
			"open_level_edit": "private", 
			// "open_level_show": "open_data" 
		}, 
		"data_raw": { 
			"f_code"		: "", 
			"f_object"		: "", 
			"f_type"		: "text", 
			"f_comments"	: null, 
			"f_is_required"	: false 
		}, 

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

	WholeList : state => {
		return state.list
	},

	InTeamList : state => {
		return state.list['docs_user_is_in_team']
	},

	NotTeamList : state => {
		return state.list['docs_user_not_in_team']
	},

	ConcatList : state => {

		var concat		= []
		var in_team 	= state.list['docs_user_is_in_team']
		var not_team 	= state.list['docs_user_not_in_team']
		
		if ( in_team != undefined ) {
			var concat 	= concat.concat(in_team);
		}
		if ( not_team != undefined ) {
			var concat 	= concat.concat(not_team);
		}
		// Array.prototype.push(concat, in_team, not_team)
		return concat

	},

	getStandardList : (state, getters) => {
		var allItemsConcat = getters.ConcatList ;
		return allItemsConcat.filter( rec => rec.specs.is_standard == true )
	}

}

export const mutations = {

	set_list (store, data) {
		
		console.log("\n... store/dmf : set_list...")
		console.log("... store/dmf : data.data['docs_user_is_in_team']", data.data['docs_user_is_in_team'])
		console.log("... store/dmf : data.data['docs_user_is_in_team']", data.data['docs_user_not_in_team'])

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


}