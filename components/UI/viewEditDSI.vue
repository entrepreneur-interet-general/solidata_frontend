<style scoped>

  /* .v-expansion-panel__header {
    padding:0; 
  } */

  th, td {
    border-right: thin solid #eee ;
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

    <!-- IF NO ITEMDOC -->
    <v-layout 
      v-if="!itemDoc_loaded"
      row 
      wrap
      >
      <v-flex xs12>

        <v-card
          flat
          class="pa-4 text-xs-center"
          >

          <!-- <v-card-text>
            no_DSI in VE DSI
          </v-card-text> -->

          <v-progress-circular
            color="accent"
            indeterminate
            >
          </v-progress-circular>
          
        </v-card>
      </v-flex>

    </v-layout>

    

      <!-- v-if="itemDoc_loaded" -->
    <v-container 
      v-else
      grid-list-sm 
      fluid
      :class="`${ !no_toolbar ? 'pa-3' : 'pa-0'}`"
      >
      

      <!-- DSI TOOLBAR -->
      <template v-if="!no_toolbar">

        <v-layout 
          v-if="!isPreview || is_create || is_switch"
          row 
          wrap 
          mb-3
          >

          <v-flex xs12>

            <ItemToolbar
              :coll="coll" 
              :collName="collName" 
              :itemDoc="itemDoc"
              :is_create="is_create" 
              :isPreview="isPreview"
              :isSettings="isSettings"
              :is_reset="true"
              :is_reload="true"
              :is_export="true"
              :is_loading="loading"
              @input="switchPreview"
              @settings="switchSettings"
              >
            </ItemToolbar>

          </v-flex>

        </v-layout>
      </template>


      <!-- DSI / SETTINGS  -->
      <v-dialog 
        v-model="isSettings" 
        fullscreen 
        hide-overlay 
        transition="dialog-bottom-transition"
        >

        <v-card color="grey">
          
          <!-- SETTINGS TOOLBAR -->
          <SettingsToolbar
            :itemDoc="itemDoc"
            @settings="switchSettings"
            >
          </SettingsToolbar>


          <v-layout row justify-center mt-5>

            <v-flex class="xs12 sm10 md8 justify-center py-5">

              <!-- COMPONENTS FOR COMMON DOCS INFOS -->    
                <!-- v-show="!isPreview" -->
              <!-- <v-expansion-panel
                v-model="panel_infos"
                expand
                class="elevation-0"
                >

                <v-expansion-panel-content>

                  <div 
                    slot="header"
                    >
                    <v-icon small color="accent" class="mr-3">
                      {{ $store.state.mainIcons.parentFieldIcons.infos.icon }}  
                    </v-icon>
                    <span>
                      {{ $t(`parentFields.infos`, $store.state.locale) }}
                    </span>
                  </div>

                  <ItemDocInfos
                    :coll="coll"
                    :is_create="is_create"
                    :item_doc="itemDoc"
                    >
                  </itemDocInfos>

                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-divider></v-divider> -->


              <!-- TAGS LIBRARY -->
                <!-- v-show="!isPreview" -->
              <v-expansion-panel
                v-if="$store.state.auth.isLogged"
                v-model="panel_lib_tag"
                expand
                class="elevation-0"
                >
                <v-expansion-panel-content >

                  <div 
                    class="black--text"
                    slot="header"
                    >
                    <v-badge
                      overlap
                      color="grey lighten-1"
                      >
                      <v-icon
                        slot="badge"
                        dark
                        >
                        {{ $store.state.mainIcons.create.icon }}
                      </v-icon>
                      <v-icon 
                        small
                        class="pr-2"
                        color="accent"
                        >
                        {{ $store.state.mainIcons.tags.icon }}
                      </v-icon>
                    </v-badge>
                    <span class="ml-3">
                      {{ $t(`global.manage_tag`, $store.state.locale) }}
                    </span>
                  </div>

                  <ItemsListDI
                    :tab="'tags'"
                    :coll="'tag'"
                    :items_coll="$store.state.tag.list"
                    :no_margin="true"

                    :add_to_parent="true"
                    :parentDoc_id="itemId"
                    :parentDoc_coll="coll"
                    :items_in_parent="list_TAG_oids"

                    @update_parent_dataset="update_parent_list"
                    >
                  </ItemsListDI>

                </v-expansion-panel-content>
              </v-expansion-panel>
            
              <v-divider></v-divider>

            </v-flex>

          </v-layout>

        </v-card>

      </v-dialog>




      <!-- DSI DATA + MAPPING -->
      <v-layout 
        row 
        wrap
        >
        
        <v-flex xs12 pt-0>

          <v-card 
            flat
            color=""
            >

            <v-card-text 
              class="pa-0"
              >

              <!-- DATA TOOLBAR + MAPPING BTN -->
              <v-toolbar 
                class="elevation-0" 
                color="white"
                >
                
                <!-- title dataset -->
                <v-toolbar-title
                  class="subheading grey--text"
                  >
                  
                  <!-- <v-tooltip top>
                    <v-btn
                      slot="activator"
                      icon
                      v-show="isPreview || add_to_parent"
                      flat
                      class="grey"
                      dark
                      small 
                      > -->
                      <!-- @click="show_dsi_table=!show_dsi_table" -->
                      <!-- :to="`/${itemDoc.specs.doc_type}/${itemDoc._id}`" -->
                      <v-icon 
                        v-show="isPreview || add_to_parent"
                        color="grey"
                        class="mr-2"
                        small
                        >
                        {{ $store.state.mainIcons[collName].icon }}
                      </v-icon>
                    <!-- </v-btn> -->
                    <span>
                      {{ $t(`datasets.preview`, $store.state.locale) }}
                    </span>
                  </v-tooltip>

                  <span>
                    {{ itemDoc.infos.title | truncate(30, '...') }}
                  </span>
                  
                  <!-- EDIT / GO TO BTN -->
                  <v-tooltip right>
                    <v-btn
                      slot="activator"
                      icon
                      v-show="add_to_parent"
                      flat
                      small 
                      :to="`/${itemDoc.specs.doc_type}/${itemDoc._id}`"
                      >
                      <v-icon 
                        small
                        color="grey"
                        >
                        {{ $store.state.mainIcons.edit.icon }}
                      </v-icon>
                    </v-btn>
                    <span>
                      {{ $t(`datasets.edit`, $store.state.locale) }}
                    </span>
                  </v-tooltip>



                  <!-- -- parent_map : <br> <code>{{parent_map}}</code> -->

                  <!-- - ScT : {{ offsetTop }} -->
                  <!-- - ScL : {{ offsetLeft }}
                  - parent_scroll : {{ parent_scroll }} -->
                  

                  <v-spacer></v-spacer>

                  <!-- TO DO : edit button if not in DSI -->
                  <!-- <v-btn
                    icon
                    v-show="isPreview"
                    flat
                    class="secondary"
                    dark
                    small 
                    @click=""
                    >

                    <v-icon small>
                      {{ $store.state.mainIcons.edit.icon }}
                    </v-icon>
                  
                  </v-btn> -->

                </v-toolbar-title>
                
                <v-spacer></v-spacer>

                <!-- PROGRESS -->
                <v-progress-circular 
                  v-show="loading" 
                  color="accent" 
                  indeterminate
                  >
                </v-progress-circular>

                <!-- DIALOG -->
                <v-dialog 
                  v-show="!isPreview"
                  v-model="dialog" 
                  class="mx-2"
                  max-width="600px"
                  >

                  <!-- NEW ITEM -->
                  <v-btn 
                    slot="activator" 
                    color="grey" 
                    dark 
                    block
                    round
                    outline
                    class="text-lowercase"
                    :disabled="loading"
                    >
                    <v-icon small class="mr-2">
                      {{ $store.state.mainIcons.add_to_parent.icon }}  
                    </v-icon>
                    {{ $t( 'global.item_new', $store.state.locale)  }}
                  </v-btn>

                  <v-card>

                    <v-card-title>
                      <span class="headline">
                        {{ $t( 'global.'+formTitle, $store.state.locale)  }}
                      </span>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-card-text>
                      <v-container grid-list-md>
                      <v-layout wrap>

                        <v-flex 
                          xs12
                          v-for="header in headers"
                          :key="headers.indexOf(header)"
                          >
                          <v-textarea 
                            v-model="editedItem[header.value]" 
                            :label="header.text"
                            auto-grow
                            :disabled="true"
                            :rows="1"
                          >
                          </v-textarea>
                        </v-flex>

                      </v-layout>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="close">
                        {{ $t( 'global.cancel', $store.state.locale)  }}
                      </v-btn>
                      <v-btn color="blue darken-1" flat @click="save">
                        {{ $t( 'global.save', $store.state.locale)  }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>

                </v-dialog>


                <!-- MAPPING DIALOG BTN-->
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    v-show="is_map"
                    :class="`text-lowercase ${ checkUserAuth('mapping.dsi_to_dmf') ? ( loading ? 'grey lighten-1' : 'accent') : 'grey lighten-1' } ml-2`"
                    :disabled="!checkUserAuth('mapping.dsi_to_dmf') || loading"
                    flat
                    dark
                    small 
                    round
                    @click="dialog_mapping = !dialog_mapping"
                    >

                    <!-- <v-icon small right left>
                      {{ $store.state.mainIcons.datasets.icon }}
                    </v-icon>
                    <v-icon small left>
                      {{ $store.state.mainIcons.map_doc.icon }}
                    </v-icon>
                    <v-icon small left>
                      {{ $store.state.mainIcons.datamodels.icon }}
                    </v-icon> -->

                    <v-icon 
                      small
                      class="px-2"
                      >
                      {{ $store.state.mainIcons.map_doc.icon }}
                    </v-icon>
                    <span 
                      class="hidden-sm-and-down">
                      {{ $t(`projects.map_dmf`, $store.state.locale) }}
                    </span>

                  </v-btn> 
                  <span 
                    class="">
                    {{ $t(`projects.map_with_dmf`, $store.state.locale) }}
                  </span>
                </v-tooltip>
                

                <!-- DELETE ITEM FROM PARENT MENU -->
                <v-menu 
                  v-if="add_to_parent"
                  bottom 
                  left 
                  full-width
                  :nudge-bottom="10"
                  offset-y
                  >
                  <v-tooltip 
                    top
                    slot="activator"
                    >
                    <v-btn
                      :disabled="!checkUserAuth('datasets.dsi_list') || loading "
                      icon
                      ml-2
                      slot="activator"
                      >

                      <v-icon>
                        {{ $store.state.mainIcons.options.icon }}
                      </v-icon>

                    </v-btn>
                    <span>
                      {{ $t(`global.open_options`, $store.state.locale ) }}
                    </span>
                  </v-tooltip>

                  <v-list class="pa-0">

                    <!-- DELETE FROM PARENT BTN -->
                    <v-list-tile
                      v-if="checkUserAuth('datasets.dsi_list')"
                      >

                      <!-- BTN IN MENU -->
                      <v-list-tile-title 
                        class="pa-0 ma-0"
                        @click="dialog_del=true"
                        >
                        <v-icon small left class="pr-1 mb-1" color="error">
                          {{ $store.state.mainIcons.delete.icon }}
                        </v-icon>
                        <span>
                          {{ $t(`projects.del_dsi`, $store.state.locale) }}
                        </span>
                      </v-list-tile-title>
                        
                      <!-- CONFIRM DELETE DIALOG -->
                      <v-dialog 
                        v-model="dialog_del" 
                        max-width="500"
                        >
                        
                        <v-card>

                          <v-card-title class="headline text-xs-center pb-1">
                            <v-icon left class="pr-3" color="grey">
                              {{ $store.state.mainIcons.delete.icon }}
                            </v-icon>
                            {{ $t(`projects.del_dsi`, $store.state.locale) }}
                          </v-card-title>

                          <v-card-text class="subheading text-xs-center mb-2">
                            <v-icon large class="mb-1" color="error">
                              {{ $store.state.mainIcons.warning.icon }}
                            </v-icon>
                            <br>
                            {{ $t(`global.confirm_del`, $store.state.locale) }}
                          </v-card-text>
                          
                          
                          <v-card-actions>

                            <v-btn 
                              color="primary" 
                              dark
                              block
                              @click="dialog_del = false"
                              ma-2
                              >
                              <v-icon left>
                                {{ $store.state.mainIcons.cancel.icon }}
                              </v-icon>
                              {{ $t(`global.cancel`, $store.state.locale) }}
                            </v-btn>
                            
                            <!-- DELETE DMT FROM PARENT BTN -->
                            <v-btn 
                              color="error " 
                              dark
                              block
                              ma-2
                              @click="deleteChild( { 
                                item_id     : item_doc_id, 
                                datasets_coll   : 'dsi', 
                                parentDoc_coll   : 'prj',
                                re_emit      : false,
                              } ) "
                              >
                              <v-icon left>
                                {{ $store.state.mainIcons.delete.icon }}
                              </v-icon>
                              {{ $t(`global.delete_i`, $store.state.locale) }}
                            </v-btn>

                          </v-card-actions>

                        </v-card>
                      
                      </v-dialog>

                    </v-list-tile>


                  </v-list>

                </v-menu>

                <v-tooltip top>
                  <v-btn 
                    slot="activator"
                    flat
                    icon
                    small
                    @click="show_dsi_table=!show_dsi_table"
                    >
                    <v-icon v-if="show_dsi_table">
                      {{ $store.state.mainIcons.arr_up.icon}}
                    </v-icon>
                    <v-icon v-else>
                      {{ $store.state.mainIcons.arr_down.icon}}
                    </v-icon>
                  </v-btn>

                  <span>
                    {{ $t(`datasets.preview`, $store.state.locale) }}
                  </span>
                </v-tooltip>


              </v-toolbar>


              <!-- DSI DATA / DIALOG MAPPING -->
              <v-dialog 
                v-if="is_map"
                v-model="dialog_mapping" 
                class="mx-2"
                fullscreen 
                hide-overlay 
                transition="dialog-bottom-transition"
                >

                <v-card >

                  <!-- MAPPER SETTINGS TOOLBAR -->
                  <SettingsToolbar
                    :itemDoc="itemDoc"
                    @settings="dialog_mapping = false "
                    >
                  </SettingsToolbar>

                  <!-- DATA - HEADER MAPPER -->
                  <v-layout row justify-center mt-5>

                    <v-flex class="xs12 sm10 justify-center py-5">

                      <!-- TITLE HEADERS MAPPER -->
                      <v-card-title
                        class="pa-5"
                        >

                        <v-icon 
                          class="mr-2"
                          color="primary"
                          >
                          {{ $store.state.mainIcons.datasets.icon }}
                        </v-icon>

                        <v-icon 
                          class="mr-2"
                          color="accent"
                          >
                          {{ $store.state.mainIcons.map_doc.icon }}
                        </v-icon>

                        <v-icon 
                          class="mr-4"
                          color="primary"
                          >
                          {{ $store.state.mainIcons.datamodels.icon }}
                        </v-icon>

                        <span 
                          class="title "
                          >

                          {{ $t(`projects.dsi_map`, $store.state.locale ) }} 
                        </span>

                      </v-card-title>

                      <!-- - alert : {{ alert }} -->

                      <!-- HELP TEXT -->
                      <v-card-text
                        class="px-5 pb-2"
                        >

                        {{ $t(`projects.map_with_dmf`, $store.state.locale) }}

                      </v-card-text>

                      <!-- MAPPER AS DATATABLE -->
                      <v-card-text 
                        class="px-5 lighten--2"
                        >

                        <!-- DEBUG -->
                        <span v-if="$store.state.is_debug">
                          - headers_dsi : <code>{{ headers_dsi }}</code><br>
                          - headers_dsi_preview : <code>{{ headers_dsi_preview }}</code><br>
                          - headers_dsi_but_first : <code>{{ headers_dsi_but_first }}</code><br>
                        </span>

                        <v-divider class=""></v-divider>

                        <v-data-table
                          :ref="'datatable_mapper'"
                          :headers="headers_dsi"
                          :items="['header', 'mapper']"
                          class="elevation-1 "
                          hide-actions
                          hide-headers
                          >

                          <template 
                            slot="items"
                            slot-scope="props"
                            >

                              <!-- v-show="!isPreview" -->
                            <td 
                              class="px-1 py-4"
                              >

                              <!-- h_dsi_headers -->
                              <div 
                                v-if="props.item == 'header'"
                                class="col-titles pl-2"
                                >
                                <v-icon 
                                  small
                                  color="primary" 
                                  >
                                  {{ $store.state.mainIcons.datasets.icon }}
                                </v-icon>
                                <v-tooltip right>
                                  <span slot="activator">
                                    <v-icon 
                                      small
                                      dark
                                      class="pl-2"
                                      color="grey"
                                      >
                                      {{ $store.state.mainIcons.question.icon }}
                                    </v-icon>
                                  </span>
                                  <span>
                                    {{ $t(`projects.dsi_headers`, $store.state.locale) }}
                                  </span>
                                </v-tooltip>
                              </div>

                              <!-- h_map_with_dmf -->
                              <div 
                                v-else
                                class="col-titles pl-2"
                                >
                                <v-icon 
                                  small
                                  color="primary" 
                                  >
                                  {{ $store.state.mainIcons.datamodels.icon }}
                                </v-icon>
                                <v-tooltip right>
                                  <span slot="activator">
                                    <v-icon 
                                      small
                                      dark
                                      class="pl-2"
                                      color="grey"
                                      >
                                      {{ $store.state.mainIcons.question.icon }}
                                    </v-icon>
                                  </span>
                                  <span>
                                    {{ $t(`projects.map_with_dmf`, $store.state.locale) }}
                                  </span>
                                </v-tooltip>
                              </div>

                            </td>

                            <td 
                              v-for="header in headers_dsi_but_first"
                              :key="headers_dsi_but_first.indexOf(header)"
                              class="px-1"
                              >
                            
                              <div 
                                v-if="props.item == 'header'"
                                class="col-values font-weight-bold"
                                >
                                {{ header.value | truncate(30, ' ...') }}
                              </div>

                              <div 
                                v-else
                                class="col-values"
                                >
                                
                                <ViewEditDSIMapHeaders
                                  :is_loading="loading"

                                  :parentDoc_id="parentDoc_id"
                                  :parentDoc_coll="parentDoc_coll"
                                  :parent_map="getHeader_DMF(header.value)"

                                  :dsi_id="itemId"
                                  :dsi_header="header.value"

                                  :parentDoc_dmt="parentDoc_dmt"
                                  :parentDoc_dmf_list="parentDoc_dmf_list"

                                  :canEdit="canEdit"
                                  @update_loading="updateLoading"
                                  >
                                </ViewEditDSIMapHeaders>
                              </div>

                            </td>

                          </template>
                        
                        </v-data-table>


                        <v-divider class="mt-3"></v-divider>

                        <!-- HEADER MAPPER - REPEAT DATATABLE CONTENT FOR HELP -->
                        <v-data-table
                          class="elevation-1 scroll_data"
                          :ref="'datatable_mapped'"
                          :headers="headers_dsi"
                          :items="item_data"
                          :pagination.sync="pagination"
                          :total-items="total_items"
                          :rows-per-page-items="[5, 10, 25]"
                          hide-headers
                          >

                          <template 
                            slot="items"
                            slot-scope="props"
                            >

                            <!-- FIRST COLUMN -->
                            <td 
                              class="px-1"
                              >
                              <div class="col-titles">
                                <!-- <v-icon
                                  small
                                  class="mr-1"
                                  @click="editItem(props.item)"
                                  >
                                  {{ $store.state.mainIcons.edit.icon }}
                                </v-icon> -->
                                <v-icon
                                  small
                                  class="mr-1"
                                  @click="editItem(props.item)"
                                  >
                                  {{ $store.state.mainIcons.view.icon }}
                                </v-icon>
                                <!-- <v-icon
                                  small
                                  @click="deleteItem(props.item)"
                                  >
                                  {{ $store.state.mainIcons.delete.icon }}
                                </v-icon> -->
                              </div>
                            </td>

                            <!-- CONTENT COLUMNS -->
                            <td 
                              v-for="header in headers_dsi_but_first"
                              :key="headers_dsi_but_first.indexOf(header)"
                              class="px-1"
                              >
                              <div class="col-values">
                                {{ props.item[header.value] | truncate(30, ' ...') }}
                              </div>
                            </td>

                          </template>

                        </v-data-table> 

                      </v-card-text>

                    </v-flex>
                
                  </v-layout>

                </v-card>

              </v-dialog>


              <!-- DSI DATA / SEARCH BAR & CONTENTS -->
              <v-expand-transition>
                <div
                  v-if="show_dsi_table"
                  >

                  <v-divider></v-divider>

                  <!-- SEARCH BAR -->
                  <v-card-title
                    class="pt-0"
                    >
                    <v-spacer></v-spacer>
                    <v-text-field
                      class=""
                      v-model="searchFor"
                      :label="$t(`global.search`, $store.state.locale)"
                      single-line
                      hide-details
                      append-outer-icon="search"
                      @click:append-outer="searchData"
                      @keyup.enter="searchData"
                      ></v-text-field>
                      <!-- disabled -->
                    <v-spacer></v-spacer>
                  </v-card-title>


                  <!-- DSI DATA / CONTENTS -->
                  <v-divider></v-divider>

                  <!-- - item_data : <code>{{ item_data }} </code> <br> -->

                  <!-- <ViewEditDSITable
                    v-if="is_parent_map"
                    :isPreview="isPreview"
                    :item_data="item_data",
                    :headers_preview="headers_preview",
                    :headers_preview_but_first="headers_preview_but_first",
                    :pagination="pagination",
                    :total_items="total_items",
                    :parent_scroll="parent_scroll",
                    >
                  </ViewEditDSITable> -->


                  <!-- DEBUG -->
                  <span v-if="$store.state.is_debug">
                    - total_items : <br><code>{{total_items}}</code><br>
                    - pagination : <br><code>{{pagination}}</code><br>
                    - parentDoc_dmt : <br><code>{{parentDoc_dmt}}</code><br>
                    <v-divider></v-divider>
                    <!-- <v-divider></v-divider> -->
                    <!-- - headers_preview_but_first : <br><code>{{headers_preview_but_first}}</code><br> -->
                    <v-divider></v-divider>
                  </span>


                  <!-- DSI DATA / CONTENTS -->
                  <v-data-table
                    v-if="is_parent_map && is_parent_dmt"
                    class="elevation-0 scroll_data"
                    :ref="'datatable'"
                    :headers="headers_preview"
                    :items="item_data"
                    :pagination.sync="pagination"
                    :total-items="total_items"
                    :rows-per-page-items="[5, 10, 25]"
                    >
                    <!-- :search="search" -->
                    <!-- :hide-headers="isPreview" -->
                    <!-- :loading="loading" -->

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

                  </v-data-table> 

                </div>
              </v-expand-transition>


              <!-- 
              - is_parent_map : {{ is_parent_map }}
              - is_parent_dmt : {{ is_parent_dmt }} 
              -->

              <!-- NO MAP && NO PARENT DMT -->
              <v-alert 
                v-if=" !is_parent_map || !is_parent_dmt "
                class="mt-0 pa-4 text-xs-center"
                :value="true"
                color="accent"
                >
                <v-icon
                  dark
                  class="pr-2"
                  >
                  {{ $store.state.mainIcons.warning.icon }}
                </v-icon>
                <span 
                  v-if="!is_parent_dmt"
                  >
                  <br>{{ $t( `projects.no_dmt`, $store.state.locale ) }}
                </span>
                <span 
                  v-if="!is_parent_map"
                  >
                  <br>{{ $t( `projects.no_dsi_map`, $store.state.locale ) }}
                </span>
              </v-alert>


              <!-- DEBUG -->
              <span v-if="$store.state.is_debug">

                <!-- - item_headers : <br><code>{{ item_headers() }}</code> <br>
                <v-divider></v-divider> -->
                
                - parentDoc_dmt : <br><code>{{parentDoc_dmt}}</code> <br>
                <v-divider></v-divider>


                - parent_map : <br><code>{{parent_map}}</code> <br>
                <v-divider></v-divider>
                
                - parentDocDMFs : <br><code>{{ parentDocDMFs }}</code>
                <v-divider></v-divider>

                <!-- - itemHeaders_Actions(!isPreview) : <br><code>{{itemHeaders_Actions(!isPreview)}}</code> <br>
                <v-divider></v-divider> -->

                <!-- - parentDoc_dmf_list_pivoted : <br><code>{{ parentDoc_dmf_list_pivoted }}</code>
                <v-divider></v-divider> -->
                
                <!-- - itemHeaders : <br><code>{{itemHeaders}}</code> <br>
                <v-divider></v-divider> -->


                - headers_preview : <br><code>{{headers_preview}}</code><br>
                <v-divider></v-divider>

                - headers_mapped : <br><code>{{headers_mapped}}</code><br>
                <v-divider></v-divider>

              </span>


            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>




      <!-- COMPONENTS FOR COMMON DOCS INFOS -->    
      <v-expansion-panel
        v-show="!isPreview && !no_toolbar"
        v-model="panel_infos"
        expand
        class="elevation-0 mt-3"
        >

        <v-expansion-panel-content>

          <div 
            slot="header"
            >
            <v-icon small color="accent" class="mr-3">
              {{ $store.state.mainIcons.parentFieldIcons.infos.icon }}  
            </v-icon>
            <span>
              {{ $t(`parentFields.infos`, $store.state.locale) }}
            </span>
          </div>

            <!-- :is_preview="isPreview" -->
          <ItemDocInfos
            :coll="coll"
            :is_create="is_create"
            :item_doc="itemDoc"
            >
          </itemDocInfos>

        </v-expansion-panel-content>
      </v-expansion-panel>


      <!-- COMPONENTS FOR COMMON DOCS USES -->    
      <v-expansion-panel
        v-show="!isPreview && !no_toolbar"
        v-model="panel_uses"
        expand
        class="elevation-0 mt-3"
        >

        <v-expansion-panel-content>

          <div 
            slot="header"
            >
            <v-icon small class="mr-3">
              {{ $store.state.mainIcons.parentFieldIcons.uses.icon }}
            </v-icon>
            <span>
              {{ $t(`parentFields.uses`, $store.state.locale) }}
            </span>
          </div>

          <ItemDocUses
            :coll="coll"
            :is_create="is_create"
            :is_preview="isPreview"
            :item_doc="itemDoc"
            >
          </itemDocUses>

        </v-expansion-panel-content>
      </v-expansion-panel>



      <!-- DEBUG  -->
      <v-layout 
        v-if="$store.state.is_debug"
        row wrap
        >

          <!-- :class="flex_vars" -->
        <v-flex d-flex 
          >

          <v-alert       
            :value="true"
            type="error"
            class="text-xs-left"
            >
            ---- DEBUG component - ItemViewEdit ----
            <hr>

            -- itemDoc -- <br>
            <!-- <code>{{ itemDoc }}</code><hr> -->

            -- pagination -- <br>
            total_items : <code>{{ total_items }}</code><br>
            pagination : <code>{{ pagination }}</code><br>

            -- vars -- <br>
            is_file : <code>{{ is_file }}</code> - 
            coll : <code>{{ coll }}</code> - 
            collName : <code>{{ collName }}</code> - 
            is_create : <code>{{ is_create }}</code> - 
            filetype : <code>{{ filetype }}</code> - 
            itemId : <code>{{ itemId}}</code> - 
            <!-- canEdit : <code>{{ canEdit }}</code> -->
            <!-- flex_vars : <code>{{flex_vars}}</code> -  -->
            <hr>

            -- current_new in $store.state.{{coll}} -- <br>
            {{coll}}.current_new : <br><code>{{ $store.state[coll].current_new }}</code>

            <div v-if="is_file">
              {{coll}}.csv_sep : <br><code>{{ $store.state[coll].csv_sep }}</code><br>
              {{coll}}.current_filename : <br><code>{{ $store.state[coll].current_filename }}</code>
            </div>
            <div v-if="is_file && $store.state[coll].current_file != '' ">
              {{coll}}.current_file : <br><code>{{ $store.state[coll].current_file.name }}</code>
            </div>        
            
          </v-alert>

        </v-flex>

      </v-layout>



    </v-container>
    

  </div>

