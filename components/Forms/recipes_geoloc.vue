<template>

  <div>

    <!-- TITLE GEOLOC -->
    <v-card-title
      class="pa-5"
      >

      <v-icon 
        class="mr-2"
        color="primary"
        >
        {{ $store.state.mainIcons.projects.icon }}
      </v-icon>

      <v-icon 
        class="mr-2"
        color="accent"
        >
        {{ $store.state.mainIcons.map_doc.icon }}
      </v-icon>

      <v-icon 
        class="mr-4"
        large
        color="primary"
        >
        {{ $store.state.mainIcons.geoloc.icon }}
      </v-icon>

      <span 
        class="title "
        >

        {{ $t(`projects.geoloc`, $store.state.locale ) }} 
      </span>

    </v-card-title>



    <!-- CHOICES FOR GEOLOCALIZATION -->
    <v-card-text
      v-if="parent_DMT_oids && parent_DMT_oids.length != 0 && item_doc != undefined"
      class="px-5 pb-2"
      >

      <!-- SELECT COLUMNS TO GEOLOCALIZE -->
      <v-flex
        class="xs12"
        >

        <!-- HELP TEXT -->
        <span>

          <v-icon 
            color="grey"
            small
            >
            {{ $store.state.mainIcons.infos.icon }}
          </v-icon>

          {{ $t(`projects.geo_select_dmf`, $store.state.locale) }}

        </span>

        <!-- PRJ's DMT  -->
        <v-flex class="pt-3">
      
          <!-- - default_geoloc_dmf : <code> {{default_geoloc_dmf}} </code><br> -->

          <ViewEditDMT

            :item_doc="undefined"
            :item_doc_id="parent_DMT_oids"
            
            :coll="'dmt'"

            :is_create="false"
            :is_preview="true"
            :is_loading="isLoading"

            :is_switch="true"
            :no_toolbar="true"

            :is_solidify="true"
            :parent_REC_mapping="getGeolocRec_from_map"
            :disabled_dmf_list="default_geoloc_dmf"

            :is_map="false"
            :parent_map="item_doc.mapping.dmf_to_open_level"
            :canEdit_ol="canEdit_ol"

            :add_to_parent="false"
            :parentDoc_id="parentDoc_id"
            :parentDoc_coll="parentDoc_coll"

            :parent_scroll="0"

            @updateSolidify="update_selected_dmfs"
            >
            <!-- @update_loading="updateLoading" -->
          </ViewEditDMT> 

        </v-flex>


      </v-flex>


      <!-- COMBOBOX - COLUMNS TO CREATE -->
      <v-flex
        class="mt-5 xs12"
        > 

        <!-- HELP TEXT -->
        <span>
          <v-icon 
            color="grey"
            small
            >
            {{ $store.state.mainIcons.infos.icon }}
          </v-icon>
          {{ $t(`projects.new_dmfs`, $store.state.locale) }}
        </span>

        <!-- NEW COLUMNS -->
        <v-layout row justify-center> 
          <v-flex class="pt-3 xs12 sm10 md8">

            <NewColumns

              :parentDoc_id="parentDoc_id"
              :parentDoc_coll="parentDoc_coll"
              :parent_DMT_oids="parent_DMT_oids"

              :new_col_preselected="default_geoloc_dmf_preselect"
              :parent_REC_mapping="getGeolocRec_from_map"
              :new_col_choices="default_geoloc_dmf"

              @updateNewColumns="update_new_columns"
              >
            </NewColumns>

            <span class="caption">
              {{ $t(`global.mandatory`, $store.state.locale) }}
            </span>

          </v-flex>
        </v-layout>

      </v-flex>


      <!-- NEW COLUMNS OPEN_LEVEL -->
      <v-flex
        class="mt-5 xs12"
        >

        <!-- HELP TEXT -->
        <span>
          <v-icon 
            color="grey"
            small
            >
            {{ $store.state.mainIcons.infos.icon }}
          </v-icon>
          {{ $t(`projects.open_level_show`, $store.state.locale) }}
        </span>

        <!-- OPEN LEVEL SHOW -->
        <v-layout row justify-center> 
          <v-flex class="pt-3 xs12 sm10 md8">
            <v-select
              v-model="new_dmf_open_level_show"
              :label="$t( 'projects.open_level_show', $store.state.locale )"
              :prepend-icon="$store.state.mainIcons.view.icon"
              :items="$store.state.subFieldsWithChoices['open_level_show']['choices']"
              @change="update_mapping"
              >
            </v-select>
          </v-flex>
        </v-layout> 

      </v-flex>

      <!-- DSI TO GEOCODE -->
      <v-flex
        class="mt-5 xs12"
        >

        <!-- HELP TEXT -->
        <span>
          <v-icon 
            color="grey"
            small
            >
            {{ $store.state.mainIcons.infos.icon }}
          </v-icon>	
          {{ $t(`projects.geo_select_dsi`, $store.state.locale) }}
        </span>

        <!-- DSI SELECTION-->
        <v-layout row justify-center> 
          <v-flex class="pt-3 xs12 sm10 md8">
            <v-select
              v-model="selected_dsis"
              :items="dsi_input_list"
              :menu-props="{ maxHeight: '400' }"
              item-text="title"
              item-value="oid_dsi"
              label="Select"
              multiple
              @change="update_mapping"
            ></v-select>
          </v-flex>
        </v-layout> 
        <br>
        <!-- parent_DSI_oids : <code>{{ parent_DSI_oids }}</code><br> -->
        <!-- dsi_input_list : <code>{{ dsi_input_list }}</code><br> -->
        <!-- selected_dsis : <code>{{ selected_dsis }}</code><br> -->

      </v-flex>

      <!-- ADDRESS COMPLEMENT -->
      <v-flex
        class="mt-5 xs12"
        >

        <!-- HELP TEXT -->
        <span>
          <v-icon 
            color="grey"
            small
            >
            {{ $store.state.mainIcons.infos.icon }}
          </v-icon>
          {{ $t(`projects.add_compl`, $store.state.locale) }}
        </span>

        <!-- INPUT ADDRESS COMPLEMENT -->
        <v-layout row justify-center> 
          <v-flex class="pt-3 xs12 sm10 md8">
            <v-text-field
              v-model="add_complement"
              :label="$t(`projects.add_compl`, $store.state.locale)"
              :prepend-icon="$store.state.mainIcons.geoloc.icon"
              @change="update_mapping"
              >
            </v-text-field>
          </v-flex>
        </v-layout> 

      </v-flex>


      <!-- TEST RUN CHECKBOX -->
      <v-layout row justify-center> 

        <v-flex
          class="mt-5 xs6"
          >

          <!-- HELP TEXT -->
          <span>
            <v-icon 
              color="grey"
              small
              >
              {{ $store.state.mainIcons.infos.icon }}
            </v-icon>
            {{ $t(`recipes.test_rec`, $store.state.locale) }}
          </span>

          <!-- INPUT TEST RUN -->
          <v-layout row justify-center> 
            <v-flex class="pt-3 xs12 sm10 md8">
              <v-checkbox
                v-model="test_geoloc"
                :label="$t(`recipes.test_rec`, $store.state.locale)"
                @change="update_mapping"
                >
              </v-checkbox>
            </v-flex>
          </v-layout> 

        </v-flex>

        <!-- TEST RUN SELECT TEST ROWS -->
        <v-flex
          class="mt-5 xs6"
          >

          <!-- HELP TEXT -->
          <span>
            <v-icon 
              color="grey"
              small
              >
              {{ $store.state.mainIcons.infos.icon }}
            </v-icon>
            {{ $t(`recipes.test_rec`, $store.state.locale) }}
          </span>

          <!-- INPUT TEST RUN - TRIM ROWS -->
          <v-layout row justify-center> 
            <v-flex class="pt-3 xs12 sm10 md8">
              <v-select
                v-model="test_rows"
                :items="[3,5,10]"
                :label="$t(`recipes.test_rec`, $store.state.locale)"
                @change="update_mapping"
                >
              </v-select>
            </v-flex>
          </v-layout> 

        </v-flex>

      </v-layout>

      <!-- HIDDEN EXTRA SETTINGS -->
      <!-- timeout -->
      <!-- delay -->
      <!--  -->

    </v-card-text>


    <!-- SUBMIT GEOLOCALIZATION BTN -->
    <v-card-actions
      class="justify-center my-3"
      >

      <v-btn
        flat
        round
        dark
        class="accent"
        :disabled="!checkIfGeolocalizable || loading"
        @click="geolocalize()"
        >
        <v-icon 
          left
          >
          {{ $store.state.mainIcons.geoloc.icon }}
        </v-icon>

        {{ $t(`projects.geoloc`, $store.state.locale)  }}

      </v-btn>

    </v-card-actions>




    <!-- <v-divider class="my-5"></v-divider> -->

    <!-- DEBUG -->
    <v-flex 
      class="mt-5"
      v-if="$store.state.is_debug"
      > 

      <v-divider class="my-2"></v-divider>
      <span>
        from within 'components/Forms/recipes_geoloc.vue' component
      </span>
      <v-divider class="my-2"></v-divider>

      <!-- - parentDoc_id : <code>{{ parentDoc_id }}</code><br> -->
      <!-- - parentDoc_coll : <code>{{ parentDoc_coll }}</code><br> -->
      <!-- - selected_dmfs : <code>{{ selected_dmfs }}</code><br> -->
      <!-- - add_complement : <code>{{ add_complement }}</code><br> -->

      <!-- - new_dmfs : <code> {{ new_dmfs }} </code><br>
      <v-divider></v-divider> -->
      
      <!-- - default_geoloc_dmf : <code> {{ default_geoloc_dmf }} </code><br>
      <v-divider></v-divider> -->


      <!-- - $store.state.rec.list : <code>{{ $store.state.rec.list }}</code><br>
      <v-divider></v-divider> -->

      <!-- - default_geoloc_dmf_preselect: <code> {{ default_geoloc_dmf_preselect }} </code><br>
      <v-divider></v-divider> -->
      <!-- - getGeolocRec_byTitle : <code>{{ getGeolocRec_byTitle }}</code><br>
      <v-divider></v-divider> -->


      - getGeolocRec_from_map <code> {{ getGeolocRec_from_map }} </code><br>
      <v-divider></v-divider>

      - pseudoForm : <code> {{ pseudoForm }} </code><br>
      <v-divider></v-divider>

      <!-- - parent_REC_oids : <code>{{ parent_REC_oids }}</code><br>
      <v-divider></v-divider> -->

      - parent_DMT_oids : <code>{{ parent_DMT_oids }}</code><br>
      <v-divider></v-divider>

      - parent_DSI_oids : <code>{{ parent_DSI_oids }}</code><br>
      <v-divider></v-divider>

      - item_doc.mapping.map_rec : <code>{{ item_doc.mapping.map_rec }}</code><br>

    </v-flex>


  </div>

