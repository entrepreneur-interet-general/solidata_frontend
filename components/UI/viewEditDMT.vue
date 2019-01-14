<template>

	<v-container 
		grid-list-sm 
		fluid
		:class="`${ !no_toolbar ? 'pa-3' : 'pa-0'}`"
		>
		
		<!-- DEBUG -->
		<v-card-text 
			v-if="$store.state.is_debug"
			>
			- coll : <code> {{ coll }} </code><br>
			- itemId : <code> {{ itemId }} </code><br>
			<!-- - dmf_list : <code> {{ itemDoc.datasets.dmf_list }} </code>  -->
		</v-card-text>


		<!-- IF NO ITEMDOC -->
		<v-layout 
			row 
			wrap
			v-if="!is_itemDoc"
			>
			<v-flex xs12>

				<v-card
					flat
					class="pa-4 text-xs-center"
					>

					<!-- <v-card-text>
						no_DMT in VE DMT
					</v-card-text> -->

					<v-progress-circular
						color="accent"
						indeterminate
						>
					</v-progress-circular>
					
				</v-card>
			</v-flex>

		</v-layout>

		<!-- DMT TOOLBAR -->
		<template 
			v-if="!no_toolbar && is_itemDoc"
			>

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
						:is_reset="false"
						:is_loading="loading"
						@input="switchPreview"
						@settings="switchSettings"
						>
					</ItemToolbar>

				</v-flex>

			</v-layout>

		</template>


		<!-- DMT / SETTINGS  -->
		<v-dialog 
			v-if="is_itemDoc"
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
						<v-expansion-panel
							v-model="panel_infos"
							expand
							class="elevation-0"
							>

							<v-expansion-panel-content>

								<div 
									class="pb-0 mb-0"
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

						<v-divider></v-divider>


						<!-- DMF LIBRARY -->
						<v-expansion-panel
							v-if="$store.state.auth.isLogged"
							v-model="panel_lib"
							expand
							class="elevation-0"
							>
							<v-expansion-panel-content >

								<div 
									class="black--text"
									slot="header"
									>
									<!-- <v-icon small color="accent" class="mr-3">
										{{ $store.state.mainIcons.add_to_parent.icon }}  
									</v-icon> -->
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
											{{ $store.state.mainIcons.datamodel_fields.icon }}
										</v-icon>
									</v-badge>
									<span class="ml-3">
										{{ $t(`datamodels.manage_dmf`, $store.state.locale) }}
									</span>
								</div>

								<ItemsListDI
									:tab="'datamodel_fields'"
									:coll="'dmf'"
									:items_coll="$store.state.dmf.list"
									:no_margin="true"

									:add_to_parent="true"
									:parentDoc_id="itemId"
									:parentDoc_coll="coll"
									:items_in_parent="itemDoc.datasets.dmf_list"

									@update_parent_dataset="update_parent_list"
									>
								</ItemsListDI>

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
									<span class="ml-3 ">
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


		<!-- DMT / DMF DATA COMPONENT -->
		<v-layout row>
			
			<!-- DMF LIST AS COLUMN -->
			<v-flex xs12>
				
					<!-- :listDMF="[
						{'oid_dmf' : '5ba664030a82860745d51fdd'},
						{'oid_dmf' : '5bf4183f0a8286180b53183c'}
					]"  -->
					
				<ViewEditListDMF
					v-if="is_itemDoc"

					:listDMF="itemDoc.datasets.dmf_list"
					:item_doc="itemDoc"
					:item_doc_id="item_doc_id"

					:isPreview="isPreview"
					:is_loading="is_loading"
					:panel_open="panel_lib[0]"

					:is_solidify="is_solidify"
					:parent_REC_mapping="parent_REC_mapping"

					:is_map="is_map"
					:parent_map="parent_map"
					:canEdit_ol="canEdit_ol"
					
					:parentDoc_id="parentDoc_id"
					:parentDoc_coll="parentDoc_coll"

					:add_to_parent="add_to_parent"
					:parent_scroll="parent_scroll"

					@input="openDMF_lib"
					@settings="switchSettings"

					@update_parent_dataset="update_parent_list"
					
					@update_loading="updateLoading"
					@scrollTable="updateScroll"
					@updateSolidify="updateSolidify"
					>
				</ViewEditListDMF>


			</v-flex>


		</v-layout>


		<!-- COMPONENTS FOR COMMON DOCS USES -->		
		<v-expansion-panel
			v-if="is_itemDoc && !no_toolbar"
			v-show="!isPreview "
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


	</v-container>
	
</template>


<script>


import ObjectFormatterCreate from "~/utils/ObjectFormatterCreate.js"
import checkDocUserAuth from "~/utils/checkDocUserAuth.js"

