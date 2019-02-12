<template>

  <div>

    <v-hover
      :disabled="no_hover"
      >

      <v-card
        flat
        slot-scope="{ hover }"
        :class="`${ no_hover ? '': 'pa-0 mr-4'} elevation-${hover ? 5 : 0 }`"
        :color="`${is_in_parent ? 'grey lighten-2' : 'white' }`"
        :style="{ cursor: 'pointer'}"
        @click="itemClickBehaviour()"
        >

        <!-- ITEM TITLE -->
        <v-responsive 
          flat 
          dense
          :height="height_title"
          >

          <v-expand-transition>
            <v-layout align-center fill-height ma-0
              v-if="hover"
              :class="`${is_in_parent ? 'accent' : 'primary' } d-flex px-1 py-2 transition-fast-in-fast-out font-italic text-xs-center white--text`"
              style="height: 100%;"
              >

              <!-- PREVIEW / EDIT -->
              <strong v-if="!add_to_parent">
                {{ $t( `${tab}.edit` , $store.state.locale) }}
              </strong>

              <!-- ADD TO PARENT -->
              <strong v-else>

                <v-icon 
                  v-if="!is_in_parent" 
                  dark
                  >
                  {{ $store.state.mainIcons.create.icon }}
                </v-icon>
                <v-icon 
                  v-else 
                  dark
                  >
                  {{ $store.state.mainIcons.infos.icon }}
                </v-icon>

                <br>

                <span v-if="!is_in_parent">
                  {{ $t( `${tab}.singular` , $store.state.locale) }}
                </span>
                <span v-else>
                  {{ $t( `global.doc_used` , $store.state.locale) }}
                </span>

              </strong>

            </v-layout>
          </v-expand-transition>

          <v-layout align-center fill-height ma-0>
            <v-card-text 
              :class="`px-1 py-2 ${hover ? 'grey' : 'black' }--text`"
              >
              <p class="text-xs-center subheading font-weight-bold ma-0">
                {{ item.infos.title | truncate( 40, '...' )}}
              </p>
            </v-card-text>
          </v-layout>
          
        </v-responsive>


        <v-divider ></v-divider>


        <!-- FLOATING BTN -->
        <v-btn
          fab
          small
          flat
          :class="`${ hover ? ( is_in_parent ? 'accent' : 'primary') : ( is_in_parent ? 'grey lighten-1' : 'secondary') } `"
          bottom
          right
          absolute
          style="z-index:0"
          >
          <v-icon
            :color="`${is_in_parent ? 'white' : '' }`"
            >
            {{ $store.state.mainIcons[tab].icon }}
          </v-icon>
        </v-btn>


        <!-- DEBUG -->
        <v-card-text 
          v-if="$store.state.is_debug"
          >
          - item._id : <code> {{ item._id }} </code> <br>
          - coll : <code> {{ coll }} </code> <br>
          - addDeleteFromParentlist : <code> {{ addDeleteFromParentlist }} </code> <br>
          - add_to_parent : <code> {{ add_to_parent }} </code> <br>
          - parentDoc_id : <code> {{ parentDoc_id }} </code><br>
          - parentDoc_coll : <code> {{ parentDoc_coll }} </code><br>
          - is_in_parent : <code> {{ is_in_parent }} </code>
          <v-divider ></v-divider>
        </v-card-text >


        <!-- OPEN LEVEL EDIT -->
        <v-card-text 
          v-if="!denser"
          :class="`${ (coll==='tag') ? 'px-2 pb-4 pt-2 ' : 'pa-2 '} text-xs-center`"
          >
          <v-icon 
            small
            left
            >
            {{ $store.state.mainIcons.edit.icon }}
          </v-icon>
          {{ item.public_auth.open_level_edit }}
        
        
        </v-card-text>

        <v-divider v-if="!denser && coll!=='tag'" ></v-divider>

        <!-- if - PRJ / DSI / DMT -->
        <div
          v-if="!not_main_colls.includes(coll)"
          >

          <v-responsive
            :height="height_main_coll_content"
            >
            <v-card-text 
              :class="`mx-2 ${hover ? 'font-weight-black primary--text' : '' }`"
              >
              <p>{{ item.infos.description | truncate(100, '...') }}</p>
            </v-card-text>
          </v-responsive>

          <v-divider ></v-divider>

          <v-card-text 
            class="pa-2 text-xs-center"
            >
            <v-icon 
              small
              left
              >
              {{$store.state.mainIcons.view.icon}}
            </v-icon>
            {{ item.public_auth.open_level_show }}
          </v-card-text>

          <v-divider ></v-divider>


          <!-- STATS - DMT -->
          <v-card-text 
            v-if="coll=='dmt'"
            class="pa-2 text-xs-center"
            >
            <strong>{{ item.datasets.dmf_list.length }} </strong>
            <span>{{ $t(`datamodel_fields.name`, $store.state.locale) }}</span>
          </v-card-text>

          <!-- STATS - DSI -->
          <div
            v-if="coll=='dsi'"
            >

            <v-card-text 
              class="pa-2 text-xs-center"
              >
              <strong>{{ item.stats.f_data_count }} </strong>
              <span>{{ $t(`datasets.f_data`, $store.state.locale) }}</span>
            </v-card-text>

            <v-divider ></v-divider>

            <v-card-text 
              class="pa-2 text-xs-center"
              >
              <strong>{{ item.stats.f_col_headers_count }} </strong>
              <span>{{ $t(`datasets.f_col_headers`, $store.state.locale) }}</span>
            </v-card-text>

          </div>

          <!-- STATS - PRJ -->
          <div
            v-if="coll=='prj'"
            >

            <!-- DMT NAME -->
            <v-card-text 
              class="pa-2 text-xs-center"
              >
              <v-icon 
                small
                left
                >
                {{$store.state.mainIcons.datamodels.icon}}
              </v-icon>

              <!-- <div class="caption"> -->
                {{ findItemName( "dmt", item.datasets.dmt_list ) | truncate( 12, '...') }}
              <!-- </div> -->

            </v-card-text>

            <v-divider ></v-divider>

            <!-- NUMBER OF DSI IN PRJ -->
            <v-card-text 
              class="pa-2 text-xs-center"
              >
              <strong>{{ item.stats.dsi_count }} </strong>
              <span>{{ $t(`projects.dsi`, $store.state.locale) }}</span>
            </v-card-text>

          </div>

        </div>


        <!-- if - DMF  -->
        <div
          v-if="coll=='dmf'"
          >

          <v-responsive
            text-xs-center
            class="mx-0 py-1"
            absolute
            >

            <v-card-text 
              class="pa-0" 
              >

              <v-list dense two-line class="ma-0 transparent">

                <v-list-tile
                  v-if="!denser"
                  >

                  <v-list-tile-content>
                    <v-list-tile-sub-title>
                      {{ $t(`global.f_code`, $store.state.locale) }}
                    </v-list-tile-sub-title>
                    <v-list-tile-title 
                      :class="`${hover ? ( is_in_parent ? 'accent' : 'primary') : 'black' }--text ${hover ? 'font-weight-black' : '' }`"
                      >
                      {{ item.data_raw.f_code}}
                    </v-list-tile-title>
                  </v-list-tile-content>

                </v-list-tile>

                <v-divider v-if="!denser" class=""></v-divider>

                <v-list-tile >

                  <v-list-tile-content>
                    <v-list-tile-sub-title>
                      {{ $t(`global.f_type`, $store.state.locale) }}
                    </v-list-tile-sub-title>
                    <v-list-tile-title>
                      {{ item.data_raw.f_type}}
                    </v-list-tile-title>
                  </v-list-tile-content>

                </v-list-tile>

              </v-list>

            </v-card-text>

          </v-responsive>

        </div>

        <!-- if - TAG  -->
        <!-- <div
          v-if="coll=='tag'"
          >
          <v-responsive
            text-xs-center
            class="my-0"
            absolute
            >

          </v-responsive>

        </div> -->

      </v-card>
    


    </v-hover>

  </div>

