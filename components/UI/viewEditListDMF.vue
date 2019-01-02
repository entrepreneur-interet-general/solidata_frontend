<style scoped>

	tr th {
		/* text-align : center ; */
		/* border-left: thin dashed grey ; */
	}

	th, td {
		border-right: thin dashed grey ;
		max-width: 220px !important; 
	}
	td .col-values {
		width: 210px; 
		overflow-y: hidden ;
		text-align : center ;
		display: inline-block;
		vertical-align: middle;
	}
	td .col-titles {
		/* max-width: 70px;  */
		width: 100px; 
		text-align : center ;
		display: inline-block;
		vertical-align: middle;
		/* overflow-y: hidden; */
	}

	.dmf-title-btn {
		max-width: 210px !important; 
		width: 210px; 
		overflow-y: hidden ;
		text-align : center ;
		/* display: inline-block; */
	}

	.no-scroll {
		-ms-overflow-style: none;  /* IE 10+ */
		overflow: -moz-scrollbars-none;  /* Firefox */
	}
	.no-scroll::-webkit-scrollbar { 
		display: none;  /* Safari and Chrome */
	}

</style>

<template>

	<div class="pa-0 ma-0">


		<!-- DEBUG  -->
		<v-layout 
			v-if="$store.state.is_debug"
			row 
			>

			<v-flex class="xs12">

				<v-alert
					:value="true"
					type="error"
					class="text-xs-left"
					>

					---- DEBUG component - viewEditListDMF ----
					<hr>

					<!-- list_DMF_full_pivoted - <code>{{ list_DMF_full_pivoted }}</code> -->
					<hr>
					<!-- list_DMF_full - <code>{{ list_DMF_full }}</code> -->
					<hr> 
					DMF_headers - <br> <code>{{ DMF_headers }}</code>

				</v-alert>

			</v-flex>

		</v-layout>


		<!-- LIST DMF AS DATA TABLE STYLE-->
		<v-layout row wrap>
			

			<!-- DMF_LIST as DATA TABLE-->
			<v-flex xs12 pt-0>

				<v-card 
					flat
					class=""
					color=""
					>
					<v-card-text class="pa-0">

						<!-- DATA TOOLBAR -->
						<v-toolbar 
							v-if="!no_toolbar"
							class="elevation-0" 
							color="white"
							>
							
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
									:to="`/${item_doc.specs.doc_type}/${item_doc._id}`"
									>
									<!-- @click="goToItem()" -->

									<v-icon small>
										{{ $store.state.mainIcons[collName].icon }}
									</v-icon>
								
								</v-btn>
								
								{{ item_doc.infos.title | truncate(30, '...') }}

								<!-- - ScT : {{ offsetTop }} -->
								<!-- - ScL : {{ offsetLeft }} -->

								<!-- - {{ item_doc.specs.doc_type }} / {{ item_doc._id }} -->

							</v-toolbar-title>
							
							<v-spacer></v-spacer>

							<v-progress-circular 
								v-show="loading" 
								color="accent" 
								indeterminate
								>
							</v-progress-circular>

							<!-- OPEN DMF LIBRARY -->
							<v-btn 
								v-show="!isPreview"
								color="accent" 
								dark 
								round
								outline
								@click="switchSettings"
								class="text-lowercase ml-2"
								>

								<v-icon class="mr-2">
									{{ $store.state.mainIcons.create.icon }}  
								</v-icon>

								{{ $t( 'global.dmf_add', $store.state.locale)  }}

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
								
								<v-tooltip 
									slot="activator"
									top 
									>
									<v-btn
										:disabled="!checkUserAuth('delete_item')"
										icon
										ml-2
										slot="activator"
										>
										<v-icon>
											{{ $store.state.mainIcons.options.icon }}
										</v-icon>
									</v-btn>
									<span>
										{{ $t(`global.open_options`, $store.state.locale) }}
									</span>
								</v-tooltip>

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
												{{ $t(`projects.del_dmt`, $store.state.locale) }}
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
													{{ $t(`projects.del_dmt`, $store.state.locale) }}
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
															item_id 		: item_doc._id, 
															datasets_coll 	: 'dmt', 
															parentDoc_coll 	: 'prj',
															re_emit			: true,
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

						<v-divider></v-divider>

						<!-- DATA TABLE -->
						<v-data-table
							:ref="'datatable'"
							:headers="list_headers_selector"
							:items="list_DMF_selector"
							class="elevation-0"
							:loading="loading"
							:pagination.sync="paginationDMF"
							hide-actions
							hide-headers
							>
				
							<template
								slot="items" 
								slot-scope="props"
								>
							
								<td
									v-for="dmf in list_DMF_raw_selector"
									:key="list_DMF_raw_selector.indexOf(dmf)"
									:class="`px-1 ${ (list_DMF_selector.indexOf(props.item) == 0) ? 'font-weight-bold' : '' } `"
									style="text-align: center;"
									>

									<!-- first column  -->
									<div 
										v-if=" dmf['_id'] == '_' && !isPreview"
										class="col-titles font-weight-bold"
										>
										<!-- {{ dmf }} -->
										<!-- {{ dmf["_id"] }} -->

										{{ props.item[ dmf["_id"] ] }}

									</div>

									<!-- delete row -->
									<div 
										v-else-if="list_DMF_selector.indexOf(props.item) == 1"
										class="col-values"
										>
										
										<!-- DELETE DMF BTN -->
										<v-tooltip top>
											<v-btn
												slot="activator"
												v-if="!isPreview"
												:disabled="!checkUserAuth('delete_item')"
												icon
												small
												@click="deleteChild( { 
													item_id 		: props.item[dmf._id], 
													datasets_coll 	: 'dmf', 
													parentDoc_coll 	: 'dmt', 
													re_emit			: false,
												} ) "
												>
												<v-icon
													color="accent"
													>
													{{ $store.state.mainIcons.delete.icon }}
												</v-icon>
											</v-btn>
											<span>
												{{ $t(`datamodels.delete`, $store.state.locale) }}
											</span>
										</v-tooltip>

										<!-- DEBUG -->
										<span v-if="$store.state.is_debug">
											<br>
											- props.item[ dmf._id ] : <code>{{ props.item[ dmf._id ] }}</code>
											- item_doc.specs.doc_type : <code>{{ item_doc.specs.doc_type }}</code>
											- item_doc._id : <code>{{ item_doc._id }}</code>
										</span>

									</div>

									<!-- columns for each entry in list_DMF_full_pivoted -->
									<div 
										v-else
										class="col-values"
										>
										
										<v-tooltip 
											top
											v-if="list_DMF_selector.indexOf(props.item) == 0"
											>
											<v-btn
												slot="activator"
												flat
												block
												class="text-lowercase ma-0 dmf-title-btn"
												:to="'/dmf/'+dmf._id"
												>
												<v-icon
													left
													color="primary"
													small
													>
													{{ $store.state.mainIcons.datamodel_fields.icon }}
												</v-icon>
												{{ props.item[ dmf["_id"] ] | truncate( 20, '...' ) }}
											</v-btn>
											<span>
												{{ $t(`datamodel_fields.go_to`, $store.state.locale) }}
											</span>
										</v-tooltip>

										<span
											v-else
											>
											{{ props.item[ dmf["_id"] ] | truncate( 100, '...' ) }}
										</span>

										<span v-if="$store.state.is_debug">
											<br>
											dmf id : <code>{{ dmf["_id"] }}</code>
										</span>

									</div>

								</td>
								
								
							</template>


						</v-data-table>

					</v-card-text>
				</v-card>
			</v-flex>
			

			<!-- DMF_LIST vs OPEN_LEVEL MAPPING -->
			<v-flex 
				v-if="is_map"
				class="xs12"
				>


				<!-- COMPONENTS FOR COMMON DOCS USES -->		
				<v-expansion-panel
					v-model="panel_map"
					expand
					class="elevation-0 mt-2"
					>
					<v-expansion-panel-content>

						<!-- DATA DMF_LIST OPEN_LEVEL TOOLBAR -->
						<v-toolbar-title 
							class="subheading grey--text"
							slot="header"
							>

							<v-icon small class="px-2">
								{{ $store.state.mainIcons.datamodels.icon }}
							</v-icon>
							<v-icon small class="accent--text">
								{{ $store.state.mainIcons.map_doc.icon }}
							</v-icon>
							<v-icon small class="px-2">
								{{ $store.state.mainIcons.view.icon }}
							</v-icon>

							<span>
								{{ $t(`global.open_level_show`, $store.state.locale ) }}
							</span>
							
						</v-toolbar-title>

						<v-card 
							flat
							class=""
							color=""
							>
							<v-card-text class="pa-0">


								<!-- DMF_LIST OPEN_LEVEL title dataset -->
								<!-- <v-divider></v-divider>

								<v-toolbar 
									v-show="!isPreview "
									class="elevation-0" 
									color="white"
									>
									
									<v-toolbar-title
										class="subheading grey--text"
										dense
										>

										<v-icon small class="px-2">
											{{ $store.state.mainIcons.datamodels.icon }}
										</v-icon>
										<v-icon small class="accent--text">
											{{ $store.state.mainIcons.map_doc.icon }}
										</v-icon>
										<v-icon small class="px-2">
											{{ $store.state.mainIcons.view.icon }}
										</v-icon>
										
										{{ $t(`global.open_level_show`, $store.state.locale ) }}

									</v-toolbar-title>

								</v-toolbar> -->


								<v-divider></v-divider>


								<!-- DMF_LIST OPEN_LEVEL DATA TABLE -->
								<v-data-table
									:ref="'datatable_openlevel'"
									:headers="list_headers_selector"
									:items="list_DMF_first_row_pivoted"
									class="elevation-0"
									:loading="loading"
									:pagination.sync="paginationDMF"
									hide-actions
									hide-headers
									>
						
									<template
										slot="items" 
										slot-scope="props"
										>
									
										<td
											v-for="dmf in list_DMF_raw_selector"
											:key="list_DMF_raw_selector.indexOf(dmf)"
											:class="`px-1 ${ (list_DMF_first_row_pivoted.indexOf(props.item) == 0) ? 'font-weight-bold' : '' } `"
											style="text-align: center;"
											>

											<!-- first column  -->
											<!-- open_level_show -->
											<div 
												v-if=" dmf['_id'] == '_' && !isPreview"
												class="col-titles font-weight-bold"
												>
												
												<v-icon 
													small
													color="primary" 
													>
													{{ $store.state.mainIcons.view.icon }}
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
														{{ $t(`projects.open_level_show`, $store.state.locale) }}
													</span>
												</v-tooltip>

											</div>


											<!-- columns for each entry in list_DMF_full_pivoted -->
											<div 
												v-else
												class="col-values pl-0 pr-2 "
												>

												<!-- OPEN LEVEL CHOICE INPUT -->
												<ViewEditDMFol
													:dmt="item_doc_id[0].oid_dmt"
													:dmf="dmf"
													:is_loading="is_loading"
													:parent_map="parent_map"
													:dmf_ol_val="getDMF_openlevel(dmf._id)"
													:parentDoc_id="parentDoc_id"
													:parentDoc_coll="parentDoc_coll"
													:canEdit="canEdit_ol"
													>
												</ViewEditDMFol>

											</div>

										</td>
										
										
									</template>

								</v-data-table>

							</v-card-text>
						</v-card>

					</v-expansion-panel-content>
				</v-expansion-panel>

			</v-flex>



		</v-layout>



	</div>

