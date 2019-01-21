<template>

  <div>

    
    <SectionTitle
      v-if="$store.state.auth.isLogged"
      :title="$t(`${tab}.name`, $store.state.locale)"
      :intro="$t(`${tab}.intro`, $store.state.locale)"
      :icon="$store.state.mainIcons[tab].icon"
      :to_link="'/dashboard'"
      :tab="tab"
      :show_create="true"
      >
    </SectionTitle>

    <SectionTitle
      v-else
      :title="$t(`${tab}.name`, $store.state.locale)"
      :intro="$t(`${tab}.introAnon`, $store.state.locale)"
      :icon="$store.state.mainIcons[tab].icon"
      :tab="tab"
      >
    </SectionTitle>
  

    <v-card>
      
      <v-container
        fluid
        grid-list-md
      >
        <v-layout row wrap>

          <!-- CREATE CARD IF LOGGED GUEST -->
          <CardCreate
            v-if="$store.state.auth.isLogged"
            :tab="tab"
            :defaultFlex="defaultFlex"
            :defaultHeight="defaultHeightAdd"
            >
          </CardCreate>
        
          <!-- PREVIEW CARDS IS IN TEAM -->
          <CardPreviewDense 
            v-for="(card,i) in items.docs['docs_user_is_in_team']"
            :key="i"
            :index="i"
            :tab="tab"
            :item="card"
            :inTeam="'yes'"
            :defaultFlex="defaultFlex"
            :defaultHeight="defaultHeight"
            >
          </CardPreviewDense>
          
          
          <!-- PREVIEW CARDS NOT IN TEAM -->
          <CardPreviewDense 
            v-for="(card,i) in items.docs['docs_user_not_in_team']"
            :key="i"
            :index="i"
            :tab="tab"
            :item="card"
            :inTeam="'no'"
            :defaultFlex="defaultFlex"
            :defaultHeight="defaultHeight"
            >
          </CardPreviewDense>

        </v-layout>
      </v-container>
    </v-card>

  
  </div>

</template>



<script>
// import ItemsList from '~/components/UI/itemsList.vue'
// import SectionTitle from '~/components/UI/sectionTitle.vue'
// import CardPreview from '~/components/UI/cardPreview.vue'
import CardCreate from '~/components/UI/cardCreate.vue'

export default {

  components: {
    // SectionTitle,
    // CardPreview,
    CardCreate
  },

  middleware: ['getListItems'],
  meta: {
    collection: ['rec', 'tag'],
    level: 'get_list'
  },

  computed: {

    items () {
      return {
        docs: this.$store.state.rec.list
      }
    }

  },

  mounted () {
    console.log('\n- dashboard / mounted ---> tab... ', this.tab)
    console.log('- dashboard / mounted ---> items... ', this.items)
  },

  data () {
    return {

      coll: 'rec',
      tab: 'recipes',

      defaultHeightAdd: '240px',
      defaultHeight: '150px',
      defaultFlex: 2
    }
  },

  methods: {
  }

}
</script>