</template>


<script>

import ViewEditDMT from '~/components/UI/viewEditDMT.vue'

import NewColumns from '~/components/Forms/combobox_new_columns.vue'

export default {

  props: [

    'item_doc',
    'parentDoc_id',
    'parentDoc_coll',

    'recTitle',

    'isPreview',
    'isLoading',
    'canEdit_ol',

    'parent_REC_mapping',
    // "parent_REC_oids",
    'parent_DMT_oids',
    'parent_DSI_oids'

  ],

  components: {

    ViewEditDMT,
    NewColumns

  },

  created () {
    console.log('\n- RecipesGeoloc / created ---> item_doc : ', this.item_doc)
    console.log('\n- RecipesGeoloc / created ---> parent_DMT_oids : ', this.parent_DMT_oids)
    console.log('\n- RecipesGeoloc / created ---> parent_REC_mapping : ', this.parent_REC_mapping)

    this.dsi_input_list = this.$store.getters['dsi/getDSIinputList'](this.parent_DSI_oids)

    // set up geolocRec data
    this.setGeolocRecId(this.item_doc)
  },

  data () {
    return {

      alert: '',
      loading: false,

      tab: 'recipes',
      coll: 'rec',

      // PSEUDO FORM
      geolocRec: null,
      rec_id: '',

      selected_dmfs: [],
      
      dsi_input_list: [],
      selected_dsis: [],

      new_dmfs: [],
      new_dmf_open_level_show: 'open_data',
      add_complement: '',
      test_geoloc: true,
      test_rows: 5,

      // CHOICES AND PRESELECTION NEW COLUMNS
      col_preselected: [
        // 'longitude',
        // 'latitude'
        'lon',
        'lat'
      ],
      col_choices: [
        'address',
        // 'longitude',
        // 'latitude',
        'lon',
        'lat',
        'altitude',
        'point',
        'raw'
      ],
      new_col_preselected: [
        // {
        //   text: 'longitude',
        //   color: 'primary',
        //   can_delete: false
        // },
        // {
        //   text: 'latitude',
        //   color: 'primary',
        //   can_delete: false
        // },
        {
          text: 'lon',
          color: 'primary',
          can_delete: false
        },
        {
          text: 'lat',
          color: 'primary',
          can_delete: false
        }
      ]

    }
  },

  computed: {

    checkIfGeolocalizable () {
      return this.selected_dmfs.length > 0
    },

    getGeolocRec_from_map () {
      return this.parent_REC_mapping.find(recMap => recMap.oid_rec === this.rec_id)
    },

    getGeolocRec_byId () {
      var geolocRec = this.$store.getters['rec/ConcatList']
      return geolocRec.find(rec => rec._id === this.rec_id)
    },

    getGeolocRec_byTitle () {
      var geolocRec = this.$store.getters['rec/ConcatList']
      return geolocRec.find(rec => rec.infos.title === this.recTitle)
    },

    default_geoloc_dmf () {
      // BASED ON SOLIDATA SYSTEM'S STANDARD DMFS

      var dmfGeolocRelated = this.col_choices

      // var all_dmf = this.$store.getters['dmf/ConcatList'] ;
      // console.log( "\nRecipesGeoloc / all_dmf : \n", all_dmf )

      var standardDmfList = this.$store.getters['dmf/getStandardList']
      console.log('\nRecipesGeoloc / standardDmfList : \n', standardDmfList)

      // filter out wanted dmf
      var filteredDmf
      if (this.col_choices !== undefined) {
        filteredDmf = standardDmfList.filter(function (el) {
          return dmfGeolocRelated.includes(el.infos.title)
        })
      }

      // remap filtered
      var remapped = []
      if (filteredDmf !== undefined) {
        remapped = filteredDmf.map(dmf => ({
          text: dmf.infos.title,
          color: this.col_preselected.includes(dmf.infos.title) ? 'primary' : 'accent',
          oid_dmf: dmf._id,
          can_delete: !this.col_preselected.includes(dmf.infos.title)
        }))
      }

      return remapped
    },

    default_geoloc_dmf_preselect () {
      return this.default_geoloc_dmf.filter(function (el) {
        return el.can_delete === false
      })
    },

    pseudoForm () {
      var input = {

        doc_id: this.parentDoc_id,
        coll: this.parentDoc_coll,

        form: [
          {
            is_mapping: true,
            field_to_update: 'mapping.map_rec',
            id_rec: this.rec_id,
            rec_params: {
              dsi_list_to_geocode: this.selected_dsis,
              dmf_list_to_geocode: this.selected_dmfs,
              new_dmfs_list: this.new_dmfs,
              address_complement: this.add_complement,
              new_dmf_open_level_show: this.new_dmf_open_level_show,
              test_geoloc: this.test_geoloc,
              test_rows: this.test_rows,
              timeout: null,
              delay: null
            }
          }
        ]

      }
      return input
    },

    solidifyForm () {
      var input = {

        doc_id: this.parentDoc_id,
        coll: this.parentDoc_coll,
        form: [
          {
            id_rec: this.rec_id
            // is_complex_rec : true,
            // need_load_prj : true,
            // need_load_dmt : true,
            // need_load_dsi : true,
          }
        ]

      }
      return input
    }

  },

  watch: {

    item_doc: {
      immediate: true,
      handler (newVal, oldVal) {
        console.log('\nRecipesGeoloc / watch ~ item_doc / newVal : \n', newVal)
        this.setGeolocRecMap(newVal)
      }
    },
    parent_DSI_oids: {
      immediate: true,
      handler (newVal, oldVal) {
        console.log('\nRecipesGeoloc / watch ~ parent_DSI_oids / newVal : \n', newVal)
        this.dsi_input_list = this.$store.getters['dsi/getDSIinputList'](this.parent_DSI_oids)
      }
    }
  },

  methods: {

    setGeolocRecId () {
      console.log('\n...RecipesGeoloc - setGeolocRecId...')
      // var geolocRec_from_mapping = this.parent_REC_mapping ;
      var geolocRecFromRecList = this.getGeolocRec_byTitle
      if (geolocRecFromRecList !== undefined) {
        this.rec_id = geolocRecFromRecList._id
      }
      return geolocRecFromRecList
    },

    setGeolocRecMap (itemDoc) {
      console.log('\n...RecipesGeoloc - setGeolocRecMap...')
      this.setGeolocRecId()
      var geolocRecFromMap = itemDoc.mapping.map_rec.find(recMap => recMap.oid_rec === this.rec_id)
      console.log('...RecipesGeoloc - geolocRecFromMap : \n', geolocRecFromMap)
      if (geolocRecFromMap !== undefined) {
        console.log('...RecipesGeoloc - geolocRecFromMap not undefined...')
        this.selected_dmfs = geolocRecFromMap.rec_params.dmf_list_to_geocode
        this.selected_dsis = geolocRecFromMap.rec_params.dsi_list_to_geocode
        this.new_dmfs = geolocRecFromMap.rec_params.new_dmfs_list
        this.add_complement = geolocRecFromMap.rec_params.address_complement
        this.new_dmf_open_level_show = geolocRecFromMap.rec_params.new_dmf_open_level_show
        this.test_geoloc = geolocRecFromMap.rec_params.test_geoloc
        this.test_rows = geolocRecFromMap.rec_params.test_rows
      }
    },

    update_selected_dmfs (input) {
      this.selected_dmfs = input
      this.update_mapping()
    },

    update_selected_dsis (input) {
      this.selected_dsis = input
      this.update_mapping()
    },

    update_new_columns (input) {
      this.new_dmfs = input
      this.update_mapping()
    },

    // ------------------------------------- //
    // AXIOS CALL - UPDATE GEOLOC MAPPING
    // ------------------------------------- //

    update_mapping () {
      console.log('\n...RecipesGeoloc - update_mapping...')
      this.loading = true

      var input = this.pseudoForm
      console.log('RecipesGeoloc - update_mapping / input : ', input)

      this.$store.dispatch('updateMapping', input)

        .then(response => {
        // this.alert = { type: 'success', message: response.msg }
          this.loading = false
        })

        .catch(error => {
          console.log('submit / error... : ', error)
          this.$store.commit('set_error', error)

          this.loading = false

          if (error.response && error.response.data) {
            this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
          }
        })
    },

    // ------------------------------------- //
    // AXIOS CALL - RUN GEOLOC RECIPE
    // ------------------------------------- //

    geolocalize () {
      console.log('\n...RecipesGeoloc - geolocalize...')

      // close dialog
      this.$emit('closeDialogRec')

      var input = this.solidifyForm

      console.log('\n...RecipesGeoloc - geolocalize / input : \n', input)

      // call enrich endpoint with the reference of the PRJ's REC to LAUNCH
      this.$store.dispatch('solidifyData', input)

        .then(response => {
        // this.alert = { type: 'success', message: response.msg }
          this.loading = false
          this.$emit('need_reload_dsi')
        })

        .catch(error => {
          console.log('submit / error... : ', error)
          this.$store.commit('set_error', error)

          this.loading = false

          if (error.response && error.response.data) {
            this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
          }
        })
    }
  }
}
</script>