import ItemToolbar from '~/components/UI/itemToolbar.vue'
import ItemDocUses from '~/components/UI/itemDocUses.vue'
import ItemDocInfos from '~/components/UI/itemDocInfos.vue'

import ItemsListDI from '~/components/UI/itemsList_dataIterator.vue'
import ViewEditListDMF from '~/components/UI/viewEditListDMF.vue'

import SettingsToolbar from '~/components/UI/settingsToolbar.vue'
// import ValueEdit from '~/components/UI/parentFields/valueEdit.vue'


export default {

	props : [ 

		// "flex_vars",			// 
		"is_create",			// view | create
		"is_preview",			// 
		"is_loading",

		"coll",

		"item_doc", 			// complete item infos
		"item_doc_id",

		"is_solidify",
		"parent_REC_mapping",
		
		"is_map",
		"parent_map",
		"canEdit_ol",

		"parentDoc_id",
		"parentDoc_coll",

		"is_switch",
		
		"no_toolbar",

		"add_to_parent",
		"parent_scroll"

	],

	components : {

		ItemToolbar,
		ItemDocInfos,
		ItemDocUses,

		ItemsListDI,
		ViewEditListDMF,

		SettingsToolbar,
		// ValueEdit,
	},

	// middleware : ["getListItems"],
	// meta : {
	// 	collection 	: [
	// 		'dmf', 'tag',
	// 	],
	// 	level : 'get_list',
	// },

	created () {

		console.log("\n- viewEditDMT / created ---> item_doc : ", this.item_doc ) ;

		// var input = {
		// 	collections : ['tag', 'dmf'],
		// 	level		: 'get_list'
		// }
		// this.$store.dispatch('resetListsItems', input ) ;

		if ( this.item_doc != undefined ) {
			
			console.log("- viewEditDMT / created OK ---> item_doc exists... " ) ;
			console.log("- viewEditDMT / created  ---> item_doc.datasets.dmf_list : ", this.item_doc.datasets.dmf_list ) ;
			
			this.is_itemDoc 	= true ;

			this.itemDoc 		= this.item_doc ;
			this.itemId			= this.item_doc._id ; 
			this.list_TAG_oids 	= this.item_doc.datasets.tag_list ;

			// this.canEdit = this.checkUserAuth(this.parentField+'.'+this.subField)
			// this.canEdit = this.checkUserAuth(this.parentFieldslist)

			// this.is_file = ( this.coll == "dsi" ) ? true : false ; 
			// this.is_file = this.preloadIsFile() ; 
			// this.filetype = this.preloadFileType() ; 

		}

		else {
			
			this.is_itemDoc = false ;
			this.itemId		= this.item_doc_id[0].oid_dmt ; 
			console.log("- viewEditDMT / created OK + empty ---> item_doc is undefined ... " ) ;
			
			// this.itemDoc 	= this.item_doc ;

		}


	},

	data () {

		return {
			
			// coll 		: "dmt",
			tab			: "datamodels",

			loading		: false,
			alert		: null,

			isPreview 	: this.is_preview,
			no_subField : true,
			isSettings 	: false,

			panel_infos		: [true],
			panel_lib		: [true],
			panel_lib_tag	: [false],
			panel_uses		: [false],

			collName 	: this.$store.state.collectionsNames[this.coll],

			is_itemDoc		: false,
			// itemDoc		: this.item_doc,
			itemDoc			: '',
			itemId 			: '', 
			// item_data 		: this.item_doc.data_raw.f_data, 
			// item_headers 	: this.item_doc.data_raw.f_col_headers, 
			list_TAG_oids 		: [],

			is_file 			: null,
			filetype 			: null,

			// data table : loading, pagination 
			// loading 		: false,
			// pagination 		: {},
			total_items		: 0, // per page must be in [0, 2, 5, 10, 20, 25, 50, 100]

			// data table - edit/create item
			dialog			: false,
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
			return this.item_headers(true) ;
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
		
		loading : {

			immediate : true,
			handler (newVal, oldVal ) {
				// console.log( "\nVE DMT / watch ~ loading / newVal : \n", newVal )
				
				// var doc_id = "from_VE_DMT"
				// if ( this.itemId == undefined || this.itemId == "" ) {
				// 	var doc_id = "from_VE_DMT"
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

		item_doc_id : {

			immediate : true,
			handler( newVal, oldVal) {

				console.log( "\nVE DMT / watch ~ item_doc_id / newVal : \n", newVal )
				// console.log( "VE DMT / watch ~ item_doc_id / oldVal : \n", oldVal )

				// update itemId
				if (newVal != undefined && newVal.length ){
					this.itemId = newVal[0].oid_dmt
					this.get_DMT_fromApi()
				}
			}
		},

		item_doc : {

			immediate : true,
			handler( newVal, oldVal) {

				// console.log( "\nVE DMT / watch ~ item_doc / newVal : \n", newVal )
				// console.log( "VE DMT / watch ~ item_doc / oldVal : \n", oldVal )

				// update itemDoc
				if (oldVal != undefined ){
					console.log( "VE DMT / watch ~ item_doc / newVal.datasets.dmf_list : \n", newVal.datasets.dmf_list )
					// console.log( "\nVE DMT / watch ~ item_doc / oldVal.datasets.dmf_list : \n", oldVal.datasets.dmf_list )
					this.itemDoc = newVal ;
					if (newVal) {
						this.list_TAG_oids 	= newVal.datasets.tag_list ;
					}
				}
			}
		},

		is_preview : {
			immediate : true,
			handler( newVal, oldVal) {
				// console.log( "\nVE DMT / watch ~ is_preview / newVal : \n", newVal )
				this.isPreview = newVal ;
			}
		},

		dialog (val) {
			val || this.close()
		},
	
	},

	methods: {

		updateScroll (input) {
			this.$emit('scrollTable', input ) 
		},

		updateLoading(input) {
			console.log("updateLoading / input : ", input )
			this.loading = input.loading
		},

		updateSolidify (input) {
			// update parent RPJ's list of dmf to use to geolocalize 
			this.$emit('updateSolidify', input ) 
		},

		// DMF_lib SWITCH
		openDMF_lib() {
			this.isPreview = false ;
			this.panel_lib = [true];
		},

		// TOOLBAR SWITCH
		switchPreview() {
			this.isPreview = !this.isPreview ;
		},
		switchSettings() {
			console.log("VE DMT / switchSettings...")
			this.isSettings = !this.isSettings ;
		},


		// HEADERS COLUMNS
		item_headers (is_actions) {

			var headers 	= [] ;
			var top_head 	= { text: 'Actions', value: 'name', sortable: false }

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

			if(is_actions){
				headers.unshift(top_head)
			}

			return headers
		},



		//  ITEM FOR EDITION / CREATION
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


		// ----------------------------- //
		// AXIOS CALL
		// ----------------------------- //

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
		
		// UPDATE DMF DOCUMENT
		update_parent_list ( input ) {

			console.log("update_parent_list / input : ", input )

			this.loading 		= true
			// this.$emit('update_loading', true )

			var re_emit = input.re_emit ; 

			if (re_emit) {
				console.log("update_parent_list / re_emit... " )
				this.$emit('update_parent_dataset', input )
			}

			else {

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
					this.itemDoc = result.data ;
					this.$store.commit(`${this.coll}/set_current`, result );
	
				})
				
				.catch(error => {
					console.log("submit / error... : ", error ) ; 
					this.loading = false
					// this.$emit('update_loading', false )
					
					this.$store.commit(`set_error`, error)

					this.alert = {type: 'error', message: "login error" }
					if (error.response && error.response.data) {
						this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
					}
				})

			}

		},


		// ----------------------------- //
		// AXIOS CALL
		// ----------------------------- //
		get_DMT_fromApi () {

			console.log("\n...VE_DMT - get_DMT_fromApi ... ")

			this.loading = true
			// this.$emit('update_loading', true )

			// AXIOS CALL OR DISPATCH 
			var call_input = {
				collection 		: this.coll,
				doc_id			: this.itemId,
			}

			this.$store.dispatch('getOneItem', call_input )

			.then( result => {
				
				console.log("VE_DMT - get_DMT_fromApi / result: ", result ) ; 
				
				this.itemDoc 		= result.data 

				this.loading 		= false
				// this.$emit('update_loading', false )

				this.alert   		= {type: 'success', message: result.msg}

				this.is_itemDoc 	= true

				return "ok"

			})

			.catch( error => {

				console.log("VE_DMT - get_DMT_fromApi / submit - error... : ", error ) ; 
				
				this.loading = false
				// this.$emit('update_loading', false )

				this.$store.commit(`set_error`, error)

				if (error.response && error.response.data) {
					this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
				}

				return "error"

			})

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
			if ( this.coll == "dsi"){
				if(this.itemDoc.specs.src_type != "API") {
					isFile = true
				}
			}
			return isFile
		},

		preloadFileType () {
			var filetype ;
			if ( this.coll == "dsi"){
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

			// console.log("\ncheckUserAuth DMT / field_name : ", field_name ) ;

			var can_update_field 	= false  ;
			
			if (this.is_create) {
				can_update_field 	= true  ;
			}

			else {
				var isLogged 			= this.$store.state.auth.isLogged ;
				var user_id 			= this.$store.state.auth.user_id ;

				can_update_field 		= checkDocUserAuth(this.itemDoc, field_name, isLogged, user_id)
			}


			return can_update_field
		},


	}


}

</script>