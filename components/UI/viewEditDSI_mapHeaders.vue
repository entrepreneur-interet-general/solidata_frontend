<style scoped>

  .map-selector {
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

    <!-- DEBUG -->
    <span v-if="$store.state.is_debug">

      parent_map : <br> <code>{{ parent_map }}</code><br>
      <v-divider></v-divider>
      dmf_value : <br> <code>{{ dmf_value }}</code><br>
      <v-divider></v-divider>

      dsi_id : <br> <code>{{ dsi_id }}</code><br>
      dsi_header : <br> <code>{{ dsi_header }}</code><br>
      
      <v-divider></v-divider>
      <!-- parentDoc_id : <br> <code>{{ parentDoc_id }}</code><br>
      parentDoc_coll : <code>{{ parentDoc_coll }}</code><br> -->

      <!-- parentDoc_dmt : <br> <code>{{ parentDoc_dmt }}</code><br> -->
      <!-- parentDoc_dmf_list : <br> <code>{{ parentDoc_dmf_list }}</code><br> -->

    </span>
    
    <!-- DMF SELECTOR FOR HEADER -->
    <v-select
      class="map-selector ma-1 caption text-xs-center"
      solo
      dense
      v-model="dmf_value"
      hide-details
      :prepend-inner-icon="$store.state.mainIcons.datamodel_fields.icon"
      :label="$t( 'projects.dsi_to_dmf', $store.state.locale )"
      :items="dmf_choices"
      item-text="title"
      item-value="'_id'"
      return-object
      :disabled="!canEdit || is_loading"
      @change="update_mapping() "
      >
    </v-select>


    <!-- DEBUG -->
    <span v-if="$store.state.is_debug">

      <v-divider></v-divider>
      <!-- dmf_choices : <br> <code>{{ dmf_choices }}</code><br> -->

    </span>

  </div>

</template>



<script>

export default {

  props: [

    'is_loading',

    'parentDoc_id',
    'parentDoc_coll',
    'parent_map',

    'dsi_id',
    'dsi_header',

    // "parentDoc_dmt",
    'parentDoc_dmf_list',

    'canEdit'
  ],

  created () {

    // this.$store.state.LOG && console.log("\n viewEditDMF_openlevel created / parent_map : ", this.parent_map )

    // this.dsi_header = this.dsi_header

  },

  data () {
    return {

      alert: '',
      loading: false,

      dmf_value: {
        _id: '_ignore_',
        title: '( ignore column )'
      },

      dmf_value_dft: {
        _id: '_ignore_',
        title: '( ignore column )'
      }

    }
  },

  computed: {

    dmf_choices () {
      var remappedDmf = this.parentDoc_dmf_list.map(dmf =>
        ({ _id: dmf['_id'], title: dmf['infos.title'] })
      )

      // delete first entry ( "_id": "_", "title" : "title" )
      var remappedDmf_ = remappedDmf.filter(obj => { return obj._id !== '_' })

      // sort choices
      remappedDmf_.sort((a, b) => a.title.toUpperCase().localeCompare(b.title.toUpperCase()))

      // add ignore choice
      var ignoreChoice = {
        _id: '_ignore_',
        title: '( ignore column )'
      }
      remappedDmf_.unshift(ignoreChoice)

      return remappedDmf_
    }

  },

  watch: {

    parentDoc_dmf_list: {

      immediate: true,
      handler (newVal, oldVal) {
        if (newVal.length !== 0 && newVal !== undefined) {
          // this.$store.state.LOG && console.log("\n~ watch / parentDoc_dmf_list - this.dmf_value._id : ", this.dmf_value._id )
          // this.$store.state.LOG && console.log("~ watch / parentDoc_dmf_list - newVal : ", newVal )

          var dmfValueTitle = newVal.find(obj => { return obj._id === this.dmf_value._id })
          // this.$store.state.LOG && console.log("~ watch / parentDoc_dmf_list - dmfValueTitle : ", dmfValueTitle )

          if (dmfValueTitle !== undefined) {
            this.dmf_value.title = dmfValueTitle['infos.title']
          } else {
            this.dmf_value = this.dmf_value_dft
          }
        }
      }

    },

    parent_map: {

      immediate: true,
      handler (newVal, oldVal) {
        if (newVal !== undefined) {
          // get corresponding header in parent_map & update dmf_value
          // this.$store.state.LOG && console.log("\n~ watch / parent_map - this.dsi_header : ", this.dsi_header )
          // this.$store.state.LOG && console.log("~ watch / parent_map - newVal : \n", newVal )

          if (newVal.oid_dmf != null) {
            this.dmf_value._id = newVal.oid_dmf
          } else {
            this.dmf_value = this.dmf_value_dft
          }

          // this.$store.state.LOG && console.log("~ watch / parent_map - this.dmf_choices : ", this.dmf_choices )

          if (this.dmf_choices.length !== 0) {
            var dmfValueTitle = this.dmf_choices.find(obj => { return obj._id === newVal.oid_dmf })
            // this.$store.state.LOG && console.log("~ watch / parent_map - dmfValueTitle : ", dmfValueTitle )

            this.dmf_value.title = (dmfValueTitle === undefined ? this.dmf_value_dft.title : dmfValueTitle.title)
          }
        }
      }

    }

  },

  methods: {

    update_mapping () {
      this.$store.state.LOG && console.log('\n...viewEditDSI_mapHeaders - update_mapping... ')

      this.loading = true
      this.$emit('update_loading', true)

      var input = {

        doc_id: this.parentDoc_id,
        coll: this.parentDoc_coll,

        form: [
          {
            is_mapping: true,
            del_mapping: this.dmf_value._id === '_ignore_',
            field_to_update: 'mapping.dsi_to_dmf',
            id_dmf: this.dmf_value._id,
            id_dsi: this.dsi_id,
            dsi_header: this.dsi_header
          }
        ]

      }
      this.$store.state.LOG && console.log('viewEditDSI_mapHeaders - update_mapping / input : ', input)

      this.$store.dispatch('updateMapping', input)

        .then(result => {
          this.alert = { type: 'success', message: result.msg }
          this.loading = false
          this.$emit('update_loading', false)
        })

        .catch(error => {
          this.$store.state.LOG && console.log('submit / error... : ', error)
          this.loading = false
          this.$emit('update_loading', false)
          this.alert = {type: 'error', message: 'login error'}
          if (error.response && error.response.data) {
            this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
          }
        })
    }

  }

}
</script>