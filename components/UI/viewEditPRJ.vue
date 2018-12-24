<template>

	<v-container 
		grid-list-sm 
		fluid
		>

		<!-- PRJ TOOLBAR -->
		<v-layout 
			v-if="!noToolbar"
			row 
			wrap 
			mb-3
			>

			<v-flex 
				d-flex 
				xs12
				>
				<!-- :class="flex_vars" -->

				<ItemToolbar
					:coll="coll" 
					:collName="tab" 
					:itemDoc="item_doc"
					:is_create="is_create" 
					:isPreview="isPreview"
					:isSettings="isSettings"
					:is_loading="isLoading"
					@input="switchPreview"
					@settings="switchSettings"
					>
					<!-- :itemDoc="itemDoc" -->
				</ItemToolbar>

			</v-flex>

		</v-layout>


		<!-- DEBUG -->
		<v-card-text 
			v-if="$store.state.is_debug"
			pa-3
			>

			- loading_list : <code>{{loading_list}}</code><br>

			<v-divider></v-divider>

			- coll : <code> {{ coll }} </code><br>
			- itemId : <code> {{ itemId }} </code>

			<v-divider class="my-2"></v-divider>
			
			- itemDoc / dmt_list : <code> {{ itemDoc.datasets.dmt_list }} </code> <br>
			- list_DMT_oids : <code> {{ list_DMT_oids }} </code> <br>
			- list_DMT_oids_test : <code> {{ list_DMT_oids }} </code> <br>
			<!-- - firstDMTinList : <code>{{ firstDMTinList() }}</code><br> -->

			<v-divider class="my-2"></v-divider>

			- itemDoc / dsi_list : <code> {{ itemDoc.datasets.dsi_list }} </code> <br>
			- list_DSI_oids : <code> {{ list_DSI_oids }} </code> 
	
		</v-card-text>


		<!-- COMPONENTS FOR COMMON DOCS USES -->		
		<v-expansion-panel
			v-show="!isPreview"
			v-model="panel_uses"
			class="elevation-0 "
			expand
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

					<!-- :is_preview="isPreview" -->
				<ItemDocUses
					:coll="coll"
					:is_create="is_create"
					:item_doc="item_doc"
					>
					<!-- :item_doc="itemDoc" -->
				</itemDocUses>

			</v-expansion-panel-content>
		</v-expansion-panel>


		<!-- PRJ / SETTINGS  -->
		<v-dialog 
			v-model="isSettings" 
			fullscreen 
			hide-overlay 
			transition="dialog-bottom-transition"
			>

			<v-card>
				
				<!-- SETTINGS TOOLBAR -->
				<SettingsToolbar
					:itemDoc="item_doc"
					@settings="switchSettings"
					>
					<!-- :itemDoc="itemDoc" -->
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

						<ItemDocInfos
							:coll="coll"
							:is_create="is_create"
							:is_preview="false"
							:item_doc="item_doc"
							>
							<!-- :item_doc="itemDoc" -->
						</itemDocInfos>

					</v-expansion-panel-content>
				</v-expansion-panel>

				<v-divider></v-divider>


				<!-- DMT LIBRARY -->
					<!-- v-show="!isPreview" -->
				<v-expansion-panel
					v-if="$store.state.auth.isLogged"
					v-model="panel_lib_dmt"
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
								{{ $t(`projects.manage_dmt`, $store.state.locale) }}
							</span>
						</div>

						<ItemsListDI
							:tab="'datamodels'"
							:coll="'dmt'"
							:items_coll="$store.state.dmt.list"
							:no_margin="true"

							:add_to_parent="true"
							:parentDoc_id="itemId"
							:parentDoc_coll="coll"
							:items_in_parent="list_DMT_oids"

							@update_parent_dataset="update_parent_list"
							>
						</ItemsListDI>

					</v-expansion-panel-content>
				</v-expansion-panel>
			
				<v-divider></v-divider>

				<!-- DSI LIBRARY -->
					<!-- v-show="!isPreview" -->
				<v-expansion-panel
					v-if="$store.state.auth.isLogged"
					v-model="panel_lib_dsi"
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
								{{ $t(`projects.manage_dsi`, $store.state.locale) }}
							</span>
						</div>

						<ItemsListDI
							:tab="'datasets'"
							:coll="'dsi'"
							:items_coll="$store.state.dsi.list"
							:no_margin="true"

							:add_to_parent="true"
							:parentDoc_id="itemId"
							:parentDoc_coll="coll"
							:items_in_parent="list_DSI_oids"

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




		<!-- PRJ DATA : DMT -->

		<!-- DMT / DMF DATA COMPONENT -->
		<v-layout 
			row 
			mt-3
			>
			
			<!-- PRJ's DMT  -->
			<v-flex 
				xs10
				v-if="list_DMT_oids && list_DMT_oids.length != 0 "
				>
				
					<!-- :flex_vars="'xs8 offset-xs2'" -->
				<ViewEditDMT

					:item_doc="undefined"
					:item_doc_id="list_DMT_oids"
					
					:coll="'dmt'"

					:is_create="false"
					:is_preview="isPreview"

					:is_switch="true"
					:no_toolbar="true"

					:add_to_parent="true"
					:parentDoc_id="itemId"
					:parentDoc_coll="coll"

					:parent_scroll="scrollLeft"

					@update_loading="updateLoading"
					@scrollTable="updateScroll"

					@update_parent_dataset="update_parent_list"
					>
				</ViewEditDMT> 

			</v-flex>

			<!-- NO DMT -->
			<v-flex 
				xs10
				v-else
				>

				<v-card
					flat
					class="px-5 py-3 text-xs-center"
					>

					<v-card-text>
						{{ $t(`projects.no_dmt`, $store.state.locale) }}
					</v-card-text>

				</v-card>
				
			</v-flex>


			<!-- MANAGE DMT COLUMN -->
			<v-flex xs2>

				<v-layout row wrap>

					<v-flex xs12>

						<v-card
							flat
							class="pa-1 ml-3"
							>

							<v-card-text class="pa-0 text-xs-center ">
							
								<v-btn 
									:disabled="loading"
									class="ma-0 text-lowercase accent--text"
									block
									small
									flat
									@click="panel_lib_dmt=[true]; panel_infos=[false]; isSettings=true"
									>

										<!-- :color="`${ loading ? 'grey' : 'accent'} `" -->
									<v-icon 
										small
										color="accent"
										>
										{{ $store.state.mainIcons.datamodels.icon }}
									</v-icon>
									
									<!-- {{ $t(`projects.manage_dmt`, $store.state.locale) }} -->

								</v-btn>

							</v-card-text>

						</v-card>
					</v-flex>

					<!-- RECIPES -->
					<v-flex 
						xs12
						v-show="!loading && list_DMT_oids.length != 0"
						>
						
						<v-card
							flat
							class="pa-2 ml-3 mt-2"
							>
							<v-card-text class="pa-0 text-xs-center">
								REC list btns
							</v-card-text>
						</v-card>
					
					</v-flex>

				</v-layout>
			</v-flex>

		</v-layout>



		<!-- DSI LIST -->
		<!-- BTN - ADD DSI IN PRJ DSI_LIST -->
		<v-layout 
			mt-3
			row 
			wrap
			>

			<v-flex 
				xs10
				class="text-xs-center"
				>

				<v-card
					flat
					class="pa-2"
					>

						<!-- :class="`${ loading ? 'grey' : 'accent'} ma-0 pa-2`" -->
					<v-btn 
						:disabled="loading"
						class="transparent ma-0 pa-2 text-lowercase accent--text"
						block
						flat
						@click="panel_lib_dsi=[true];panel_lib_dmt=[false];isSettings=true"
						>

							<!-- :color="`${ loading ? 'grey' : 'accent'} `" -->
						<v-icon 
							left
							>
							{{ $store.state.mainIcons.create.icon }}
						</v-icon>
						
						{{ $t(`projects.manage_dsi`, $store.state.locale) }}

					</v-btn>

				</v-card>

			</v-flex>

		</v-layout>


		<!-- DSI COLUMN / IF ARRAY OF DSI IS NOT EMPTY -->
		<v-layout 
			row 
			wrap
			v-if="list_DSI_oids && list_DSI_oids.length != 0 "
			>
			<!-- v-if="list_DSI_oids" -->
	
			<!-- LOOP PRJ's DSI_LIST -->
			<v-flex 
				v-for="dsi in list_DSI_oids"
				:key="list_DSI_oids.indexOf(dsi)"
				d-flex 
				xs12
				mt-3
				>

				<v-layout row >

					<!-- <v-flex d-flex>
						<v-layout row wrap> -->

					<v-flex 
						xs10
						class="pa-0"
						>

						<!-- DEBUG -->
						<v-card-text 
							v-if="$store.state.is_debug"
							>
							dsi : <code>{{ dsi }}</code><br>
						</v-card-text>

						<ViewEditDSI

							:item_doc="false"
							:find_item="true"
							:item_doc_id="dsi.oid_dsi"

							:is_create="false"
							:is_preview="isPreview"
							:is_map="true"

							:coll="'dsi'"
							:is_switch="true"
							:no_toolbar="true"

							:add_to_parent="true"
							:parent_scroll="scrollLeft"


							@update_loading="updateLoading"
							@scrollTable="updateScroll"
							@update_parent_dataset="update_parent_list"
							>
						</ViewEditDSI>

					</v-flex>


					<!-- TO DO :  DIALOG MAPPER DSI -->
					<v-flex 
						xs2
						class="pa-0"
						v-show="!loading"
						>

						<v-card
							flat
							class="pa-3 ml-3"
							>
							<v-card-text class="pa-0 text-xs-center">
							
								ACTIONS ON DSI
							
							</v-card-text>
						</v-card>

					</v-flex>

						<!-- </v-layout>
					</v-flex> -->
					
				</v-layout>

			</v-flex>
	

		</v-layout>

		<!-- NO DSI -->
		<v-layout 
			mt-3
			row 
			wrap
			v-else
			>

			<v-flex 
				xs10
				>

				<v-card
					flat
					class="px-5 py-4 text-xs-center"
					>
					{{ $t(`projects.no_dsi`, $store.state.locale) }}
				</v-card>

			</v-flex>

		</v-layout>


	</v-container>
	
