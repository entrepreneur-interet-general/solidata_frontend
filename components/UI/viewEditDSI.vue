<style scoped>

	th, td {
		border-left: thin dashed grey ;
	}
	td .col-values {
		/* max-width: 150px;  */
		width: 190px; 
		overflow-y: hidden ;
	}
	td .col-titles {
		/* max-width: 150px;  */
		width: 70px; 
		text-align : right ;
		/* overflow-y: hidden; */
	}
</style>


<template>

	<v-container 
		grid-list-sm 
		fluid
		pa-3
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
						:itemDoc="item_doc"
						:is_create="is_create" 
						:isPreview="isPreview"
						:is_reset="true"
						:is_loading="loading"
						@input="switchPreview"
						>
					</ItemToolbar>

				</v-flex>

			</v-layout>
		</template>



		<!-- COMPONENTS FOR COMMON DOCS INFOS -->		
		<v-expansion-panel
			v-show="!isPreview"
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

				<ItemDocInfos
					:coll="coll"
					:is_create="is_create"
					:is_preview="isPreview"
					:item_doc="itemDoc"
					>
				</itemDocInfos>

			</v-expansion-panel-content>
		</v-expansion-panel>




		<!-- DSI DATA -->
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
								
								{{ itemDoc.infos.title | truncate(30, '...') }}
								
								<!-- edit button if not in DSI -->
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

							<v-dialog v-model="dialog" max-width="600px">

								<v-btn 
									slot="activator" 
									color="accent" 
									dark 
									block
									round
									outline
									class="text-lowercase"
									>
									<v-icon small class="mr-3">
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

						</v-toolbar>


						<!-- DATA -->
						<v-data-table
							:headers="itemHeaders_Actions"
							:items="item_data"
							:pagination.sync="pagination"
							:total-items="total_items"
							:loading="loading"
							class="elevation-1"
							:rows-per-page-items="[5, 10, 25]"
							>
							<v-progress-linear slot="progress" color="accent" indeterminate></v-progress-linear>
							<template slot="items" slot-scope="props">

								<td class="justify-center layout px-0">
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
								</td>

								<td 
									v-for="header in itemHeaders"
									:key="itemHeaders.indexOf(header)">
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
			v-show="!isPreview"
			v-model="panel_uses"
			expand
			class="elevation-0"
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

			<v-flex d-flex :class="flex_vars">

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
					flex_vars : <code>{{flex_vars}}</code> - 
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
	
</template>


<script>

import ObjectFormatterCreate from "~/utils/ObjectFormatterCreate.js"
import checkDocUserAuth from "~/utils/checkDocUserAuth.js"

// import SectionTitle from '~/components/UI/sectionTitle.vue'
import ItemToolbar from '~/components/UI/itemToolbar.vue'
import ItemDocUses from '~/components/UI/itemDocUses.vue'
import ItemDocInfos from '~/components/UI/itemDocInfos.vue'

// import CardInfos from '~/components/UI/parentFields/cardInfos.vue'
// import CardCreate from '~/components/UI/cardCreate.vue'
// import ValueEdit from '~/components/UI/parentFields/valueEdit.vue'


