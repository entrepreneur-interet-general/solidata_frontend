<template>

  <div>

    <!-- - valid : <code>{{ valid }}</code><br> -->
    <!-- - password : <code>{{ password }}</code><br> -->
    <!-- - pseudoForm : <code>{{ pseudoForm }}</code> -->

    <v-form 
      @submit.prevent="submitRegister" 
      id="register-form"
      ref="form"
      v-model="valid"
      lazy-validation
      >
        
      <v-card-text>
        <!-- ALERT -->
        <!-- <v-alert 
          v-if="alert" 
          :type="alert.type" 
          value="true">{{alert.message}}
        </v-alert> -->
        
        <!-- ANTI-SPAMS FIELD -->
        <v-text-field 
          v-show="$store.state.is_debug"
          id="email"
          v-model="email"
          prepend-icon="warning" 
          name="email" 
          label="email" 
          type="text">
        </v-text-field>

        <!-- REAL USER INFOS FOR REGISTER -->
        <v-text-field 
          id="email_bis"
          v-model="email_bis"
          :rules="[rules.email, rules.required]"
          prepend-icon="person" 
          name="email_bis" 
          label="Email" 
          type="text">
        </v-text-field>
        
        <v-text-field 
          id="name" 
          v-model="name"
          :rules="[rules.required]"
          prepend-icon="person" 
          name="name" 
          :label="$t('global.name', $store.state.locale )"
          type="text">
        </v-text-field>
      
        <v-text-field 
          id="surname" 
          v-model="surname"
          :rules="[rules.required]"
          prepend-icon="person" 
          name="surname" 
          :label="$t('global.surname', $store.state.locale )"
          type="text">
        </v-text-field>
      
        <v-text-field 
          id="password" 
          v-model="password"
          :rules="[rules.required, rules.password, rules.counterMin]"
          prepend-icon="lock" 
          name="password" 
          :label="$t('global.password', $store.state.locale )"
          type="password">
        </v-text-field>
      
        <v-checkbox
          v-model="agreement"
          :rules="[rules.required]"
          >
          <template slot="label">
            {{ $t('home.agreement', $store.state.locale ) }}&nbsp;
            <a href="#" @click.stop.prevent="dialog = true">{{ $t('home.termsService', $store.state.locale ) }}</a>
            &nbsp;{{ $t('global.and', $store.state.locale ) }}&nbsp;
            <a href="#" @click.stop.prevent="dialog = true">{{ $t('home.privacyPolicy', $store.state.locale ) }}</a>*
          </template>
        </v-checkbox>

      </v-card-text>

      <v-card-actions>
        
        <!-- <v-spacer></v-spacer>
        <v-btn 
          flat
          class="grey"
          dark
          block
          :loading="loading" 
          :disabled="loading"
          @click="validate"
          >
          validate
        </v-btn> -->
        
        <!-- <v-spacer></v-spacer>
        <v-btn 
          flat
          class="grey"
          dark
          block
          :loading="loading" 
          :disabled="loading"
          @click="resetValidation"
          >
          resetValidation
        </v-btn> -->
        
        <!-- <v-spacer></v-spacer>
        <v-btn 
          flat
          class="grey"
          dark
          block
          :loading="loading" 
          :disabled="loading"
          @click="reset"
          >
          reset
        </v-btn> -->
        
        <v-spacer></v-spacer>
        <v-btn 
          flat
          class="accent"
          block
          type="submit" 
          :loading="loading" 
          :disabled="loading"
          >
          {{ $t('home.registerPage', $store.state.locale ) }}
        </v-btn>
        <v-spacer></v-spacer>

      </v-card-actions>

    </v-form>

  </div>

</template>


<script>

// cf : https://stackoverflow.com/questions/48937829/vuetify-component-v-form-is-not-responding-on-the-declared-submit-event-handler?rq=1
// import Cookie from 'js-cookie'

export default {

  components: {
  },

  // run this before load
  middleware: [
    //   'notAuthenticated'
  ],

  data () {
    return {

      valid: false,

      // preventive anti spam field
      email: '',

      email_bis: '',
      name: '',
      surname: '',
      password: '',
      alert: null,
      loading: false,
      agreement: false,

      rules: {
        // email: v => (v || '').match(/@/) || this.$t('rules.email', this.$store.state.locale),
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || this.$t('rules.email', this.$store.state.locale)
        },
        length: len => value => (value || '').length >= len || this.$t('rules.length', this.$store.state.locale),
        password: value => {
          const pattern = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/)
          return pattern.test(value) || this.$t('rules.password', this.$store.state.locale)
        },
        required: value => !!value || this.$t('rules.required', this.$store.state.locale),
        counterMin: value => value.length >= 6 || 'Min 20 characters'
      }
    }
  },

  computed: {
    pseudoForm () {
      if (process.client === true) {
        const saltToken = this.$store.state.auth.salt_token
        var encryptedPwd = this.password !== '' ? this.$EncryptionRSA(this.password, saltToken) : ''
        var encryptedEmail = this.email_bis !== '' ? this.$EncryptionRSA(this.email_bis, saltToken) : ''

        let pseudoForm = {
          // email : this.email,
          email_encrypt: encryptedEmail.hashed,
          pwd_encrypt: encryptedPwd.hashed,
          name: this.name,
          surname: this.surname,
          // pwd : this.password,
          lang: this.$store.state.locale,
          agreement: this.agreement
        }
        return pseudoForm
      }
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    submitRegister (event) {
      console.log('submitRegister...')

      this.alert = null
      this.loading = true

      // - - - - - - - - - - - - - //
      // ENCRYPT EMAIL & PWD
      // - - - - - - - - - - - - - //

      // anti spam preventive measure
      if (this.email === '' && this.$refs.form.validate() && this.password !== '') {
        // // use saltToken as public_key for RSA encryption
        const saltToken = this.$store.state.auth.salt_token

        // var encryptedPwd = this.$EncryptionRSA(this.password, saltToken)
        var encryptedPwd = this.password !== '' ? this.$EncryptionRSA(this.password, saltToken) : ''
        console.log('encryptedPwd : ', encryptedPwd)

        // var encryptedEmail = this.$EncryptionRSA(this.email_bis, saltToken)
        var encryptedEmail = this.email_bis !== '' ? this.$EncryptionRSA(this.email_bis, saltToken) : ''
        console.log('encryptedEmail : ', encryptedEmail)

        let pseudoForm = {
          // email : this.email,
          email_encrypt: encryptedEmail.hashed,
          pwd_encrypt: encryptedPwd.hashed,
          name: this.name,
          surname: this.surname,
          // pwd : this.password,
          lang: this.$store.state.locale,
          agreement: this.agreement
        }
        // let pseudoForm = this.pseudoForm

        console.log('submitRegister / pseudoForm :', pseudoForm)

        // dispatch action from store/auth
        this.$store.dispatch('auth/register', pseudoForm)

          .then(response => {
            console.log('submitRegister success / response :', response)
            // this.alert = {type: 'success', message: response.msg}
            this.loading = false

            this.$store.commit(`set_alert`, response.msg)

            this.$router.push('/dashboard')
          })

          .catch(error => {
            console.log('submit / error : \n', error)
            this.loading = false
            this.alert = {type: 'error', message: ' error submitting request '}
            if (error.response && error.response.data) {
              this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
            }
          })
      } else {
        this.$refs.form.validate()
      }
    }

  }
}
</script>