<style scoped>

  .ol-selector {
    max-width: 200px !important; 
    width: 200px; 
    overflow-y: hidden ;
    text-align : center ;
    /* display: inline-block; */
  }

  /* .ol-selector .v-select__selections {
    text-align: center
  } */

</style>

<template>

  <div>

    <span v-if="$store.state.is_debug">
      dmf_ol_val : <br> <code>{{ dmf_ol_val }}</code><br> 
      parentDoc_id : <br> <code>{{ parentDoc_id }}</code><br>
      parentDoc_coll : <code>{{ parentDoc_coll }}</code><br>

      <v-divider></v-divider>
      dmt : <br> <code>{{ dmt }}</code><br> 
      dmf._id : <br> <code>{{ dmf._id }}</code><br>
      <!-- dmf : <br> <code>{{ dmf }}</code><br> -->

      <v-divider></v-divider>
    </span>

    <v-select
      class="ol-selector ma-2 body-1 text-xs-center"
      solo
      dense
      :prepend-inner-icon="$store.state.mainIcons.view.icon"
      :disabled="!canEdit || is_loading"
      :readonly="!canEdit"
      v-model="dmf_ol_value"
      :label="$t( 'projects.open_level_show', $store.state.locale )"
      hide-details
      :items="$store.state.subFieldsWithChoices['open_level_show']['choices']"
      @change="update_mapping( { 
        item_id 		: dmf._id, 
      } ) "
      >
    </v-select>

  </div>

</template>



<script>

export default {

  props: [
    'dmt',
    'dmf',
    'is_loading',
    // "parent_map",
    'dmf_ol_val',
    'parentDoc_id',
    'parentDoc_coll',
    'canEdit'
  ],

  created () {
    // console.log("\n viewEditDMF_openlevel created / parent_map : ", this.parent_map )
    // console.log("\n viewEditDMF_openlevel created / dmf_ol_val : ", this.dmf_ol_val )

    this.dmf_ol_value = this.dmf_ol_val
  },

  data () {
    return {

      alert: '',
      loading: false,

      dmf_ol_value: ''
      // dmf_ol_dft_value : 'private'

    }
  },

  computed: {

  },

  watch: {

    dmf_ol_val: {

      immediate: true,
      handler (newVal, oldVal) {
        this.dmf_ol_value = newVal
      }

    }

  },

  methods: {

    update_mapping (itemInfos) {
      console.log('\n...viewEditDMF_openlevel - update_mapping / itemInfos : \n ', itemInfos)
      var input = {

        doc_id: this.parentDoc_id,
        coll: this.parentDoc_coll,

        form: [
          {
            is_mapping: true,
            field_to_update: 'mapping.dmf_to_open_level',
            open_level_show: this.dmf_ol_value,
            id_dmf: itemInfos.item_id
            // id_dmt : this.dmt._id,
          }
        ]

      }
      console.log('viewEditDMF_openlevel - update_mapping / input : ', input)

      this.$store.dispatch('updateMapping', input)

        .then(result => {
          this.alert = { type: 'success', message: result.msg }
          this.loading = false
        })

        .catch(error => {
          console.log('submit / error... : ', error)
          this.$store.commit('set_error', error)

          this.loading = false
          this.alert = {type: 'error', message: 'login error'}
          if (error.response && error.response.data) {
            this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
          }
        })
    }

  }

}
</script>