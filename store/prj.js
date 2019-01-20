
export const state = () => ({

  msg: null,
  alert: {},
  edit_mode: false,

  parameters: {
    page: 1,
    per_page: 0, // 5, // choices=[0, 2, 5, 10, 20, 30, 40, 50, 100],
    cardSizes: 'xs12 sm4 md3 '
  },

  rowsPerPageItems: [ 4, 8, 12 ],
  pagination: {
    rowsPerPage: 8
  },

  query_current: null,
  current: {},
  current_new: {

    'infos': {
      'title': 'your new project ',
      'description': null,
      'licence': null
    },
    'public_auth': {
      'open_level_edit': 'private',
      'open_level_show': 'open_data'
    }

  },
  dft_new: {

    'infos': {
      'title': 'your new project ',
      'description': null,
      'licence': null
    },
    'public_auth': {
      'open_level_edit': 'private',
      'open_level_show': 'open_data'
    }

  },

  list_query: null,
  list: [],
  list_counts: null

})

export const getters = {

  get_params: state => {
    return state.parameters
  }

}

export const mutations = {

  set_list (store, data) {
    console.log('\n... store/prj : set_list...')
    store.msg = data.msg
    store.list = data.data
    store.list_query = data.query_resume
    store.list_counts = data.counts
  },

  set_current (store, data) {
    console.log('\n... store/prj : set_current...')
    store.current = data.data
  },

  // set a temporary new
  set_current_new (store, data) {
    console.log('\n... store/prj : set_current_new...')
    console.log('\n... store/prj - data : ', data)
    store.current_new[data.parentField][data.subField] = data.item_data
  },

  reset_current_new (store) {
    console.log('\n... store/prj : reset_current_new...')
    store.current_new = store.dft_new
  }
}

export const actions = {

}
