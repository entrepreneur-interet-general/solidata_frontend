<template>


  <v-card>

    <v-toolbar card dense height="35" class="mb-3">

      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

      <v-toolbar-title class="body-2 grey--text" >
        {{ parentField }} 
        <!-- - edit_mode : {{edit_mode}} -->
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn 
        icon 
        small
        @click="edit_mode = !edit_mode">

        <v-icon small v-if="!edit_mode">
          edit
        </v-icon>
        <v-icon v-else>
          cancel
        </v-icon>

      </v-btn>

    </v-toolbar>


    <!-- COMPONENT PREVIEW/EDIT : INFOS + TEAM -->

    <v-layout row>

      <v-flex xs3>
        <v-subheader>{{$t('global.title', $store.state.locale )}}</v-subheader>
      </v-flex>

      <v-flex xs9 
        class="mr-4 pr-4"
        >  

        <v-text-field
          v-if="checkUserAuth('title') && edit_mode"
          ref="title"
          v-model="item_data.title"
          :rules="[() => !!item_data.title || $t('rules.required', $store.state.locale )]"
          :label="$t('datamodel_fields.title', $store.state.locale )"
          :error-messages="errorMessages"
          :placeholder="$t('global.title', $store.state.locale )"
          required
          box
        ></v-text-field>

        <v-text-field
          v-else
          ref="title"
          v-model="item_data.title"
          solo
          single-line
          readonly
        ></v-text-field>

      </v-flex>

    </v-layout>

    <!-- {{ item_data }} -->



    <v-divider></v-divider>

    <v-card-actions v-if="edit_mode">

      <v-btn 
        small 
        flat
        @click="edit_mode = !edit_mode">

        {{$t('global.cancel', $store.state.locale )}}
      </v-btn>

      <v-spacer></v-spacer>
      
      <v-slide-x-reverse-transition>
        <v-tooltip
          v-if="formHasErrors"
          left
          >
          <v-btn
            slot="activator"
            icon
            class="my-0"
            @click="resetForm"
            >
            <v-icon>
              {{$t('global.save', $store.state.locale )}}
            </v-icon>
          </v-btn>
          <span>
            {{$t('global.refresh', $store.state.locale )}}
          </span>
        </v-tooltip>
      </v-slide-x-reverse-transition>

      <v-btn 
        color="accent" 
        small
        @click="submitDmf"
        >
        {{$t('global.save', $store.state.locale )}}
      </v-btn>

    </v-card-actions>

  </v-card>

  
</template>


<script>

import ObjectFormatterUpdate from '~/plugins/utils/objectFormatterUpdate.js'

export default {

  props: [

    'coll',
    'view_or_create',
    'parentField',
    'item_id',
    'item_data',
    'item_auth'

  ],

  mounted () {
    console.log('\n- cardInfos / mounted ---> item_data : ', this.item_data)
  },

  data: function () {
    return {

      edit_mode: false,

      is_req: ['yes', 'no'],
      errorMessages: '',
      formHasErrors: false

    }
  },

  computed: {

    form () {
      return {

        'infos.title': this.title,
        'infos.description': this.description

      }
    }
  },

  watch: {
    name () {
      this.errorMessages = ''
    }
  },

  methods: {

    checkUserAuth (fieldName) {
      // console.log("\ncheckUserAuth ...") ;
      let canUpdateField = false
      const docAuthEdit = this.item_auth.open_level_edit
      const docAuthTeam = this.item_auth.team

      if (docAuthEdit === 'open_data') {
        canUpdateField = true
      } else if (docAuthEdit === 'commons') {
        canUpdateField = true
      } else if (docAuthEdit === 'collective') {
        canUpdateField = true
      } else if (docAuthEdit === 'private') {
        canUpdateField = true
      }

      return canUpdateField
    },

    contentCheck () {
      this.errorMessages = this.description && !this.title
        ? this.$t('rules.required', this.$store.state.locale)
        : ''

      return true
    },

    resetForm () {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
    },

    submitDmf () {
      console.log('\nSubmit_dmf... ')

      this.formHasErrors = false

      // Object.keys(this.form).forEach(f => {
      //  if (!this.form[f]) this.formHasErrors = true
      //  this.$refs[f].validate(true)

      // })

      var formData = ObjectFormatterUpdate.prepareFormData(this.form)
      console.log('\nSubmit_dmf / formData : ', formData)

      // dispatch action from store
      this.$store.dispatch('updateItem', {
        coll: 'dmf',
        doc_id: this.item_id,
        form: formData // this.form,
      }).then(response => {
        this.alert = {type: 'success', message: response.msg}
        this.loading = false
        // this.$router.push('/') /////////
      }).catch(error => {
        console.log('submit / error... : ', error)
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

