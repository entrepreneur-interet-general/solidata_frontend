
export const state = () => ({

  msg: null,
  alert: {},
  edit_mode: false,

  parameters: {
    page: 1,
    per_page: 0, // 5, // choices=[0, 2, 5, 10, 20, 30, 40, 50, 100],
    cardSizes: 'xs12 sm6 md3'
  },

  rowsPerPageItems: [ 4, 8, 12 ],
  pagination: {
    rowsPerPage: 8
  },

  parameters_f_data: {
    page: 1,
    per_page: 5,
    total_items: 0
  },

  current_file: '',
  current_filename: 'no filename',
  csv_sep: ',',

  query_current: null,
  current: {},
  current_new: {

    'infos': {
      'title': 'your new dataset input',
      'description': null,
      'licence': 'CC BY-SA'
    },
    'public_auth': {
      'open_level_edit': 'private',
      'open_level_show': 'commons'
    },
    'specs': {
      // "doc_type" : "dsi"
      'src_link': null,
      'src_type': 'xls',
      'src_parser': '/path/of/your/list/of/records'
    }

  },
  dft_new: {

    'infos': {
      'title': 'your new dataset input',
      'description': null,
      'licence': 'CC BY-SA'
    },
    'public_auth': {
      'open_level_edit': 'private',
      'open_level_show': 'commons'
    },
    'specs': {
      // "doc_type" : "dsi"
      'src_link': null,
      'src_type': 'xls',
      'src_parser': '/path/of/your/list/of/records'
    }

  },
  list_query: null,
  list: [],
  list_counts: null

})

export const getters = {

}

export const mutations = {

  set_f_data_params (store, fDataParams) {
    console.log('\n... store/dsi : set_f_data_params...')
    console.log('... store/dsi - fDataParams : ', fDataParams)
    store.parameters_f_data = fDataParams
  },

  set_list (store, data) {
    console.log('\n... store/dsi : set_list...')

    store.msg = data.msg
    store.list = data.data
    store.list_query = data.query_resume
    store.list_counts = data.counts
  },

  set_current (store, data) {
    console.log('\n... store/dsi : set_current...')
    console.log('... store/dsi - data : ', data)
    console.log("... store/dsi - data['data'] : ", data['data'])
    store.current = data['data']
  },

  // set a temporary new
  set_current_new (store, data) {
    console.log('\n... store/dsi : set_current_new...')
    console.log('... store/dsi - data : ', data)

    if (data.update_current === false) {
      store.current_new[data.parentField][data.subField] = data.item_data
    } else {
      store.current[data.parentField][data.subField] = data.item_data
    }
  },

  // set a temporary new file
  set_current_file (store, fileData) {
    console.log('\n... store/dsi : set_current_file...')
    console.log('... store/dsi - fileData : ', fileData)

    store.current_file = fileData
    store.current_filename = fileData.name
    // store.csv_sep      = file_data.csv_sep
  },

  // set a temporary new file
  set_current_separator (store, csvSeparator) {
    console.log('\n... store/dsi : set_current_separator...')
    console.log('... store/dsi - csvSeparator : ', csvSeparator)

    store.csv_sep = csvSeparator
  },

  reset_current_file (store) {
    console.log('\n... store/dsi : reset_current_file...')

    store.current_file = ''
    store.current_filename = 'no filename'
    // store.current_new.infos.title  = 'new dataset'
  },

  reset_current_new (store) {
    console.log('\n... store/dsi : reset_current_new...')
    store.current_new = store.dft_new
  }

}

export const actions = {

  dispatch_current (store, data) {
    console.log('\n... store/dsi : dispatch_current...')
    store.commit(`set_current`, data)
  }

}
