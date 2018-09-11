<template>

  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs10 sm8 md6>
        <v-card class="elevation-12 pa-3 mt-5">


          <CardTitle 
            :icon="$store.state.mainIcons.login.icon"
            :title="$t('home.loginPage', $store.state.locale )">
          </CardTitle>


          <LoginForm>
          </LoginForm>


          <v-divider class="my-3"></v-divider>

          <v-card-actions>
            
            {{ $t('home.registerToLogin', $store.state.locale ) }} 
            <v-btn outline nuxt to="/register" class="ml-2 text-lowercase" color="primary">
              {{ $t('home.registerPage', $store.state.locale ) }}
            </v-btn>

            <!-- <v-spacer></v-spacer>
            <nuxt-link class="text-lowercase"
             to="/forgotpwd"
            >
              {{ $t('home.forgotPwd', $store.state.locale ) }}
            </nuxt-link> -->
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
import LoginForm from '~/components/Forms/login.vue'

export default {

  components : {
    CardTitle,
    LoginForm
  },

  // run middleware before load
  middleware: [
    // 'notAuthenticated'
  ], 
  
  data () {
      return {

      }
  },

  methods: {


  }
}

</script>