</template>


<script>

// import ScrollSync from 'vue-scroll-sync';

import ObjectFormatterCreate from "~/utils/ObjectFormatterCreate.js"
import checkDocUserAuth from "~/utils/checkDocUserAuth.js"

import ItemToolbar from '~/components/UI/itemToolbar.vue'
import ItemDocUses from '~/components/UI/itemDocUses.vue'
import ItemDocInfos from '~/components/UI/itemDocInfos.vue'

import ItemsListDI from '~/components/UI/itemsList_dataIterator.vue'
import ViewEditDMT from '~/components/UI/viewEditDMT.vue' 
import ViewEditListDMF from '~/components/UI/viewEditListDMF.vue'
import ViewEditDSI from '~/components/UI/viewEditDSI.vue' 

import SettingsToolbar from '~/components/UI/settingsToolbar.vue'


export default {

	props : [ 

		// "flex_vars",			// 

		"is_create",			// view | create
		"is_preview",			// 

		"coll",
		"item_doc", 			// complete item infos

		"is_switch",
		"no_toolbar",
	],

	components : {
		ItemToolbar,
		ItemDocInfos,
		ItemDocUses,

		ItemsListDI,
		ViewEditDMT,
		ViewEditListDMF,
		ViewEditDSI,

		SettingsToolbar,
	},

	// middlewares to populate DMT and DSI catalogs
	middleware : ["getListItems"],
	meta : {
		collection 	: [
			'dmt', 'dsi', 'tag'
		],
		level : 'get_list',
	},

	created () {

		console.log("\n- viewEditPRJ / created ---> item_doc : ", this.item_doc ) ;
		this.itemDoc 		= this.item_doc ;

		this.list_DMT_oids 	= this.item_doc.datasets.dmt_list ;
		this.list_DSI_oids 	= this.item_doc.datasets.dsi_list ;
		this.list_TAG_oids 	= this.item_doc.datasets.tag_list ;
		
		// debug
		// this.list_DMT_oids 	= [ 
		// 	{"oid_dmt" : "5b98e4db0a8286332f4f1984" }
		// ] ;
		// this.list_DSI_oids 	= [ 
		// 	{"oid_dsi" : "5c0810c60a8286214c863fb6" },
		// 	{"oid_dsi" : "5c08f2da0a82868129391891" } 
		// ] ;
		
		console.log("\n- viewEditPRJ / created ---> this.list_DMT_oids : ", this.list_DMT_oids ) ;
		console.log("\n- viewEditPRJ / created ---> this.list_DSI_oids : ", this.list_DSI_oids ) ;
		console.log("\n- viewEditPRJ / created ---> this.list_DTAGoids : ", this.list_TAG_oids ) ;


	},

	data () {

		return {


			lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,

			// ----------------------------- // 
			// UX variables 
			// ----------------------------- // 
			
			tab 		: this.$store.state.collectionsNames[this.coll],
			// tab 	: this.$store.state.collectionsNames[this.item_doc.specs.doc_type],
			alert		: null,
			
			loading 		: false,
			loading_list 	: {
				"dsi" 	: {},
				"dmt"	: {}
			},

			scrollLeft		: 0,

			panel_infos		: [true],
			panel_lib_dmt	: [false],
			panel_lib_dsi	: [true],
			panel_lib_tag	: [false],
			panel_uses		: [false],

			isPreview 	: this.is_preview,
			noToolbar	: this.no_toolbar,
			isSettings 	: false,

			// ----------------------------- // 
			// DMT - DMF - DSI references
			// ----------------------------- // 
			itemId 		: this.item_doc._id, 
			itemDoc		: this.item_doc,
			// canEdit		: false ,

			list_DMT_oids 		: [],
			// list_DMT_oids 	: [ {"oid_dmt" : "5b98e4db0a8286332f4f1984" } ],

			list_DSI_oids 		: [],
			// list_DSI_oids 	: [ 
			// 	{"oid_dsi" : "5c0810c60a8286214c863fb6" },
			// 	{"oid_dsi" : "5c08f2da0a82868129391891" } 
			// ],

			list_TAG_oids 		: [],

			// ----------------------------- // 
			// UI/UX variables 
			// ----------------------------- // 
			is_file 			: null,
			filetype 			: null,

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

		isLoading () {

			if ( Object.keys(this.loading_list.dsi).length == 0 && Object.keys(this.loading_list.dmt).length == 0 ){
				return false
			}
			else {
				return true
			}
		},

		parentPadding () {
			return (this.isPreview) ? this.parentNoBotPadding : this.parentBotPadding ;
		},

		valueSwitch () {
			// return (!this.is_preview && this.is_switch) ? this.blockPartSize : this.blockSwitchSize ;
			if(this.is_switch){
				return (this.isPreview) ? this.blockSwitchSize : this.blockPartSize ;
			}
			else {
				return this.blockFullSize
			}
		},

		valueBlockSize () {
			return (this.is_preview) ? this.blockFullSize : this.blockPartSize ;
		},

		valuePadding () {
			return (this.is_preview) ? this.valueNoPadding : this.valueLeftPadding ;
		},

	},

	watch : {

		item_doc : {

			immediate : true,
			handler ( newVal, oldVal) {

				console.log( "\nVE PRJ / watch ~ item_doc / newVal : \n", newVal )
				// console.log( "\nVE PRJ / watch ~ item_doc / oldVal : \n", oldVal )

				if (newVal) {
					// update local DMT list and DSI list
					console.log( "VE PRJ / watch ~ item_doc / newVal.infos.title : \n", newVal.infos.title )
					this.itenDoc		= newVal
					this.list_DMT_oids 	= newVal.datasets.dmt_list ; 
					this.list_DSI_oids 	= newVal.datasets.dsi_list ; 
					this.list_TAG_oids 	= newVal.datasets.tag_list ; 
				}

			}
		}

	},

	methods: {
		
		//
		// firstDMTinList () {
		// 	return ( this.list_DSI_oids.length == 0 ? [] : this.list_DMT_oids_test[0] )
		// },


		updateScroll(input) {
			// console.log("updateScroll / input : ", input )
			this.scrollLeft = input.left
		},

		updateLoading(input) {

			console.log("updateLoading / input : ", input )
			this.loading = input.loading
			// this.loading_list[input.coll][input.doc_id] = input.loading
			this.loading_list[input.coll] = input.loading

		},

		// DMT_lib SWITCH
		openDMF_lib() {
			this.isPreview = false ;
			this.panel_lib_dmt = [true];
		},

		openDSI_lib() {
			this.isPreview = false ;
			this.panel_lib_dsi = [true];
		},

		// TOOLBAR SWITCH
		switchPreview() {
			this.isPreview = !this.isPreview ;
		},

		switchSettings() {
			this.isSettings = !this.isSettings ;
		},

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

		//  checkUserAuth for an item --> /utils
		checkUserAuth (field_name) {

			console.log("checkUserAuth / field_name : ", field_name ) ;
			// console.log("checkUserAuth ...\n", this.item_doc.public_auth ) ;

			var can_update_field 	= false  ;
			
			if (this.is_create) {
				can_update_field 	= true  ;
			}

			else {
				var isLogged 			= this.$store.state.auth.isLogged ;
				var user_id 			= this.$store.state.auth.user_id ;

				can_update_field = checkDocUserAuth(this.item_doc, field_name, isLogged, user_id)
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

			return can_update_field
		},

		// submit value to create item via API backend
		createItem ( ) {
			
			console.log("\n VE createItem... ")

			this.alert    = null
			this.loading  = true

			var current_new = this.$store.state[this.coll].current_new ; 
			
			// this.formHasErrors = false ; 

			console.log("VE createItem - current_new : ", current_new )

			// Object.keys(this.form).forEach(f => {
			// 		if (!this.form[f]) this.formHasErrors = true
			// 	this.$refs[f].validate(true)
			// })

			// REFORMAT DATA
			// var data_to_send = JSON.parse(JSON.stringify(current_new)) ;
			var data_to_send = ObjectFormatterCreate.prepareFormData(current_new) ;

			// add file's data if needed
			if( this.is_file == true ){
				console.log("VE createItem / adding file  to data_to_send")
				// data_to_send['file'] 		= this.$store.state[this.coll].current_file ;
				data_to_send['csv_sep'] 	= this.$store.state[this.coll].csv_sep ;
			// 	data_to_send['filename'] 	= this.$store.state[this.coll].current_filename ;
			}

			console.log("VE createItem / data_to_send : ", data_to_send)

			//  PREPARE PAYLOAD
			var payload = { collection : this.coll, data : data_to_send } ; 
			console.log("VE createItem / payload : ", payload)

			// dispatch action from store
			this.$store.dispatch('createItem', payload )
			
			.then(result => {

				this.loading = false
				this.alert = {type: 'success', message: result.msg}

				// retrieve new item id
				var new_item_id = response.data._id

				// redirect to edit-preview page 
				return this.$router.push(`/${this.coll}/${new_item_id}`)
		
			})
			.catch(error => {

				console.log("VE createItem / submit / error... : ", error ) ; 

				this.loading = false
				// this.alert = {type: 'error', message: "login error" }
				if (error.response && error.response.data) {
					this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
				}

			})
		

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

		// UPDATE PRJ DOCUMENT
		update_parent_list ( input ) {

			console.log("update_parent_list / input : ", input )

			this.loading 		= true
			// this.$emit('update_loading', true )

			// load values as pseudoForm
			var pseudoForm		= this.form( input ) ;
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


	}


}

</script>