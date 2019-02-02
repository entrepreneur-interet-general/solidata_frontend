<template>

  <div>

    <v-toolbar 
      dense 
      dark
      class="elevation-0"
      color="primary" 
      xs12
      >
      
      <!-- ITEM TITLE -->
      <v-toolbar-title
        class="title"
        >
        <!-- {{$t(collName+'.edit', $store.state.locale )}} -->
        {{ itemDoc.infos.title }}
      </v-toolbar-title>

      <!-- ACCESS SETTINGS -->
      <v-tooltip 
        v-if="!is_create"
        top
        >
        <v-btn 
          slot="activator"
          icon
          @click="switchSettings()"
          >
          <v-icon
            >
            {{ $store.state.mainIcons.settings.icon }}
          </v-icon>
        </v-btn>
        <span>
          {{ $t(`global.open_settings`, $store.state.locale) }}
        </span>
      </v-tooltip>


      <v-spacer></v-spacer>


      <!-- SWITCH FOR PREVIEW -->
      <v-btn 
        icon
        small
        :color="btnSwitchColor"
        @click="switchPreview()"
        >
        <v-icon
          small
          :color="iconSwitchColor"
          >
          {{ $store.state.mainIcons.view.icon }}
        </v-icon>
      </v-btn>


      <!-- TEAM BTN -->
      <v-tooltip top>
        <v-btn 
          slot="activator"
          v-if="!is_create"
          :disabled="!checkUserAuth('team')"
          icon
          small
          >
          <v-icon 
            color=""
            >
            {{ $store.state.mainIcons.parentFieldIcons.team.icon }}
          </v-icon>
        </v-btn>
        <span>
          {{ $t(`global.open_team`, $store.state.locale) }}
        </span>
      </v-tooltip>

      <!-- QUESTION BTN -->
      <v-tooltip top>
        <v-btn 
          slot="activator"
          icon
          small
          >
          <v-icon 
            small
            color=""
            >
            {{ $store.state.mainIcons.question.icon }}
          </v-icon>
        </v-btn>
        <span>
          {{ $t(`global.open_options`, $store.state.locale ) }}
        </span>
      </v-tooltip>


      <!-- RELOAD / RESET / DELETE ITEM MENU -->
      <v-menu 
        v-if="!is_create"
        :disabled="!checkUserAuth('delete_item')"
        bottom 
        left 
        full-width
        :nudge-bottom="10"
        offset-y
        >
        <v-tooltip 
          slot="activator"
          top
          >
          <v-btn 
            :disabled="!checkUserAuth('delete_item')"
            icon 
            small
            slot="activator"
            >
            <v-icon>
              {{ $store.state.mainIcons.options.icon }}
            </v-icon>
          </v-btn>
          <span>
            {{ $t(`global.open_options`, $store.state.locale ) }}
          </span>
        </v-tooltip>

        <v-list class="pa-0">

          <!-- <v-list-tile
            :to="'/'+coll+'/'+itemId+'/team'"
            >
            <v-list-tile-title class="pa-0 ma-0">
              <v-icon left color="">
                {{ $store.state.mainIcons.team.icon }}
              </v-icon>
              <span>
                {{ $t(`global.team`, $store.state.locale) }}
              </span>
            </v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            :to="'/'+coll+'/'+itemId+'/settings'"
            >
            <v-list-tile-title class="pa-0 ma-0">
              <v-icon left color="">
                {{ $store.state.mainIcons.settings.icon }}
              </v-icon>
              <span>
                {{ $t(`global.settings`, $store.state.locale) }}
              </span>
            </v-list-tile-title>
          </v-list-tile> -->


          <!-- RELOAD BTN -->
          <v-list-tile
            v-if="is_reload && $store.state.auth.isLogged"
            @click="dialog_reload = true"
            >

            <!-- RELOAD IN MENU -->
            <v-list-tile-title 
              class="pa-0 ma-0"
              >
              <v-icon 
                small 
                left 
                class="pr-1 mb-1" 
                color="warning"
                >
                {{ $store.state.mainIcons.reload.icon }}
              </v-icon>
              <span>
                {{ $t(`global.reload`, $store.state.locale) }}
              </span>
            </v-list-tile-title>

            <!-- CONFIRM RELOAD DIALOG -->
            <v-dialog 
              v-model="dialog_reload" 
              max-width="500"
              >
              
              <v-card>
                
                <v-card-title class="headline text-xs-center pb-1">
                  <v-icon left class="pr-3" color="grey">
                    {{ $store.state.mainIcons.reload.icon }}
                  </v-icon>
                  {{ $t(`global.reload`, $store.state.locale) }}
                </v-card-title>

                <!-- <span 
                  v-if="$store.state.is_debug"
                  > -->
                  <!-- - itemDoc : <code>{{ itemDoc }}</code><hr> -->
                  this.$store.state.dsi.reload_data : <br><code>{{ this.$store.state.dsi.reload_data}}</code></br>
                  this.$store.state.dsi.current_file : <br><code>{{ this.$store.state.dsi.current_file}}</code></br>
                  this.$store.state.dsi.current_filename : <br><code>{{ this.$store.state.dsi.current_filename}}</code></br>
                <!-- </span> -->

                <v-card-text>
                  <ViewEditDoc
                    :no_toolbar="true"
                    :flex_vars="$store.state.createSize"
                    :is_create="false"
                    :is_preview="true"
                    :coll="coll"
                    :parentFieldslist="parentFieldsListDSI"
                    :item_doc="$store.state[coll].reload_data"
                    :is_switch="false"
                    :noDirectUpdate="true"
                    :is_reload="is_reload"
                    >
                    <!-- :item_doc="itemDoc" -->
                    <!-- :item_doc="$store.state[coll].reload_data" -->
                    <!-- :item_doc="$store.state[coll].current_new" -->
                  </ViewEditDoc>
                </v-card-text>

                <v-card-text class="subheading text-xs-center mb-2">
                  <v-icon large class="mb-1" color="warning">
                    {{ $store.state.mainIcons.warning.icon }}
                  </v-icon>
                  <br>
                  {{ $t(`global.confirm_reload`, $store.state.locale) }}
                </v-card-text>


                <v-card-actions>

                  <v-btn 
                    color="primary" 
                    dark
                    block
                    @click="dialog_reload = false"
                    ma-2
                    >
                    <v-icon left>
                      {{ $store.state.mainIcons.cancel.icon }}
                    </v-icon>
                    {{ $t(`global.cancel`, $store.state.locale) }}
                  </v-btn>
                  
                  <v-btn 
                    color="warning" 
                    dark
                    block
                    @click=" reloadData() ; dialog_reload = false"
                    ma-2
                    >
                    <v-icon left>
                      {{ $store.state.mainIcons.reload.icon }}
                    </v-icon>
                    {{ $t(`global.reload`, $store.state.locale) }}
                  </v-btn>

                </v-card-actions>

              </v-card>
            
            </v-dialog>

          </v-list-tile>

          <!-- RESET BTN -->
          <v-list-tile
            v-if="is_reset && $store.state.auth.isLogged"
            @click="dialog_reset = true"
            disabled
            >

            <!-- RESET IN MENU -->
            <v-list-tile-title 
              class="pa-0 ma-0"
              >
              <v-icon 
                small 
                left 
                class="pr-1 mb-1" 
                color="warning"
                >
                {{ $store.state.mainIcons.reset.icon }}
              </v-icon>
              <span>
                {{ $t(`global.reset`, $store.state.locale) }}
              </span>
            </v-list-tile-title>

            <!-- CONFIRM RESET DIALOG -->
            <v-dialog 
              v-model="dialog_reset" 
              max-width="500"
              >
              
              <v-card>

                <v-card-title class="headline text-xs-center pb-1">
                  <v-icon left class="pr-3" color="grey">
                    {{ $store.state.mainIcons.reset.icon }}
                  </v-icon>
                  {{ $t(`global.reset`, $store.state.locale) }}
                </v-card-title>

                <v-card-text class="subheading text-xs-center mb-2">
                  <v-icon large class="mb-1" color="warning">
                    {{ $store.state.mainIcons.warning.icon }}
                  </v-icon>
                  <br>
                  {{ $t(`global.confirm_reset`, $store.state.locale) }}
                </v-card-text>


                <v-card-actions>

                  <v-btn 
                    color="primary" 
                    dark
                    block
                    @click="dialog_reset = false"
                    ma-2
                    >
                    <v-icon left>
                      {{ $store.state.mainIcons.cancel.icon }}
                    </v-icon>
                    {{ $t(`global.cancel`, $store.state.locale) }}
                  </v-btn>
                  
                  <v-btn 
                    color="warning " 
                    dark
                    block
                    @click=" ; dialog_reset = false"
                    ma-2
                    >
                    <v-icon left>
                      {{ $store.state.mainIcons.reset.icon }}
                    </v-icon>
                    {{ $t(`global.reset`, $store.state.locale) }}
                  </v-btn>

                </v-card-actions>

              </v-card>
            
            </v-dialog>

          </v-list-tile>


          <!-- DELETE BTN -->
          <v-list-tile
            v-if="$store.state.auth.isLogged"
            >

            <!-- BTN IN MENU -->
            <v-list-tile-title 
              class="pa-0 ma-0"
              @click="dialog_del=true"
              >
              <v-icon small left class="pr-1 mb-1" color="error">
                {{ $store.state.mainIcons.delete.icon }}
              </v-icon>
              <span>
                {{ $t(`global.delete_i`, $store.state.locale) }}
              </span>
            </v-list-tile-title>
              
            <!-- CONFIRM DELETE DIALOG -->
            <v-dialog 
              v-model="dialog_del" 
              max-width="500"
              >
              
              <v-card>

                <v-card-title class="headline text-xs-center pb-1">
                  <v-icon left class="pr-3" color="grey">
                    {{ $store.state.mainIcons.delete.icon }}
                  </v-icon>
                  {{ $t(`global.delete_i`, $store.state.locale) }}
                </v-card-title>

                <v-card-text class="subheading text-xs-center mb-2">
                  <v-icon large class="mb-1" color="error">
                    {{ $store.state.mainIcons.warning.icon }}
                  </v-icon>
                  <br>
                  {{ $t(`global.confirm_del`, $store.state.locale) }}
                </v-card-text>
                
                
                <v-card-actions>

                  <v-btn 
                    color="primary" 
                    dark
                    block
                    @click="dialog_del = false"
                    ma-2
                    >
                    <v-icon left>
                      {{ $store.state.mainIcons.cancel.icon }}
                    </v-icon>
                    {{ $t(`global.cancel`, $store.state.locale) }}
                  </v-btn>
                  
                  <v-btn 
                    color="error " 
                    dark
                    block
                    @click="deleItem() ; dialog_del = false"
                    ma-2
                    >
                    <v-icon left>
                      {{ $store.state.mainIcons.delete.icon }}
                    </v-icon>
                    {{ $t(`global.delete_i`, $store.state.locale) }}
                  </v-btn>

                </v-card-actions>

              </v-card>
            
            </v-dialog>

          </v-list-tile>



      
        </v-list>
      
      </v-menu>


    </v-toolbar>

    <v-progress-linear 
      v-show="is_loading"
      color="accent"
      :indeterminate="true"
      class="my-0"
      >
    </v-progress-linear>

  </div>

