
// import ObjectCleaner from '~/plugins/utils/ObjectCleaner.js'

export const strict = false

const ObjectCleaner = {

  replaceUndefinedOrNull (key, value) {
    if (value === null || value === undefined || value.length === 0 || value === '') {
      return undefined
    }
    return value
  },

  returnCleanObject (rawObject) {
    state.LOG && console.log('\n// returnCleanObject ... ')
    state.LOG && console.log('// returnCleanObject / rawObject : ', rawObject)

    var stringyfiedObject = JSON.stringify(rawObject, this.replaceUndefinedOrNull)
    var cleanObject = JSON.parse(stringyfiedObject)
    state.LOG && console.log('// returnCleanObject / cleanObject : ', cleanObject)

    return cleanObject
  }
}

const collectionsDict = {
  prj: 'projects',
  dmt: 'datamodels',
  dmf: 'datamodel_fields',
  dsi: 'datasets',
  rec: 'recipes',
  tag: 'tags'
}

const dmfTypesList = [
  'text',
  'email',
  'float',
  'integer',
  'date',
  'price',
  'address',
  'geoloc',
  'tag',
  'category',
  'media_link',
  'hyperlink',
  'boolean',
  'other'
]

const srcTypesList = [
  'xls',
  'xlsx',
  'csv',
  'tsv',
  'API'
]
const srcFileTypesList = [
  'xls',
  'xlsx',
  'csv',
  'tsv'
  // 'API',
]
// TO DO : try to find automatically the separator
const srcCsvSeparatorsList = [
  ';',
  ',',
  '|'
]

// TO DO : list must comme from a collection and from a backend endpoint
const licencesListConst = [
  'CC BY',
  'CC BY-SA',
  'CCO',
  'GNU',
  'MIT',
  'ODbL',
  'ODC-By',
  'OpenGL',
  'PDDL'
]

// openlevel choices must be coherent with backend choices
const openlevelListConst = [
  'open_data',
  'commons',
  'collective',
  'private'
]
const openlevelEditListConst = [
  // 'open_data',
  'commons',
  'collective',
  'private'
]

// TEAM MANAGEMENT
const userEditAuthList = [
  'owner',
  'manager',
  // 'editor',
  'contributor'
]
const userEditAuthRightsList = {
  'owner': {
    'can_edit_r_fields': ['infos', 'public_auth', 'data_raw', 'team', 'mapping'],
    'can_edit_datasets': ['dsi', 'data_raw', 'tag', 'dmt', 'dmf', 'dso', 'rec'],
    'can_delete': true
  },
  'manager': {
    'can_edit_r_fields': ['infos', 'public_auth', 'data_raw', 'team', 'mapping'],
    'can_edit_datasets': ['dsi', 'tag', 'dmt', 'dmf', 'dso', 'rec'],
    'can_delete': false
  },
  // 'editor'  : {
  //  'can_edit_r_fields' : ['infos', 'public_auth','data_raw'],
  //  'can_edit_datasets' : ['dsi','tag','dmt','dmf'],
  //  'can_delete'   : false,
  // },
  'contributor': {
    'can_edit_r_fields': ['data_raw'],
    'can_edit_datasets': ['dsi'],
    'can_delete': false
  }
}

