

export const state = () => ({

	msg 			: null,
	alert			: {}, 
	edit_mode		: false,

	parameters 		:  {
		page 		: 1,
		per_page   	: 0, //5, // choices=[0, 2, 5, 10, 20, 30, 40, 50, 100],
		cardSizes	: "xs12 sm6 md3"
	},

	rowsPerPageItems: [ 4, 8, 12 ],
	pagination: {
		rowsPerPage: 8
	},

	parameters_f_data 	:  {
		page 		: 1,
		per_page   	: 5,
		total_items	: 0,
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

	set_f_data_params (store, f_data_params) {
		console.log("\n... store/dsi : set_f_data_params...")
		console.log("... store/dsi - f_data_params : ", f_data_params )
		store.parameters_f_data  = f_data_params
	},

	set_list (store, data) {
		
		console.log("\n... store/dsi : set_list...")

		store.msg 			= data.msg
		store.list 			= data.data
		store.list_query 	= data.query_resume
		store.list_counts 	= data.counts

	},

	set_current (store, data) {
		console.log("\n... store/dsi : set_current...")
		console.log("... store/dsi - data : ", data )
		console.log("... store/dsi - data['data'] : ", data["data"] )
		store.current 		= data["data"]
	},

}

export const actions = {

	dispatch_current (store, data) {
		console.log("\n... store/dsi : dispatch_current...")
		store.commit(`set_current`, data);
	},

}