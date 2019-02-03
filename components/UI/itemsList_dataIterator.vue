<template>

  <v-card 
    :class="classMainCard"
    >


    <!-- DEBUG -->
    <v-card-text 
      v-if="$store.state.is_debug"
      >
      - tab : <code> {{ tab }} </code><br>
      - coll : <code> {{ coll }} </code><br>
      - add_to_parent : <code> {{ add_to_parent }} </code><br>
      - parentDoc_id : <code> {{ parentDoc_id }} </code><br>
      - parentDoc_coll : <code> {{ parentDoc_coll }} </code><br>
      - items_in_parent : <code> {{ items_in_parent }} </code><br>
      <!-- - items_coll : <code> {{ items_coll }} </code><br> -->
    </v-card-text>


    <v-container 
      fluid grid-list-md
      pt-4
      >

      <!-- SEARCH CARD -->
      <v-layout 
        row
        wrap
        :class="classPaddingBottomSearch"
        align-center
        >
       
        <v-flex 
          xs10 sm8 md6 lg6
          >
  
          <!-- - itemsTitlesList : {{ itemsTitlesList }} -->
          <!-- - coll : {{ coll }} -->
          <!-- - tab : {{ tab }} -->

          <!-- AUTOCOMPLETE COMPONENT -->
          <v-card
            class="elevation-0"
            color="white"
            height=""
            >

            <v-card-text
              class="py-1 "
              >

              <v-autocomplete
                v-model="searchString"
                :items="itemsTitlesList"
                :label="$t(`global.search`, $store.state.locale) + ' - ' + $t(`${tab}.name`, $store.state.locale)"
                persistent-hint
                prepend-icon="search"
                class="ma-0"
                flat
                solo
                clearable
                hide-no-data
                hide-details
                >

              </v-autocomplete>
            </v-card-text>
          </v-card>

        </v-flex>

        <v-flex
          xs2  sm4  md4 offset-md2  lg3 offset-lg3
          text-xs-center
          >

          <BtnCreate
            v-if="$store.state.auth.isLogged"
            :is_icon="false"
            :tab="tab"
            :color="'primary'"
            :btn_class="'primary'"
            :is_block="false"
            :outline="true"
            :large="true"
            :flat="true"
            >
          </BtnCreate>

        </v-flex>

      </v-layout>


      <!-- PREVIEW CARDS - IS IN TEAM -->
      <v-data-iterator
        v-if="itemsIn != null"
        :items="itemsList('inTeam')" 

        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"

        content-tag="v-layout"
        row
        wrap
        >

        <!-- data iterator title -->
        <v-toolbar
          v-if="!add_to_parent"
          dense
          slot="header"
          class="mb-0 pb-0"
          color="transparent"
          flat
          >

          <v-toolbar-title
            class="body-2 grey--text"
            >
            <!-- - {{ coll }} - {{ tab }} -  -->
            <!-- - {{ parentDoc_id }} -  -->
            <!-- {{ $t( tab+'.name', $store.state.locale)  }}
            -  -->
            {{ $t(`global.inTeam`, $store.state.locale) }}
          </v-toolbar-title>

        </v-toolbar>


        <!-- data iterator cards -->
        <v-flex
          slot="item"
          slot-scope="props"
          :class="cardSizes"
          mb-4
          >

          <CardPreviewDense 
            :coll="coll"
            :tab="tab"
            :item="props.item"
            :inTeam="'yes'"

            :add_to_parent="add_to_parent"
            :parentDoc_id="parentDoc_id"
            :parentDoc_coll="parentDoc_coll"
            :is_in_parent="is_in_parent(props.item._id)"

            @update_parent_dataset="updateParentDatasetList"
            >
          </CardPreviewDense>

        </v-flex>


      </v-data-iterator>


      <!-- PREVIEW CARDS - NOT IN TEAM -->
      <v-data-iterator
        v-if="itemsNot != null"
        :items="itemsList('notTeam')" 
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        content-tag="v-layout"
        row
        wrap
        >

        <!-- data iterator title -->
        <v-toolbar
          v-if="!add_to_parent"
          dense
          slot="header"
          class="mb-0 pb-0"
          color="transparent"
          flat
          >

          <v-toolbar-title
            class="body-2 grey--text"
            >
            {{ $t(`global.notTeam`, $store.state.locale) }}

          </v-toolbar-title>

        </v-toolbar>


        <!-- data iterator cards -->
        <v-flex
          slot="item"
          slot-scope="props"
          :class="cardSizes"
          mb-4
          >

          <CardPreviewDense 
            :coll="coll"
            :tab="tab"
            :item="props.item"
            :inTeam="'no'"

            :add_to_parent="add_to_parent"
            :parentDoc_id="parentDoc_id"
            :is_in_parent="is_in_parent(props.item._id)"

            @update_parent_dataset="updateParentDatasetList"
            >
          </CardPreviewDense>

          <!-- <template slot="pageText" slot-scope="props">
            Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
          </template> -->


        </v-flex>



      </v-data-iterator>


    </v-container>

  </v-card>

</template>


<script>

// import BtnCreate from '~/components/UI/btnCreate.vue'

// import CardPreviewDense from '~/components/UI/cardPreview_dense.vue'

