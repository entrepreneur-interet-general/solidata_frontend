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
								
								<v-icon  
									right
									:disabled="!isPreview"
									>
									{{ $store.state.mainIcons.edit.icon }}
								</v-icon>
							
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


						<v-data-table

							:headers="DMF_headers"
							:items="list_DMF_full_pivoted"
							class="elevation-1"
							:loading="loading"
							:pagination.sync="paginationDMF"
							hide-actions
							>
							<!-- :rows-per-page-items="7" -->
							
							<v-progress-linear slot="progress" color="accent" indeterminate></v-progress-linear>
				
							<template slot="items" slot-scope="props">
								<td class="">{{ props.item["_"] }}</td>
								<td 
									v-for="dmf in listDMF"
									:key="listDMF.indexOf(dmf)"
									class="text-xs-center">{{ props.item[ dmf["oid_dmf" ] ] }}</td>
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

		if ( this.listDMF != [] ) {

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
			DMF_headers 			: [],
			list_DMF_full_pivoted 	: [],

			// empty column (first column on the left of the datatable)
			empty_column : {
				_id 	: "_",
				infos 	: {
					title : "title",
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
				// "infos.description" 			: "description",
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

			// add empty_column_normalized to beginning of data_from_API
			data_from_API.unshift(this.empty_column_normalized) ;
			console.log("\n...viewEditListDMF - pivotData / data_from_API (B) : ", data_from_API);

			// loop through data_to_pivot
			for (let dmf in data_from_API ) {
				
				// set DMF_headers
				// create new header
				var temp_header = {
					text 	: data_from_API[dmf]["infos.title"], 
					value 	: data_from_API[dmf]["_id"], 
					sortable : false,
					align: function(){ return( data_from_API[dmf]["_id"] == "_") ? 'left' : 'center' } 
				};
				console.log("...viewEditListDMF - pivotData / temp_header : ", temp_header);

				// push DMF oid in data_new_headers
				data_new_headers.push( temp_header )

			}

			// send datatable_headers back
			console.log("...viewEditListDMF - pivotData / data_new_headers : ", data_new_headers);
			this.DMF_headers =  data_new_headers ;


			// loop through fields to create data_pivoted
			var data_pivoted 		= [] ;

			console.log("...viewEditListDMF - pivotData / this.empty_column_normalized : ", this.empty_column_normalized );
			for (const field of Object.keys(this.empty_column_normalized) ) {
				
				console.log("...viewEditListDMF - pivotData / field : ", field);
				var temp_field = {} ;

				for (let dmf in data_from_API ) {
					temp_field[ data_from_API[dmf]["_id"] ] = data_from_API[dmf][ field ]
				}

				data_pivoted.push(temp_field)
			}

			// send data_pivoted back
			console.log("...viewEditListDMF - pivotData / data_pivoted : ", data_pivoted);
			return data_pivoted ;
			
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
				
				this.list_DMF_full 			= result.data ;

				// pivot data
				this.list_DMF_full_pivoted 	=  this.pivotData(result.data) ;


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