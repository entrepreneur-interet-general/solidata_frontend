<template>

  <v-container 
    grid-list-sm 
    pa-3
    fluid
    >

    <!-- ITEM TITLE ROW -->
    <v-layout 
      v-if="!noToolbar"
      row 
      wrap 
      mb-3
      >

      <v-flex 
        xs12 
        >
        <!-- d-flex :class="flex_vars" -->

        <ItemToolbar
          :coll="coll" 
          :collName="tab" 
          :itemDoc="item_doc"
          :is_create="is_create" 
          :isPreview="isPreview"
          :isSettings="isSettings"
          :is_loading="loading"
          @input="switchPreview"
          @settings="switchSettings"
          >
        </ItemToolbar>

      </v-flex>

    </v-layout>


    <!-- TAG / SETTINGS  -->
    <v-dialog 
      v-model="isSettings" 
      fullscreen 
      hide-overlay 
      transition="dialog-bottom-transition"
      >

      <v-card color="grey">
        
        <!-- SETTINGS TOOLBAR -->
        <SettingsToolbar
          :itemDoc="item_doc"
          @settings="switchSettings"
          >
        </SettingsToolbar>

        <v-layout row justify-center mt-5>

          <v-flex class="xs12 sm10 md8 justify-center py-5">

            <!-- COMPONENTS FOR COMMON DOCS INFOS -->  
              <!-- v-show="!isPreview" -->
            <v-expansion-panel
              v-model="panel_infos"
              expand
              class="elevation-0"
              >

              <v-expansion-panel-content>

                <div 
                  class="pb-0 mb-0"
                  slot="header"
                  >
                  <v-icon small class="mr-3">
                    {{ $store.state.mainIcons.parentFieldIcons.infos.icon }}  
                  </v-icon>
                  <span>
                    {{ $t(`parentFields.infos`, $store.state.locale) }}
                  </span>
                </div>

                <ItemDocInfos
                  :coll="coll"
                  :is_create="is_create"
                  :is_preview="false"
                  :item_doc="itemDoc"
                  >
                </itemDocInfos>

              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-divider></v-divider>


            <!-- COMPONENTS FOR DOCS DATA_RAW -->  
              <!-- v-show="!isPreview" -->
            <!-- <v-expansion-panel
              v-model="panel_data_raw"
              expand
              class="elevation-0"
              >
              
              <v-expansion-panel-content>

                <div 
                  class="pb-0 mb-0"
                  slot="header"
                  >
                  <v-icon small class="mr-3">
                    {{ $store.state.mainIcons.parentFieldIcons.data_raw.icon }}  
                  </v-icon>
                  <span>
                    {{ $t(`parentFields.data_raw`, $store.state.locale) }}
                  </span>
                </div>

                <ItemDocDataRaw
                  :coll="coll"
                  :is_create="is_create"
                  :is_preview="false"
                  :item_doc="itemDoc"
                  >
                </itemDocDataRaw>

              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-divider></v-divider> -->

          </v-flex>

        </v-layout>

      </v-card>
      
    </v-dialog>


    <!-- COMPONENTS FOR COMMON DOCS INFOS -->  
    <v-layout  
      :class="`${ isPreview ? 'justify-center' : '' }`"
      >
      <v-flex 
        :class="`${ isPreview ? 'sm6 md4 lg3 pb-4' : 'xs12' }`"
        >

        <v-expansion-panel
          v-show="!isPreview"
          v-model="panel_infos"
          expand
          class="elevation-0"
          >
          <v-expansion-panel-content>

            <div 
              class="pb-0 mb-0"
              slot="header"
              >
              <v-icon small class="mr-3">
                {{ $store.state.mainIcons.parentFieldIcons.infos.icon }}  
              </v-icon>
              <span>
                {{ $t(`parentFields.infos`, $store.state.locale) }}
              </span>
            </div>

            <ItemDocInfos
              :coll="coll"
              :is_create="is_create"
              :is_preview="isPreview"
              :item_doc="itemDoc"
              >
            </itemDocInfos>

          </v-expansion-panel-content>
        </v-expansion-panel>



        <CardPreviewDense 
          v-show="isPreview"
          :coll="'tag'"
          :tab="tab"
          :item="itemDoc"
          :no_hover="true"
          >
        </CardPreviewDense>



        <!-- COMPONENTS FOR DOCS DATA_RAW -->  

        <!-- <v-expansion-panel
          v-show="!isPreview"
          v-model="panel_data_raw"
          expand
          class="elevation-0"
          >
          
          <v-expansion-panel-content>

            <div 
              class="pb-0 mb-0"
              slot="header"
              >
              <v-icon small class="mr-3">
                {{ $store.state.mainIcons.parentFieldIcons.data_raw.icon }}  
              </v-icon>
              <span>
                {{ $t(`parentFields.data_raw`, $store.state.locale) }}
              </span>
            </div>

            <ItemDocDataRaw
              :coll="coll"
              :is_create="is_create"
              :is_preview="isPreview"
              :item_doc="itemDoc"
              >
            </itemDocDataRaw>

          </v-expansion-panel-content>
        </v-expansion-panel> -->



        <!-- COMPONENTS FOR COMMON DOCS USES -->  
        <v-expansion-panel
          v-show="!isPreview"
          class="elevation-0"
          expand
          >

          <v-expansion-panel-content>

            <div 
              class="pb-0 mb-0"
              slot="header"
              >
              <v-icon small class="mr-3">
                {{ $store.state.mainIcons.parentFieldIcons.uses.icon }}
              </v-icon>
              <span>
                {{ $t(`parentFields.uses`, $store.state.locale) }}
              </span>
            </div>

            <ItemDocUses
              :coll="coll"
              :is_create="is_create"
              :is_preview="isPreview"
              :item_doc="itemDoc"
              >
            </itemDocUses>

          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-flex>

    </v-layout>

    
    <!-- DEBUG  -->
    <v-layout 
      v-if="$store.state.is_debug"
      row wrap
      >

      <v-flex 
        xs12
        >
        <!-- d-flex :class="flex_vars" -->

        <v-alert       
          :value="true"
          type="error"
          class="text-xs-left"
          >
          ---- DEBUG component - ItemViewEdit ----
          <hr>

          -- itemDoc -- <br>
          <code>{{ itemDoc }}</code>
          <hr>

          -- vars -- <br>
          is_file : <code>{{ is_file }}</code> - 
          coll : <code>{{ coll }}</code> - 
          tab : <code>{{ tab }}</code> - 
          is_create : <code>{{ is_create }}</code> - 
          filetype : <code>{{ filetype }}</code> - 
          itemId : <code>{{ itemId}}</code> - 
          <!-- canEdit : <code>{{ canEdit }}</code> -->
          <!-- flex_vars : <code>{{flex_vars}}</code> -  -->
          <hr>

          -- current_new in $store.state.{{coll}} -- <br>
          {{coll}}.current_new : <br><code>{{ $store.state[coll].current_new }}</code>

          <div v-if="is_file">
            {{coll}}.csv_sep : <br><code>{{ $store.state[coll].csv_sep }}</code><br>
            {{coll}}.current_filename : <br><code>{{ $store.state[coll].current_filename }}</code>
          </div>
          <div v-if="is_file && $store.state[coll].current_file != '' ">
            {{coll}}.current_file : <br><code>{{ $store.state[coll].current_file.name }}</code>
          </div>    
          
        </v-alert>

      </v-flex>

    </v-layout>



  </v-container>
  
