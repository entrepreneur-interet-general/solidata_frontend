<template>

  <v-jumbotron 
    class="pa-0" 
    color="primary" 
    dark 
    :height="$store.state.mainSectionsHeight"
    >
      
    <SectionTitle
      :title="$t('recipes.title', $store.state.locale)"
      :intro="$t('recipes.intro', $store.state.locale)"
      :icon="$store.state.mainIcons.recipes.icon"
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
