<template>

  <v-card 
    v-show="!is_preview"
    class="grey lighten-3 elevation-0 mt-0 pa-4 "
    
    >

    <!-- is_preview - {{ is_preview }} -->

    <!-- DOC LOG + USES -->
    <v-layout 
      row 
      wrap 
      align-center 
      text-xs-center
      >
      
      <!-- LOG / created_by-->
      <v-flex xs4>
        created_by - {{ item_doc.log.created_by }}
      </v-flex>

      <!-- LOG / created_at-->
      <v-flex xs4>
        created_at - {{ item_doc.log.created_at | date_str }}
      </v-flex>

      <!-- USES -->
      <v-flex xs4>
        uses - {{ item_doc.uses }}
      </v-flex>

    </v-layout>


  </v-card>
  
</template>


<script>

export default {

  props: [
    'coll',
    'is_create', // view | create
    'is_preview', //
    'item_doc' // complete item infos
  ],

  components: {

  },

  mounted () {
    console.log('\n- itemDocUses / created ---> item_doc : ', this.item_doc)
    this.itemDoc = this.item_doc
  },

  data () {
    return {

      collName: this.$store.state.collectionsNames[this.coll],

      itemId: this.item_doc._id,
      itemDoc: this.item_doc

    }
  },

  computed: {

  },

  watch: {

  },

  methods: {

  }

}
</script>