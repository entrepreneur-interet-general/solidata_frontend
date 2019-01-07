

export const state = () => ({

	msg 			: null,
	alert			: {}, 
	edit_mode		: false,

	parameters 		:  {
		page 		: 1,
		per_page   	: 0, //5, // choices=[0, 2, 5, 10, 20, 30, 40, 50, 100],
		cardSizes	: "xs12 sm6 md3 "
	},

	rowsPerPageItems: [ 4, 8, 12 ],
	pagination: {
		rowsPerPage: 4
	},

	current 		: {},
	current_new 	: {},

	list_query 		: null,
	list 			: [],
	list_counts 	: null
	
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

}