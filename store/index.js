
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

const dmf_types_list = [
	'text',
	'email',
	'float',
	'integer',
	'date',
	'price',
	'address',
	'geoloc',
	'tag',
	'other'
]

const src_types_list = [
	'xls',
	'csv',
	'API',
]
const src_fileTypes_list = [
	'xls',
	'csv',
	// 'API',
]
const src_csvSeparators_list = [
	';',
	',',
	'|',
]

const licences_list = [
	'CC BY',
	'CC BY-SA',
	'CCO', 
	'GNU', 
	'MIT', 
	'ODbL',
	'ODC-By', 
	'OpenGL', 
	'PDDL', 
]

// openlevel choices must be coherent with backend choices
const openlevel_list 			= [
	'open_data', 
	'commons', 
	'collective', 
	'private'
]
const openlevel_edit_list 			= [
	// 'open_data', 
	'commons', 
	'collective', 
	'private'
]
const user_edit_auth_list 			= [
	'owner', 
	'manager', 
	// 'editor', 
	'contributor'
]
const user_edit_auth_rights_list	= {
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
	// 'editor'		: {
	// 	'can_edit_r_fields' : ['infos', 'public_auth','data_raw'],
	// 	'can_edit_datasets'	: ['dsi','tag','dmt','dmf'],
	// 	'can_delete'	 	: false,
	// }, 
	'contributor' 	: {
		'can_edit_r_fields'	: ['data_raw'],
		'can_edit_datasets' : ['dsi'],
		'can_delete' 		: false,
	}
}

const mainIconsConst = {

	home				: { icon : "home",				 		to:"/" },
	// dashboard	 	: { icon : "fas fa-th-list",				to:"/dashboard",	abr:"dsh"},
	// dashboard	 		: { icon : "fas fa-eye",				to:"/dashboard",	abr:"dsh"},
	dashboard	 		: { icon : "dashboard",					to:"/dashboard",	abr:"dsh"},
	
	projects			: { icon : "fas fa-project-diagram",	to:"/prj",			abr:"prj" },
	datamodels			: { icon : "fas fa-table",				to:"/dmt",			abr:"dmt" },
	datamodel_fields	: { icon : "fas fa-asterisk",			to:"/dmf",			abr:"dmf" },
	datasets			: { icon : "fas fa-database",			to:"/dsi",			abr:"dsi" },
	recipes				: { icon : "fas fa-magic",				to:"/rec",			abr:"rec" },
	tags				: { icon : "fas fa-tag",				to:"/tag",			abr:"tag" },
	users		 		: { icon : "fas fa-user-friends",	 	to:"/usr",			abr:"usrs" },
	
	settings			: { icon : "settings",					to:"/usr/settings", abr:"dsh" },
	options				: { icon : "more_vert" },
	
	profile	 			: { icon : "far fa-user-circle",		to:"/usr",			abr:"usr" },
	password			: { icon : "fas fa-unlock",			 	to:"/usr/password", abr:"pwd" },
	login				: { icon : "fas fa-sign-in-alt",		to:"/login" },
	register			: { icon : "fas fa-user-plus",			to:"/register" },
	logout				: { icon : "power_settings_new",		to:"/logout" },

	language			: { icon : "language" },
	video				: { icon : "play_circle_outline" },

	about				: { icon : "fas fa-question" },
	faq					: { icon : "fas fa-question" },
	lexicon				: { icon : "fas fa-question" },
	tutos				: { icon : "fas fa-question" },

	list				: { icon : "list" },
	favorites			: { icon : "favorite" },
	create				: { icon : "add" },
	question			: { icon : "fas fa-question" },
	view				: { icon : "remove_red_eye" },
	edit				: { icon : "edit" },
	check				: { icon : "check" },
	map_doc				: { icon : "fas fa-exchange-alt" },
	upload				: { icon : "fas fa-file-upload" },
	reset				: { icon : "fas fa-redo" },
	delete				: { icon : "delete_forever" },
	warning				: { icon : "fas fa-exclamation-circle" },
	cancel				: { icon : "cancel" },
	close				: { icon : "close" },
	export				: { icon : "get_app" },

	geoloc				: { icon : "pin_drop" },

	back				: { icon : "arrow_back" },
	arr_up				: { icon : "keyboard_arrow_up" },
	arr_down			: { icon : "keyboard_arrow_down" },

	infos				: { icon : "info" },
	link				: { icon : "arrow_forward" },
	data				: { icon : "data_usage" },
	add_to_parent		: { icon : "library_add" },

	// parentField icons 
	parentFieldIcons : {
		infos				: { icon : "info" },
		public_auth			: { icon : "lock_open" },
		specs				: { icon : "details" },
		log					: { icon : "history" },
		modif_log			: { icon : "history" },
		uses				: { icon : "fas fa-tachometer-alt" },
		datasets			: { icon : "fas fa-puzzle-piece" },
		translations		: { icon : "translate" },
		team				: { icon : "supervisor_account" },
		mapping				: { icon : "link" },
		data_raw			: { icon : "fas fa-database" },
		profile				: { icon : "far fa-user" },
		professionnal_infos	: { icon : "far fa-building" },
		auth				: { icon : "lock "}
	}

		
}		

