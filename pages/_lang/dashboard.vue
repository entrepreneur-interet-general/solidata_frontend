<style scoped>



</style>

<template>

  <div>

    <v-tabs
      centered
      color="transparent"
      :fixed-tabs="!isMobile"
      class="align-center "
      height="60px"
      :active-class="'primary--text font-weight-black'"
      >
      <!-- icons-and-text -->

      <v-tabs-slider 
        color="primary"
        class=""
        >
      </v-tabs-slider>

      <!-- TABS HEAD -->
      <v-tab 
        v-for="(tab,i) in tabsList"
        :key="i"
        :to="'#'+tab"
        class="text-lowercase font-weight-thin body-2 "
        >

        <span
          v-if="!isMobile"
          
          >
          {{ $t( tab+'.name', $store.state.locale)  }}
        </span>

        <v-icon 
          v-else
          small
          >
          {{ tabs[tab]['icon'] }}
        </v-icon>

      </v-tab>


      <!-- TABS ITEMS CONTAINER -->
      <v-tab-item
        v-for="(tab,i) in tabsList"
        :value="tab"
        :key="i"
        class="mt-3"
        >

        <SectionTitle
          :title="$t(`${tab}.name`, $store.state.locale)"
          :intro="$t(`${tab}.intro`, $store.state.locale)"
          :icon="$store.state.mainIcons[tab].icon"
          :isDashboard="true"
          :to_link="'/'+coll(tab)"
          :tab="tab"
          :show_create="true"
        >
        </SectionTitle>

        <!-- TAB ITEMS SUBTITLE -->
        <!-- <v-container 
          v-if="$store.state.auth.isLogged"
          fluid 
          >

          <v-layout 
            row 
            align-center 
            spacer
            >
            <v-flex class="text-xs-center">
              <span class="headline">
                <span>{{ $t(tab+'.intro', $store.state.locale) }}</span>
              </span>
            </v-flex>
          </v-layout>
          
        </v-container> -->


        <!-- ITEMS LIST -->
        <ItemsListDI
          :tab="tab"
          :coll="coll(tab)"
          :items_coll="items[tab]"
          >
        </ItemsListDI>
        

      </v-tab-item>

    </v-tabs>

  </div>

</template>



<script>

import ItemsListDI from '~/components/UI/itemsList_dataIterator.vue'
import SectionTitle from '~/components/UI/sectionTitle.vue'

export default {
  components: {
    ItemsListDI,
    SectionTitle
  },

  middleware: ['getListItems'],
  meta: {
    collection: [
      'prj',
      'dsi',
      'dmt',
      'dmf',
      'tag',
      'rec'
    ],
    level: 'get_list'
  },

  computed: {

    tabs () { return this.$store.state.mainIcons },

    items () {
      return {
        projects: this.$store.state.prj.list,
        datasets: this.$store.state.dsi.list,
        datamodels: this.$store.state.dmt.list,
        datamodel_fields: this.$store.state.dmf.list,
        tags: this.$store.state.tag.list
      }
    }

  },

  mounted () {
    console.log('dashboard / mounted ---> items... ', this.items)
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },

  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },

  data () {
    return {

      isMobile: false,

      defaultHeightAdd: '240px',
      defaultHeight: '150px',
      defaultFlex: 3,
      tabsList: [
        'projects',
        'datasets',
        'datamodels',
        'datamodel_fields',
        'tags'
      ]
    }
  },

  methods: {

    onResize () {
      this.isMobile = window.innerWidth < 800
    },

    goToCreate (event, data) {
      console.log('goToCreate : ', data)
    },

    coll (tab) {
      console.log('get coll ... tab : ', tab)
      return this.$store.state.mainIcons[tab].abr
    }

  }

  // fetch ({ store, params }) {

  //  console.log("- - - Fetch from page : getListItems.js ...") ;

  //  // dispatch action to get prj
  //  return store.dispatch('prj/getList' )
  //   .then(reponse => {
  //    console.log("dispatch prj / ok..." ) ;
  //    // this.alert = {type: 'success', message: reponse.msg}
  //   })
  //   .catch(error => {
  //    console.log("dispatch prj / error..." ) ;
  //    console.log("... error : ", error ) ;

  //    if (error.response && error.response.data) {
  //     // store.state.prj.alert = { type: 'error', message : error } ;
  //     store.state.prj.alert = { type: 'error', message: error.response.data.msg || error.reponse.status } ;
  //     // this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
  //    }
  //   })

  //  // dispatch action to get prj
  //  store.dispatch('dmt/getList' )
  //   .then(reponse => {
  //    console.log("dispatch dmt / ok..." ) ;
  //    // this.alert = {type: 'success', message: reponse.msg}
  //   })
  //   .catch(error => {
  //    console.log("dispatch dmt / error..." ) ;
  //    console.log("... error : ", error ) ;

  //    if (error.response && error.response.data) {
  //     // store.state.dmt.alert = { type: 'error', message : error } ;
  //     store.state.dmt.alert = { type: 'error', message: error.response.data.msg || error.reponse.status } ;
  //     // this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
  //    }
  //   })

  //  // dispatch action to get prj
  //  store.dispatch('dsi/getList' )
  //  .then(reponse => {
  //   console.log("dispatch dsi / ok..." ) ;
  //   // this.alert = {type: 'success', message: reponse.msg}
  //  })
  //  .catch(error => {
  //   console.log("dispatch dsi / error..." ) ;
  //   console.log("... error : ", error ) ;

  //   if (error.response && error.response.data) {
  //    // store.state.dsi.alert = { type: 'error', message : error } ;
  //    store.state.dsi.alert = { type: 'error', message: error.response.data.msg || error.reponse.status } ;
  //    // this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
  //   }
  //  })

  //  // dispatch action to get prj
  //  store.dispatch('tag/getList' )
  //  .then(reponse => {
  //   console.log("dispatch tag / ok..." ) ;
  //   // this.alert = {type: 'success', message: reponse.msg}
  //  })
  //  .catch(error => {
  //   console.log("dispatch tag / error..." ) ;
  //   console.log("... error : ", error ) ;

  //   if (error.response && error.response.data) {
  //    // store.state.tag.alert = { type: 'error', message : error } ;
  //    store.state.tag.alert = { type: 'error', message: error.response.data.msg || error.reponse.status } ;
  //    // this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
  //   }
  //  })

  // },

  // asyncData (context) {
  //  console.log("- - - AsyncData : getListItems.js ...") ;
  // }

}
</script>
