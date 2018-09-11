<template>

  <v-jumbotron 
    class="pa-0" 
    color="primary" 
    dark 
    :height="$store.state.mainSectionsHeight"
    >
      
    <SectionTitle
      :title="$t('datasets.name', $store.state.locale)"
      :intro="$t('datasets.intro', $store.state.locale)"
      :icon="'fas fa-database'"
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