// MAIN ICONS
const mainIconsConst = {

  home: {icon: 'home', to: '/'},
  // dashboard   : {icon : "fas fa-th-list", to:"/dashboard", abr:"dsh"},
  // dashboard : {icon : "fas fa-eye", to:"/dashboard", abr:"dsh"},
  dashboard: {icon: 'dashboard', to: '/dashboard', abr: 'dsh'},

  projects: {icon: 'fas fa-project-diagram', to: '/prj', abr: 'prj'},
  datamodels: {icon: 'fas fa-table', to: '/dmt', abr: 'dmt'},
  datamodel_fields: {icon: 'fas fa-asterisk', to: '/dmf', abr: 'dmf'},
  datasets: {icon: 'fas fa-database', to: '/dsi', abr: 'dsi'},
  recipes: {icon: 'fas fa-magic', to: '/rec', abr: 'rec'},
  tags: {icon: 'fas fa-tag', to: '/tag', abr: 'tag'},
  users: {icon: 'fas fa-user-friends', to: '/usr', abr: 'usrs'},

  settings: {icon: 'settings', to: '/usr/settings', abr: 'dsh'},
  options: {icon: 'more_vert'},

  profile: {icon: 'far fa-user-circle', to: '/usr', abr: 'usr'},
  password: {icon: 'fas fa-unlock', to: '/usr/password', abr: 'pwd'},
  login: {icon: 'fas fa-sign-in-alt', to: '/login'},
  register: {icon: 'fas fa-user-plus', to: '/register'},
  logout: {icon: 'power_settings_new', to: '/logout'},

  language: {icon: 'language'},
  video: {icon: 'play_circle_outline'},

  about: {icon: 'fas fa-question'},
  faq: {icon: 'fas fa-question'},
  lexicon: {icon: 'fas fa-question'},
  tutos: {icon: 'fas fa-question'},
  legal: {icon: 'fas fa-balance-scale'},

  list: {icon: 'list'},
  favorites: {icon: 'favorite'},
  create: {icon: 'add'},
  question: {icon: 'fas fa-question'},
  view: {icon: 'remove_red_eye'},
  edit: {icon: 'fas fa-pen'},
  check: {icon: 'check'},
  // map_doc: {icon: 'fas fa-exchange-alt'},
  map_doc: {icon: 'fas fa-sitemap'},
  upload: {icon: 'fas fa-file-upload'},
  reset: {icon: 'fas fa-redo'},
  reload: {icon: 'fas fa-sync-alt'},
  delete: {icon: 'delete_forever'},
  warning: {icon: 'fas fa-exclamation-circle'},
  cancel: {icon: 'cancel'},
  close: {icon: 'close'},
  rebuild: {icon: 'fas fa-redo-alt'},
  publish: {icon: 'fa fa-upload'},
  export: {icon: 'get_app'},

  geoloc: {icon: 'pin_drop'},

  back: {icon: 'arrow_back'},
  arr_up: {icon: 'keyboard_arrow_up'},
  arr_down: {icon: 'keyboard_arrow_down'},

  infos: {icon: 'info'},
  link: {icon: 'arrow_forward'},
  data: {icon: 'data_usage'},
  add_to_parent: {icon: 'library_add'},

  // parentField icons
  parentFieldIcons: {
    infos: {icon: 'info'},
    public_auth: {icon: 'lock_open'},
    specs: {icon: 'details'},
    log: {icon: 'history'},
    modif_log: {icon: 'history'},
    uses: {icon: 'fas fa-tachometer-alt'},
    datasets: {icon: 'fas fa-puzzle-piece'},
    translations: {icon: 'translate'},
    team: {icon: 'supervisor_account'},
    mapping: {icon: 'link'},
    data_raw: {icon: 'fas fa-database'},
    profile: {icon: 'far fa-user'},
    professionnal_infos: {icon: 'far fa-building'},
    auth: {icon: 'lock '}
  }

}

