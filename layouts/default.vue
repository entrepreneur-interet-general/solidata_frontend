<template>
  <v-app >

    <MainDrawer 
      @toggleMiniVariant="change_miniVariant" 
    />
    <!-- <v-navigation-drawer
      :mini-variant.sync="$store.state.miniVariant"
      :clipped="$store.state.clipped"
      v-model="$store.state.drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          v-for="(item, i) in $store.state.items"
          :to="item.to"
          :key="i"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        
        </v-list-tile>
      </v-list>

    </v-navigation-drawer> -->



    <Toolbar 
      @toggleClipped="change_clipped" 
      @toggleDrawer="change_drawer" 
      @toggleMiniVariant="change_miniVariant" 
      @toggleFixed="change_fixedNav" 
      @toggleRightDrawer="change_rightDrawer" 
    />
    <!-- <v-toolbar :fixed="$store.state.fixed" app :clipped-left="$store.state.clipped">
      
      <v-toolbar-side-icon @click="change_drawer"></v-toolbar-side-icon>
      
      <v-btn
        icon
        @click.stop="change_miniVariant"
      >
        <v-icon v-html="$store.state.miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>

      <v-btn
        icon
        @click.stop="change_clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>

      <v-btn flat nuxt to="/">
        <v-toolbar-title v-text="$store.state.title"></v-toolbar-title>
      </v-btn>

      <v-spacer></v-spacer>

          
        <v-btn icon nuxt to="/login">
          <v-icon>input</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>person</v-icon>
        </v-btn>


        <v-menu :nudge-width="100">
          <v-toolbar-title slot="activator">
            <span>{{ $store.state.locale }}</span>
            <v-icon >arrow_drop_down</v-icon>
          </v-toolbar-title>

          <v-list>
            <v-list-tile
              v-for="item in $store.state.dropdown_lang "
              :key="item" 
              @click="change_lang(item.code)" 
            >
              <v-list-tile-title v-text="item.text"></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

      <v-btn
        icon
        @click.stop="change_rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>


    </v-toolbar> -->






    <v-content>
      <nuxt />
    </v-content>


    <!-- DEBUGGING / DISPLAY STORE CONTENTS -->
    <v-divider class="my-3"></v-divider>
    <v-content>
      <v-container>
        <h3> ==> DEBUGGING DEFAULT LAYOUT</h3>
        <v-divider class="my-3"></v-divider>
        <div>isAnonymous : {{ $store.state.auth.isAnonymous}}</div>
        <div>isLogged : {{ $store.state.auth.isLogged}}</div>
        <div>locale : {{ $store.state.locale }} </div>
        <br> 
        <div>user_infos : {{ $store.state.auth.user_infos}}</div>
        <div>user_id : {{ $store.state.auth.user_id}}</div>
        <br> 
        <div>access_token : {{ $store.state.auth.access_token}}</div>
        <div>refresh_token : {{ $store.state.auth.refresh_token}}</div>
        <br> 
        <div>prj.alert : {{ $store.state.prj.alert.message}}</div>

      </v-container>
    </v-content> 


    <SecondaryDrawer 
      @toggleRight="change_right"
    />
    <!-- <v-navigation-drawer
      temporary
      :right="$store.state.right"
      v-model="$store.state.rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="change_right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->




    <Footer/>
    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer> -->




  </v-app>
</template>

<script>

  import axios from 'axios'

  // import components
  import MainDrawer from '~/components/Navigation/MainDrawer.vue'
  import SecondaryDrawer from '~/components/Navigation/SecondaryDrawer.vue'
  import Toolbar from '~/components/Navigation/Toolbar.vue'
  import Footer from '~/components/Footer/Footer.vue'

  export default {

    // load components
    components : {
      Toolbar, 
      MainDrawer,
      SecondaryDrawer,
      Footer,
    },

    // middleware : ["checkTokens"],
    
    data () {
      return {
        // items: [
        //   { icon: 'apps', title: 'Welcome', to: '/' },
        //   { icon: 'input', title: 'Login', to: '/login' },
        //   { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        // ],
        // miniVariant: true,
        // clipped: true,
        // drawer: true,
        // fixed: true,
        // right: true,
        // rightDrawer: false,
        // title: 'Solidata'
      }
    },

    methods: {
      
      change_lang(new_locale) {
        // console.log("change_lang / new_locale : ", new_locale ) ; 
        this.$store.commit('SET_LANG', new_locale )
      },
      change_miniVariant() {
        this.$store.commit('set_miniVariant' )
      },
      change_clipped() {
        this.$store.commit('set_clipped' )
      },
      change_drawer() {
        this.$store.commit('set_drawer' )
      },
      change_fixedNav() {
        this.$store.commit('set_fixedNav' )
      },
      change_right() {
        this.$store.commit('set_right' )
      },
      change_rightDrawer() {
        this.$store.commit('set_rightDrawer' )
      },
    },

    // async asyncData ({ params }) {
    //   let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    //   return { title: data.title }
    // }
  }



</script>