</template>


<script>

// import ObjectFormatterCreate from '~/plugins/utils/ObjectFormatterCreate.js'
// import checkDocUserAuth from '~/plugins/utils/checkDocUserAuth.js'

// import ItemToolbar from '~/components/UI/itemToolbar.vue'
// import ItemDocUses from '~/components/UI/itemDocUses.vue'
// import ItemDocInfos from '~/components/UI/itemDocInfos.vue'
// import ItemDocDataRaw from '~/components/UI/itemDocDataRaw.vue'

// import SettingsToolbar from '~/components/UI/settingsToolbar.vue'

// import CardPreviewDense from '~/components/UI/cardPreview_dense.vue'

export default {

  props: [
    // "flex_vars",   //
    'is_create', // view | create
    'is_preview', //
    // "parentFieldslist",  //
    'coll',
    'item_doc', // complete item infos
    // "is_debug",
    'is_switch',
    'no_toolbar'
    // "only_subfields",
  ],

  components: {

    // ItemToolbar,
    // ItemDocInfos,
    // ItemDocUses,
    // ItemDocDataRaw
    // SettingsToolbar,
    // CardPreviewDense

  },

  created () {
    this.$store.state.LOG && console.log('\n- viewEditTAG / created ---> item_doc : ', this.item_doc)
    this.itemDoc = this.item_doc
    // this.canEdit = this.checkUserAuth(this.parentField+'.'+this.subField)
    // this.canEdit = this.checkUserAuth(this.parentFieldslist)

    // this.is_file = ( this.coll == "dsi" ) ? true : false ;
    this.is_file = this.preloadIsFile()
    this.filetype = this.preloadFileType()
  },

  data () {
    return {

      alert: null,
      loading: false,

      panel_infos: [true],
      panel_data_raw: [true],

      isPreview: this.is_preview,
      noToolbar: this.no_toolbar,
      isSettings: false,

      // coll   : this.item_doc.specs.doc_type,
      tab: this.$store.state.collectionsNames[this.coll],
      // tab  : this.$store.state.collectionsNames[this.item_doc.specs.doc_type],
      // canEdit  : false ,
      itemId: this.item_doc._id,
      itemDoc: this.item_doc,

      is_file: null,
      filetype: null,

      blockFullSize: 'xs12',
      blockPartSize: 'xs10',
      blockSwitchSize: 'md6 offset-md3',

      parentFieldsSize: 'xs2 ma-0 pa-0',
      parentBotPadding: ' pb-0 pt-1',
      parentNoBotPadding: ' py-0',

      valueNoPadding: ' ma-0 pa-0',
      valueLeftPadding: ' ma-0 py-0 pr-0 pl-2',

      createHeight: '',
      createSize: 12

    }
  },

  computed: {

    parentPadding () {
      return (this.isPreview) ? this.parentNoBotPadding : this.parentBotPadding
    },

    valueSwitch () {
      // return (!this.is_preview && this.is_switch) ? this.blockPartSize : this.blockSwitchSize ;
      if (this.is_switch) {
        return (this.isPreview) ? this.blockSwitchSize : this.blockPartSize
      } else {
        return this.blockFullSize
      }
    },

    valueBlockSize () {
      return (this.is_preview) ? this.blockFullSize : this.blockPartSize
    },

    valuePadding () {
      return (this.is_preview) ? this.valueNoPadding : this.valueLeftPadding
    }

  },

  methods: {

    switchPreview () {
      this.isPreview = !this.isPreview
    },
    switchSettings () {
      this.isSettings = !this.isSettings
    },

    preloadIsFile () {
      var isFile = false
      if (this.coll === 'dsi') {
        if (this.item_doc.specs.src_type !== 'API') {
          isFile = true
        }
      }
      return isFile
    },

    preloadFileType () {
      var filetype
      if (this.coll === 'dsi') {
        filetype = this.item_doc.specs.src_type
      }
      return filetype
    },

    updateIsFile (val) {
      // if( val.subField == "src_type"){
      if (val.subField === 'switchFileType') {
        this.$store.state.LOG && console.log('\n updateIsFile - src_type / val : ', val)
        this.is_file = val.is_file
        this.filetype = val.filetype
      }

      if (val.subField === 'fileExt') {
        this.$store.state.LOG && console.log('\n updateIsFile - fileExt / val : ', val)
        this.itemDoc.specs.src_type = val.fileExt
        this.filetype = val.fileExt
      }

      this.$store.state.LOG && console.log('updateIsFile / this.filetype : ', this.filetype)
    },

    //  checkUserAuth for an item --> /utils
    checkUserAuth (fieldName) {
      // this.$store.state.LOG && console.log("checkUserAuth / fieldName : ", fieldName ) ;

      var canUpdateField = false

      if (this.is_create) {
        canUpdateField = true
      } else {
        var isLogged = this.$store.state.auth.isLogged
        var userId = this.$store.state.auth.user_id

        canUpdateField = this.$checkDocUserAuth(this.item_doc, fieldName, isLogged, userId)
      }

      return canUpdateField
    },

    // submit value to create item via API backend
    createItem () {
      this.$store.state.LOG && console.log('\n VE createItem... ')

      this.alert = null
      this.loading = true

      var currentNew = this.$store.state[this.coll].current_new

      // this.formHasErrors = false ;

      this.$store.state.LOG && console.log('VE createItem - currentNew : ', currentNew)

      // Object.keys(this.form).forEach(f => {
      //   if (!this.form[f]) this.formHasErrors = true
      //  this.$refs[f].validate(true)
      // })

      // REFORMAT DATA
      // var data_to_send = JSON.parse(JSON.stringify(currentNew)) ;
      var dataToSend = this.$prepareFormData(currentNew)

      // add file's data if needed
      if (this.is_file === true) {
        this.$store.state.LOG && console.log('VE createItem / adding file  to dataToSend')
        // data_to_send['file']   = this.$store.state[this.coll].current_file ;
        dataToSend['csv_sep'] = this.$store.state[this.coll].csv_sep
      //  data_to_send['filename']  = this.$store.state[this.coll].current_filename ;
      }

      this.$store.state.LOG && console.log('VE createItem / dataToSend : ', dataToSend)

      //  PREPARE PAYLOAD
      var payload = { collection: this.coll, data: dataToSend }
      this.$store.state.LOG && console.log('VE createItem / payload : ', payload)

      // dispatch action from store
      this.$store.dispatch('createItem', payload)

        .then(response => {
          this.loading = false
          this.alert = {type: 'success', message: response.msg}

          // retrieve new item id
          var newItemId = response.data._id

          // redirect to edit-preview page
          return this.$router.push(`/${this.coll}/${newItemId}`)
        })
        .catch(error => {
          this.$store.state.LOG && console.log('VE createItem / submit / error... : ', error)

          this.loading = false
          // this.alert = {type: 'error', message: "login error" }

          this.$store.commit(`set_error`, error)

          if (error.response && error.response.data) {
            this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
          }
        })
    }

  }

}
</script>