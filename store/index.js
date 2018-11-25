
export const strict = false

import ObjectCleaner from "~/utils/ObjectCleaner.js"


const collectionsDict = {
	prj : "projects" ,
	dmt : "datamodels" ,
	dmf : "datamodel_fields" ,
	dsi : "datasets" ,
	rec : "recipes" ,
	tag : "tags" ,
}

const mainIconsConst = {

	home				: { icon : "fas fa-home",				 to:"/" },
	// dashboard	 : { icon : "fas fa-th-list",				to:"/dashboard",	abr:"dsh"},
	dashboard	 		: { icon : "fas fa-eye",				to:"/dashboard",	abr:"dsh"},
	
	projects			: { icon : "fas fa-project-diagram",	to:"/prj",			abr:"prj" },
	datamodels			: { icon : "fas fa-table",				to:"/dmt",			abr:"dmt" },
	datamodel_fields	: { icon : "far fa-square",				to:"/dmf",			abr:"dmf" },
	datasets			: { icon : "fas fa-database",			to:"/dsi",			abr:"dsi" },
	recipes				: { icon : "fas fa-magic",				to:"/rec",			abr:"rec" },
	tags				: { icon : "fas fa-tag",				to:"/tag",			abr:"tag" },
	users		 		: { icon : "fas fa-user-friends",	 	to:"/usr",			abr:"usrs" },
	
	settings			: { icon : "settings",					to:"/usr/settings", abr:"dsh" },

	profile	 			: { icon : "fas fa-user-circle",		to:"/usr",			abr:"usr" },
	password			: { icon : "fas fa-unlock",			 	to:"/usr/password", abr:"pwd" },
	login				: { icon : "fas fa-sign-in-alt",		to:"/login" },
	register			: { icon : "fas fa-user-plus",			to:"/register" },
	logout				: { icon : "power_settings_new",		to:"/logout" },

	language			: { icon : "language" },
	video				: { icon : "play_circle_outline" },

	list				: { icon : "list" },
	favorites			: { icon : "favorite" },
	create				: { icon : "add" },
	edit				: { icon : "fas fa-pen" },
	upload				: { icon : "fas fa-file-upload" },
	delete				: { icon : "far fa-trash-alt" },
	cancel				: { icon : "cancel" },
	export				: { icon : "get_app" },
		
}		

