<template>

      <!-- :mini-variant.sync="$store.state.miniVariant" -->
    <v-navigation-drawer
      v-model="$store.state.drawer"
      :mini-variant="$store.state.miniVariant"
      :clipped="$store.state.clipped"
      :fixed="$store.state.fixedNav"
      app
      >

      <v-list dense>

        <v-list-tile>
          <v-list-tile-action>

            <v-btn
              icon
              @click.stop="$emit('toggleMiniVariant')"
              >

              <v-icon 
                v-html="$store.state.miniVariant ? 'chevron_right' : 'chevron_left'"
                >
              </v-icon>

            </v-btn>

          </v-list-tile-action>
        </v-list-tile>
        

        <template 
          v-for="(item, i) in $store.state.drawerItems" 
          >
          
          <v-divider v-if="item.divider"></v-divider>

          <v-layout
            row
            v-else-if="item.heading"
            align-center
            :key="item.heading"
            >

            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>

            <!-- <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex> -->

          </v-layout>

          <template v-else-if="item.children">

            <v-list-group
              v-model="item.model"
              :key="item.title"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon=""
              >

                <v-list-tile
                  slot="activator"
                  >
                  <v-list-tile-content>

                    <v-list-tile-title>
                      {{ $t(item.title, $store.state.locale ) }}
                    </v-list-tile-title>

                  </v-list-tile-content>
                </v-list-tile>

                <template v-for="(child, i) in item.children" >
                  
                  <v-list-tile
                    router
                    v-if="!child.needLogged && !child.hideWhenLogged && $store.state.auth.isLogged ||!child.needLogged && !$store.state.auth.isLogged || child.needLogged && $store.state.auth.isLogged && !child.hideWhenLogged" 
                    :key="i"
                    @click=""
                    :to="child.to"
                    >

                    <v-list-tile-action v-if="child.icon">
                      <v-icon small fab>{{ child.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ $t(child.title, $store.state.locale ) }}
                      </v-list-tile-title>
                    </v-list-tile-content>

                  </v-list-tile>

                </template>

            </v-list-group>
          </template>

          <v-list-tile 
              router
              v-else-if="item.to=='/logout' && !$store.state.auth.isLogged || item.to=='/login' && $store.state.auth.isLogged ? false : true" 
              @click="" 
              :key="item.title"
              :to="item.to"
              >

              <v-list-tile-action>
                <v-icon fab>{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>
                  {{ $t(item.title, $store.state.locale ) }}
                </v-list-tile-title>
              </v-list-tile-content>

          </v-list-tile>

          <!--
          <v-list-tile v-else @click="" :key="item.title">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ $t(item.title, $store.state.locale ) }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          -->


        </template>

        
      </v-list>




    </v-navigation-drawer>
    
</template>


<script>
export default {
  data () {
    return {
      // clipped: this.$store.state.clipped,
      // drawer: this.$store.state.drawer,
      // fixed: this.$store.state.fixed,
      // items : this.$store.state.items,
      // itemsMenu: [
      //   { icon: 'apps', title: 'Welcome', to: '/' },
      //   { icon: 'input', title: 'Login', to: '/login' },
      //   { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
      // ],
      // miniVariant: this.$store.state.miniVariant,
      // right: this.$store.state.right,
      // rightDrawer: this.$store.state.rightDrawer,
      // title: this.$store.state.title,
    }
  }
  // methods: {
  //   change_lang(new_locale) {
  //     console.log("change_lang / new_locale : ", new_locale ) ;
  //     this.$store.commit('SET_LANG', new_locale )
  //   },
  //   change_drawer() {
  //     this.$store.commit('set_drawer' )
  //   },
  //   change_clipped() {
  //     this.$store.commit('set_clipped' )
  //   },
  //   change_miniVariant() {
  //     this.$store.commit('set_miniVariant' )
  //   },
  //   change_rightDrawer() {
  //     this.$store.commit('set_rightDrawer' )
  //   },
  //   change_fixed() {
  //     this.$store.commit('set_fixed' )
  //   },
  //   change_right() {
  //     this.$store.commit('set_right' )
  //   },

  // },
}
</script>
