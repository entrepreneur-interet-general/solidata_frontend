<style scoped>

  th, td {
    border-right: thin dashed grey ;
    max-width: 220px; 
  }
  td .col-values {
    /* max-width: 190px;  */
    width: 210px; 
    overflow-y: hidden ;
    text-align : center ;
    display: inline-block;
    vertical-align: middle;
  }
  td .col-titles {
    /* max-width: 70px !important;  */
    width: 100px; 
    text-align : center ;
    vertical-align: middle;
    display: inline-block;
    /* overflow-y: hidden; */
  }
</style>


<template>

  <div>

    <!-- DSI DATA / CONTENTS -->
      <!-- :loading="loading" -->
    <v-data-table
      :ref="'datatable'"
      :headers="headers_preview"
      :items="item_data"
      :pagination.sync="pagination"
      :total-items="total_items"
      class="elevation-0 scroll_data"
      :rows-per-page-items="[5, 10, 25]"
      :hide-headers="isPreview"
      >

      <template 
        slot="items"
        slot-scope="props"
        >

        <!-- FIRST COLUMN -->
        <td 
          v-show="!isPreview"
          class="px-1"
          >
          <div class="col-titles">
            <v-icon
              small
              class="mr-1"
              @click="editItem(props.item)"
              >
              {{ $store.state.mainIcons.edit.icon }}
            </v-icon>
            <v-icon
              small
              class="mr-1"
              @click="editItem(props.item)"
              >
              {{ $store.state.mainIcons.view.icon }}
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
              >
              {{ $store.state.mainIcons.delete.icon }}
            </v-icon>
          </div>
        </td>

        <!-- CONTENT COLUMNS -->
        <td 
          v-for="header in headers_preview_but_first"
          :key="headers_preview_but_first.indexOf(header)"
          class="px-1"
          >
          <div class="col-values">
            {{ props.item[header.value] | truncate(30, ' ...') }}
          </div>
        </td>

      </template>
    
      <!-- <template slot="pageText" slot-scope="props">
        Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
      </template> -->

    </v-data-table>


    <!-- DEBUG -->
    <span v-if="$store.state.is_debug">

    </span>


    

  </div>

</template>


<script>

export default {

  props: [

    'isPreview',

    'item_data',

    'headers_preview',
    'headers_preview_but_first',

    'pagin',
    'total_items',

    'parent_scroll'

  ],

  components: {

  },

  created () {
    console.log('\n- viewEditDSI_table / created... ')

    this.pagination = this.pagin

    // add scroll event listener on datatable
    // detect scroll : cf : https://forum.vuejs.org/t/how-to-detect-body-scroll/7057/5
    // sync scroll : cf : https://github.com/asvd/syncscroll/blob/master/syncscroll.js
    var dataTable = this.$refs.datatable // ) ;
    // console.log("- viewEditDSI_table / then 1 - dataTable : ", dataTable ) ;

    if (dataTable !== undefined) {
      console.log('- viewEditDSI_table / then 2 - dataTable : ', dataTable)
      // component selector : https://forum.vuejs.org/t/help-with-selector/18652/11
      var dt = dataTable.$el.querySelector('.v-table__overflow')
      console.log('- viewEditDSI_table / then 3 - dt : ', dt)
      dt.addEventListener('scroll', this.onScroll)
      this.dataTable = dt
    }
  },

  data () {
    return {

      pagination: {},

      offsetTop: 0,
      offsetLeft: 0,
      dataTable: undefined

    }
  },

  computed: {

  },

  watch: {

    parent_scroll: {
      immediate: true,
      handler (newVal, oldVal) {
        if (this.dataTable !== undefined) {
          this.dataTable.scrollLeft = newVal
        }
      }
    },

    pagin: {
      immediate: true,
      handler (newVal, oldVal) {
        this.pagination = newVal
      }
    }

  },

  methods: {

    // SCROLLER
    onScroll (e) {
      // console.log("... onScroll - e.target : ", e.target ) ;
      var scrollData = e.target
      // this.offsetTop   = scrollData.scrollTop ;
      this.offsetLeft = scrollData.scrollLeft
      this.$emit('scrollTable', {
        left: scrollData.scrollLeft
      })
    },

    // EDIT ITEM
    editItem (row) {
      this.$emit('edit_row', row)
    },
    deleteItem (row) {
      this.$emit('delete_row', row)
    }

  }

}
</script>