export const state = () => ({

  // NODE_ENV: process.env.NODE_ENV,
  DEBUG: process.env.DEBUG,
  MODE_APP: process.env.MODE_APP,
  LOG: process.env.LOG,
  CONFIG: process.env.CONFIG_APP,
  is_debug: false,

  // APP TITLE
  title: '<span>SOLI</span><i><strong>DATA</strong></i>',
  version: '<span>v.0.1</span>',
  year: '2018-2019',

  // APP LOGO
  app_logo: '/logos/logo_solidata_15a_lg.png',
  app_logo_lg: '/logos/logo_solidata_15a.png',
  app_codemos: '/logos/logo_codemos_01b.png',

  toolbar_h: 50, // in pixels

  show_agreement_cgu: true,

  is_alert: false,
  alert: {},
  alert_timeout: 5000,

  is_error: false,
  error: {},
  error_timeout: 7000,

  // USER AUTH
  auth: null,

  // current_collection : 'prj',

  collectionsNames: collectionsDict,
  mainSectionsHeight: '50px',
  dataIteratorHeight: '30px',
  mainIcons: mainIconsConst,

  createSize: 'md10 offset-md1',

  licencesList: licencesListConst,
  openlevelList: openlevelListConst,
  openlevelEditList: openlevelEditListConst,

  src_fileTypesList: srcFileTypesList,
  src_csvSeparatorsList: srcCsvSeparatorsList,

  user_edit_authList: userEditAuthList,
  user_edit_auth_rightsList: userEditAuthRightsList,

  // DEPRECATED UNTIL -->
  // cf : https://www.data.gouv.fr/fr/licences
  // licences : [
  //  'MIT',
  //  'GNU',
  //  'OpenGL',
  //  'CCO',
  //  'PDDL',
  //  'ODC-By',
  //  'ODbL',
  //  'CC BY',
  //  'CC BY-SA',
  // ],
  // // openlevel choices must be coherent with backend choices
  // openlevel : [
  //  'open_data',
  //  'commons',
  //  'collective',
  //  'private'
  // ],
  // openlevel_edit   : [
  //  // 'open_data',
  //  'commons',
  //  'collective',
  //  'private'
  // ],
  // user_edit_auth : [
  //  'owner',
  //  'manager',
  //  'editor',
  //  'contributor'
  // ],
  // user_edit_auth_rights : {
  //  'owner'   : {
  //   'can_edit_r_fields' : ['infos', 'public_auth','data_raw','team','mapping'],
  //   'can_edit_datasets' : ['dsi','data_raw','tag','dmt','dmf','dso','rec',],
  //   'can_delete'   : true,
  // },
  //  'manager'  : {
  //   'can_edit_r_fields' : ['infos', 'public_auth','data_raw','team','mapping'],
  //   'can_edit_datasets' : ['dsi','tag','dmt','dmf','dso','rec'],
  //   'can_delete'   : false,
  // },
  //  'editor'  : {
  //   'can_edit_r_fields' : ['infos', 'public_auth','data_raw'],
  //   'can_edit_datasets' : ['dsi','tag','dmt','dmf'],
  //   'can_delete'   : false,
  // },
  //  'contributor'  : {
  //   'can_edit_r_fields' : ['data_raw'],
  //   'can_edit_datasets' : ['dsi'],
  //   'can_delete'   : false,
  // }
  // },
  //  -->

  // VALUES : meta data about parentField and subFields

  parentFieldsWithList: [
    'modif_log',
    'translations',
    'team'
  ],

  subFieldsWithList: [

    // in parentField : specs
    'child_of_tag', 'parent_of_tag',

    // in parentField : uses
    'by_usr', 'by_dmt', 'by_dsi', 'by_dso', 'by_prj',

    // in parentField : datasets
    'tag_list', 'prj_list', 'dmt_list', 'dmf_list', 'dsi_list', 'dsr_list', 'dso_list', 'rec_list', 'func_list',

    // in parentField : mapping
    'dsi_to_dmf', 'rec_to_dmf', 'rec_to_func',
    'visible_dmf_list', 'params',

    // in parentField : data_raw
    'f_data',

    // in parentField : profile
    'usr_profiles',

    // in parentField : professional_infos
    'user_professional_infos'

  ],

  subFieldsWithChoices: {
    'open_level_edit': {choices: openlevelEditListConst},
    'open_level_show': {choices: openlevelListConst},
    'user_edit_auth': {choices: userEditAuthList},
    'licence': {choices: licencesListConst},
    'f_type': {choices: dmfTypesList},
    'src_type': {choices: srcTypesList},
    'src_sep': {choices: srcCsvSeparatorsList}
  },

  subFieldsWithBoolean: [
    'f_is_required'
  ],

  subFieldsWithTextarea: [
    'description',
    'f_description',
    'f_comments'
  ],

  subFieldsWithFile: [
    'src_link'
  ],

  // MAIN DRAWER
  drawerItems: [

    {icon: mainIconsConst.home.icon, title: 'links.home', to: '/'},
    {icon: mainIconsConst.dashboard.icon, title: 'links.dashboard', to: '/dashboard'},

    {divider: true},

    // PROJECTS
    {
      icon: 'keyboard_arrow_down',
      'icon-alt': mainIconsConst.projects.icon,
      title: 'links.allprojects',
      model: false,
      children: [
        {title: 'global.list', icon: mainIconsConst.projects.icon, to: '/prj'},
        {title: 'links.myprojects', icon: mainIconsConst.favorites.icon, to: '/usr/prj', needLogged: true},
        {title: 'global.create', icon: mainIconsConst.create.icon, to: '/prj/create', needLogged: true}
        // {title: 'global.export', icon : mainIconsConst.export.icon, to: '/prj/export', needLogged:true},
      ]
    },

    // DATAMODELS
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': mainIconsConst.datamodels.icon,
      title: 'links.alldatamodels',
      model: false,
      children: [
        {title: 'global.list', icon: mainIconsConst.datamodels.icon, to: '/dmt'},
        {title: 'links.mydatamodels', icon: mainIconsConst.favorites.icon, to: '/usr/dmt', needLogged: true},
        {title: 'global.create', icon: mainIconsConst.create.icon, to: '/dmt/create', needLogged: true}
        // {title: 'global.export', icon : mainIconsConst.export.icon, to: '/', needLogged:true},
      ]
    },

    // DATAMODEL FIELDS
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': mainIconsConst.datamodel_fields.icon,
      title: 'links.alldatamodelfields',
      model: false,
      children: [
        {title: 'global.list', icon: mainIconsConst.datamodel_fields.icon, to: '/dmf'},
        {title: 'links.mydatamodelfields', icon: mainIconsConst.favorites.icon, to: '/usr/dmf', needLogged: true},
        {title: 'global.create', icon: mainIconsConst.create.icon, to: '/dmf/create', needLogged: true}
        // {title: 'global.export', icon : mainIconsConst.export.icon, to: '/', needLogged:true},
      ]
    },

    // DATASETS
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': mainIconsConst.datasets.icon,
      title: 'links.alldatasets',
      model: false,
      children: [
        {title: 'global.list', icon: mainIconsConst.datasets.icon, to: '/dsi'},
        {title: 'links.mydatasets', icon: mainIconsConst.favorites.icon, to: '/usr/dsi', needLogged: true},
        {title: 'global.create', icon: mainIconsConst.create.icon, to: '/dsi/create', needLogged: true}
        // {title: 'global.export', icon : mainIconsConst.export.icon, to: '/dsi/export',needLogged:true},
      ]
    },

    // TAGS
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': mainIconsConst.tags.icon,
      title: 'links.alltags',
      model: false,
      children: [
        {title: 'global.list', icon: mainIconsConst.tags.icon, to: '/tag'},
        {title: 'links.mytags', icon: mainIconsConst.favorites.icon, to: '/usr/tag', needLogged: true},
        {title: 'global.create', icon: mainIconsConst.create.icon, to: '/tag/create', needLogged: true}
        // {title: 'global.export', icon : mainIconsConst.export.icon, to: '/tag/e', needLogged:true},
      ]
    },
    {divider: true},

    // RECIPES
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': mainIconsConst.recipes.icon,
      title: 'links.allrecipes',
      model: false,
      children: [
        {title: 'global.list', icon: mainIconsConst.recipes.icon, to: '/rec'},
        {title: 'links.myrecipes', icon: mainIconsConst.favorites.icon, to: '/usr/rec', needLogged: true},
        {title: 'global.create', icon: mainIconsConst.create.icon, to: '/rec/create', needLogged: true}
        // {title: 'global.export', icon : mainIconsConst.export.icon, to: '/rec/export', needLogged:true},
      ]
    },
    {divider: true},

    // USER RELATED
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': mainIconsConst.users.icon,
      title: 'links.allusers',
      model: false,
      children: [
        {title: 'global.list', icon: mainIconsConst.users.icon, to: '/admin/users'}
      ]
    },
    {divider: true},

    // SETTINGS
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': mainIconsConst.settings.icon,
      title: 'links.mysettings',
      model: false,
      children: [
        {title: 'links.myprofile', icon: mainIconsConst.profile.icon, to: '/usr', needLogged: true},
        {title: 'links.mypwd', icon: mainIconsConst.password.icon, to: '/usr/password', needLogged: true},
        {title: 'home.loginPage', icon: mainIconsConst.login.icon, to: '/login', hideWhenLogged: true},
        {title: 'home.registerPage', icon: mainIconsConst.register.icon, to: '/register', hideWhenLogged: true},
        {title: 'home.logoutPage', icon: mainIconsConst.logout.icon, to: '/logout', needLogged: true}
      ]
    },
    {divider: true},

    // FAQ HELP
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': mainIconsConst.question.icon,
      title: 'links.faq',
      model: false,
      children: [
        {title: 'links.faq', icon: mainIconsConst.faq.icon, to: '/faq', needLogged: false},
        {title: 'links.lexicon', icon: mainIconsConst.lexicon.icon, to: '/lexicon', needLogged: false},
        {title: 'links.tutos', icon: mainIconsConst.tutos.icon, to: '/tutos', needLogged: false}
      ]
    },
    {divider: true},

    // LEGAL & CONTACT
    {
      icon: 'keyboard_arrow_up',
      'icon-alt': mainIconsConst.legal.icon,
      title: 'links.legal',
      model: false,
      children: [
        {title: 'links.about', icon: mainIconsConst.about.icon, to: '/about', needLogged: false},
        {title: 'links.cgu', icon: mainIconsConst.legal.icon, to: '/legal/cgu', needLogged: false},
        {title: 'links.confid', icon: mainIconsConst.legal.icon, to: '/legal/confid', needLogged: false},
        {title: 'links.legal', icon: mainIconsConst.legal.icon, to: '/legal/legal', needLogged: false}
      ]
    }
  ],

  // FOR DRAWERS CONTROLS
  miniVariant: false,
  drawer: false,
  clipped: true,
  fixedNav: true,
  right: true,
  rightDrawer: false,

  // LOCALES MULTILANGUAGE
  locale: 'fr',
  locales: [
    'en',
    'fr',
    'esp'
    // 'tr',
    // 'ge'
  ],
  dropdown_lang: [
    {text: 'english', code: 'en'},
    {text: 'français', code: 'fr'},
    {text: 'español', code: 'esp'}
    // {text: 'turkish', code : 'tr'},
    // {text: 'german', code : 'ge'},
  ]

})