export const state = () => ({
	
	auth 				: null, 
	
	// current_collection : 'prj',

	collectionsNames	: collectionsDict,
	mainSectionsHeight 	: "75px", 
	mainIcons 			: mainIconsConst, 

	// cf : https://www.data.gouv.fr/fr/licences
	licences 			: [
		'MIT', 
		'GNU', 
		'OpenGL', 
		'CCO', 
		'PDDL', 
		'ODC-By', 
		'ODbL',
		'CC BY',
		'CC BY-SA',
	],
	// openlevel choices must be coherent with backend choices
	openlevel 			: [
		'open_data', 
		'commons', 
		'collective', 
		'private'
	],
	user_edit_auth 			: [
		'owner', 
		'manager', 
		'editor', 
		'contributor'
	],
	user_edit_auth_rights	: {
		'owner' 		: {
			'can_edit_r_fields' : ['infos', 'public_auth','data_raw','team','mapping'],
			'can_edit_datasets'	: ['dsi','data_raw','tag','dmt','dmf','dso','rec',],
			'can_delete' 		: true,
		}, 
		'manager'		: {
			'can_edit_r_fields' : ['infos', 'public_auth','data_raw','team','mapping'],
			'can_edit_datasets'	: ['dsi','tag','dmt','dmf','dso','rec'],
			'can_delete' 		: false,
		}, 
		'editor'		: {
			'can_edit_r_fields' : ['infos', 'public_auth','data_raw'],
			'can_edit_datasets'	: ['dsi','tag','dmt','dmf'],
			'can_delete'	 	: false,
		}, 
		'contributor' 	: {
			'can_edit_r_fields'	: ['data_raw'],
			'can_edit_datasets' : ['dsi'],
			'can_delete' 		: false,
		}
	},

	// MAIN DRAWER
	drawerItems: [

		{ icon: mainIconsConst.home.icon, title: 'links.home', to: '/' },
		{ icon: mainIconsConst.dashboard.icon, title: 'links.dashboard', to: '/dashboard' },

		{ divider : true },
		{
			icon: 'keyboard_arrow_down',
			'icon-alt': mainIconsConst.projects.icon,
			title: 'links.allprojects',
			model: false,
			children: [
				{ title: 'global.list', icon : mainIconsConst.projects.icon, to: '/prj' },
				{ title: 'links.myprojects', icon : mainIconsConst.favorites.icon, to: '/usr/prj', needLogged:true },
				{ title: 'global.create', icon : mainIconsConst.create.icon, to: '/prj/create', needLogged:true },
				// { title: 'global.export', icon : mainIconsConst.export.icon, to: '/prj/export', needLogged:true	},
			]
		},
		{
			icon: 'keyboard_arrow_up',
			'icon-alt': mainIconsConst.datamodels.icon,
			title: 'links.alldatamodels',
			model: false,
			children: [
				{ title: 'global.list', icon : mainIconsConst.datamodels.icon, to: '/dmt' },
				{ title: 'links.mydatamodels', icon : mainIconsConst.favorites.icon, to: '/usr/dmt', needLogged:true },
				{ title: 'global.create', icon : mainIconsConst.create.icon, to: '/dmt/create', needLogged:true },
				// { title: 'global.export', icon : mainIconsConst.export.icon, to: '/', needLogged:true	},
			]
		},
		{
			icon: 'keyboard_arrow_up',
			'icon-alt': mainIconsConst.datamodel_fields.icon,
			title: 'links.alldatamodelfields',
			model: false,
			children: [
				{ title: 'global.list', icon : mainIconsConst.datamodel_fields.icon, to: '/dmf' },
				{ title: 'links.mydatamodelfields', icon : mainIconsConst.favorites.icon, to: '/usr/dmf', needLogged:true },
				{ title: 'global.create', icon : mainIconsConst.create.icon, to: '/dmf/create', needLogged:true },
				// { title: 'global.export', icon : mainIconsConst.export.icon, to: '/', needLogged:true	},
			]
		},
		{
			icon: 'keyboard_arrow_up',
			'icon-alt': mainIconsConst.datasets.icon,
			title: 'links.alldatasets',
			model: false,
			children: [
				{ title: 'global.list', icon : mainIconsConst.datasets.icon, to: '/dsi' },
				{ title: 'links.mydatasets', icon : mainIconsConst.favorites.icon, to: '/usr/dsi', needLogged:true },
				{ title: 'global.create', icon : mainIconsConst.create.icon, to: '/dsi/create', needLogged:true },
				// { title: 'global.export', icon : mainIconsConst.export.icon, to: '/dsi/export',needLogged:true	},
			]
		},
		{
			icon: 'keyboard_arrow_up',
			'icon-alt': mainIconsConst.recipes.icon,
			title: 'links.allrecipes',
			model: false,
			children: [
				{ title: 'global.list', icon : mainIconsConst.recipes.icon, to: '/rec' },
				{ title: 'links.myrecipes', icon : mainIconsConst.favorites.icon, to: '/usr/rec', needLogged:true },
				{ title: 'global.create', icon : mainIconsConst.create.icon, to: '/rec/create', needLogged:true },
				// { title: 'global.export', icon : mainIconsConst.export.icon, to: '/rec/export', needLogged:true	},
			]
		},
		{
			icon: 'keyboard_arrow_up',
			'icon-alt': mainIconsConst.tags.icon,
			title: 'links.alltags',
			model: false,
			children: [
				{ title: 'global.list', icon : mainIconsConst.tags.icon, to: '/tag' },
				{ title: 'links.mytags', icon : mainIconsConst.favorites.icon, to: '/usr/tag', needLogged:true },
				{ title: 'global.create', icon : mainIconsConst.create.icon, to: '/tag/create', needLogged:true },
				// { title: 'global.export', icon : mainIconsConst.export.icon, to: '/tag/e', needLogged:true	},
			]
		},
		{ divider : true },
		{
			icon: 'keyboard_arrow_up',
			'icon-alt': mainIconsConst.users.icon,
			title: 'links.allusers',
			model: false,
			children: [
				{ title: 'global.list', icon : mainIconsConst.users.icon, to: '/admin/users'},
			]
		},
		{ divider : true },
		{
			icon: 'keyboard_arrow_up',
			'icon-alt': mainIconsConst.settings.icon,
			title: 'links.mysettings',
			model: false,
			children: [
				{ title: 'links.myprofile',	 	icon: mainIconsConst.profile.icon, to: '/usr',	needLogged:true },
				{ title: 'links.mypwd',		 	icon: mainIconsConst.password.icon, to: '/usr/password', needLogged:true },
				{ title: 'home.loginPage',		icon: mainIconsConst.login.icon,	to: '/login', hideWhenLogged: true },
				{ title: 'home.registerPage', 	icon: mainIconsConst.register.icon,	to: '/register', hideWhenLogged: true },
				{ title: 'home.logoutPage',	 	icon: mainIconsConst.logout.icon, to: '/logout', needLogged:true },
			]
		},


	],

	// FOR DRAWERS CONTROLS
	miniVariant: true,
	drawer: true,
	clipped: true,
	fixedNav: true,
	right: true,
	rightDrawer: false,
	title: 'Solidata - beta',


	// LOCALES MULTILANGUAGE
	locales 		: [	
		'en', 
		'fr',
		// 'sp',
		// 'tr',
		// 'ge'
	],
	dropdown_lang	: [
		{ text: 'english',	code : 'en'	},
		{ text: 'français', code : 'fr' }
		// { text: 'spanish', code : 'sp' }
		// { text: 'turkish', code : 'tr' }
		// { text: 'german', code : 'ge' }
	],
	locale			: 'fr',

})