</template>


<script>

// import ScrollSync from 'vue-scroll-sync';

// import ObjectFormatterCreate from '~/plugins/utils/ObjectFormatterCreate.js'
// import checkDocUserAuth from '~/plugins/utils/checkDocUserAuth.js'

// import ItemsListDI from '~/components/UI/itemsList_dataIterator.vue'

// import ItemToolbar from '~/components/UI/itemToolbar.vue'
// import ItemDocUses from '~/components/UI/itemDocUses.vue'
// import ItemDocInfos from '~/components/UI/itemDocInfos.vue'

// import SettingsToolbar from '~/components/UI/settingsToolbar.vue'

// import ViewEditDSIMapHeaders from '~/components/UI/viewEditDSI_mapHeaders.vue'
// import ViewEditDSITable from '~/components/UI/viewEditDSI_table.vue'

export default {

  props: [

    // "flex_vars",      //
    'is_create', // view | create
    'is_preview', //

    'canEdit',

    'is_map',
    'parent_map',
    'parentDoc_id',
    'parentDoc_coll',
    'parentDoc_dmt',
    'parentDoc_dmf_list',
    // "parentDoc_dmf_list_pivoted",

    'coll',

    'item_doc', // complete item infos

    'find_item',
    'item_doc_id',
    'needs_reload',

    // "is_debug",

    'is_switch',
    'no_toolbar',

    'add_to_parent',
    'parent_scroll'

  ],

  components: {
    // ItemToolbar,
    // ItemDocInfos,
    // ItemsListDI,
    // ItemDocUses,
    // SettingsToolbar,
    // ViewEditDSITable,
    // ViewEditDSIMapHeaders
  },

  created () {
    this.$store.state.LOG && console.log('\n- viewEditDSI / created ---> item_doc : ', this.item_doc)

    // var input = {
    //   collections : ['tag'],
    //   level    : 'get_list'
    // }
    // this.$store.dispatch('resetListsItems', input ) ;

    // load and transform parentDoc_dmf_list
    this.parentDocDMFs = this.parentDoc_dmf_list_reduc(this.parentDoc_dmf_list)

    // get data
    if (this.find_item) {
      this.$store.state.LOG && console.log('- viewEditDSI / created OK ---> need to get item from API ... ')
      this.itemId = this.item_doc_id

      // change pagination params in store[coll]
      let paginationParams = {
        page: 1,
        per_page: 5
      }

      // load DSI data
      this.get_FData_fromApi(paginationParams)
    } else {
      this.$store.state.LOG && console.log('- viewEditDSI / created OK ---> item_doc exists... ')
      this.itemDoc = this.item_doc
      this.itemId = this.item_doc._id
      this.list_TAG_oids = this.item_doc.datasets.tag_list

      this.total_items = this.item_doc.data_raw.f_data_count
      this.pagination.totalItems = this.item_doc.data_raw.f_data_count
      this.pagination.page = 1
      this.pagination.rowsPerPage = 5
      // this.pagination.sortBy = result.query.query_args.sort_by

      this.itemDoc_loaded = true

      // this.canEdit = this.checkUserAuth(this.parentField+'.'+this.subField)
      // this.canEdit = this.checkUserAuth(this.parentFieldslist)

      this.is_file = (this.coll === 'dsi')
      this.is_file = this.preloadIsFile()
      this.filetype = this.preloadFileType()

      this.item_headers()
      this.addMapOnScroll()
    }
  },

  data () {
    return {

      alert: null,
      loading: false,

      offsetTop: 0,
      offsetLeft: 0,
      dataTable: undefined,

      offsetTop_: 0,
      offsetLeft_: 0,
      dataTable_mapper: undefined,
      dataTable_mapped: undefined,

      isPreview: this.is_preview,
      no_subField: true,
      isSettings: false,

      dialog: false,
      dialog_del: false,
      dialog_mapping: false,

      show_dsi_table: true,
      panel_uses: [false],
      panel_infos: [true],
      panel_lib_tag: [true],

      collName: this.$store.state.collectionsNames[this.coll],

      itemDoc_loaded: false,
      itemDoc: this.item_doc,
      itemId: '',
      list_TAG_oids: [],

      headers: [],
      headers_dsi: [],
      parentMap: this.parent_map,
      parentDocDMFs: [],
      headers_mapped: [],

      searchFor: '',

      // item_data     : this.item_doc.data_raw.f_data,
      // item_headers   : this.item_doc.data_raw.f_col_headers,

      is_file: null,
      filetype: null,

      // data table : loading, pagination
      pagination: {

      },
      total_items: 0, // per page must be in [0, 2, 5, 10, 20, 25, 50, 100]

      // data table - edit/create item
      editedIndex: -1,
      // editedItem    : {},
      // defaultItem    : this.fill_defaultItem(),

      blockFullSize: 'xs12',
      blockPartSize: 'xs10',
      blockSwitchSize: 'md6 offset-md3',

      parentFieldsSize: 'xs2 ma-0 pa-0',
      parentBotPadding: ' pb-0 pt-1',
      parentNoBotPadding: ' py-0',

      valueNoPadding: ' ma-0 pa-0',
      valueLeftPadding: ' ma-0 py-0 pr-0 pl-2',

      createHeight: '',
      createSize: 12

    }
  },

  computed: {

    formTitle () {
      return this.editedIndex === -1 ? 'item_new' : 'item_edit'
    },

    item_data () {
      return this.itemDoc.data_raw.f_data
    },

    // itemHeaders() {
    //   return this.item_headers() ;
    // },

    parentPadding () {
      return (this.isPreview) ? this.parentNoBotPadding : this.parentBotPadding
    },

    // PARENT MAP & HEADERS

    is_parent_map () {
      if (this.is_map) {
        return this.parent_map.length !== 0
      } else {
        return true
      }
    },

    is_parent_dmt () {
      if (this.is_map) {
        return this.parentDoc_dmt.length !== 0
      } else {
        return true
      }
    },

    headers_preview () {
      if (this.isPreview) {
        return this.headers.slice(1)
      } else {
        return this.headers
      }
    },

    headers_preview_but_first () {
      return this.headers.slice(1)
    },

    headers_dsi_preview () {
      if (this.isPreview) {
        return this.headers_dsi.slice(1)
      } else {
        return this.headers_dsi
      }
    },

    headers_dsi_but_first () {
      return this.headers_dsi.slice(1)
    },

    // SWITCH
    valueSwitch () {
      // return (!this.is_preview && this.is_switch) ? this.blockPartSize : this.blockSwitchSize ;
      if (this.is_switch) {
        return (this.isPreview) ? this.blockSwitchSize : this.blockPartSize
      } else {
        return this.blockFullSize
      }
    },

    // BLOCK SIZE
    valueBlockSize () {
      return (this.is_preview) ? this.blockFullSize : this.blockPartSize
    },

    valuePadding () {
      return (this.is_preview) ? this.valueNoPadding : this.valueLeftPadding
    }

  },

  watch: {

    needs_reload: {
      immediate: true,
      handler (newVal, oldVal) {
        if (newVal !== oldVal && this.itemDoc_loaded === true) {
          let paginationParams = {
            page: this.pagination.page,
            per_page: this.pagination.rowsPerPage,
            // total_items: this.pagination.totalItems,
            sort_by: this.pagination.sortBy,
            descending: this.pagination.descending
          }
          this.get_FData_fromApi(paginationParams)
        }
      }
    },

    parent_map: {
      immediate: true,
      handler (newVal, oldVal) {
        this.parentMap = newVal
        this.item_headers()
      }
    },

    parentDoc_dmf_list: {
      immediate: true,
      handler (newVal, oldVal) {
        this.parentDocDMFs = this.parentDoc_dmf_list_reduc(newVal)
        this.item_headers()
      }

    },

    item_doc: {

      immediate: true,
      handler (newVal, oldVal) {
        this.$store.state.LOG && console.log('\nVE DSI / watch ~ item_doc / newVal : \n', newVal)
        // this.$store.state.LOG && console.log( "\nVE PRJ / watch ~ item_doc / oldVal : \n", oldVal )
        if (newVal) {
          this.itemDoc = newVal

          // create headers
          this.item_headers()

          // update local TAG list
          this.list_TAG_oids = newVal.datasets.tag_list

          this.$store.commit(`${this.coll}/set_reload`, newVal)
        }
      }
    },

    parent_scroll: {
      immediate: true,
      handler (newVal, oldVal) {
        if (this.dataTable !== undefined) {
          this.dataTable.scrollLeft = newVal
          // if (this.is_map) {
          //   this.dataTable_map.scrollLeft = newVal
          // }
        }
      }
    },

    offsetLeft_: {
      immediate: true,
      handler (newVal, oldVal) {
        if (this.dataTable_mapper !== undefined && this.dataTable_mapped !== undefined) {
          this.dataTable_mapper.scrollLeft = newVal
          this.dataTable_mapped.scrollLeft = newVal
        }
      }
    },

    loading: {

      immediate: true,
      handler (newVal, oldVal) {
        // this.$store.state.LOG && console.log( "\nVE DMT / watch ~ loading / newVal : \n", newVal )

        // var doc_id = "from_VE_DSI"
        // if ( this.itemId == undefined || this.itemId == "" ) {
        //   var doc_id = "from_VE_DSI"
        // }
        // else {
        //   var doc_id = this.itemId
        // }
        var input = {
          loading: newVal,
          // doc_id  : doc_id,
          coll: this.coll
        }
        // this.$emit("update_loading", newVal)
        this.$emit('update_loading', input)
      }

    },

    dialog (val) {
      val || this.close()
    },

    is_preview: {
      immediate: true,
      handler (newVal, oldVal) {
        // this.$store.state.LOG && console.log( "\nVE DSI / watch ~ is_preview / newVal : \n", newVal )
        this.isPreview = newVal
      }
    },

    // TO VERIFY !!!!
    pagination: {

      handler () {
        // this.$store.state.LOG && console.log("\n...VE DSI pagination handler ... ")
        // this.$store.state.LOG && console.log("...VE DSI pagination - this.pagination : ", this.pagination)

        // change pagination params in store[coll]
        let paginationParams = {
          search_for: this.searchFor,
          page: this.pagination.page,
          per_page: this.pagination.rowsPerPage,
          // total_items: this.pagination.totalItems,
          sort_by: this.pagination.sortBy,
          descending: this.pagination.descending
        }
        this.$store.state.LOG && console.log('...VE DSI pagination - paginationParams : ', paginationParams)

        // call method for dispatch from main store
        if (this.itemDoc_loaded) {
          this.get_FData_fromApi(paginationParams)
        }
      },
      deep: true
    }
  },

  methods: {

    updateLoading (input) {
      this.$store.state.LOG && console.log('updateLoading / input : ', input)
      this.loading = input
    },

    parentDoc_dmf_list_reduc (parentDocDMFs) {
      if (parentDocDMFs !== undefined && parentDocDMFs.length !== 0) {
        return parentDocDMFs.map(obj => (
          {
            _id: obj['_id'],
            value: obj['infos.title'],
            text: obj['infos.title']
          }
        ))
      } else {
        return []
      }
    },

    onScroll (e) {
      // this.$store.state.LOG && console.log("... onScroll - e.target : ", e.target ) ;
      var scrollData = e.target
      // this.offsetTop   = scrollData.scrollTop ;
      this.offsetLeft = scrollData.scrollLeft
      this.$emit('scrollTable', {
        left: scrollData.scrollLeft
      })
    },

    onScroll_map (e) {
      // this.$store.state.LOG && console.log("... onScroll_mapper - e.target : ", e.target ) ;
      var scrollData = e.target
      this.offsetLeft_ = scrollData.scrollLeft
    },

    addMapOnScroll () {
      if (this.is_map) {
        let dataTableMapper = this.$refs.datatable_mapper
        let dataTableMapped = this.$refs.datatable_mapped
        // this.$store.state.LOG && console.log("- viewEditDSI / then 4 - dataTableMapper : ", dataTableMapper ) ;
        // this.$store.state.LOG && console.log("- viewEditDSI / then 5 - dataTableMapped : ", dataTableMapped ) ;

        if (dataTableMapped !== undefined) {
          let dtMapper = dataTableMapper.$el.querySelector('.v-table__overflow')
          let dtMapped = dataTableMapped.$el.querySelector('.v-table__overflow')
          dtMapper.addEventListener('scroll', this.onScroll_map)
          dtMapped.addEventListener('scroll', this.onScroll_map)
          this.dataTable_mapper = dtMapper
          this.dataTable_mapped = dtMapped
        }
      }
    },

    // TOOLBAR SWITCH
    switchPreview () {
      this.isPreview = !this.isPreview
    },
    switchSettings () {
      this.isSettings = !this.isSettings
    },

    getHeader_DMF (dsiHeader) {
      // this.$store.state.LOG && console.log("... getDMF_openlevel - dmf_id : ", dmf_id ) ;

      let dsiHeaderDmf
      let headerMapper = this.parent_map.find(obj => {
        return obj.dsi_header === dsiHeader
      })
      // this.$store.state.LOG && console.log(" getDMF_openlevel / dmf_mapper : ", dmf_mapper )
      if (headerMapper !== undefined) {
        dsiHeaderDmf = headerMapper
      }

      return dsiHeaderDmf
    },

    // ----------------------------- //
    // AXIOS CALL
    // ----------------------------- //

    deleteChild (itemInfos) {
      this.$store.state.LOG && console.log('\n...viewEditDSI - deleteChild / itemInfos : \n ', itemInfos)

      var input = {
        add_or_delete: 'delete_from_list',
        item_id_to_add: itemInfos.item_id,
        datasets_coll: itemInfos.datasets_coll,
        parentDoc_coll: itemInfos.parentDoc_coll,
        re_emit: itemInfos.re_emit
      }
      this.$store.state.LOG && console.log('viewEditDSI / input : ', input)

      this.$emit('update_parent_dataset', input)
    },

    // ADD DELETE ITEM FROM
    form (input) {
      var datasetsColl = input.datasets_coll
      var itemIdToAdd = input.item_id_to_add
      var addOrDelete = input.add_or_delete

      return {
        'field_to_update': 'datasets.' + datasetsColl + '_list',
        'field_value': itemIdToAdd,
        'add_to_list': addOrDelete,
        'doc_type': datasetsColl
      }
    },

    // UPDATE PRJ DOCUMENT
    update_parent_list (input) {
      this.$store.state.LOG && console.log('update_parent_list / input : ', input)

      this.loading = true
      // this.$emit('update_loading', true )

      // load values as pseudoForm
      var pseudoForm = this.form(input)
      var pseudoFormData = [ pseudoForm ]
      this.$store.state.LOG && console.log('update_parent_list / pseudoFormData : ', pseudoFormData)

      // dispatch action from store for update
      this.$store.dispatch('updateItem', {
        coll: this.coll,
        doc_id: this.itemId,
        form: pseudoFormData
      })

        .then(result => {
        // this.alert     = { type: 'success', message: result.msg }
          this.loading = false
          // this.$emit('update_loading', false )

          // this.$store.commit(`set_alert`, result.msg)

          // update current in store
          this.$store.state.LOG && console.log('update_parent_list - result : ', result)
          this.$store.commit(`${this.coll}/set_current`, result)
        })

        .catch(error => {
          this.$store.state.LOG && console.log('submit / error... : ', error)
          this.loading = false
          // this.$emit('update_loading', false )
          // this.alert = {type: 'error', message: error }

          this.$store.commit(`set_error`, error)

          if (error.response && error.response.data) {
            this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
          }
        })
    },

    searchData () {
      // change pagination params in store[coll]
      let searchParams = {
        search_for: this.searchFor,
        page: this.pagination.page,
        per_page: this.pagination.rowsPerPage,
        // total_items: this.pagination.totalItems,
        sort_by: this.pagination.sortBy,
        descending: this.pagination.descending
      }
      this.$store.state.LOG && console.log('...VE DSI pagination - searchParams : ', searchParams)
      this.get_FData_fromApi(searchParams)
    },

    get_FData_fromApi (pagParams) {
      this.$store.state.LOG && console.log('\n...VDSI get_FData_fromApi ... ')

      this.loading = true

      // AXIOS CALL OR DISPATCH
      var input = {
        collection: this.coll,
        doc_id: this.itemId,
        f_data_params: pagParams,
        set_current: false
      }

      this.$store.dispatch('getOneItem', input)

        .then(result => {
          this.$store.state.LOG && console.log('VDSI get_FData_fromApi / result: ', result)

          this.itemDoc = result.data
          this.list_TAG_oids = result.data.datasets.tag_list

          // create headers
          this.item_headers()

          this.total_items = result.data.data_raw.f_data_count
          this.pagination.totalItems = result.data.data_raw.f_data_count

          this.pagination.page = result.query.page_args.page
          this.pagination.rowsPerPage = result.query.page_args.per_page
          this.pagination.sortBy = result.query.query_args.sort_by

          this.loading = false
          // this.alert       = {type: 'success', message: result.msg}

          this.itemDoc_loaded = true

          // this.$store.commit(`set_alert`, result.msg)

          // add scroll event listener on datatable
          // detect scroll : cf : https://forum.vuejs.org/t/how-to-detect-body-scroll/7057/5
          // sync scroll : cf : https://github.com/asvd/syncscroll/blob/master/syncscroll.js
          var dataTable = this.$refs.datatable // ) ;
          // this.$store.state.LOG && console.log("- viewEditDSI / then 1 - dataTable : ", dataTable ) ;

          if (dataTable !== undefined) {
          // this.$store.state.LOG && console.log("- viewEditDSI / then 2 - dataTable : ", dataTable ) ;
          // component selector : https://forum.vuejs.org/t/help-with-selector/18652/11
            var dt = dataTable.$el.querySelector('.v-table__overflow')
            // this.$store.state.LOG && console.log("- viewEditDSI / then 3 - dt : ", dt ) ;
            dt.addEventListener('scroll', this.onScroll)
            this.dataTable = dt
          }

          this.addMapOnScroll()

          return 'ok'
        })

        .catch(error => {
          this.$store.state.LOG && console.log('VDSI get_FData_fromApi / submit - error... : ', error)

          this.loading = false

          // this.alert = {type: 'error', message: "login error" }

          this.$store.commit(`set_error`, error)

          if (error.response && error.response.data) {
            this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
          }

          return 'error'
        })
    },

    // ----------------------------- //
    // HEADERS COLUMNS
    // ----------------------------- //

    // itemHeaders_Actions(not_preview) {

    //   return this.item_headers( not_preview, this.is_map ) ;

    // },

    item_headers () {
      let headers = []
      let topHead = {
        text: 'Actions',
        value: 'name',
        sortable: false
      }
      let topHeadDsi = {
        text: 'Mapping',
        value: 'mapping',
        sortable: false
      }

      // only create headers if item is loaded
      if (this.itemDoc_loaded) {
        const rawHeaders = this.itemDoc.data_raw.f_col_headers
        // this.$store.state.LOG && console.log("item_headers _map / rawHeaders : ", rawHeaders)

        // make headers list from f_coll_header_val
        for (let header in rawHeaders) {
          // this.$store.state.LOG && console.log("item_headers / header : ", header)
          let header_ = {
            value: rawHeaders[header].f_coll_header_val,
            text: rawHeaders[header].f_coll_header_text
          }
          headers.push(header_)
        }

        // this.$store.state.LOG && console.log("\item_headers / this.is_map : ", this.is_map)
        // this.$store.state.LOG && console.log("item_headers / this.parentDoc_dmt : ", this.parentDoc_dmt)

        // this.$store.state.LOG && console.log("item_headers / this.parentMap : \n", this.parentMap)
        // this.$store.state.LOG && console.log("item_headers / this.parentDoc_dmf_list_reduc : \n", this.parentDoc_dmf_list_reduc)

        // this.$store.state.LOG && console.log("item_headers / headers : ", headers)

        // copy original headers for DSI purposes
        let headersDsi = headers.slice()
        // append topHeadDsi at the the beginning
        headersDsi.unshift(topHeadDsi)
        // update original headers
        this.headers_dsi = headersDsi

        // if this.is_map reorder headers list to fit parentMap
        if (this.is_map !== undefined && this.is_map) {
          // this.$store.state.LOG && console.log("item_headers + map / building tempHeadersMapped... ")

          // let tempHeadersMapped = []
          let tempHeadersMapDmf = []

          if (this.parentDoc_dmt.length !== 0 && this.parentMap !== undefined) {
            // headers present in this.parentDocDMFs
            let dmfList = this.parentDocDMFs.slice(1)
            // this.$store.state.LOG && console.log("... item_headers + map / dmfList : ", dmfList )

            // loop dmfList
            for (let headerI in dmfList) {
              let headerToPush = dmfList[ headerI ]
              // this.$store.state.LOG && console.log("... item_headers + map / headerToPush : ", headerToPush )

              // check if headerToPush has a corresponding item in parent_map (a mapped header)
              let replacingHeader = this.parentMap.find(obj => (obj.oid_dmf === headerToPush._id))
              // this.$store.state.LOG && console.log("... item_headers + map / replacingHeader : ", replacingHeader )

              // replace value to push by mapped header
              if (replacingHeader !== undefined) {
                headerToPush = {
                  value: replacingHeader.dsi_header,
                  text: replacingHeader.dsi_header // + "(" + headerToPush.text + ")" // + " - " + replacingHeader.oid_dmf
                }
              } else {
                headerToPush.text = '* not mapped'
              }

              tempHeadersMapDmf.push(headerToPush)
            }
            this.headers_mapped = tempHeadersMapDmf
            headers = tempHeadersMapDmf
          } else {
            headers = []
          }
        }

        // unshift first column
        headers.unshift(topHead)
      }

      // this.$store.state.LOG && console.log("\nitem_headers / returning headers : \n", headers)
      this.headers = headers
    },

    //  ITEM FOR EDITION / CREATION
    editedItem () {

      // return {
      //   name: '',
      //   calories: 0,
      //   fat: 0,
      //   carbs: 0,
      //   protein: 0
      // }
    },

    defaultItem () {
      var emptyItem = {}
      // const headers = this.item_headers() ;
      this.$store.state.LOG && console.log('\nfill_defaultItem / this.headers : ', this.headers)

      for (let header in this.headers) {
        emptyItem[header.value] = 'empty'
      }

      this.$store.state.LOG && console.log('fill_defaultItem / emptyItem : ', emptyItem)
      return emptyItem
    },

    // EDIT ITEM
    editItem (item) {
      this.editedIndex = this.item_data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.item_data.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.item_data.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.item_data[this.editedIndex], this.editedItem)
      } else {
        this.item_data.push(this.editedItem)
      }
      this.close()
    },

    // PREALOADS / UPDATES
    preloadIsFile () {
      var isFile = false

      if (this.coll === 'dsi') {
        if (this.itemDoc.specs.src_type !== 'API') {
        // if ( this.item_doc.specs.src_type != "API") {
          isFile = true
        }
      }
      return isFile
    },

    preloadFileType () {
      var filetype
      if (this.coll === 'dsi') {
        // filetype = this.item_doc.specs.src_type
        filetype = this.itemDoc.specs.src_type
      }
      return filetype
    },

    updateIsFile (val) {
      // if( val.subField == "src_type"){
      if (val.subField === 'switchFileType') {
        this.$store.state.LOG && console.log('\n updateIsFile - src_type / val : ', val)
        this.is_file = val.is_file
        this.filetype = val.filetype
      }

      if (val.subField === 'fileExt') {
        this.$store.state.LOG && console.log('\n updateIsFile - fileExt / val : ', val)
        this.itemDoc.specs.src_type = val.fileExt
        this.filetype = val.fileExt
      }

      this.$store.state.LOG && console.log('updateIsFile / this.filetype : ', this.filetype)
    },

    //  USER AUTH  - checkUserAuth for an item --> /utils
    checkUserAuth (fieldName) {
      // this.$store.state.LOG && console.log("\ncheckUserAuth / fieldName : ", fieldName ) ;

      var canUpdateField = false

      if (this.is_create) {
        canUpdateField = true
      } else {
        var isLogged = this.$store.state.auth.isLogged
        var userId = this.$store.state.auth.user_id

        canUpdateField = this.$checkDocUserAuth(this.itemDoc, fieldName, isLogged, userId)
      }

      // this.$store.state.LOG && console.log("checkUserAuth / canUpdateField : ", canUpdateField ) ;

      return canUpdateField
    }

  }

}
</script>