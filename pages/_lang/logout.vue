<template>


  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs10 sm8 md6 lg4>
        <v-card class="elevation-12 pa-3">


          <CardTitle 
            :icon="$store.state.mainIcons.logout.icon"
            :title="$t('home.logoutPage', $store.state.locale )">
          </CardTitle>
          
          <!-- <v-card-title dark class="info white--text">

            <span class="headline">{{ $t('home.logoutPage', $store.state.locale ) }}</span>

            <v-spacer></v-spacer>

            <v-menu center right>
              <v-btn
                nuxt
                slot="activator"
                dark
                icon
                to='/'
              >
                <v-icon>clear</v-icon>
              </v-btn>

            </v-menu>
          </v-card-title> -->

          <!-- <v-card-text>
             <v-form 
              @submit.prevent="submitLogout" 
              id="logout-form"
              >
              <v-alert 
                v-if="alert" 
                :type="alert.type" 
                value="true"
              >
                msg : {{alert.message}}
              </v-alert>
            </v-form>
          </v-card-text> -->

          <v-card-actions class="mt-3 justify-center">
            <p class="">{{ $t('home.logoutMsg', $store.state.locale ) }}</p>
          </v-card-actions>
          
          <v-card-actions class="mt-3">

            <v-btn 
              large block
              color="error"
              type="submit" 
              @click.prevent="submitLogout" 
              :loading="loading" 
              :disabled="loading"
            >
              {{ $t('home.logoutPage', $store.state.locale ) }}
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

// import CardTitle from '~/components/UI/cardTitle.vue'

export default {

  components: {
    // CardTitle
  },

  // run middleware before load
  middleware: [
    // 'notAuthenticated'
  ],

  data () {
    return {
      loading: false
    }
  },

  methods: {

    submitLogout (event) {
      console.log('submitLogout...')

      this.alert = null
      this.loading = true

      // dispatch action from store/auth
      this.$store.dispatch('auth/logout')
        .then(result => {
          console.log('submitLogout after then...')
          this.loading = false

          this.$store.commit(`set_alert`, 'you are now logegd out')

          this.$router.push('/')
        })
        .catch(error => {
          console.log('submit / error...')
          this.loading = false
          this.alert = {type: 'error', message: 'logout failed'}

          this.$store.commit(`set_error`, error)
        })
    }

  }
}
</script>