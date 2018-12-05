<template>

	<v-container 
		grid-list-sm 
		py-5
		height="800px"
		>
		
		<!-- DSI INFOS -->
		<v-layout row wrap>

			<v-flex xs10>
				<v-card dark color="accent">
					<v-card-text class="px-0">
						infos - {{ item_doc.infos }}
						<br>- {{ itemId }}
						<!-- <br>- {{ item_headers }} -->
					</v-card-text>
				</v-card>
			</v-flex>

			<v-flex xs2>
				<v-card dark color="accent">
					<v-card-text class="px-0">
						delete or reset calls
					</v-card-text>
				</v-card>
			</v-flex>

		</v-layout>



		<!-- DSI TEAM AND PUBLIC_AUTH -->
		<v-layout row wrap>

			<!-- DSI PUBLIC_AUTH -->
			<v-flex xs6>
				<v-card dark color="primary">
					<v-card-text class="px-0">
						public_auth - {{ item_doc.public_auth }}
					</v-card-text>
				</v-card>
			</v-flex>

			<!-- DSI TEAM -->
			<v-flex xs6>
				<v-card dark color="primary">
					<v-card-text class="px-0">
						team - {{ item_doc.team }}
					</v-card-text>
				</v-card>
			</v-flex>

		</v-layout>


		<!-- DSI SPECS + LOG + USES -->
		<v-layout row wrap>
			
			<!-- LOG -->
			<v-flex xs4>
				<v-card dark color="secondary">
					<v-card-text class="px-0">
						log - {{ item_doc.log }}
					</v-card-text>
				</v-card>
			</v-flex>

			<!-- SPECS -->
			<v-flex xs4>
				<v-card dark color="secondary">
					<v-card-text class="px-0">
						specs - {{ item_doc.specs }}
					</v-card-text>
				</v-card>
			</v-flex>

			<!-- USES -->
			<v-flex xs4>
				<v-card dark color="secondary">
					<v-card-text class="px-0">
						uses - {{ item_doc.uses }}
					</v-card-text>
				</v-card>
			</v-flex>

		</v-layout>

		<!-- DSI - DSR -->
		<v-layout row wrap>
			<v-flex xs12>
				<v-card dark color="grey">
					<v-card-text class="px-0">
						dsr - {{ item_doc.datasets.dsr_list }}
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>

		

		<!-- DSI DATA -->
		<v-layout row wrap>
			
			<v-flex xs12>
				<v-card color="">
					<v-card-text class="pa-0">


						<v-data-table
							:headers="item_headers"
							:items="item_data"
							class="elevation-1"
							>
							<template slot="items" slot-scope="props">
								<td 
									v-for="i in item_headers"
									:key="item_headers.indexOf(i)">
									{{ props.item[i.value] | truncate(30, '...') }}
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

// import CardInfos from '~/components/UI/parentFields/cardInfos.vue'
import ValueEdit from '~/components/UI/parentFields/valueEdit.vue'
// import CardCreate from '~/components/UI/cardCreate.vue'


export default {

	props : [ 
		"flex_vars",			// 
		"is_create",			// view | create
		"is_preview",			// 
		"parentFieldslist",		// 
		"coll",
		"item_doc", 			// complete item infos
		// "is_debug",
		"is_switch",
	],

	components : {
		// SectionTitle,
		// CardInfos,
		ValueEdit,
		// CardCreate,
	},
	
	created () {
		console.log("\n- itemViewEdit / created ---> item_doc : ", this.item_doc ) ;
		this.itemDoc = this.item_doc ;
		// this.canEdit = this.checkUserAuth(this.parentField+'.'+this.subField)
		// this.canEdit = this.checkUserAuth(this.parentFieldslist)

		// this.is_file = ( this.coll == "dsi" ) ? true : false ; 
		// this.is_file = this.preloadIsFile() ; 
		// this.filetype = this.preloadFileType() ; 
	},

	data () {

		return {
			
			alert		: null,
			loading 	: false,
			isPreview 	: this.is_preview,

			collName 	: this.$store.state.collectionsNames[this.coll],

			itemId 			: this.item_doc._id, 
			itemDoc			: this.item_doc,
			item_data 		: this.item_doc.data_raw.f_data, 
			// item_headers 	: this.item_doc.data_raw.f_col_headers, 

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

		item_headers () {
			var headers 	= [] ;
			const raw_headers = this.item_doc.data_raw.f_col_headers ;
			console.log("item_headers / raw_headers : ", raw_headers)

			for (let header in raw_headers ) {
				console.log("item_headers / header : ", header)
				var header_ = {
					value 	: raw_headers[header].f_coll_header_val,
					text	: raw_headers[header].f_coll_header_text,
				};
				headers.push(header_)
			}
			return headers
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
				// 	if (!this.form[f]) this.formHasErrors = true
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