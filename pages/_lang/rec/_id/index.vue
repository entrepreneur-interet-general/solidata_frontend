<template>

  
  <SectionTitle
    :title="$store.state.rec.current.infos.title"
    :intro="$store.state.rec.current.infos.description"
    :icon="$store.state.mainIcons.recipes.icon"
    :tab="tab"
    >
  </SectionTitle>




  
</template>



<script>
// import SectionTitle from '~/components/UI/sectionTitle.vue'

export default {
  components: {
    // SectionTitle
  },

  // add var-arg to middleware with meta
  // cf : https://github.com/nuxt/nuxt.js/issues/1687#issuecomment-331870619
  middleware: ['getItem'],
  meta: {
    collection: 'rec',
    level: 'get_one'
  },

  data () {
    return {
      coll: 'rec',
      tab: 'recipes'
    }
  },

  methods: {
  }

}
</script>