export const getters = {

}

export const mutations = {

	// current collection : 'prj', 'usr', ''
	// set_current_collection (state, data) {
	// 	state.current_collection = data
	// },

	// languages
	SET_LANG (state, locale) {
		if (state.locales.indexOf(locale) !== -1) {
			state.locale = locale
		}
	},

	// navbar
	set_miniVariant (state) {
		state.miniVariant = !state.miniVariant
	},
	set_drawer (state) {
		state.drawer = !state.drawer
	},
	set_clipped (state) {
		state.clipped = !state.clipped
	},
	set_rightDrawer (state) {
		state.rightDrawer = !state.rightDrawer
	},
	set_fixedNav (state) {
		state.fixedNav = !state.fixedNav
	},
	set_right (state) {
		state.right = !state.right
	},

}



export const actions = {
	
	nuxtServerInit ({ commit }, { req }) {
		console.log("nuxtServerInit...")
	//	 let accessToken	 = null ;
	//	 let refreshToken	= null ;
	//	 if (req.headers.cookie) {
	//	 var parsed = cookieparser.parse(req.headers.cookie)
	//	 console.log("parsed : ", parsed)
	//	 accessToken = JSON.parse(parsed.tokens.access_token)
	//	 refreshToken = JSON.parse(parsed.tokens.refresh_token)
	//	 }
	//	 let tokens = {
	//	 access_token : accessToken,
	//	 refresh_token : refreshToken
	//	 } ;
	//	 commit('set_tokens',		response.tokens)
	},

	createItem ({commit, state, rootState}, payload ) {
		
		console.log("\n... createItem..." ) ; 

		const config = { "headers" : { 'Authorization': rootState.auth.access_token }} ;
		console.log("... createItem / config : ", config ) ; 

		
		console.log("... createItem / payload.data : ", payload.data ) ; 
		console.log("... createItem / payload.data.title : ", payload.data.title ) ; 
		
		var cleanPayload = ObjectCleaner.returnCleanObject( payload.data );
		console.log("... createItem / cleanPayload : ", cleanPayload ) ; 


		return this.$axios.$post(`${payload.collection}/create/`, cleanPayload, config)
			.then(response => {

				console.log("... createItem / response : ", response ) ; 

				// set up corresponding store 
				commit( `${payload.collection}/set_current`, response.data, { root: true } )
				
				// retrieve item id
				const new_item_id = response.data._id

				// redirect to edit-preview page 
				return this.$router.push(`/${payload.collection}/${new_item_id}`)

			})
			.catch(error => {
				console.log("... createItem / error : ", error ) ; 
				return error
			})

	},


	getListItems ({commit, state, rootState}, collection ) {
		console.log("\n... getListItems : collection : ", collection);
		
		// const parameters = this.$store.getters[`${collection}/get_params`]
		const parameters = rootState[`${collection}`].parameters
		console.log("... getListItems : parameters : ", parameters);
		
		const config = { 
			headers : { 'Authorization' : rootState.auth.access_token },
			params	: parameters
		} ;

		console.log("... getListItems : config : ", config );

		return this.$axios.$get(`${collection}/infos/list`, config )
			.then(response => {
				console.log(`... getListItems : response : `, response);
				commit(`${collection}/set_list`, response);
				return response
			})
			.catch(error => {
				console.log("... getListItems / error : ", error ) ; 
				return error
			})

	},

	updateItem ({commit, state, rootState}, input ) {
		console.log("\n... updateItem : input : ", input);
		
		var collection 	= input.coll ;
		var doc_id 		= input.doc_id ; 
		var fields 		= input.form ; 

		const config = { 
			headers : { 'Authorization' : rootState.auth.access_token },
			// params	: parameters
		} ;

		console.log("... updateItem : config : ", config );

		return this.$axios.$put(`${collection}/edit/${doc_id}`, fields, config )
			.then(response => {
				console.log(`... updateItem : response : `, response);
				commit(`${collection}/set_list`, response);
				return response
			})
			.catch(error => {
				console.log("... updateItem / error : ", error ) ; 
				return error
			})

	},

}
