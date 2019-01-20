<template>

  <v-toolbar 
    class="mt-0"
    dark 
    color="primary"
    fixed
    >

    <!-- SETTINGS ICON -->
    <v-icon>
      {{ $store.state.mainIcons.settings.icon }}
    </v-icon>

    <!-- DOC TITLE -->
    <v-toolbar-title>
      {{ itemDoc.infos.title }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- DOC TYPE ICON -->
    <v-icon>
      {{ $store.state.mainIcons[tab].icon }}
    </v-icon>

    <v-spacer></v-spacer>

    <v-switch 
      label="debug"
      v-model="$store.state.is_debug"
      color="error"
      :input-value="$store.state.is_debug"
      hide-details
      >
    </v-switch>

    <v-spacer></v-spacer>

    <!-- CLOSE ICON -->
    <v-toolbar-items>
      <v-btn 
        icon
        dark 
        flat
        @click="switchSettings"
        >
        <v-icon>
          {{ $store.state.mainIcons.close.icon }}
        </v-icon>
      </v-btn>
    </v-toolbar-items>

  </v-toolbar>


</template>

<script>

export default {

  props: [
    'itemDoc',
    'isSettings'
  ],

  created () {
    console.log('\n- viewEditDMT / created ---> item_doc : ', this.item_doc)
  },

  data () {
    return {

    }
  },

  computed: {

    tab () {
      return this.$store.state.collectionsNames[this.itemDoc.specs.doc_type]
    }

  },

  methods: {

    switchSettings () {
      // console.log("settingsToolbar - switchSettings / this.is_settings : ", this.is_settings )
      this.$emit('settings')
    }

  }
}
</script>