</template>



<script>

// import checkDocUserAuth from '~/plugins/utils/checkDocUserAuth.js'

export default {

  props: [
    'coll',
    'collName',
    'itemDoc',
    'is_create',
    'isPreview',
    'isSettings',
    'is_reset',
    'is_reload',
    'is_loading'
  ],

  data () {
    return {

      is_preview: this.isPreview,
      itemId: this.itemDoc._id,
      itemTitle: this.itemDoc.infos.title,

      is_settings: this.isSettings,

      loading: false,
      alert: null,

      dialog_del: false,
      dialog_reset: false,
      dialog_reload: false,

      parentFieldsListDSI: [
        {
          parentFieldName: 'specs',
          subFields: [
            'src_type',
            'src_link',
            'src_parser'
          ]
        }
      ]

    }
  },

  computed: {

    iconSwitchColor () {
      return (!this.isPreview) ? 'white' : 'primary'
    },
    btnSwitchColor () {
      return (this.isPreview) ? 'white' : 'primary'
    }

  },

  watch: {

    itemDoc: {

      immediate: true,
      handler (newVal, oldVal) {
        console.log('\nItemToolbar / watch ~ item_doc / newVal : \n', newVal)

        if (newVal) {
          this.itemDoc = newVal
          this.itemTitle = newVal.infos.title
        }
      }
    }
  },

  methods: {

    switchPreview () {
      console.log('itemToolbar - switchPreview / this.is_preview : ', this.is_preview)
      this.$emit('input')
    },
    switchSettings () {
      console.log('itemToolbar - switchSettings / this.is_settings : ', this.is_settings)
      this.$emit('settings')
    },

    //  USER AUTH  - checkUserAuth for an item --> /utils
    checkUserAuth (fieldName) {
      // console.log("\ncheckUserAuth / fieldName : ", fieldName ) ;

      var canUpdateField = false

      if (this.is_create) {
        canUpdateField = true
      } else {
        var isLogged = this.$store.state.auth.isLogged
        var userId = this.$store.state.auth.user_id

        canUpdateField = this.$checkDocUserAuth(this.itemDoc, fieldName, isLogged, userId)
      }

      // console.log("checkUserAuth / canUpdateField : ", canUpdateField ) ;

      return canUpdateField
    },

    reloadData () {
      console.log('itemToolbar - reloadData ...')
      const reloadSpecs = this.$store.state[this.coll].reload_data
      console.log('itemToolbar - reloadData / reloadSpecs : ', reloadSpecs)

      // REFORMAT DATA
      var dataToSend = this.$prepareFormData(reloadSpecs)
      console.log('itemToolbar - reloadData / dataToSend : ', dataToSend)

      // add file's data if needed
      // if (reloadSpecs.specs.src_type !== 'API') {
      //   console.log('itemToolbar - reloadData / adding file to dataToSend')
      //   dataToSend['csv_sep'] = this.$store.state[this.coll].csv_sep
      // }
      //  PREPARE PAYLOAD
      var payload = { collection: this.coll, doc_id: this.itemId, data: dataToSend }
      console.log('itemToolbar - reloadData / payload : ', payload)

      // dispatch action from store
      this.$store.dispatch('reloadData', payload)
        .then(response => {
          this.loading = false
        })
        .catch(error => {
          console.log('itemToolbar - reloadData / submit / error... : ', error)
          this.loading = false
          this.$store.commit(`set_error`, error)
          if (error.response && error.response.data) {
            this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
          }
        })
    },

    deleItem () {
      console.log('\n itemToolbar - deleItem ... ')

      this.loading = true
      this.is_loading = true

      var callInput = {
        coll: this.coll,
        doc_id: this.itemId
      }

      this.$store.dispatch('deleteItem', callInput)

        .then(response => {
          console.log('itemToolbar - deleItem / response: ', response)

          this.loading = false
          this.is_loading = false
          this.alert = {type: 'success', message: response.msg}

          return this.$router.push(`/${this.coll}`)
        })

        .catch(error => {
          console.log('itemToolbar - deleItem / error... : ', error)

          this.loading = false
          this.is_loading = false

          if (error.response && error.response.data) {
            this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
          }
        })
    }

  }

}
</script>