export default {

	props : [ 
		"flex_vars",			// 
		"is_create",			// view | create
		"is_preview",			// 
		// "parentFieldslist",		// 
		"coll",
		"item_doc", 			// complete item infos
		// "is_debug",
		"is_switch",
		"no_toolbar"
	],

	components : {
		// SectionTitle,
		ItemToolbar,
		ItemDocInfos,
		ItemDocUses,
		// CardInfos,
		// ValueEdit,
		// CardCreate,
	},

	// meta : {
	// 	collection 	: 'dsi',
	// 	level 		: 'get_f_data',
	// },

	created () {
		console.log("\n- itemViewEdit / created ---> item_doc : ", this.item_doc ) ;
		this.itemDoc = this.item_doc ;
		// this.canEdit = this.checkUserAuth(this.parentField+'.'+this.subField)
		// this.canEdit = this.checkUserAuth(this.parentFieldslist)

		this.is_file = ( this.coll == "dsi" ) ? true : false ; 
		this.is_file = this.preloadIsFile() ; 
		this.filetype = this.preloadFileType() ; 
	},

	data () {

		return {
			
			alert		: null,
			isPreview 	: this.is_preview,
			no_subField : true,

			panel_uses	: [false],
			panel_infos	: [false],
			
			collName 	: this.$store.state.collectionsNames[this.coll],

			itemId 			: this.item_doc._id, 
			itemDoc			: this.item_doc,
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


	// mounted () {
	// 	this.getDataFromApi()
	// 	.then(data => {
	// 		this.desserts = data.items
	// 		this.totalDesserts = data.total
	// 	})
	// },
	

	watch: {
		
		dialog (val) {
			val || this.close()
		},
	
		// TO DO !!!!
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
		
		// TOOLBAR SWITCH
		switchPreview() {
			this.isPreview = !this.isPreview ;
		},

		// AXIOS CALL
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
				this.total_items 	= result.data.data_raw.f_data_count

				this.pagination.page 		= result.query.page_args.page
				this.pagination.rowsPerPage = result.query.page_args.per_page
				this.pagination.sortBy 		= result.query.query_args.sort_by

				this.loading 		= false
				this.alert   		= {type: 'success', message: result.msg}

			})

			.catch( error => {
				console.log("VDSI get_FData_fromApi / submit - error... : ", error ) ; 
				this.loading = false
				// this.alert = {type: 'error', message: "login error" }
				if (error.response && error.response.data) {
					this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
				}
			})

		},


		// HEADERS COLUMNS
		item_headers (is_actions) {

			var headers 	= [] ;
			var top_head 	= { text: 'Actions', value: 'name', sortable: false }

			const raw_headers = this.item_doc.data_raw.f_col_headers ;
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
			if ( this.coll == "dsi"){
				if(this.item_doc.specs.src_type != "API") {
					isFile = true
				}
			}
			return isFile
		},

		preloadFileType () {
			var filetype ;
			if ( this.coll == "dsi"){
				filetype = this.item_doc.specs.src_type
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

				can_update_field 		= checkDocUserAuth(this.item_doc, field_name, isLogged, user_id)
			}

			// var doc_auth_edit 		= this.item_doc.public_auth.open_level_edit ; 

			// if (doc_auth_edit == 'open_data' ){
			// 	can_update_field = true
			// }

			// else if (doc_auth_edit == 'commons') {
			// 	//  check if user is connected
			// 	if ( this.$store.state.auth.isLogged ){
			// 		can_update_field = true
			// 	}
			// } 

			// else if (doc_auth_edit == 'collective') {
			// 	//  check if user is part of the team
			// 	var doc_creator 		= this.item_doc.log.created_by ; 
			// 	var doc_auth_team 		= this.item_doc.team ; 
			// 	doc_auth_team = doc_auth_team.filter(function(d) { return d.oid_usr == doc_creator ; });

			// 	console.log("checkUserAuth ... doc_auth_team", doc_auth_team ) ;
			// 	if ( this.$store.state.auth.user_id == doc_creator || doc_auth_team.lenght == 1 ){
			// 		can_update_field = true
			// 	}
			// } 

			// else if (doc_auth_edit == 'private') {
			// 	//  check if user is the owner
			// 	var doc_creator 		= this.item_doc.log.created_by ; 
			// 	console.log("checkUserAuth ...", this.item_doc.public_auth ) ;
			// 	if ( this.$store.state.auth.user_id == doc_creator ){
			// 		can_update_field = true
			// 	}
			// } 

			console.log("checkUserAuth / can_update_field : ", can_update_field ) ;

			return can_update_field
		},

		// submit value to create item via API backend
		// createItem ( ) {
			
		// 	console.log("\n VE createItem... ")

		// 	this.alert    = null
		// 	this.loading  = true

		// 	var current_new = this.$store.state[this.coll].current_new ; 
			
		// 	// this.formHasErrors = false ; 

		// 	console.log("VE createItem - current_new : ", current_new )

		// 	// Object.keys(this.form).forEach(f => {
		// 		// 	if (!this.form[f]) this.formHasErrors = true
		// 	// 	this.$refs[f].validate(true)
				
		// 	// })

		// 	// REFORMAT DATA
		// 	// var data_to_send = JSON.parse(JSON.stringify(current_new)) ;
		// 	var data_to_send = ObjectFormatterCreate.prepareFormData(current_new) ;

		// 	// add file's data if needed
		// 	if( this.is_file == true ){
		// 		console.log("VE createItem / adding file  to data_to_send")
		// 		// data_to_send['file'] 		= this.$store.state[this.coll].current_file ;
		// 		data_to_send['csv_sep'] 	= this.$store.state[this.coll].csv_sep ;
		// 	// 	data_to_send['filename'] 	= this.$store.state[this.coll].current_filename ;
		// 	}

		// 	console.log("VE createItem / data_to_send : ", data_to_send)

		// 	//  PREPARE PAYLOAD
		// 	var payload = { collection : this.coll, data : data_to_send } ; 
		// 	console.log("VE createItem / payload : ", payload)

		// 	// dispatch action from store
		// 	this.$store.dispatch('createItem', payload )
			
		// 	.then(result => {

		// 		this.loading = false
		// 		this.alert = {type: 'success', message: result.msg}

		// 		// retrieve new item id
		// 		var new_item_id = response.data._id

		// 		// redirect to edit-preview page 
		// 		return this.$router.push(`/${this.coll}/${new_item_id}`)
		
		// 	})
		// 	.catch(error => {

		// 		console.log("VE createItem / submit / error... : ", error ) ; 

		// 		this.loading = false
		// 		// this.alert = {type: 'error', message: "login error" }
		// 		if (error.response && error.response.data) {
		// 			this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
		// 		}

		// 	})
		

		// }

	}


}

</script>