<template>

  <v-jumbotron 
    class="pa-0" 
    color="primary" 
    dark 
    :height="$store.state.mainSectionsHeight"
    >
  
    <SectionTitle
      :title="$t('projects.name', $store.state.locale)"
      :intro="$t('projects.intro', $store.state.locale)"
      :icon="'fas fa-project-diagram'"
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
