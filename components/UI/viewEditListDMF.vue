<style scoped>

	tr th {
		/* text-align : center ; */
		/* border-left: thin dashed grey ; */
	}

	th, td {
		border-left: thin dashed grey ;
	}
	td .col-values {
		/* max-width: 150px;  */
		width: 190px; 
		overflow-y: hidden ;
		text-align : center ;
	}
	td .col-titles {
		/* max-width: 150px;  */
		width: 90px; 
		text-align : center ;
		/* overflow-y: hidden; */
	}

</style>

<template>

	<div class="pa-0 ma-0">


		<!-- CREATE EDIT DOC / DATA TABLE STYLE-->
		<v-layout row wrap>
			
			<v-flex xs12>
				<v-card color="">
					<v-card-text class="pa-0">

						<!-- DATA TOOLBAR -->
						<v-toolbar class="elevation-1" color="white">
							
							<!-- title dataset -->
							<v-toolbar-title
								class="subheading grey--text"
								>
								
								{{ item_doc.infos.title | truncate(30, '...') }}
								
								<v-btn
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
								
								</v-btn>
							
							</v-toolbar-title>
							
							<v-spacer></v-spacer>

							<!-- OPEN DMF LIBRARY -->
							<v-btn 
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
							</v-btn>


						</v-toolbar>


						<!-- DATA TABLE -->
						<v-data-table

							:headers="list_headers_selector"
							:items="list_DMF_selector"
							class="elevation-1"
							:loading="loading"
							:pagination.sync="paginationDMF"
							hide-actions
							hide-headers
							>
							
							<v-progress-linear slot="progress" color="accent" indeterminate></v-progress-linear>
				
							<template
								slot="items" 
								slot-scope="props"
								>
							
								<td
									v-for="dmf in list_DMF_raw_selector"
									:key="list_DMF_raw_selector.indexOf(dmf)"
									:class="`px-1 text-xs-center ${ (list_DMF_selector.indexOf(props.item) == 0) ? 'font-weight-bold' : '' } `"
									style=""
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

									<!-- rows for each entry in list_DMF_full_pivoted -->
									<div 
										v-else
										class="col-values"
										>
										{{ props.item[ dmf["_id"] ] | truncate( 100, '...' ) }}
										<span v-if="$store.state.is_debug">
											dmf id : <code>{{ dmf["_id"] }}</code>
										</span>
									</div>

								</td>
								
								
							</template>


						</v-data-table>


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
		"panel_open"
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
			paginationDMF : {
				rowsPerPage: -1 
			},
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
				"infos.description" 			: "description",
				"public_auth.open_level_edit" 	: "open_level_edit", 
				"data_raw.f_code" 				: "f_code", 
				"data_raw.f_type" 				: "f_type", 
				"data_raw.f_object" 			: "f_object", 
				// "data_raw.f_comments" 			: "f_comments", 
				"data_raw.f_is_required" 		: "f_is_required", 
			}, 

			// DMFs' fields to display
			parentFieldsList : [

				{ 
					parentFieldName : "infos",
					subFields 	: [
						"title", 
						"description"
					] 
				},

				{ 
					parentFieldName : "public_auth",
					subFields 	: [
						"open_level_edit", 
					] 
				},

				{ 
					parentFieldName : "data_raw",
					subFields 	: [
						"f_code", 
						"f_type", 
						"f_object", 
						"f_comments", 
						"f_is_required", 
					] 
				},
			],

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

	methods: {

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
			// loop through data_to_pivot => headers
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
				
				// if (field != "_id" && field!='infos.title' ) {
				if (field != "_id"  ) {

					var temp_field = {} ;

					for (var dmf in data_from_API ) {
							// console.log("...viewEditListDMF - pivotData / dmf : ", dmf);
							// console.log("...viewEditListDMF - pivotData / data_from_API[dmf]['_id'] : ", data_from_API[dmf]["_id"] );
							// console.log("...viewEditListDMF - pivotData / data_from_API[dmf][field] : ", data_from_API[dmf][field] );
							temp_field[ data_from_API[dmf]["_id"] ] = data_from_API[dmf][ field ]
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