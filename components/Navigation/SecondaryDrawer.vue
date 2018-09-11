<template>
    <v-navigation-drawer
      temporary
      :right="$store.state.right"
      v-model="$store.state.rightDrawer"
      :fixed="$store.state.fixedNav"
    >
      <v-list>
        <v-list-tile @click.native="$emit('toggleRight')">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>


<script>
export default {
    data () {
        return {
            // fixed : true,
        }
    },
    // methods: {

    //   change_right() {
    //     this.$store.commit('set_right' )
    //   },

    // }, 
}
</script>