export default {

  props: [

    'items_coll',
    'tab',
    'coll',

    'no_margin',

    // props to add item to parent
    'add_to_parent',
    'parentDoc_id',
    'parentDoc_coll',
    'items_in_parent'

  ],

  components: {
    // CardPreviewDense
    // BtnCreate
  },

  created () {
    this.$store.state.LOG && console.log('\n itemList_dataIterator / col : ', this.coll)
    this.$store.state.LOG && console.log('itemList_dataIterator / items_in_parent : \n', this.items_in_parent)
  },

  data () {
    return {

      // ITEMS
      // itemsIn  : this.items_coll['docs_user_is_in_team'],
      // itemsNot  : this.items_coll['docs_user_not_in_team'],

      // MAIN CARD SIZE
      with_margin: 'grey lighten-3 elevation-0 mb-5 mx-5 px-3',
      with_no_margin: 'grey lighten-3 elevation-0 mt-1 mx-0 px-3',

      with_padding: 'pb-2 mb-1',
      with_no_padding: 'pb-2 mb-2',

      // CARDS SIZES
      // cardSizes : "xs12 sm6 md4 l4",
      cardSizes: this.$store.state[this.coll].parameters.cardSizes,

      // SEARCH BAR
      isEditing: false,
      searchString: null,

      // PAGINATION DATA ITERATOR
      rowsPerPageItems: this.$store.state[this.coll].rowsPerPageItems,
      pagination: this.$store.state[this.coll].pagination

    }
  },

  watch: {

    // items_in_parent : {

    //  immediate : true,
    //  handler (newVal, oldVal ) {
    //   this.$store.state.LOG && console.log("~ watch ItemsList_DI / items_in_parent - newVal : ", newVal )
    //  }

    // }
  },

  computed: {

    itemsIn  () {
      var inTeamList = this.items_coll['docs_user_is_in_team']
      this.$store.state.LOG && console.log('~ ItemsList_DI / items_in_parent - newVal : ', inTeamList)
      // if (inTeamList !== undefined && inTeamList.length !== 0) {
      //   return inTeamList// .sort((a, b) => a.infos.title.toUpperCase().localeCompare( b.infos.title.toUpperCase() ) )
      // } else {
      //   return inTeamList
      // }
      return inTeamList
    },

    itemsNot  () {
      var notTeam = this.items_coll['docs_user_not_in_team']
      // if (notTeam !== undefined && notTeam.length !== 0) {
      //   return notTeam// .sort((a, b) => a.infos.title.toUpperCase().localeCompare( b.infos.title.toUpperCase() ) )
      // } else {
      //   return notTeam
      // }
      return notTeam
    },

    itemsTitlesList () {
      // get all docs' titles to fill autoplete

      var titlesList = []
      // const itemsIn  = this.items_coll['docs_user_is_in_team'] ;
      // const itemsNot  = this.items_coll['docs_user_not_in_team'] ;

      if (this.itemsIn != null) {
        for (let doc in this.itemsIn) {
          titlesList.push(this.itemsIn[doc].infos.title)
        }
      };
      if (this.itemsNot != null) {
        for (let doc in this.itemsNot) {
          titlesList.push(this.itemsNot[doc].infos.title)
        }
      };

      return titlesList // .sort( (a,b) => a.localCompare(b) )
    },

    classMainCard () {
      return (this.no_margin) ? this.with_no_margin : this.with_margin
    },

    classPaddingBottomSearch () {
      return (this.no_margin) ? this.with_no_padding : this.with_padding
    }

  },

  methods: {

    is_in_parent (itemId) {
      this.$store.state.LOG && console.log('\n-- is_in_parent ...')
      var isInArray = false
      const coll = this.coll

      // this.$store.state.LOG && console.log("\n-- is_in_parent ... this.items_in_parent : ", this.items_in_parent ) ;
      // this.$store.state.LOG && console.log("-- is_in_parent ... coll (A) : ", coll ) ;

      if (this.items_in_parent) {
        // this.$store.state.LOG && console.log("-- is_in_parent ... itemId : ", itemId ) ;
        const checkInArray = obj => obj['oid_' + coll] === itemId
        isInArray = this.items_in_parent.some(checkInArray)
      }

      return isInArray
    },

    itemsList (inOut) {
      // this.$store.state.LOG && console.log("-- itemsInList ..." ) ;
      // this.$store.state.LOG && console.log("-- itemsInList / inOut : ", inOut) ;

      const searchStr = this.searchString

      let itemsList = (inOut === 'inTeam') ? this.itemsIn : this.itemsNot

      if (searchStr !== null) {
        // this.$store.state.LOG && console.log("-- itemsInList / searchStr : ", searchStr) ;
        // this.$store.state.LOG && console.log("-- itemsInList / itemsList : ", itemsList) ;
        // for (var d in itemsList){
        //  this.$store.state.LOG && console.log("itemsList[d] : ", itemsList[d] )
        // }

        itemsList = itemsList.filter(function (item) {
          // this.$store.state.LOG && console.log("-- itemsInList / item : ", item) ;
          return (item.infos.title.includes(searchStr))
        })
      };

      // NOT WORKING ...
      // if ( itemsList.length != 0 ) {
      //  this.$store.state.LOG && console.log("-- itemsInList / itemsList : ", itemsList) ;
      //  itemsList.sort((a, b) => a.infos.title.toUpperCase().localeCompare( b.infos.title.toUpperCase() ) )
      // }

      // this.$store.state.LOG && console.log("-- itemsInList / itemsList : ", itemsList) ;
      return itemsList
    },

    updateParentDatasetList (input) {
      this.$store.state.LOG && console.log('updateParentDatasetList / input : ', input)
      this.$emit('update_parent_dataset', input)
    }

  }

}
</script>