export const state = () => ({
	
	//  APP TITLE
	title	 : '<span>SOLI</span><i><strong>DATA</strong></i>',
	version	 : '<span>v.0.1</span>',
	year	 : '2018-2019',

	app_logo 	: '/logos/logo_solidata_15a_lg.png',
	app_logo_lg : '/logos/logo_solidata_15a.png',
	app_codemos : '/logos/logo_codemos_01b.png',

	toolbar_h 	: 50, // in pixels

	is_debug 	: false ,
	
	show_agreement_cgu : true , 
	
	is_alert	: false,
	alert 		: {},
	alert_timeout : 2000,

	is_error	: false,
	error 		: {},
	error_timeout : 7000,

	// USER AUTH
	auth 	: null, 
	
	// current_collection : 'prj',

	collectionsNames		: collectionsDict,
	mainSectionsHeight 		: "50px", 
	dataIteratorHeight 		: "30px", 
	mainIcons 				: mainIconsConst, 

	createSize 					: "md10 offset-md1",

	licencesList				: licences_list,
	openlevelList				: openlevel_list,
	openlevelEditList			: openlevel_edit_list,

	src_fileTypesList			: src_fileTypes_list,
	src_csvSeparatorsList		: src_csvSeparators_list,

	user_edit_authList			: user_edit_auth_list,
	user_edit_auth_rightsList	: user_edit_auth_rights_list,




	// DEPRECATED UNTIL -->
	// cf : https://www.data.gouv.fr/fr/licences
	// licences 			: [
	// 	'MIT', 
	// 	'GNU', 
	// 	'OpenGL', 
	// 	'CCO', 
	// 	'PDDL', 
	// 	'ODC-By', 
	// 	'ODbL',
	// 	'CC BY',
	// 	'CC BY-SA',
	// ],
	// // openlevel choices must be coherent with backend choices
	// openlevel 			: [
	// 	'open_data', 
	// 	'commons', 
	// 	'collective', 
	// 	'private'
	// ],
	// openlevel_edit 		: [
	// 	// 'open_data', 
	// 	'commons', 
	// 	'collective', 
	// 	'private'
	// ],
	// user_edit_auth 			: [
	// 	'owner', 
	// 	'manager', 
	// 	'editor', 
	// 	'contributor'
	// ],
	// user_edit_auth_rights	: {
	// 	'owner' 		: {
	// 		'can_edit_r_fields' : ['infos', 'public_auth','data_raw','team','mapping'],
	// 		'can_edit_datasets'	: ['dsi','data_raw','tag','dmt','dmf','dso','rec',],
	// 		'can_delete' 		: true,
	// 	}, 
	// 	'manager'		: {
	// 		'can_edit_r_fields' : ['infos', 'public_auth','data_raw','team','mapping'],
	// 		'can_edit_datasets'	: ['dsi','tag','dmt','dmf','dso','rec'],
	// 		'can_delete' 		: false,
	// 	}, 
	// 	'editor'		: {
	// 		'can_edit_r_fields' : ['infos', 'public_auth','data_raw'],
	// 		'can_edit_datasets'	: ['dsi','tag','dmt','dmf'],
	// 		'can_delete'	 	: false,
	// 	}, 
	// 	'contributor' 	: {
	// 		'can_edit_r_fields'	: ['data_raw'],
	// 		'can_edit_datasets' : ['dsi'],
	// 		'can_delete' 		: false,
	// 	}
	// },
	//  -->


	// VALUES : meta data about parentField and subFields

	parentFieldsWithList : [
		"modif_log", 
		"translations",
		"team"
	],

	subFieldsWithList : [
		
		// in parentField : specs
		"child_of_tag", "parent_of_tag",
		
		// in parentField : uses
		"by_usr", "by_dmt", "by_dsi", "by_dso", "by_prj",
		
		// in parentField : datasets
		"tag_list","prj_list","dmt_list","dmf_list","dsi_list","dsr_list","dso_list","rec_list","func_list",
		
		// in parentField : mapping
		"dsi_to_dmf", "rec_to_dmf","rec_to_func",
			"visible_dmf_list","params",
		
		// in parentField : data_raw
		"f_data",

		// in parentField : profile
		"usr_profiles", 

		// in parentField : professional_infos
		"user_professional_infos", 

	],

	subFieldsWithChoices : {
		"open_level_edit" 	: { choices : openlevel_edit_list } ,
		"open_level_show" 	: { choices : openlevel_list } ,
		"user_edit_auth"	: { choices : user_edit_auth_list } ,
		"licence" 			: { choices : licences_list } ,
		"f_type" 			: { choices : dmf_types_list } ,
		"src_type"			: { choices : src_types_list },
		"src_sep"			: { choices : src_csvSeparators_list },
	},

	subFieldsWithBoolean : [
		"f_is_required",
	],

	subFieldsWithTextarea : [
		"description", 
		"f_description",
		"f_comments"
	],

	subFieldsWithFile : [
		"src_link", 
	],

	// MAIN DRAWER
	drawerItems: [

		{ icon: mainIconsConst.home.icon, title: 'links.home', to: '/' },
		{ icon: mainIconsConst.dashboard.icon, title: 'links.dashboard', to: '/dashboard' },

		{ divider : true },

		// PROJECTS
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

		// DATAMODELS
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

		// DATAMODEL FIELDS
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

		// DATASETS
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

		// TAGS
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

		// RECIPES
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
		{ divider : true },

		// USER RELATED
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

		// SETTINGS
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
		{ divider : true },

		// FAQ HELP
		{
			icon: 'keyboard_arrow_up',
			'icon-alt': mainIconsConst.question.icon,
			title: 'links.faq',
			model: false,
			children: [
				{ title: 'links.faq',		 	icon: mainIconsConst.faq.icon, 		to: '/faq', needLogged:false },
				{ title: 'links.lexicon',	 	icon: mainIconsConst.lexicon.icon, 	to: '/lexicon',	needLogged:false },
				{ title: 'links.tutos',		 	icon: mainIconsConst.tutos.icon, 	to: '/tutos', needLogged:false },
				{ title: 'links.about',		 	icon: mainIconsConst.about.icon, 	to: '/about', needLogged:false },
			]
		},

	],

	// FOR DRAWERS CONTROLS
	miniVariant	: false,
	drawer		: false,
	clipped		: true,
	fixedNav	: true,
	right		: true,
	rightDrawer	: false,


	// LOCALES MULTILANGUAGE
	locale			: 'fr',
	locales 		: [	
		'en', 
		'fr',
		'esp',
		// 'tr',
		// 'ge'
	],
	dropdown_lang	: [
		{ text: 'english',	code : 'en'	},
		{ text: 'français', code : 'fr' },
		{ text: 'español', code : 'esp' },
		// { text: 'turkish', code : 'tr' },
		// { text: 'german', code : 'ge' },
	],

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

	// alert
	set_alert (state, alert) {
		state.is_alert = true
		state.alert = alert
	},
	// error
	set_error (state, error) {
		state.is_error = true
		state.error = error
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
		console.log("\n $ nuxtServerInit...")
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
		
		console.log("\n... $ createItem... for payload.collection : ", payload.collection ) ; 

		// HEADERS
		const config = { "headers" : { 'Authorization': rootState.auth.access_token }} ;
		console.log("... $ createItem / config : ", config ) ; 

		// DATA TO SEND
		console.log("... $ createItem / payload.data : ", payload.data ) ; 
		// console.log("... createItem / payload.data.title : ", payload.data.title ) ; 
		var cleanPayload = ObjectCleaner.returnCleanObject( payload.data );
		console.log("... $ createItem / cleanPayload : ", cleanPayload ) ; 


		// CREATE ITEM
		var coll_file = rootState[payload.collection].current_file ;
		console.log("... $ createItem / coll_file : ", coll_file ) ; 


		// is contains file change data to formData
		// if ( payload.data.src_type != 'API' && coll_file != '' ) {
		if ( coll_file != undefined && coll_file != '' ) {
			
			console.log("... $ createItem / payload.data.file  : ",  payload.data.file  ) ; 
			
			// payload to formData
			var formData = new FormData();
			for ( var key in cleanPayload ) {
				formData.append(key, cleanPayload[key]);
			};

			// append file to formData
			formData.append('form_file', coll_file );
			console.log("... $ createItem / formData  : ",  formData  ) ; 
			
			// append stuff to config headers
			config.headers['Content-Type'] =  'multipart/form-data' ;

			// overwrite cleanPayload
			cleanPayload = formData ; 
			console.log("... $ createItem / cleanPayload : ", cleanPayload ) ; 
		}

		// API CALL
		return this.$axios.$post(`${payload.collection}/create/`, cleanPayload, config)
			.then(response => {

				// console.log("... $ createItem / response : ", response ) ; 

				// set up corresponding store 
				commit( `${payload.collection}/set_current`, response.data, { root: true } )
				
				// retrieve item id
				const new_item_id = response.data._id

				commit(`set_alert`, response.msg)

				// redirect to edit-preview page 
				return this.$router.push(`/${payload.collection}/${new_item_id}`)

			})
			.catch(error => {
				console.log("... $ createItem / error : ", error ) ; 
				commit(`set_error`, error)
				return error
			})

	},

	getOneItem({commit, state, rootState}, input ) {

		console.log("\n... $ getOneItem : input : ", input) ; 
		var collection 	= input.collection ;
		var doc_id 		= input.doc_id ; 
		var f_data_params = {} ;
		// var f_data_params 	= input.f_data_params ; 


		// get f_data_params if coll in dsi, dso, dsr
		if( collection === 'dsi' ){
			console.log("... $ getOneItem : collection : ", collection );
			f_data_params = input.f_data_params ; 
		}

		// SET UP CONFIG
		var config = { 
			headers : { 'Authorization' : rootState.auth.access_token },
			params	: f_data_params
		} ;
		console.log("... $ getOneItem : config : ", config );


		// API CALL
		return this.$axios.$get(`${collection}/infos/get_one/${doc_id}`, config )

			.then(response => {
				console.log(`... $ getOneItem : response OK... `);
				// console.log(`... $ getOneItem : response : `, response);
				// commit(`${collection}/set_current`, response.data);
				
				// commit(`set_alert`, response.msg)
				return response
			})

			.catch(error => {
				console.log("... $ getOneItem / error : ", error ) ; 
				commit(`set_error`, error)
				return error
			})

	},


	getListItems ({commit, state, rootState}, input ) {
		
		console.log("\n... $ getListItems : input : ", input);
		
		var collection 	= input.coll ;
		var parameters 	= input.q_params ;
		var level 		= input.level ;

		console.log("... $ getListItems : parameters : ", parameters);

		// SET UP CONFIG FOR API CALL
		const config = { 
			headers : { 'Authorization' : rootState.auth.access_token },
			params	: parameters
		} ;
		// console.log("... $ getListItems : config : ", config );


		// GET DATA 
		return this.$axios.$get(`${collection}/infos/list`, config )

			.then(response => {
				console.log(`... $ getListItems : response OK... `);
				// console.log(`... $ getListItems : response : `, response);
				if ( level != "get_datasets") {
					commit(`${collection}/set_list`, response);
				}

				// commit(`set_alert`, response.msg)
				return response
			})

			.catch(error => {
				console.log("... $ getListItems / error..." ) ; 
				console.log("... $ getListItems / error.response.status : ", error.response.status ) ; 
				// console.log("... $ getListItems / error : ", error ) ; 
				commit(`set_error`, error)
				return error
			})

	},

	resetListsItems({commit, dispatch, state, rootState},input) {

		console.log("reset_lists_fromApi ..." )
		const collections_list		= input.collections ;
		const current_level 		= input.level ;

		var promises_list 	= [] ;
		
		collections_list.forEach ( function (coll, index, initial_array ){

			console.log("- - - coll : ", coll ) ; 

			// create parameters vars for later request in $store
			var parameters = state[coll].parameters
			var input = {
				coll 		: coll,
				level		: current_level,
				q_params	: parameters,
			} ;

			var temp_dispatch = dispatch('getListItems', input ) ;

			promises_list.push(temp_dispatch) ;

		}) ;
		
		/// return promises to allow page to render
		return Promise.all (
			promises_list 
		) ;
		
	},

	updateItem ({commit, state, rootState}, input ) {
		
		console.log("\n... $ updateItem : input : ", input);
		
		var collection 	= input.coll ;
		var doc_id 		= input.doc_id ; 
		var fields 		= input.form ; 
		console.log("... $ updateItem : fields : \n", fields );

		// SET UP CONFIG
		const config = { 
			headers : { 'Authorization' : rootState.auth.access_token },
			// params	: parameters
		} ;
		console.log("... $ updateItem : config : ", config );

		// API CALL
		return this.$axios.$put(`${collection}/edit/${doc_id}`, fields, config )

			.then(response => {
				console.log(`... $ updateItem : response OK... `);
				// console.log(`... $ updateItem : response : `, response);
				// commit(`${collection}/set_current`, response);
				
				// commit(`set_alert`, response.msg)
				return response
			})
		
			.catch(error => {
				console.log("... $ updateItem / error : ", error ) ; 
				commit(`set_error`, error)
				return error
			})

	},

	updateMapping ({commit, state, rootState}, input ) {
		
		console.log("\n... $ updateMapping : input : ", input);
		
		var collection 	= input.coll ;
		var doc_id 		= input.doc_id ; 
		var fields 		= input.form ; 
		console.log("... $ updateMapping : fields : \n", fields );

		// SET UP CONFIG
		const config = { 
			headers : { 'Authorization' : rootState.auth.access_token },
			// params	: parameters
		} ;
		console.log("... $ updateMapping : config : ", config );

		// API CALL
		return this.$axios.$put(`${collection}/mapping/${doc_id}`, fields, config )

			.then(response => {
				console.log(`... $ updateMapping : response OK... `);
				// console.log(`... $ updateMapping : response : `, response);
				commit(`${collection}/set_current`, response);
				
				// commit(`set_alert`, response.msg)
				return response
			})
		
			.catch(error => {
				console.log("... $ updateMapping / error : ", error ) ; 
				commit(`set_error`, error)
				return error
			})

	},

	deleteItem ({commit, state, rootState}, input ) {
		console.log("\n... $ deleteItem : input : ", input);
		
		var collection 	= input.coll ;
		var doc_id 		= input.doc_id ; 

		const config = { 
			headers : { 'Authorization' : rootState.auth.access_token },
			// params	: parameters
		} ;

		console.log("... $ deleteItem : config : ", config );

		
		return this.$axios.$delete(`${collection}/edit/${doc_id}`, config )
			.then(response => {
				// console.log(`... $ deleteItem : response : `, response);
				// commit(`${collection}/set_list`, response);
				
				commit(`set_alert`, response.msg)
				return response
				// return this.$router.push(`/${this.coll}`)
			})
			.catch(error => {
				console.log("... $ deleteItem / error : ", error ) ; 
				commit(`set_error`, error)
				return error
			})

	},


}
