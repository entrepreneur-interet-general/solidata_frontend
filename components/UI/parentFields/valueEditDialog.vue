<template>

  <div>

    <v-layout row justify-center class="pa-0 ma-0">


      <!--  SUBFIELD NAME  -->
      <v-flex
        v-if="!is_preview"
        :class="subFieldsSize"
        >
        <v-btn 
          class="pa-0 ma-0"
          disabled 
          block 
          color="grey" 
          style="text-transform: none !important;"
          >
          <span>
            {{ subField }}
          </span>
        </v-btn>
      </v-flex>


      <!--  SUBFIELD VALUE + BUTTON  -->
      <v-flex
        :class="valueBlockSize"
        >
        <v-btn 
          class="pa-0 ma-0"
          flat 
          block 
          :disabled="!canEdit"
          color="" 
          style="text-transform: none !important;"
          @click="open()"
          >
          <span>
            {{ item_data }} 
            <!-- - {{ coll }} / {{ collName }} -->
            <!-- - is_create :{{ is_create }} -->
            <!-- - {{ parentField }}.{{ subField }} -->
            <!-- - canEdit : {{ canEdit }} -->
            <!-- - {{ valueBlockSize }} -->

          </span>
          <v-icon small right v-if="canEdit" color="accent"> 
            edit
          </v-icon>
        </v-btn>
      </v-flex>




      <!--  UPDATE DIALOG  -->
      <v-dialog 
        v-model="dialog" 
        persistent 
        max-width="500px"
        >

        <v-card>

          <v-card-title>
            <span class="headline">
              {{$t('global.edit', $store.state.locale )}} : 
              {{$t('global.'+subField, $store.state.locale )}}
            </span>
          </v-card-title>

          <!-- <v-divider></v-divider> -->

          <v-card-text class="py-0 ma-0">
            <v-container grid-list-md class="py-0 ma-0">
              <v-layout wrap>

                <v-flex xs12>


                  <!-- CHOICES VALUE -->
                  <v-select
                    v-if="subField in $store.state.subFieldsWithChoices "
                    v-model="item_data"
                    :label="$t('global.'+subField, $store.state.locale)"
                    :items="$store.state.subFieldsWithChoices[subField]['choices']"
                    single-line
                    >
                  </v-select>


                  <!-- BOOLEAN VALUE -->
                  <v-checkbox
                    v-else-if=" $store.state.subFieldsWithBoolean.includes(subField) "
                    v-model="item_data"
                    :label="$t('global.'+subField, $store.state.locale)"
                    >
                  </v-checkbox>


                  <!-- COMBO VALUE  -->
                  <!-- <v-flex xs12>
                    <v-autocomplete
                      :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                      label="Interests"
                      multiple
                    ></v-autocomplete>
                  </v-flex> -->

                  <!-- FILE UPLOAD  -->


                  <!-- TEXT AREA VALUE -->
                  <v-textarea
                    v-else-if=" $store.state.subFieldsWithTextarea.includes(subField) "
                    v-model="item_data"
                    outline
                    :label="$t('global.'+subField, $store.state.locale )"
                    auto-grow
                    color="primary"
                    rows="4"
                    clearable
                  ></v-textarea>


                  <!-- TEXT VALUE -->
                  <v-text-field
                    v-else
                    :ref="subField"
                    v-model="item_data"
                    :rules="[() => !!item_data || $t('rules.required', $store.state.locale )]"
                    :label="$t( collName+'.'+subField, $store.state.locale )"
                    :error-messages="errorMessages"
                    :placeholder="$t('global.'+subField, $store.state.locale )"
                    required
                  ></v-text-field>



                </v-flex>






              </v-layout>
            </v-container>

            <!-- <small>*indicates required field</small> -->

          </v-card-text>


          <!-- UPDATE | SAVE DIALOG -->
          <v-card-actions>

            <v-spacer></v-spacer>

            <!-- CANCEL -->
            <v-btn color="grey darken-1" flat @click="dialog = false ; cancel() ">
              {{$t('global.cancel', $store.state.locale )}}
            </v-btn>

            <!-- UPDATE VALUE BY API -->
            <v-btn 
              v-if="!is_create"
              color="accent darken-1" 
              flat 
              @click="dialog = false ; submitValue () ; save() "
              >
              {{$t('global.save', $store.state.locale )}}
            </v-btn>

            <!-- UPDATE VALUE IN STORE -->
            <v-btn 
              v-else
              color="accent darken-1" 
              flat 
              @click="dialog = false ; save() "
              >
              {{$t('global.save', $store.state.locale )}}
            </v-btn>

          </v-card-actions>

        </v-card>
      </v-dialog>


    </v-layout>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{$t('dialog.'+snackText, $store.state.locale )}}
      <v-btn flat @click="snack = false">
        {{$t('global.close', $store.state.locale )}}
      </v-btn>
    </v-snackbar>

  </div>