</template>


<script>

export default {

  props: [

    'coll',
    'tab',
    'item',
    'index',
    'inTeam',

    'denser',

    'add_to_parent',
    'parentDoc_coll',
    'parentDoc_id',
    'is_in_parent',

    'no_hover'

  ],

  data () {
    return {

      loading: false,
      alert: '',

      not_main_colls: ['dmf', 'tag'],

      height_footer: '0px',
      height_main_coll_content: '90px',

      addDeleteFromParentlist: 'add_to_list'

      // direction: 'left',
      // fab: false,
      // fling: false,
      // tabs: null,
      // transition: 'slide-y-reverse-transition'

    }
  },

  computed: {

    is_main_coll () {
      return (this.not_main_colls.includes(this.coll)) ? 'body-2' : 'subheading'
    },

    height_title () {
      return (this.not_main_colls.includes(this.coll))
        ? ((this.coll === 'tag') ? '75px' : '100px') : '70px'
    },

    activeFab () {
      switch (this.tabs) {
        case 'one': return { 'class': 'purple', icon: 'account_circle' }
        case 'two': return { 'class': 'red', icon: 'edit' }
        case 'three': return { 'class': 'green', icon: 'keyboard_arrow_up' }
        default: return {}
      }
    }

  },

  methods: {

    findItemName (coll, itemId) {
      // this.$store.state.LOG && console.log("\n findItemName - itemId : ", itemId )

      let itemId_

      if (itemId.length === 0 || itemId === undefined) {
        return 'no dmt'
      } else {
        itemId_ = itemId[0].oid_dmt
        var teamKey = this.inTeam === 'yes' ? 'docs_user_is_in_team' : 'docs_user_not_in_team'
        const itemsArray = this.$store.state[coll].list[teamKey]

        if (itemsArray && itemId_ !== undefined) {
          // this.$store.state.LOG && console.log("findItemName / itemsArray : \n", itemsArray )
          var obj = itemsArray.find(o => o._id === itemId_)
          // this.$store.state.LOG && console.log("findItemName / obj.infos.title :", obj.infos.title )
          return obj.infos.title
        } else {
          return '...loading...'
        }
      }
    },

    itemClickBehaviour () {
      this.$store.state.LOG && console.log('itemClickBehaviour...')

      if (this.add_to_parent && !this.is_in_parent) {
        this.$store.state.LOG && console.log('itemClickBehaviour / add_to_parent...')

        // send data back to parent component
        this.$store.state.LOG && console.log('itemClickBehaviour / emit...')

        var input = {
          add_or_delete: this.addDeleteFromParentlist,
          item_id_to_add: this.item._id,
          datasets_coll: this.coll,
          parentDoc_coll: this.parentDoc_coll
        }
        this.$store.state.LOG && console.log('itemClickBehaviour / input : ', input)

        this.$emit('update_parent_dataset', input)
      } else if (this.add_to_parent && this.is_in_parent) {
        this.$store.state.LOG && console.log('itemClickBehaviour / already used...')
        this.$store.commit(`set_alert`, this.$t('datamodel_fields.used', this.$store.state.locale))
      } else {
        this.$store.state.LOG && console.log('itemClickBehaviour / go to edit item...')

        // redirect to edit-preview page
        return this.$router.push(`/${this.coll}/${this.item._id}`)
      }
    }

  }

}
</script>