</template>



<script>

import checkDocUserAuth from "~/utils/checkDocUserAuth.js"

import ViewEditDMFol from '~/components/UI/viewEditDMF_openlevel.vue' 

export default {

	props : [
		
		"listDMF",
		"isPreview",
		"is_loading",

		"item_doc",
		"item_doc_id",

		"panel_open",
		
		"is_map",
		"parent_map",
		"canEdit_ol",

		"parentDoc_id",
		"parentDoc_coll",

		"no_toolbar",

		"add_to_parent",
		"parent_scroll"

	],

	components : {
		ViewEditDMFol,
	},

	created () {

		console.log("\n- viewEditListDMF / created ..." ) ;
		console.log("- viewEditListDMF / listDMF : ", this.listDMF ) ;
		console.log("- viewEditListDMF / canEdit_ol : ", this.canEdit_ol ) ;

		if ( !Array.isArray(this.listDMF) || this.listDMF.length ) {

			// map list DMF to list of DMF oids
			this.list_DMF_oids = this.listDMF.map( function (obj) {
				return obj.oid_dmf
			}); 
			console.log("- viewEditListDMF / list_DMF_oids : ", this.list_DMF_oids ) ;

			// get complete data for every DMF in list_DMF_oids => methods
			this.get_docs_fromApi() ; 

		}
	},

	data () {

		return {
			
			loading : false,
			alert	: "",

			coll 		: "dmf",
			tab 		: 'datamodel_fields',
			collName 	: this.$store.state.collectionsNames['dmt'],

			paginationDMF : {
				rowsPerPage: -1 
			},

			dialog_del 	: false,
			panel_map	: [true], 

			offsetTop 		: 0,
			offsetLeft 		: 0,
			dataTable 		: undefined,
			dataTable_ol 	: undefined,

			// DMF references
			DMF_list_loaded : false,
			list_DMF_oids : [],
			list_DMF_full : [],

			// DMF data for datatable
			listDMF_extended		: [],
			DMF_headers 			: [],
			DMF_headers_light 		: [],
			listDMF_light			: [],
			list_DMF_full_pivoted 	: [],
			list_DMF_first_row_pivoted : [],

			// empty column (first column on the left of the datatable)
			empty_column : {
				_id 	: "_",
				infos 	: {
					title : "",
					description : "description"
				},
				public_auth : {
					open_level_edit : "open_level_edit", 
				},
				data_raw 	: {
					f_code 			: "f_code", 
					f_type 			: "f_type", 
					f_object 		: "f_object", 
					f_comments 		: "f_comments", 
					f_is_required 	: "f_is_required", 
				},
			}, 
			empty_column_normalized : {
				"_id" 							: "_",
				"infos.title" 					: "title",

				"delete_child"					: "delete_child",

				"infos.description" 			: "description",
				"public_auth.open_level_edit" 	: "open_level_edit", 
				"data_raw.f_code" 				: "f_code", 
				"data_raw.f_type" 				: "f_type", 
				"data_raw.f_object" 			: "f_object", 
				// "data_raw.f_comments" 			: "f_comments", 
				"data_raw.f_is_required" 		: "f_is_required", 

			}, 


		}
	},

	computed : {

		list_DMF_selector() {
			return (this.isPreview) ? this.list_DMF_first_row_pivoted : this.list_DMF_full_pivoted ;
		},

		list_headers_selector() {
			return (this.isPreview) ? this.DMF_headers_light : this.DMF_headers ;
		},

		list_DMF_raw_selector() {
			return (this.isPreview) ? this.listDMF_light : this.listDMF_extended ;
		},
	},

	watch: {

		parent_scroll : {

			immediate : true,
			handler (newVal, oldVal ) {
				if ( this.dataTable !== undefined ) {
					this.dataTable.scrollLeft = newVal
					if (this.is_map) {
						this.dataTable_ol.scrollLeft = newVal
					}
				}
			}

		},

		loading : {

			immediate : true,
			handler (newVal, oldVal ) {
				// console.log( "\nVE DMT / watch ~ loading / newVal : \n", newVal )
				
				// var doc_id = "from_VE_DMF_list"
				var input = {
					loading : newVal,
					// doc_id	: doc_id, //"from_VE_DMF_list",
					coll	: "dmf"
				}
				// this.$emit("update_loading", newVal)
				this.$emit("update_loading", input)
			}

		},

		listDMF : {

			immediate : true,
			handler( newVal, oldVal) {

				console.log( "\nVE DMT / watch ~ listDMF / newVal : \n", newVal )
				console.log( "\nVE DMT / watch ~ listDMF / oldVal : \n", oldVal )

				if ( !Array.isArray(newVal) || newVal.length ) {

					this.loading = true ; 

					// map list DMF to list of DMF oids
					this.list_DMF_oids = newVal.map( function (obj) {
						return obj.oid_dmf
					}); 
					console.log("- viewEditListDMF / list_DMF_oids : ", this.list_DMF_oids ) ;

					// get complete data for every DMF in list_DMF_oids => methods
					this.get_docs_fromApi() ; 

				}

			}
		},
	},

	methods: {

		getDMF_openlevel(dmf_id) {
			
			// console.log("... getDMF_openlevel - dmf_id : ", dmf_id ) ;

			var dmf_ol_value = ''
			var dmf_mapper = this.parent_map.find(obj => {
				return obj.oid_dmf === dmf_id
			})
			// console.log(" getDMF_openlevel / dmf_mapper : ", dmf_mapper )
			if (dmf_mapper != undefined) {
				dmf_ol_value = dmf_mapper.open_level_show
			}

			return dmf_ol_value
		},

		//  USER AUTH  - checkUserAuth for an item --> /utils
		checkUserAuth (field_name) {

			// console.log("\ncheckUserAuth / field_name : ", field_name ) ;

			var can_update_field 		= false  ;
			
			if (this.is_create) {
				can_update_field 		= true  ;
			}

			else {
				var isLogged 			= this.$store.state.auth.isLogged ;
				var user_id 			= this.$store.state.auth.user_id ;

				can_update_field 		= checkDocUserAuth(this.item_doc, field_name, isLogged, user_id)
			}

			// console.log("checkUserAuth / can_update_field : ", can_update_field ) ;

			return can_update_field
		},

		onScroll (e) {
			// console.log("... onScroll - e.target : ", e.target ) ;
			var scroll_data = e.target ;
			// this.offsetTop 	= scroll_data.scrollTop ;
			this.offsetLeft = scroll_data.scrollLeft ;
			this.$emit('scrollTable', { 
				left : scroll_data.scrollLeft 
			}) 
		},

		switchSettings() {
			// console.log("settingsToolbar - switchSettings / this.is_settings : ", this.is_settings )
			this.$emit('settings')
		},

		goToItem() {
			// redirect to edit-preview page 
			return this.$router.push(`/${this.item_doc.specs.doc_type}/${this.item_doc._id}`)
		},


		deleteChild( item_infos ) {
			console.log("\n...viewEditListDMF - deleteChild / item_infos : \n ", item_infos)

			var input = {
				add_or_delete 	: "delete_from_list",
				item_id_to_add 	: item_infos.item_id,
				datasets_coll 	: item_infos.datasets_coll,
				parentDoc_coll 	: item_infos.parentDoc_coll,
				re_emit			: item_infos.re_emit,
			}
			console.log("deleteChild / input : ", input )

			this.$emit('update_parent_dataset', input )
		},


		openDMF_lib_parent () {

			console.log("\n...viewEditListDMF - openDMF_lib_parent ")

			// send data back to parent component 
			this.$emit('input')
		},

		// utils to pivot data to datatable format
		pivotData (data_from_API) {

			console.log("\n...viewEditListDMF - pivotData / data_from_API (A) : ", data_from_API);

			// var for internal purposes
			var data_new_headers 	= [] ;
			var data_pivoted 		= [] ;

			this.listDMF_light = data_from_API.slice(0) ;

			// add empty_column_normalized to beginning of data_from_API
			data_from_API.unshift( this.empty_column_normalized ) ;
			// console.log("...viewEditListDMF - pivotData / data_from_API (B) : ", data_from_API);
			this.listDMF_extended = data_from_API ;


			// --------------------------------------------- //
			// loop through data_to_pivot => headers / columns
			// --------------------------------------------- //
			for (let dmf in data_from_API ) {
				
				// console.log("\n...viewEditListDMF - pivotData / dmf (C) : ", dmf);
				// console.log("...viewEditListDMF - pivotData / data_from_API[dmf]['infos.title'] (D) : \n", data_from_API[dmf]["infos.title"]);
	
				// create new header
				var temp_header = {
					value		: data_from_API[dmf]["_id"], 
					text 		: data_from_API[dmf]["infos.title"], 
					// text 		: data_from_API[dmf]["_id"], 
					sortable 	: false,
					align		: 'center',
				};
				// console.log("...viewEditListDMF - pivotData / temp_header.value : ", temp_header.value);

				// push DMF oid in data_new_headers
				data_new_headers.push( temp_header )

			};

			// send datatable_headers back
			// console.log("\n...viewEditListDMF - pivotData / data_new_headers : ", data_new_headers);
			this.DMF_headers 		=  data_new_headers ;

			var temp_DMF_light		=  data_new_headers.slice(0) ;
			temp_DMF_light.shift() ; 
			// console.log("\n...viewEditListDMF - pivotData / temp_DMF_light : ", temp_DMF_light);
			this.DMF_headers_light	= temp_DMF_light ; 
			// console.log("...viewEditListDMF - pivotData / this.DMF_headers_light : ", this.DMF_headers_light);


			// --------------------------------------------- //
			// loop through fields to create data_pivoted => rows
			// --------------------------------------------- //

			// console.log("...viewEditListDMF - pivotData / this.empty_column_normalized : ", this.empty_column_normalized );
			// for (var field in   ) {
			for (var field of Object.keys(this.empty_column_normalized) ) {
				
				// console.log("\n----- viewEditListDMF - pivotData / field : ", field);
				
				if (field != "_id"  ) {

					var temp_field = {} ;
				
					if (field != "delete_child"  ) {
						for (var dmf in data_from_API ) {
							// console.log("...viewEditListDMF - pivotData / dmf : ", dmf);
							// console.log("...viewEditListDMF - pivotData / data_from_API[dmf]['_id'] : ", data_from_API[dmf]["_id"] );
							// console.log("...viewEditListDMF - pivotData / data_from_API[dmf][field] : ", data_from_API[dmf][field] );
							temp_field[ data_from_API[dmf]["_id"] ] = data_from_API[dmf][ field ]
						}
					}

					else {
						for (var dmf in data_from_API ) {
							// console.log("...viewEditListDMF - pivotData / dmf : ", dmf);
							temp_field[ data_from_API[dmf]["_id"] ] = data_from_API[dmf][ "_id" ] ; 
						};
					}

					// console.log("...viewEditListDMF - pivotData / temp_field : ", temp_field);
					data_pivoted.push(temp_field)

				}

			}

			// send data_pivoted back to get_docs_fromApi()
			console.log("...viewEditListDMF - pivotData / data_pivoted : ", data_pivoted);
			this.list_DMF_full_pivoted 		=  data_pivoted ;
			this.list_DMF_first_row_pivoted = [ data_pivoted[0] ] ;

			// save in $store
			this.$store.commit('dmt/set_current_DMF_list_pivoted', data_pivoted )

		},

		// AXIOS CALL
		get_docs_fromApi () {

			console.log("\n...viewEditListDMF - get_doc_fromApi ... ")

			this.loading 	= true

			var oids_list = { 
				oids 			: this.list_DMF_oids.join(), 
				ignore_teams 	: true,
				normalize		: true,
				// pivot_results	: true,
			}

			// AXIOS CALL OR DISPATCH 
			var call_input = {
				coll 			: this.coll,
				level			: "get_datasets",
				q_params		: oids_list,
			}
			this.$store.dispatch('getListItems', call_input )

			.then( result => {
				
				console.log("viewEditListDMF get_doc_fromApi / result: ", result ) ; 
				
				this.list_DMF_full 		= result.data ;

				// save list_DMF_full in $store
				this.$store.commit('dmt/set_current_DMF_list', result.data )

				// pivot data
				this.pivotData(result.data) ;

				this.loading 			= false
				this.DMF_list_loaded 	= true
				this.alert   			= {type: 'success', message: result.msg}

				// add scroll event listener on datatable 
				// detect scroll : cf : https://forum.vuejs.org/t/how-to-detect-body-scroll/7057/5   
				// sync scroll   : cf : https://github.com/asvd/syncscroll/blob/master/syncscroll.js 
				var dataTable = this.$refs.datatable ; //) ;
				// console.log("- viewEditListDMF / then 1 - dataTable : ", dataTable ) ;

				if ( dataTable !== undefined ) {
					// console.log("- viewEditListDMF / then 2 - dataTable : ", dataTable ) ;
					// component selector : https://forum.vuejs.org/t/help-with-selector/18652/11 
					var dt = dataTable.$el.querySelector(".v-table__overflow") 
					// console.log("- viewEditListDMF / then 3 - dt : ", dt ) ;
					dt.addEventListener('scroll', this.onScroll);
					dt.classList.add("no-scroll");
					this.dataTable = dt

					if (this.is_map) {
						var dataTable_ol = this.$refs.datatable_openlevel ;
						var dt_ol = dataTable_ol.$el.querySelector(".v-table__overflow") 
						dt_ol.addEventListener('scroll', this.onScroll);
						// dt_ol.classList.add("no-scroll");
						this.dataTable_ol = dt_ol
					}
				}




			})

			.catch( error => {
				
				console.log("viewEditListDMF get_doc_fromApi / submit - error... : ", error ) ; 
				
				this.loading = false
				this.alert 		= {type: 'error', message: "login error" }

				if (error.response && error.response.data) {
					this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
				
				}
			})

		},

	}

}



</script>