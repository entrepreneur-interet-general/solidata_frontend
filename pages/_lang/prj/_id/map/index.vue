<template>

  <div>

    <SectionTitle
      v-if="$store.state.auth.isLogged"
      :title="$t(`${tab}.name`, $store.state.locale)"
      :intro="$t(`${tab}.edit`, $store.state.locale)"
      :icon="$store.state.mainIcons[tab]['icon']"
      :to_link="'/dashboard'"
      :color="''"
      :tab="tab"
      >
    </SectionTitle>

    <SectionTitle
      v-else
      :title="$t(`${tab}.name`, $store.state.locale)"
      :intro="$t(`${tab}.introAnon`, $store.state.locale)"
      :icon="$store.state.mainIcons[tab].icon"
      :color="''"
      :tab="tab"
      >
    </SectionTitle>


    <v-layout mx-5 px-4 pb-5 pt-0>
      <v-flex xs12>
        <v-card flat color="grey lighten-3">


        </v-card>
      </v-flex>
    </v-layout>

  </div>

  
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
    collection: 'dso',
    level: 'get_one' // get_map
  },

  data () {
    return {
      coll: 'prj',
      tab: 'projects'

    }
  },

  methods: {
  }

}
</script>
