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
					></v-progress-circular>
					
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

				<v-card>
					
					<!-- SETTINGS TOOLBAR -->
					<SettingsToolbar
						:itemDoc="itemDoc"
						@settings="switchSettings"
						>
					</SettingsToolbar>


					<!-- COMPONENTS FOR COMMON DOCS INFOS -->		
						<!-- v-show="!isPreview" -->
					<v-expansion-panel
						v-model="panel_infos"
						expand
						class="elevation-0"
						>

						<v-expansion-panel-content>

							<div 
								slot="header"
								>
								<v-icon small class="mr-3">
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

					<v-divider></v-divider>


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
								class="accent--text"
								slot="header"
								>
								<v-icon small color="accent" class="mr-3">
									{{ $store.state.mainIcons.add_to_parent.icon }}  
								</v-icon>
								<span>
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

				</v-card>
			</v-dialog>




			<!-- DSI DATA -->
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

							<!-- DATA TOOLBAR -->
							<v-toolbar class="elevation-0" color="white">
								
								<!-- title dataset -->
								<v-toolbar-title
									class="subheading grey--text"
									>

									<v-btn
										icon
										v-show="isPreview || add_to_parent"
										flat
										class="grey"
										dark
										small 
										:to="`/${itemDoc.specs.doc_type}/${itemDoc._id}`"
										>
										<!-- @click="goToItem()" -->

										<v-icon small>
											{{ $store.state.mainIcons[collName].icon }}
										</v-icon>
									
									</v-btn>

									
									{{ itemDoc.infos.title | truncate(30, '...') }}
									

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
										color="accent" 
										dark 
										block
										round
										outline
										class="text-lowercase"
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
													v-for="header in itemHeaders"
													:key="itemHeaders.indexOf(header)"
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
								<v-btn
									
									v-show="is_map"
									flat
									class="accent ml-2"
									dark
									small 
									round
									@click="dialog_mapping = !dialog_mapping"
									>

									<v-icon small right left>
										{{ $store.state.mainIcons.datasets.icon }}
									</v-icon>
									<v-icon small left>
										{{ $store.state.mainIcons.map_doc.icon }}
									</v-icon>
									<v-icon small left>
										{{ $store.state.mainIcons.datamodels.icon }}
									</v-icon>

								</v-btn> 
								



								<!-- DELETE ITEM FROM PARENT MENU -->
								<v-menu 
									v-if="add_to_parent"
									bottom 
									left 
									full-width
									:nudge-bottom="10"
									offset-y
									>

									<v-btn
										icon
										ml-2
										slot="activator"
										>

										<v-icon>
											{{ $store.state.mainIcons.options.icon }}
										</v-icon>

									</v-btn>

									<v-list class="pa-0">

										<!-- DELETE FROM PARENT BTN -->
										<v-list-tile
											v-if="$store.state.auth.isLogged"
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
																item_id 		: item_doc_id, 
																datasets_coll 	: 'dsi', 
																parentDoc_coll 	: 'prj',
																re_emit			: false,
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


							</v-toolbar>




							<!-- DSI DATA / MAPPING -->
							<!-- DIALOG MAPPING -->
							<v-dialog 
								v-if="is_map"
								v-model="dialog_mapping" 
								class="mx-2"
								fullscreen 
								hide-overlay 
								transition="dialog-bottom-transition"
								>

								<!-- SETTINGS TOOLBAR -->
								<SettingsToolbar
									:itemDoc="itemDoc"
									@settings="dialog_mapping = false "
									>
								</SettingsToolbar>

								<!-- DATA - HEADER MAPPER -->
								<v-card >

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

									<!-- MAPPER AS DATATABLE -->
									<v-card-text 
										class="px-5 lighten--2"
										>

										<v-data-table
											:ref="'datatable_mapping'"
											:headers="itemHeaders_Actions"
											:items="['header', 'mapper']"
											class="elevation-4 "
											hide-actions
											hide-headers
											>

											<template 
												slot="items"
												slot-scope="props"
												>

												<td 
													v-show="!isPreview"
													class="px-1"
													>
													<div class="col-titles">
														mapping
													</div>
												</td>

												<td 
													v-for="header in itemHeaders"
													:key="itemHeaders.indexOf(header)"
													class="px-1"
													>
												
													<div 
														v-if="props.item == 'header'"
														class="col-values"
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
															>
														</ViewEditDSIMapHeaders>
													</div>

												</td>

											</template>
										

										</v-data-table>
									</v-card-text>

								</v-card>
							
							</v-dialog>


							<v-divider></v-divider>
							
							<!-- DATA -->
								<!-- :loading="loading" -->
							<v-data-table
								:ref="'datatable'"
								:headers="itemHeaders_Actions"
								:items="item_data"
								:pagination.sync="pagination"
								:total-items="total_items"
								class="elevation-0 scroll_data"
								:rows-per-page-items="[5, 10, 25]"
								:hide-headers="isPreview"
								>
								<!-- v-scroll="onScroll" -->

								<!-- <v-progress-linear 
									slot="progress" 
									color="accent" 
									indeterminate>
								</v-progress-linear> -->

								<!-- <scroll-sync horizontal></scroll-sync> -->

								<template 
									slot="items"
									slot-scope="props"
									>

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

									<td 
										v-for="header in itemHeaders"
										:key="itemHeaders.indexOf(header)"
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

						</v-card-text>
					</v-card>
				</v-flex>

			</v-layout>



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
						<code>{{ itemDoc }}</code>
						<hr>

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

