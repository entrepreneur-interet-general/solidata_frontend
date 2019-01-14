export const state = () => ({

	msg 			: null,
	alert			: {}, 
	edit_mode		: false,

	parameters 		:  {
		page 		: 1,
		per_page   	: 0, //5, // choices=[0, 2, 5, 10, 20, 30, 40, 50, 100],
		cardSizes	: "xs12 sm6 md4"
	},

	rowsPerPageItems: [ 3, 6, 9, 12 ],
	pagination: {
		rowsPerPage: 6
	},

	query_current 	: null,
	current 		: {},
	// current_new 	: {},
	
	list_query 		: null,
	list 			: [],
	list_counts 	: null
})

export const getters = {

	recsListName (state)  {
		// return state.list.filter(list => list.title)
		return state.list.map(a => a.infos.title)
	},

	searchFromTitle : (state) => (string) => {
		return state.list.filter( rec => rec.infos.title === string )
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


}

export const mutations = {

	set_list (store, data) {
		console.log("\n... store/rec : set_list...")
		// console.log("... store/rec : data.data['docs_user_is_in_team']", data.data['docs_user_is_in_team'])
		// console.log("... store/rec : data.data['docs_user_is_in_team']", data.data['docs_user_not_in_team'])

		store.msg 			= data.msg
		store.list 			= data.data
		store.list_query 	= data.query_resume
		store.list_counts 	= data.counts

	},
	
	set_current (store, data) {
		console.log("\n... store/rec : set_current...")
		store.current 		= data.data
	},

	// set a temporary new 
	// set_current_new (store, data) {
	// 	console.log("\n... store/rec : set_current_new...")
	// 	console.log("\n... store/rec - data : ", data )
	// 	store.current_new[data.parentField][data.subField] = data.item_data
	// },

}

export const actions = {

}