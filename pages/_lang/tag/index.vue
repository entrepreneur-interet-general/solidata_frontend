<template>

  <v-jumbotron 
    class="pa-0" 
    color="primary" 
    dark 
    :height="$store.state.mainSectionsHeight"
    >
      
    <SectionTitle
      :title="$t('tags.name', $store.state.locale)"
      :intro="$t('tags.intro', $store.state.locale)"
      :icon="$store.state.mainIcons.tags.icon"
    >
    </SectionTitle>

  </v-jumbotron>
  
</template>



<script>
import SectionTitle from '~/components/UI/sectionTitle.vue'

export default {
  components : {
    SectionTitle
  },
  // middleware : [""],

  data () {
    return {
    }
  },

  methods: {
  },

}

</script>