import ObjectFormatterCreate from "~/utils/ObjectFormatterCreate.js"
import checkDocUserAuth from "~/utils/checkDocUserAuth.js"

import ItemsListDI from '~/components/UI/itemsList_dataIterator.vue'

import ItemToolbar from '~/components/UI/itemToolbar.vue'
import ItemDocUses from '~/components/UI/itemDocUses.vue'
import ItemDocInfos from '~/components/UI/itemDocInfos.vue'

import SettingsToolbar from '~/components/UI/settingsToolbar.vue'

import ViewEditDSIMapHeaders from '~/components/UI/viewEditDSI_mapHeaders.vue' 


export default {

	props : [ 

		// "flex_vars",			// 
		"is_create",			// view | create
		"is_preview",			// 

		"canEdit",

		"is_map",
		"parent_map",
		"parentDoc_id",
		"parentDoc_coll",
		"parentDoc_dmt",
		"parentDoc_dmf_list",

		"coll",

		"item_doc", 			// complete item infos
		
		"find_item",
		"item_doc_id",

		// "is_debug",

		"is_switch",
		"no_toolbar",

		"add_to_parent",
		"parent_scroll"

	],

	components : {
		ItemToolbar,
		ItemDocInfos,
		ItemsListDI,
		ItemDocUses,
		SettingsToolbar,
		ViewEditDSIMapHeaders,
	},

	middleware : ["getListItems"],
	meta : {
		collection 	: [
			'tag'
		],
		level : 'get_list',
	},

	created () {

		console.log("\n- viewEditDSI / created ---> item_doc : ", this.item_doc ) ;
		
		// get data
		if ( this.find_item ) {

			console.log("- viewEditDSI / created OK ---> need to get item from API ... " ) ;
			this.itemId  = this.item_doc_id 

			// change pagination params in store[coll]
			var pagination_params 	= {
				page		: 1 ,
				per_page 	: 5,
			}

			// load DSI data 
			this.get_FData_fromApi( pagination_params ) ;

		}

		else {

			console.log("- viewEditDSI / created OK ---> item_doc exists... " ) ;
			this.itemDoc 		= this.item_doc ;
			this.itemId 		= this.item_doc._id ;
			this.list_TAG_oids 	= this.item_doc.datasets.tag_list ;

			this.itemDoc_loaded = true ;

			// this.canEdit = this.checkUserAuth(this.parentField+'.'+this.subField)
			// this.canEdit = this.checkUserAuth(this.parentFieldslist)

			this.is_file 	= ( this.coll == "dsi" ) ? true : false ; 
			this.is_file 	= this.preloadIsFile() ; 
			this.filetype 	= this.preloadFileType() ; 
		}
		
	},


	data () {

		return {
			
			alert		: null,

			offsetTop 		: 0,
			offsetLeft 		: 0,
			dataTable 		: undefined,
			// dataTable_map 	: undefined,

			isPreview 	: this.is_preview,
			no_subField : true,
			isSettings 	: false,

			dialog			: false,
			dialog_del 		: false,
			dialog_mapping 	: false,

			panel_uses		: [false],
			panel_infos		: [true],
			panel_lib_tag	: [false],
			
			collName 	: this.$store.state.collectionsNames[this.coll],

			itemDoc_loaded	: false,
			itemDoc			: this.item_doc,
			itemId 			: '', 
			list_TAG_oids	: [],

			// item_data 		: this.item_doc.data_raw.f_data, 
			// item_headers 	: this.item_doc.data_raw.f_col_headers, 


			is_file 			: null,
			filetype 			: null,

			// data table : loading, pagination 
			loading 		: false,
			pagination 		: {

			},
			total_items		: 0, // per page must be in [0, 2, 5, 10, 20, 25, 50, 100]

			// data table - edit/create item
			editedIndex		: -1,
			// editedItem		: {},
			// defaultItem		: this.fill_defaultItem(),


			blockFullSize 		: "xs12",
			blockPartSize 		: "xs10",
			blockSwitchSize 	: "md6 offset-md3",

			parentFieldsSize 	: "xs2 ma-0 pa-0",
			parentBotPadding	: " pb-0 pt-1",
			parentNoBotPadding	: " py-0",

			valueNoPadding 		: " ma-0 pa-0",
			valueLeftPadding 	: " ma-0 py-0 pr-0 pl-2",

			createHeight  		: "",
			createSize			: 12

		}
	},

	computed : {

		formTitle () {
			return this.editedIndex === -1 ? 'item_new' : 'item_edit' ;
		},

		item_data () {
			return this.itemDoc.data_raw.f_data
		},

		itemHeaders() {
			return this.item_headers() ;
		},

		itemHeaders_Actions() {
			// return this.item_headers(true) ;
			return this.item_headers( !this.isPreview ) ;
		},

		parentPadding () {
			return (this.isPreview) ? this.parentNoBotPadding : this.parentBotPadding ;
		},



		// SWITCH
		valueSwitch () {
			// return (!this.is_preview && this.is_switch) ? this.blockPartSize : this.blockSwitchSize ;
			if(this.is_switch){
				return (this.isPreview) ? this.blockSwitchSize : this.blockPartSize ;
			}
			else {
				return this.blockFullSize
			}
		},

		// BLOCK SIZE 
		valueBlockSize () {
			return (this.is_preview) ? this.blockFullSize : this.blockPartSize ;
		},

		valuePadding () {
			return (this.is_preview) ? this.valueNoPadding : this.valueLeftPadding ;
		},

	},


	watch: {

		item_doc : {

			immediate : true,
			handler ( newVal, oldVal) {

				console.log( "\nVE DSI / watch ~ item_doc / newVal : \n", newVal )
				// console.log( "\nVE PRJ / watch ~ item_doc / oldVal : \n", oldVal )
			
				if (newVal) {
					this.itemDoc 		= newVal
					// update local TAG list 
					this.list_TAG_oids = newVal.datasets.tag_list ; 
				}

			}
		},

		parent_scroll : {

			immediate : true,
			handler (newVal, oldVal ) {
				if ( this.dataTable !== undefined ) {
					this.dataTable.scrollLeft = newVal
					// if (this.is_map) {
					// 	this.dataTable_map.scrollLeft = newVal
					// }
				}
			}

		},

		loading : {

			immediate : true,
			handler (newVal, oldVal ) {
				// console.log( "\nVE DMT / watch ~ loading / newVal : \n", newVal )
				
				// var doc_id = "from_VE_DSI"
				// if ( this.itemId == undefined || this.itemId == "" ) {
				// 	var doc_id = "from_VE_DSI"
				// }
				// else {
				// 	var doc_id = this.itemId
				// }
				var input = {
					loading : newVal,
					// doc_id	: doc_id,
					coll	: this.coll
				}
				// this.$emit("update_loading", newVal)
				this.$emit("update_loading", input)
			}

		},

		dialog (val) {
			val || this.close()
		},
	
		is_preview : {
			immediate : true,
			handler( newVal, oldVal) {
				console.log( "\nVE DMT / watch ~ is_preview / newVal : \n", newVal )
				this.isPreview = newVal ;
			}
		},

		// TO VERIFY !!!!
		pagination: {

			handler () {

				console.log("\n...VDSI pagination handler ... ")
				console.log("...VDSI pagination - this.pagination : ", this.pagination)

				// change pagination params in store[coll]
				var pagination_params 	= {
					page		: this.pagination.page,
					per_page 	: this.pagination.rowsPerPage,
					total_items : this.pagination.totalItems,
					sort_by 	: this.pagination.sortBy,
					descending 	: this.pagination.descending,
				}
				console.log("...VDSI pagination - pagination_params : ", pagination_params)

				// call method for dispatch from main store
				this.get_FData_fromApi(pagination_params)
				
			},
			deep: true
		}
	},

	methods: {
		
		onScroll (e) {
			// console.log("... onScroll - e.target : ", e.target ) ;
			var scroll_data = e.target ;
			// this.offsetTop 	= scroll_data.scrollTop ;
			this.offsetLeft = scroll_data.scrollLeft ;
			this.$emit('scrollTable', { 
				left : scroll_data.scrollLeft 
			}) 
		},

		// TOOLBAR SWITCH
		switchPreview() {
			this.isPreview = !this.isPreview ;
		},
		switchSettings() {
			this.isSettings = !this.isSettings ;
		},

		getHeader_DMF(dsi_header) {
			
			// console.log("... getDMF_openlevel - dmf_id : ", dmf_id ) ;

			var dsi_header_dmf 	= undefined ; 
			var header_mapper 	= this.parent_map.find(obj => {
				return obj.dsi_header === dsi_header
			})
			// console.log(" getDMF_openlevel / dmf_mapper : ", dmf_mapper )
			if (header_mapper != undefined) {
				dsi_header_dmf 	= header_mapper
			}

			return dsi_header_dmf
		},

		// ----------------------------- //
		// AXIOS CALL
		// ----------------------------- //

		deleteChild( item_infos ) {
			console.log("\n...viewEditDSI - deleteChild / item_infos : \n ", item_infos)

			var input = {
				add_or_delete 	: "delete_from_list",
				item_id_to_add 	: item_infos.item_id,
				datasets_coll 	: item_infos.datasets_coll,
				parentDoc_coll 	: item_infos.parentDoc_coll,
				re_emit			: item_infos.re_emit,
			}
			console.log("viewEditDSI / input : ", input )

			this.$emit('update_parent_dataset', input )
		},


		// ADD DELETE ITEM FROM
		form ( input ) {

			var datasets_coll 	= input.datasets_coll ;
			var item_id_to_add 	= input.item_id_to_add ;
			var add_or_delete 	= input.add_or_delete ;

			return {
				"field_to_update" 	: "datasets." + datasets_coll + "_list" ,
				"field_value"		: item_id_to_add,
				"add_to_list"		: add_or_delete,
				"doc_type"			: datasets_coll 
			}
		},

		// UPDATE PRJ DOCUMENT
		update_parent_list ( input ) {

			console.log("update_parent_list / input : ", input )

			this.loading 		= true
			// this.$emit('update_loading', true )

			// load values as pseudoForm
			var pseudoForm	= this.form( input ) ;
			var pseudoFormData 	= [ pseudoForm ] ;
			console.log("update_parent_list / pseudoFormData : ", pseudoFormData )

			// dispatch action from store for update
			this.$store.dispatch('updateItem', {
				coll	: this.coll,
				doc_id  : this.itemId,
				form 	: pseudoFormData, 
			})
			
			.then(result => {
				this.alert 		= { type: 'success', message: result.msg }
				this.loading 	= false
				// this.$emit('update_loading', false )
				
				// update current in store
				console.log("update_parent_list - result : ", result )
				this.$store.commit(`${this.coll}/set_current`, result );

			})
			
			.catch(error => {
				console.log("submit / error... : ", error ) ; 
				this.loading = false
				// this.$emit('update_loading', false )
				this.alert = {type: 'error', message: "login error" }
				if (error.response && error.response.data) {
					this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
				}
			})

		},


		// UPDATE PRJ DOCUMENT MAPPING
		// update_mapping (item_infos) {
			
		// 	console.log("\n...viewEditDSI - update_mapping / item_infos : \n ", item_infos)
		// 	var input = {

		// 		doc_id	: this.parentDoc_id, 
		// 		coll 	: this.parentDoc_coll, 
				
		// 		form 	: [
		// 			{
		// 				is_mapping		: true,
		// 				field_to_update	: "mapping.dsi_to_dmf",
		// 				id_dsi			: this.itemId,
		// 				id_dmf			: item_infos.item_id,
		// 				dsi_header		: item_infos.dsi_header,
		// 			}
		// 		]

		// 	}
		// 	console.log("viewEditDSI - update_mapping / input : ", input )

		// 	this.$store.dispatch('updateMapping', input )

		// },
	

		get_FData_fromApi (pag_params) {

			console.log("\n...VDSI get_FData_fromApi ... ")

			this.loading = true

			// AXIOS CALL OR DISPATCH 
			var call_input = {
				collection 		: this.coll,
				doc_id			: this.itemId,
				f_data_params 	: pag_params,
			}

			this.$store.dispatch('getOneItem', call_input )

			.then( result => {
				
				console.log("VDSI get_FData_fromApi / result: ", result ) ; 
				
				this.itemDoc 		= result.data 
				this.list_TAG_oids 	= result.data.datasets.tag_list 

				this.total_items 	= result.data.data_raw.f_data_count


				this.pagination.page 		= result.query.page_args.page
				this.pagination.rowsPerPage = result.query.page_args.per_page
				this.pagination.sortBy 		= result.query.query_args.sort_by

				this.loading 		= false
				this.alert   		= {type: 'success', message: result.msg}

				this.itemDoc_loaded	= true 
		

				// add scroll event listener on datatable 
				// detect scroll : cf : https://forum.vuejs.org/t/how-to-detect-body-scroll/7057/5   
				// sync scroll : cf : https://github.com/asvd/syncscroll/blob/master/syncscroll.js 
				var dataTable = this.$refs.datatable ; //) ;
				// console.log("- viewEditDSI / then 1 - dataTable : ", dataTable ) ;

				if ( dataTable !== undefined ) {
					console.log("- viewEditDSI / then 2 - dataTable : ", dataTable ) ;
					// component selector : https://forum.vuejs.org/t/help-with-selector/18652/11 
					var dt = dataTable.$el.querySelector(".v-table__overflow") 
					console.log("- viewEditDSI / then 3 - dt : ", dt ) ;
					dt.addEventListener('scroll', this.onScroll);
					this.dataTable = dt

					// if ( this.is_map ){
					// 	var dataTable_map = this.$refs.datatable_mapping ; //) ;
					// 	var dt_map = dataTable_map.$el.querySelector(".v-table__overflow") 
					// 	console.log("- viewEditDSI / then 4 - dt_map : ", dt_map ) ;
					// 	dt_map.addEventListener('scroll', this.onScroll);
					// 	this.dataTable_map = dt_map
					// }
				}

				return "ok"

			})

			.catch( error => {

				console.log("VDSI get_FData_fromApi / submit - error... : ", error ) ; 
				
				this.loading = false

				// this.alert = {type: 'error', message: "login error" }
				if (error.response && error.response.data) {
					this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
				}

				return "error"

			})

		},


		// ----------------------------- //
		// HEADERS COLUMNS
		// ----------------------------- //
		item_headers (is_actions) {

			var headers 	= [] ;
			var top_head 	= { text: 'Actions', value: 'name', sortable: false }

			// only create headers if item is loaded
			if ( this.itemDoc_loaded ) {

				const raw_headers = this.itemDoc.data_raw.f_col_headers ;
				console.log("item_headers / raw_headers : ", raw_headers)

				for (let header in raw_headers ) {
					// console.log("item_headers / header : ", header)
					var header_ = {
						value 	: raw_headers[header].f_coll_header_val,
						text	: raw_headers[header].f_coll_header_text,
					};
					headers.push(header_)
				}

				if (is_actions){
					headers.unshift(top_head)
				}
			}
			return headers
		},



		//  ITEM FOR EDITION / CREATION
		editedItem()  {

			return {
				name: '',
				calories: 0,
				fat: 0,
				carbs: 0,
				protein: 0
			}
		},

		defaultItem()  {

			var emptyItem = {};
			const headers = this.item_headers() ;
			console.log("\nfill_defaultItem / headers : ", headers)

			for (header in headers){
				emptyItem[header.value] = 'empty' ;
			}

			console.log("fill_defaultItem / emptyItem : ", emptyItem)
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

			var isFile = false ;

			if ( this.coll == "dsi" ) {

				if ( this.itemDoc.specs.src_type != "API") {
				// if ( this.item_doc.specs.src_type != "API") {
					isFile = true

				}
			}
			return isFile
		},

		preloadFileType () {
			var filetype ;
			if ( this.coll == "dsi"){
				// filetype = this.item_doc.specs.src_type
				filetype = this.itemDoc.specs.src_type
			}
			return filetype
		},

		updateIsFile(val) {
			
			// if( val.subField == "src_type"){
			if( val.subField == "switchFileType"){
				console.log("\n updateIsFile - src_type / val : ", val)
				this.is_file = val.is_file ;
				this.filetype = val.filetype ;
			}

			if( val.subField == "fileExt"){
				console.log("\n updateIsFile - fileExt / val : ", val)
				this.itemDoc.specs.src_type = val.fileExt ;
				this.filetype = val.fileExt ;
			}
			
			console.log("updateIsFile / this.filetype : ", this.filetype)

		},



		//  USER AUTH  - checkUserAuth for an item --> /utils
		checkUserAuth (field_name) {

			console.log("\ncheckUserAuth / field_name : ", field_name ) ;
			// console.log("checkUserAuth ...\n", this.item_doc.public_auth ) ;

			var can_update_field 	= false  ;
			
			if (this.is_create) {
				can_update_field 	= true  ;
			}

			else {
				var isLogged 			= this.$store.state.auth.isLogged ;
				var user_id 			= this.$store.state.auth.user_id ;

				// can_update_field 		= checkDocUserAuth(this.item_doc, field_name, isLogged, user_id)
				can_update_field 		= checkDocUserAuth(this.itemDoc, field_name, isLogged, user_id)
			}

			console.log("checkUserAuth / can_update_field : ", can_update_field ) ;

			return can_update_field
		},

	}


}

</script>