
<template>

  <v-toolbar 
      color="secondary" 
      dark
      app 
      :fixed="$store.state.fixedNav" 
      :clipped-left="$store.state.clipped"
      >
      
      <v-toolbar-side-icon 
        @click="$emit('toggleDrawer')"
        >
      </v-toolbar-side-icon>

      <!-- <v-btn
        icon
        @click.stop="$emit('toggleMiniVariant')"
      >
        <v-icon 
          v-html="$store.state.miniVariant ? 'chevron_right' : 'chevron_left'"
          ></v-icon>
      </v-btn> -->

      <v-btn flat nuxt to="/" >
        <v-toolbar-title v-text="$store.state.title"></v-toolbar-title>
      </v-btn>



      <!-- <v-btn
        icon
        @click.stop="$emit('toggleClipped')"
      >
        <v-icon >web</v-icon>
      </v-btn> -->
      



      
      <!-- <v-btn
        icon
        @click.stop="$emit('toggleFixed')"
      >
        <v-icon >remove</v-icon>
      </v-btn>  -->
     

      <v-spacer></v-spacer>

        <!--  RIGHT SIZE OF THE TOOLBAR -->



          
        <!-- <v-btn 
          v-if="!$store.state.auth.isLogged" 
          icon 
          nuxt to="/login">
          <v-icon>arrow_forward</v-icon>
        </v-btn>

        <v-btn 
          v-else 
          icon 
          nuxt to="/logout">
          <v-icon>power_settings_new</v-icon>
        </v-btn> -->


        <template v-if="!$store.state.auth.isLogged" >
          <v-btn 
            nuxt to="/login"
            flat
            >
            {{ $t('home.loginPage', $store.state.locale ) }}
          </v-btn>

          <v-btn 
            nuxt to="/register"
            outline dark
            >
            {{ $t('home.registerPage', $store.state.locale ) }}
          </v-btn>

          <div class="ml-2">
            <v-menu :nudge-width="100" >
              <v-toolbar-title  slot="activator">
                <span>{{ $store.state.locale }}</span>
                <v-icon >arrow_drop_down</v-icon>
              </v-toolbar-title>

              <v-list>
                <v-list-tile
                  v-for="(item,i) in $store.state.dropdown_lang "
                  :key="i" 
                  @click="change_lang(item.code)" 
                >
                  <v-list-tile-title v-text="item.text"></v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
          
        </template>

        <template v-if="$store.state.auth.isLogged" >
          
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
          >
            <v-btn
              color=""
              slot="activator"
              class="text-capitalize"
              flat round
            >
              <span>{{ $t('global.hi', $store.state.locale ) }}, {{ $store.state.auth.user_infos.name }}</span>
              <v-icon right>{{ $store.state.mainIcons.profile.icon }}</v-icon>

            </v-btn>

            <v-card>
              <v-list>
                <v-list-tile avatar>

                  <v-list-tile-avatar>
                    <v-icon right>{{ $store.state.mainIcons.profile.icon }}</v-icon>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ $store.state.auth.user_infos.name }} {{ $store.state.auth.user_infos.surname }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ $store.state.auth.user_infos.email }}</v-list-tile-sub-title>
                  </v-list-tile-content>

                </v-list-tile>
              </v-list>

              <v-divider></v-divider>

              <v-list>

                <!-- <v-list-tile>
                  <v-list-tile-action>
                    <v-switch v-model="message" color="purple"></v-switch>
                  </v-list-tile-action>
                  <v-list-tile-title>Enable messages</v-list-tile-title>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-switch v-model="hints" color="purple"></v-switch>
                  </v-list-tile-action>
                  <v-list-tile-title>Enable hints</v-list-tile-title>
                </v-list-tile> -->

                <v-list-tile>
                  <v-menu :nudge-width="100" >
                    <!-- <span  slot="activator">
                      <span>{{ $store.state.locale }}</span>
                      <v-icon >arrow_drop_down</v-icon>
                    </span> -->
                  <v-btn 
                    color=""
                    slot="activator"
                    flat fab small
                    >
                    <v-icon>{{ $store.state.mainIcons.language.icon }}</v-icon>
                  </v-btn>
                    <v-list>
                      <v-list-tile
                        v-for="(item,i) in $store.state.dropdown_lang "
                        :key="i" 
                        @click="change_lang(item.code)" 
                      >
                        <v-list-tile-title v-text="item.text"></v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                  <v-list-tile-title>
                    {{ $t('global.lang', $store.state.locale ) }} : {{ $store.state.locale }}
                  </v-list-tile-title>
                </v-list-tile>

                <v-list-tile>
                    <v-btn 
                      color=""
                      flat fab small
                      nuxt to="/usr/settings">
                      <v-icon>{{ $store.state.mainIcons.settings.icon }}</v-icon>
                    </v-btn>
                    <v-list-tile-title>{{ $t('global.settings', $store.state.locale ) }}</v-list-tile-title>
                </v-list-tile>
  
                <v-divider></v-divider>

                <v-list-tile>
                    <v-btn 
                      color=""
                      flat fab small
                      nuxt to="/logout">
                      <v-icon>{{ $store.state.mainIcons.logout.icon }}</v-icon>
                    </v-btn>
                    <v-list-tile-title>{{ $t('home.logoutPage', $store.state.locale ) }}</v-list-tile-title>
                </v-list-tile>

              </v-list>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="menu = false">{{ $t('global.cancel', $store.state.locale ) }}</v-btn>
                <!-- <v-btn color="primary" flat @click="menu = false">{{ $t('global.save', $store.state.locale ) }}</v-btn> -->
              </v-card-actions>


            </v-card>

          </v-menu>


        </template>


        <!-- <v-btn
          icon
          @click.stop="$emit('toggleRightDrawer')"
        >
          <v-icon>menu</v-icon>
        </v-btn> -->



        <v-btn 
          icon 
          href="https://github.com/entrepreneur-interet-general/solidata_frontend"
          target="_blank"
          >
          <v-icon>fab fa-github</v-icon>
          <!-- {{ $t('links.github', $store.state.locale ) }} -->
        </v-btn>
        
    </v-toolbar>

</template>


<script>
export default {

    // middleware : 'change_lang',

    data() {
      return {

        fav: true,
        menu: false,
        message: false,
        hints: true

        // clipped: true,
        // drawer: false,
        // fixed: true,

        // items: [
        //   { icon: 'apps', title: 'Welcome', to: '/' },
        //   { icon: 'input', title: 'Login', to: '/login' },
        //   { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        // ],

        // miniVariant: false,
        // // right: true,
        // rightDrawer: false,
        // title: 'Solidata',

      }
    },
    methods: {
      change_lang(new_locale) {
        console.log("change_lang / new_locale : ", new_locale ) ; 
        this.$store.commit('SET_LANG', new_locale )
      },
      // change_drawer() {
      //   this.$store.commit('set_drawer' )
      // },
      // change_clipped() {
      //   this.$store.commit('set_clipped' )
      // },
      // change_miniVariant() {
      //   this.$store.commit('set_miniVariant' )
      // },
      // change_rightDrawer() {
      //   this.$store.commit('set_rightDrawer' )
      // },
      // change_fixed() {
      //   this.$store.commit('set_fixed' )
      // },
      // change_right() {
      //   this.$store.commit('set_right' )
      // },

    }, 

}
</script>


<style scoped>



</style>
