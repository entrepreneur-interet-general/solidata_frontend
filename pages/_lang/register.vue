<template>


  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs10 sm8 md6>

        <v-card class="elevation-12 pa-3 mt-5">


          <CardTitle 
            :icon="$store.state.mainIcons.register.icon"
            :title="$t('home.registerPage', $store.state.locale )">
          </CardTitle>


          <RegisterForm>
          </RegisterForm>


          <v-divider class="my-3"></v-divider>
          
          <v-card-actions>

            {{ $t('home.loginToRegister', $store.state.locale ) }} 
            <v-btn outline nuxt to="/login" class="ml-2 text-lowercase" color="accent">
              {{ $t('home.loginPage', $store.state.locale ) }}
            </v-btn>

          </v-card-actions>


        </v-card>

      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>

// cf : https://stackoverflow.com/questions/48937829/vuetify-component-v-form-is-not-responding-on-the-declared-submit-event-handler?rq=1
// import Cookie from 'js-cookie'

import CardTitle from '~/components/UI/cardTitle.vue'
import RegisterForm from '~/components/Forms/register.vue'

export default {

  components : {
    CardTitle,
    RegisterForm
  },

  // middleware: 'notAuthenticated', // run this before load
  
  data () {
      return {
        // email: '',
        // name: '',
        // surname: '',
        // password: '',
        // alert: null,
        // loading: false
      }
  },

  methods: {

    // submitRegister (event) {

    //   console.log("submitLogin..." ) ; 

    //   this.alert    = null
    //   this.loading  = true

    //   // dispatch action from store/auth
    //   this.$store.dispatch('auth/register', {
    //     email   : this.email,
    //     name    : this.name,
    //     surname : this.surname,
    //     pwd     : this.password
    //   })
    //   .then(result => {
    //     this.alert = { type: 'success', message: result.msg}
    //     this.loading = false
    //     this.$router.push('/') /////////
    //   })
    //   .catch(error => {
    //     console.log("submit / error..." ) ; 
    //     this.loading = false
    //     this.alert = {type: 'error', message: " error submitting request " }
    //     if (error.response && error.response.data) {
    //       this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
    //     }
    //   })
    // },

  }
}

</script>