</template>


<script>

// import ObjectFormatterUpdate from "~/plugins/utils/objectFormatterUpdate.js"

export default {

  props: [

    'coll',
    'collName',
    'is_create',
    'is_preview',
    'parentField',
    'subField',
    'item_id',
    'item_data',
    'canEdit'

  ],

  mounted () {
    this.$store.state.LOG && console.log('\n- valueEdit / mounted ---> item_data : ', this.item_data)
  },

  data: function () {
    return {

      // edit_mode : false,
      dialog: false,
      snack: false,
      snackColor: '',
      snackText: 'closed',

      valueFullSize: 'xs12 ma-0 pa-2',
      valuePartSize: 'xs12 md9 ma-0 pa-2',
      subFieldsSize: 'xs12 md3 ma-0 pa-2',

      is_req: ['yes', 'no'],
      errorMessages: '',
      formHasErrors: false

    }
  },

  computed: {

    valueBlockSize () {
      // this.$store.state.LOG && console.log('\n valueBlockSize - is_create : ', this.is_create) ;
      return (this.is_preview) ? this.valueFullSize : this.valuePartSize
    },

    form () {
      return {
        'field_to_update': this.parentField + '.' + this.subField,
        'field_value': this.item_data
      }
    }

    // value_ () {
    // 	return {
    // 	""+this.parentField : {
    // 	""+this.subField : this.item_data,
    // 	}
    // }

  },

  watch: {
    name () {
      this.errorMessages = ''
    }
  },

  methods: {

    // dialog functions
    save () {
      this.dialog = false
      this.snack = true
      this.snackColor = 'accent'
      this.snackText = 'saved'
    },
    cancel () {
      this.dialog = false
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'canceled'
    },
    open () {
      this.dialog = true
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'opened'
    },
    close () {
      this.$store.state.LOG && console.log('Dialog closed')
    },

    // values checks
    contentCheck () {
      this.errorMessages = !this.item_data
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

    // update value for update of current_new in

    // submit value for update via API backend
    submitValue () {
      this.$store.state.LOG && console.log('\n submitValue... ')

      this.formHasErrors = false

      // Object.keys(this.form).forEach(f => {
      // 	if (!this.form[f]) this.formHasErrors = true
      // 	this.$refs[f].validate(true)

      // })

      // var formData = ObjectFormatterUpdate.prepareFormData(this.form) ;
      var formData = [this.form]
      this.$store.state.LOG && console.log('\n submitValue / formData : ', formData)

      // dispatch action from store
      this.$store.dispatch('updateItem', {
        coll: this.coll,
        doc_id: this.item_id,
        form: formData // this.form,
      }).then(result => {
        this.alert = {type: 'success', message: result.msg}
        this.loading = false
        // this.$router.push('/') /////////
      }).catch(error => {
        this.$store.state.LOG && console.log('submit / error... : ', error)
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

