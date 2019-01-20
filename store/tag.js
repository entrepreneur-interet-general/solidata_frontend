export const state = () => ({

  msg: null,
  alert: {},
  edit_mode: false,

  parameters: {
    page: 1,
    per_page: 0, // 5, // choices=[0, 2, 5, 10, 20, 30, 40, 50, 100],
    cardSizes: 'xs6 sm3 md2 '
  },

  rowsPerPageItems: [ 6, 12, 18, 24 ],
  pagination: {
    rowsPerPage: 18
  },

  query_current: null,
  current: {},
  current_new: {

    'infos': {
      'title': 'your new tag',
      'description': null
    },
    'public_auth': {
      'open_level_edit': 'private'
    // "open_level_show": "open_data"
    },
    'data_raw': {
      'f_code': '',
      'f_object': '',
      // "f_type": "tag",
      'f_comments': null
    // "f_is_required": false
    }

  },
  dft_new: {

    'infos': {
      'title': 'your new tag',
      'description': null
    },
    'public_auth': {
      'open_level_edit': 'private'
    // "open_level_show": "open_data"
    },
    'data_raw': {
      'f_code': '',
      'f_object': '',
      // "f_type": "tag",
      'f_comments': null
    // "f_is_required": false
    }

  },

  list_query: null,
  list: [],
  list_counts: null

})

export const getters = {

  GetListNames (state, getters) {
  // return state.list.filter(list => list.title)
    return getters.ConcatList.map(a => a.infos.title)
  },

  ConcatList: state => {
    var concat = []
    var inTeam = state.list['docs_user_is_in_team']
    var notTeam = state.list['docs_user_not_in_team']

    if (inTeam !== undefined && inTeam !== null) {
      concat = concat.concat(inTeam)
    }
    if (notTeam !== undefined && notTeam !== null) {
      concat = concat.concat(notTeam)
    }
    // Array.prototype.push(concat, in_team, notTeam)
    return concat
  },

  getStandardList: (state, getters) => {
    var allItemsConcat = getters.ConcatList
    return allItemsConcat.filter(rec => rec.specs.is_standard === true)
  }

}

export const mutations = {

  set_list (store, data) {
    console.log('\n... store/tag : set_list...')

    store.msg = data.msg
    store.list = data.data
    store.list_query = data.query_resume
    store.list_counts = data.counts
  },

  set_current (store, data) {
    console.log('\n... store/tag : set_current...')
    store.current = data.data
  },

  // set a temporary new
  set_current_new (store, data) {
    console.log('\n... store/tag : set_current_new...')
    console.log('\n... store/tag - data : ', data)
    store.current_new[data.parentField][data.subField] = data.item_data
  },

  reset_current_new (store) {
    console.log('\n... store/tag : reset_current_new...')
    store.current_new = store.dft_new
  }
}

export const actions = {

}