export const getters = {

  getLog: state => {
    return state.LOG
  }

}

export const mutations = {

  // current collection : 'prj', 'usr', ''
  // set_current_collection (state, data) {
  //  state.current_collection = data
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

  set_see_agreement_cgu (state, agreement) {
    state.show_agreement_cgu = agreement
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
  }

}

export const actions = {

  nuxtServerInit ({commit, state}, {req}) {
    state.LOG && console.log('\n $ nuxtServerInit...')
    //  let accessToken  = null ;
    //  let refreshToken = null ;
    //  if (req.headers.cookie) {
    //  var parsed = cookieparser.parse(req.headers.cookie)
    //  state.LOG && console.log("parsed : ", parsed)
    //  accessToken = JSON.parse(parsed.tokens.access_token)
    //  refreshToken = JSON.parse(parsed.tokens.refresh_token)
    // }
    //  let tokens = {
    //  access_token : accessToken,
    //  refresh_token : refreshToken
    // }  ;
    //  commit('set_tokens',  response.tokens)
  },

  createItem ({commit, state, rootState}, payload) {
    state.LOG && console.log('\n... $ createItem... for payload.collection : ', payload.collection)

    const collection = payload.collection

    // HEADERS
    const config = {'headers': {'Authorization': rootState.auth.access_token}}
    state.LOG && console.log('... $ createItem / config : ', config)

    // DATA TO SEND
    state.LOG && console.log('... $ createItem / payload.data : ', payload.data)
    // state.LOG && console.log("... createItem / payload.data.title : ", payload.data.title ) ;
    var cleanPayload = ObjectCleaner.returnCleanObject(payload.data)
    state.LOG && console.log('... $ createItem / cleanPayload : ', cleanPayload)

    // CREATE ITEM
    var collFile = rootState[collection].current_file
    state.LOG && console.log('... $ createItem / collFile : ', collFile)

    // is contains file change data to formData
    // if ( payload.data.src_type != 'API' && collFile != '' ) {
    if (collFile !== undefined && collFile !== '') {
      state.LOG && console.log('... $ createItem / collFile  : ', collFile)

      // payload to formData
      var formData = new FormData()
      for (var key in cleanPayload) {
        formData.append(key, cleanPayload[key])
      } ;

      // append file to formData
      formData.append('form_file', collFile)
      state.LOG && console.log('... $ createItem / formData  : ', formData)

      // append stuff to config headers
      config.headers['Content-Type'] = 'multipart/form-data'

      // overwrite cleanPayload
      cleanPayload = formData
      state.LOG && console.log('... $ createItem / cleanPayload : ', cleanPayload)
    }

    // API CALL
    return this.$axios.$post(`${collection}/create/`, cleanPayload, config)
      .then(response => {
        state.LOG && console.log('... $ createItem / response : ', response)

        // set up corresponding store
        commit(`${collection}/set_current`, response.data, {root: true})

        // reset current_new
        commit(`${collection}/reset_current_new`, {root: true})

        // retrieve item id
        const newItemId = response.data._id

        // commit(`set_alert`, response.msg)

        // redirect to edit-preview page
        return this.$router.push(`/${collection}/${newItemId}`)
      })
      .catch(error => {
        state.LOG && console.log('... $ createItem / error : ', error)
        commit(`set_error`, error)
        return error
      })
  },

  getOneItem ({commit, state, rootState}, input) {
    state.LOG && console.log('\n... $ getOneItem : input : ', input)
    var collection = input.collection
    var docId = input.doc_id
    var fDataParams = {}

    // get fDataParams if coll in dsi, dso, dsr
    if (collection === 'dsi' || collection === 'dso') {
      state.LOG && console.log('... $ getOneItem : collection : ', collection)
      fDataParams = input.f_data_params
    }

    // SET UP CONFIG
    var config = {
      headers: {'Authorization': rootState.auth.access_token},
      params: fDataParams
    }
    state.LOG && console.log('... $ getOneItem : config : ', config)

    // API CALL
    return this.$axios.$get(`${collection}/infos/get_one/${docId}`, config)

      .then(response => {
        state.LOG && console.log(`... $ getOneItem : response OK... `)
        // state.LOG && console.log(`... $ getOneItem : response : `, response);
        if (input.set_current) {
          commit(`${collection}/set_current`, response)
        }

        // commit(`set_alert`, response.msg)
        return response
      })

      .catch(error => {
        state.LOG && console.log('... $ getOneItem / error : ', error)
        commit(`set_error`, error)
        return error
      })
  },

  getListItems ({commit, state, rootState}, input) {
    state.LOG && console.log('\n... $ getListItems : input : ', input)

    var collection = input.coll
    var parameters = input.q_params
    var level = input.level

    state.LOG && console.log('... $ getListItems : parameters : ', parameters)

    // SET UP CONFIG FOR API CALL
    const config = {
      headers: {'Authorization': rootState.auth.access_token},
      params: parameters
    }
    // state.LOG && console.log("... $ getListItems : config : ", config );

    // GET DATA
    return this.$axios.$get(`${collection}/infos/list`, config)

      .then(response => {
        state.LOG && console.log(`... $ getListItems : response OK... `)
        // state.LOG && console.log(`... $ getListItems : response : `, response);
        if (level !== 'get_datasets') {
          commit(`${collection}/set_list`, response)
        }

        // commit(`set_alert`, response.msg)
        return response
      })

      .catch(error => {
        state.LOG && console.log('... $ getListItems / error...')
        state.LOG && console.log('... $ getListItems / error.response.status : ', error.response.status)
        // state.LOG && console.log("... $ getListItems / error : ", error ) ;
        commit(`set_error`, error)
        return error
      })
  },

  resetListsItems ({commit, dispatch, state, rootState}, input) {
    state.LOG && console.log('reset_lists_fromApi ...')
    const collectionsList = input.collections
    const currentLevel = input.level

    var promisesList = []

    collectionsList.forEach(function (coll) {
      state.LOG && console.log('- - - coll : ', coll)

      // create parameters vars for later request in $store
      var parameters = state[coll].parameters
      var input = {
        coll: coll,
        level: currentLevel,
        q_params: parameters
      }

      var tempDispatch = dispatch('getListItems', input)

      promisesList.push(tempDispatch)
    })

    /// return promises to allow page to render
    return Promise.all(
      promisesList
    )
  },

  reloadData ({commit, dispatch, state, rootState}, payload) {
    state.LOG && console.log('\n... $ reloadData... for payload.collection : ', payload.collection)

    const collection = payload.collection
    const docId = payload.doc_id

    // HEADERS
    const config = {'headers': {'Authorization': rootState.auth.access_token}}
    state.LOG && console.log('... $ reloadData / config : ', config)

    // DATA TO SEND
    state.LOG && console.log('... $ reloadData / payload.data : ', payload.data)
    var cleanPayload = ObjectCleaner.returnCleanObject(payload.data)
    state.LOG && console.log('... $ reloadData / cleanPayload : ', cleanPayload)

    // CREATE ITEM
    var collFile = rootState[collection].current_file
    state.LOG && console.log('... $ reloadData / collFile : ', collFile)

    // if contains file change data to formData
    if (collFile !== undefined && collFile !== '') {
      state.LOG && console.log('... $ reloadData / collFile  : ', collFile)

      // payload to formData
      var formData = new FormData()
      for (var key in cleanPayload) {
        formData.append(key, cleanPayload[key])
      } ;

      // append file to formData
      formData.append('form_file', collFile)
      state.LOG && console.log('... $ reloadData / formData  : ', formData)

      // append stuff to config headers
      config.headers['Content-Type'] = 'multipart/form-data'

      // overwrite cleanPayload
      cleanPayload = formData
      state.LOG && console.log('... $ reloadData / cleanPayload : ', cleanPayload)
    }

    // API CALL
    return this.$axios.$post(`${collection}/reload/${docId}`, cleanPayload, config)
      .then(response => {
        state.LOG && console.log(`... $ reloadData : response OK... `)
        // set up corresponding store
        // commit(`${collection}/set_current`, response.data, {root: true})
        let input = payload
        input['fDataParams'] = {}
        input['set_current'] = true
        dispatch(`getOneItem`, input)
        return response
      })
      .catch(error => {
        state.LOG && console.log('... $ reloadData / error : ', error)
        commit(`set_error`, error)
        return error
      })
  },

  updateItem ({commit, dispatch, state, rootState}, input) {
    state.LOG && console.log('\n... $ updateItem : input : ', input)

    var collection = input.coll
    var docId = input.doc_id
    var fields = input.form
    state.LOG && console.log('... $ updateItem : fields : \n', fields)

    // SET UP CONFIG
    const config = {
      headers: {'Authorization': rootState.auth.access_token}
      // params : parameters
    }
    state.LOG && console.log('... $ updateItem : config : ', config)

    // API CALL
    return this.$axios.$put(`${collection}/edit/${docId}`, fields, config)

      .then(response => {
        state.LOG && console.log(`... $ updateItem : response OK... `)
        // state.LOG && console.log(`... $ updateItem : response : `, response);
        // commit(`${collection}/set_current`, response);

        // rebuild DSO if updated doc is PRJ
        // if ( collection == 'prj' ) {
        //  var input_dso = {
        //   prj_id : docId
        // }
        //  dispatch('buildDso', input_dso ) ;
        // }

        // commit(`set_alert`, response.msg)
        return response
      })

      .catch(error => {
        state.LOG && console.log('... $ updateItem / error : ', error)
        commit(`set_error`, error)
        return error
      })
  },

  updateMapping ({commit, dispatch, state, rootState}, input) {
    state.LOG && console.log('\n... $ updateMapping : input : ', input)

    var collection = input.coll
    var docId = input.doc_id
    var fields = input.form
    state.LOG && console.log('... $ updateMapping : fields : \n', fields)

    // SET UP CONFIG
    const config = {
      headers: {'Authorization': rootState.auth.access_token}
      // params : parameters
    }
    state.LOG && console.log('... $ updateMapping : config : ', config)

    // API CALL
    return this.$axios.$put(`${collection}/mapping/${docId}`, fields, config)

      .then(response => {
        state.LOG && console.log(`... $ updateMapping : response OK... `)
        // state.LOG && console.log(`... $ updateMapping : response : `, response);
        commit(`${collection}/set_current`, response)

        // rebuild DSO if updated doc is PRJ
        // if ( collection == 'prj' ) {
        //  var input_dso = {
        //   prj_id : docId
        // }
        //  dispatch('buildDso', input_dso ) ;
        // }

        // commit(`set_alert`, response.msg)
        return response
      })

      .catch(error => {
        state.LOG && console.log('... $ updateMapping / error : ', error)
        commit(`set_error`, error)
        return error
      })
  },

  solidifyData ({commit, dispatch, state, rootState}, input) {
    state.LOG && console.log('\n... $ solidifyData : input : ', input)

    var collection = input.coll
    var docId = input.doc_id
    var fields = input.form
    state.LOG && console.log('... $ solidifyData : fields : \n', fields)

    // SET UP CONFIG
    const config = {
      headers: {'Authorization': rootState.auth.access_token}
      // params : parameters
    }
    state.LOG && console.log('... $ solidifyData : config : ', config)

    // API CALL
    return this.$axios.$put(`${collection}/solidify/${docId}`, fields, config)

      .then(response => {
        state.LOG && console.log(`... $ solidifyData : response OK... `)
        // state.LOG && console.log(`... $ solidifyData : response : `, response);
        commit(`${collection}/set_current`, response)

        return response
      })

      .catch(error => {
        state.LOG && console.log('... $ solidifyData / error : ', error)
        commit(`set_error`, error)
        return error
      })
  },

  buildDso ({commit, state, rootState}, input) {
    state.LOG && console.log('\n... $ buildDso : input : ', input)
    var prjId = input.prj_id

    // get f_data_params if coll in dsi, dso, dsr
    var fDataParams = input.f_data_params

    var fields = [
      {'test_param': 'rebuild_dso'}
    ]

    // SET UP CONFIG
    var config = {
      headers: {'Authorization': rootState.auth.access_token},
      params: fDataParams
    }
    state.LOG && console.log('... $ buildDso : config : ', config)

    // API CALL
    return this.$axios.$put(`dso/edit/${prjId}`, fields, config)

      .then(response => {
        state.LOG && console.log(`... $ buildDso : response OK... `)
        // state.LOG && console.log(`... $ buildDso : response : `, response);
        // commit(`dso/set_current`, response);

        commit(`set_alert`, response.msg)
        return response
      })

      .catch(error => {
        state.LOG && console.log('... $ buildDso / error : ', error)
        commit(`set_error`, error)
        return error
      })
  },

  deleteItem ({commit, state, rootState}, input) {
    state.LOG && console.log('\n... $ deleteItem : input : ', input)

    var collection = input.coll
    var docId = input.doc_id

    const config = {
      headers: {'Authorization': rootState.auth.access_token}
      // params : parameters
    }

    state.LOG && console.log('... $ deleteItem : config : ', config)

    return this.$axios.$delete(`${collection}/edit/${docId}`, config)
      .then(response => {
        state.LOG && console.log(`... $ deleteItem : response : `, response)

        commit(`set_alert`, response.msg)
        return response
        // return this.$router.push(`/${this.coll}`)
      })
      .catch(error => {
        state.LOG && console.log('... $ deleteItem / error : ', error)
        commit(`set_error`, error)
        return error
      })
  }

}
