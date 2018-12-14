<template>

	<v-container 
		grid-list-sm 
		pa-3
		fluid
		>

		<!-- ITEM TITLE ROW -->
		<v-layout 
			v-if="!noToolbar"
			row 
			wrap 
			mb-3
			>

			<v-flex d-flex :class="flex_vars">

				<ItemToolbar
					:coll="coll" 
					:collName="tab" 
					:itemDoc="item_doc"
					:is_create="is_create" 
					:isPreview="isPreview"
					@input="switchPreview"
					>
				</ItemToolbar>

			</v-flex>

		</v-layout>



		<!-- COMPONENTS FOR COMMON DOCS INFOS -->		
		<v-flex d-flex :class="flex_vars">

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

		</v-flex>



		<!-- COMPONENTS FOR COMMON DOCS USES -->		
		<v-flex d-flex :class="flex_vars">

			<v-expansion-panel
				v-show="!isPreview"
				class="elevation-0"
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

					<ItemDocUses
						:coll="coll"
						:is_create="is_create"
						:is_preview="isPreview"
						:item_doc="itemDoc"
						>
					</itemDocUses>

				</v-expansion-panel-content>
			</v-expansion-panel>

		</v-flex>

		
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
					tab : <code>{{ tab }}</code> - 
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

import ItemToolbar from '~/components/UI/itemToolbar.vue'
import ItemDocUses from '~/components/UI/itemDocUses.vue'
import ItemDocInfos from '~/components/UI/itemDocInfos.vue'


export default {

	props : [ 
		"flex_vars",			// 
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

	},
	
	created () {
		console.log("\n- viewEditPRJ / created ---> item_doc : ", this.item_doc ) ;
		this.itemDoc = this.item_doc ;

		this.is_file = this.preloadIsFile() ; 
		this.filetype = this.preloadFileType() ; 
	},

	data () {

		return {
			
			alert		: null,
			loading 	: false,
			
			panel_infos		: [true],
			panel_data_raw	: [true],

			isPreview 	: this.is_preview,
			noToolbar	: this.no_toolbar,

			// coll 		: this.item_doc.specs.doc_type, 
			tab 		: this.$store.state.collectionsNames[this.coll],
			// tab 	: this.$store.state.collectionsNames[this.item_doc.specs.doc_type],
			// canEdit		: false ,
			itemId 		: this.item_doc._id, 
			itemDoc		: this.item_doc,

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

	methods: {
		
		switchPreview() {
			this.isPreview = !this.isPreview ;
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
		

		}

	}


}

</script>