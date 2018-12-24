<style scoped>

	tr th {
		/* text-align : center ; */
		/* border-left: thin dashed grey ; */
	}

	th, td {
		border-right: thin dashed grey ;
		max-width: 200px !important; 
	}
	td .col-values {
		width: 200px; 
		overflow-y: hidden ;
		text-align : center ;
		display: inline-block;
	}
	td .col-titles {
		/* max-width: 70px;  */
		width: 90px; 
		text-align : center ;
		display: inline-block;
		/* overflow-y: hidden; */
	}

</style>

<template>

	<div class="pa-0 ma-0">

		<!-- CREATE EDIT DOC / DATA TABLE STYLE-->
		<v-layout row wrap>
			
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
							<!-- <v-btn 
								:disabled="isPreview"
								color="accent" 
								dark 
								round
								:outline="!panel_open"
								:flat="panel_open"
								@click="openDMF_lib_parent"
								>
								<v-icon small class="mr-3">
									{{ $store.state.mainIcons.add_to_parent.icon }}  
								</v-icon>
								{{ $t( 'global.dmf_add', $store.state.locale)  }}
							</v-btn> -->
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
						<scroll-sync>
						<v-data-table
							:ref="'datatable'"
							:headers="list_headers_selector"
							:items="list_DMF_selector"
							class="elevation-1"
							:loading="loading"
							:pagination.sync="paginationDMF"
							hide-actions
							hide-headers
							>
							
							<!-- <v-progress-linear 
								slot="progress" 
								color="accent" 
								indeterminate
								>
							</v-progress-linear> -->
				
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
										<v-btn
											v-if="!isPreview"
											:disabled="!$store.state.auth.isLogged"
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
										
										{{ props.item[ dmf["_id"] ] | truncate( 100, '...' ) }}

										<span v-if="$store.state.is_debug">
											<br>
											dmf id : <code>{{ dmf["_id"] }}</code>
										</span>
									</div>

								</td>
								
								
							</template>


						</v-data-table>
						</scroll-sync>

					</v-card-text>
				</v-card>
			</v-flex>

		</v-layout>




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

					list_DMF_full_pivoted - <code>{{ list_DMF_full_pivoted }}</code>
					<hr>
					list_DMF_full - <code>{{ list_DMF_full }}</code>
					<hr> 
					DMF_headers - <br> <code>{{ DMF_headers }}</code>

				</v-alert>

			</v-flex>

		</v-layout>



	</div>

</template>



<script>
import ViewEditDMF from '~/components/UI/viewEditDoc.vue' 

export default {

	props : [
		
		"listDMF",
		"isPreview",

		"item_doc",
		"panel_open",

		"no_toolbar",

		"add_to_parent",
		"parent_scroll"

	],

	components : {
		ViewEditDMF,
	},

	created () {

		console.log("\n- viewEditListDMF / created ..." ) ;
		console.log("- viewEditListDMF / listDMF : ", this.listDMF ) ;

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

			offsetTop 	: 0,
			offsetLeft 	: 0,
			dataTable 	: undefined,

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
			console.log("\n...viewEditListDMF - pivotData / data_new_headers : ", data_new_headers);
			this.DMF_headers 		=  data_new_headers ;

			var temp_DMF_light		=  data_new_headers.slice(0) ;
			temp_DMF_light.shift() ; 
			// console.log("\n...viewEditListDMF - pivotData / temp_DMF_light : ", temp_DMF_light);
			this.DMF_headers_light	= temp_DMF_light ; 
			console.log("\n...viewEditListDMF - pivotData / this.DMF_headers_light : ", this.DMF_headers_light);


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
							console.log("...viewEditListDMF - pivotData / dmf : ", dmf);
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
			
		},

		// AXIOS CALL
		get_docs_fromApi () {

			console.log("\n...viewEditListDMF - get_doc_fromApi ... ")

			this.loading 	= true

			var oids_list = { 
				oids 			: this.list_DMF_oids.join(), 
				ignore_teams 	: true,
				// pivot_results	: true,
				normalize		: true,
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

				// pivot data
				this.pivotData(result.data) ;

				this.loading 			= false
				this.DMF_list_loaded 	= true
				this.alert   			= {type: 'success', message: result.msg}

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
				}

			})

			.catch( error => {
				
				console.log("viewEditListDMF get_doc_fromApi / submit - error... : ", error ) ; 
				
				this.loading = false
				// this.alert = {type: 'error', message: "login error" }

				if (error.response && error.response.data) {
					this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
				
				}
			})

		},

	}

}



</script>