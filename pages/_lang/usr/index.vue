<template>

  <v-jumbotron 
    class="pa-0" 
    color="primary" 
    dark 
    :height="$store.state.mainSectionsHeight"
    >
      
    <SectionTitle
      :title="$t('users.name', $store.state.locale)"
      :intro="$t('users.intro', $store.state.locale)"
      :icon="$store.state.mainIcons.users.icon"
      :to_link="'/dashboard'"
    >
    </SectionTitle>

  </v-jumbotron>
  
</template>



<script>
// import SectionTitle from '~/components/UI/sectionTitle.vue'

export default {

  components: {
    // SectionTitle
  },

  middleware: ['getListItems'],
  meta: {
    collection: ['usr'],
    level: 'get_list'
  },

  computed: {

    items () {
      return {
        docs: this.$store.state.tag.list
      }
    }

  },

  mounted () {
    console.log('dashboard / mounted ---> items... ', this.items)
  },

  data () {
    return {
    }
  },

  methods: {
  }

}
</script>
