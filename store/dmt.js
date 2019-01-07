

export const state = () => ({

	msg 			: null,
	alert			: {}, 
	edit_mode		: false,

	parameters 		:  {
		page 		: 1,
		per_page   	: 0, //5, // choices=[0, 2, 5, 10, 20, 30, 40, 50, 100],
		cardSizes	: "xs12 sm6 md4"
	},

	rowsPerPageItems: [ 3, 6, 12, 18 ],
	pagination: {
		rowsPerPage: 6
	},

	current_file		: '',
	current_filename	: 'no filename',
	
	query_current 	: null,
	current 		: {},
	current_new 	: {

		"infos"			: { 
			"title"			: "your new datamodel template", 
			"description"	: null, 
			"licence"		: "CC BY"
		},
		"public_auth"	: { 
			"open_level_edit": "private", 
			// "open_level_show": "open_data" 
		}, 

	},

	// FOR MAPPING
	current_list_DMF_list 			: [],
	current_list_DMF_list_pivoted 	: [],

	list_query 		: null,
	list 			: [],
	list_counts 	: null
	
})

export const getters = {

}

export const mutations = {

	set_list (store, data) {
		
		console.log("\n... store/dmt : set_list...")

		store.msg 			= data.msg
		store.list 			= data.data
		store.list_query 	= data.query_resume
		store.list_counts 	= data.counts

	},
	
	set_current (store, data) {
		console.log("\n... store/dmt : set_current...")
		store.current 		= data.data
	},

	// FOR MAPPING
	set_current_DMF_list (store, data) {
		console.log("\n... store/dmt : set_current_DMF_list...")
		store.current_list_DMF_list = data
	},

	set_current_DMF_list_pivoted (store, data) {
		console.log("\n... store/dmt : set_current_DMF_list_pivoted...")
		store.current_list_DMF_list_pivoted = data
	},

	// set a temporary new 
	set_current_new (store, data) {
		console.log("\n... store/dmt : set_current_new...")
		console.log("\n... store/dmt - data : ", data )
		store.current_new[data.parentField][data.subField] = data.item_data
	},
}

export const actions = {


}