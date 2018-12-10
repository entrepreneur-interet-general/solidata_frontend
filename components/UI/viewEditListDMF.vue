<template>

	<div class="pa-0 ma-0">


		<!-- CREATE EDIT DOC -->
		<v-container 
			mx-0 
			px-0
			>
			
			<v-layout 
				align-center 
				row 
				>
				
				
				<!-- DMF - SUBFIELDS -->
				<v-flex xs3 >
					<ViewEditDMF
						:flex_vars="$store.state.createSize"
						:is_create="true"
						:is_preview="true"
						:coll="coll"
						:parentFieldslist="parentFieldsList"
						:item_doc="$store.state[coll].current_new"
						:is_switch="false"
						:no_toolbar="true"
						:only_subfields="true"
						>
					</ViewEditDMF>
				</v-flex>



				<!-- DMF - DMF_LIST -->
				<template
					v-if="DMF_list_loaded">
					<v-flex 
						xs3
						v-for="item in list_DMF_full"
						>
						<ViewEditDMF
							:flex_vars="$store.state.createSize"
							:is_create="false"
							:is_preview="true"
							:coll="coll"
							:parentFieldslist="parentFieldsList"
							:item_doc="item"
							:is_switch="false"
							:no_toolbar="true"
							:only_subfields="false"
							>
						</ViewEditDMF>
					</v-flex>
				</template>



				<!-- DMF - CREATE NEW -->
				<v-flex xs3>
				</v-flex>




			</v-layout>
		</v-container>



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

					list_DMF_oids : <code>{{ list_DMF_oids }}</code>

					<hr>

					list_DMF_full : <code>{{ list_DMF_full }}</code>
					
				</v-alert>

			</v-flex>

		</v-layout>



	</div>

</template>



<script>
import ViewEditDMF from '~/components/UI/viewEditDMF.vue' 

export default {

	props : [
		"listDMF",
		"is_preview",
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
			// list_DMF 	: this.listDMF,
			
			DMF_list_loaded : false,
			list_DMF_oids : [],
			list_DMF_full : [],

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


	methods: {

		// AXIOS CALL
		get_docs_fromApi () {

			console.log("\n...viewEditListDMF get_doc_fromApi ... ")

			this.loading 	= true

			var oids_list = { 
				oids 			: this.list_DMF_oids.join(), 
				ignore_teams 	: true
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
				
				this.list_DMF_full 		= result.data 

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