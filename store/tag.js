export const state = () => ({

	msg 			: null,
	alert			: {}, 
	edit_mode		: false,

	parameters 		:  {
		page 		: 1,
		per_page   	: 0, //5, // choices=[0, 2, 5, 10, 20, 30, 40, 50, 100],
		cardSizes	: "xs6 sm3 md2 "
	},

	rowsPerPageItems: [ 6, 12, 18, 24 ],
	pagination: {
		rowsPerPage: 18
	},

	query_current 	: null,
	current 		: {},
	current_new : {

		"infos"			: { 
			"title"			: "your new tag", 
			"description"	: null 
		},
		"public_auth"	: { 
			"open_level_edit": "private", 
			// "open_level_show": "open_data" 
		}, 
		"data_raw": { 
			"f_code": "", 
			"f_object": "", 
			// "f_type": "tag", 
			"f_comments": null, 
			// "f_is_required": false 
		}, 
		
	},

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
		
		console.log("\n... store/tag : set_list...")

		store.msg 			= data.msg
		store.list 			= data.data
		store.list_query 	= data.query_resume
		store.list_counts 	= data.counts

	},

	set_current (store, data) {
		console.log("\n... store/tag : set_current...")
		store.current 		= data.data
	},

	// set a temporary new 
	set_current_new (store, data) {
		console.log("\n... store/tag : set_current_new...")
		console.log("\n... store/tag - data : ", data )
		store.current_new[data.parentField][data.subField] = data.item_data
	},

}

export const actions = {


}