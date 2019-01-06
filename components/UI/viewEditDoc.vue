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
					:isSettings="isSettings"
					:is_loading="loading"
					@input="switchPreview"
					@settings="switchSettings"
					>
				</ItemToolbar>

			</v-flex>

		</v-layout>



		<!-- ITEM VALUES ROW -->
		<v-layout 
			row wrap

			>

			<v-flex 
				v-for="parentField in parentFieldslist"
				:key="parentFieldslist.indexOf(parentField)"
				ParentField_1
				d-flex 
				:class="flex_vars + parentPadding" 
				>

				<!-- parentFieldName -->
				<v-flex 
					ParentField_2
					v-if="!isPreview"
					:class="parentFieldsSize"
					d-flex 
					>
					<v-card 
						class="text-xs-center"
						color="grey" 
						flat
						dark
						>
						<v-card-text>

							<v-icon small>
								{{ $store.state.mainIcons.parentFieldIcons[parentField.parentFieldName].icon }}
							</v-icon>
							<v-spacer></v-spacer>
							<span>
								{{ $t(`parentFields.`+parentField.parentFieldName, $store.state.locale) }}
								<!-- <br> - is_file :  {{ is_file }} -->
								<!-- <br> - loading :  {{ loading }} -->
							</span>

						</v-card-text>
					</v-card>
				</v-flex>


				<!-- subFields names and values-->
				<v-flex 
					SubField_1
					d-flex 
					:class="valueSwitch"
					>

					<v-layout row wrap>
						<v-flex d-flex>
							<v-layout row wrap>
								
								<v-flex 
									SubField_2
									v-for="subField in parentField.subFields"
									:key="parentField.subFields.indexOf(subField)"
									d-flex
									:class="blockFullSize + valuePadding"
									>

									<v-card flat> 

										<ValueEdit
											:coll="coll"
											:collName="tab"
											:parentField="parentField.parentFieldName"
											:subField="subField"
											:only_subfields="only_subfields"
											:is_create="is_create"
											:is_preview="isPreview"
											:item_id="itemId"
											:item_data="itemDoc[parentField.parentFieldName][subField]"
											:item_auth="itemDoc.public_auth"
											:canEdit="checkUserAuth(parentField.parentFieldName+'.'+subField)"
											:is_file="is_file"
											:filetype="filetype"
											:is_loading="loading"
											@input="updateIsFile"
											>
										</ValueEdit>

									</v-card>

								</v-flex>

							</v-layout>
						</v-flex>
					</v-layout>
				</v-flex>

			</v-flex>


		</v-layout>



		<!-- ITEM CREATE BTN ROW -->
		<v-layout 
			v-if="is_create && !only_subfields"
			row 
			wrap 
			pb-5 pt-3
			>

			<v-flex 
				d-flex 
				:class="flex_vars"
				>
				
				<!--
				<v-btn 
					 
					dark 
					large
					flat

					class=" accent"
					color=""
					:loading="loading" 
					@click="createItem()"
					>

					<v-icon left large>
						{{ $store.state.mainIcons.create.icon }}
					</v-icon>

					<span class="subheading">
						{{ $t(tab+`.create`, $store.state.locale) }}
					</span>

				</v-btn> -->

				<!-- CREATE BTN -->
				<BtnCreate
					:is_icon="false"
					:tab="tab"
					:color="'white'"
					:btn_class="'accent'"
					:is_block="false"
					:outline="false"
					:large="true"
					:flat="true"
					:is_calling="true"
					@input="createItem()"
					>
				</BtnCreate>


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

// import SectionTitle from '~/components/UI/sectionTitle.vue'
import ItemToolbar from '~/components/UI/itemToolbar.vue'

// import CardInfos from '~/components/UI/parentFields/cardInfos.vue'
import ValueEdit from '~/components/UI/parentFields/valueEdit.vue'
// import CardCreate from '~/components/UI/cardCreate.vue'
import BtnCreate from '~/components/UI/btnCreate.vue'


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
		"no_toolbar",
		"only_subfields",
	],

	components : {
		// SectionTitle,
		ItemToolbar,
		// CardInfos,
		ValueEdit,
		// CardCreate,
		BtnCreate,
	},
	
	created () {
		console.log("\n- viewEditDoc / created ---> item_doc : ", this.item_doc ) ;
		this.itemDoc = this.item_doc ;
		// this.canEdit = this.checkUserAuth(this.parentField+'.'+this.subField)
		// this.canEdit = this.checkUserAuth(this.parentFieldslist)

		// this.is_file = ( this.coll == "dsi" ) ? true : false ; 
		this.is_file = this.preloadIsFile() ; 
		this.filetype = this.preloadFileType() ; 
	},

	data () {

		return {
			
			alert		: null,
			loading 	: false,
			
			isPreview 	: this.is_preview,
			noToolbar	: this.no_toolbar,
			isSettings 	: false,

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
			parentBotPadding	: " pb-0 pt-2",
			parentNoBotPadding	: " py-0",

			valueNoPadding 		: " ma-0 pa-0",
			valueLeftPadding 	: " ma-0 py-0 pr-0 pl-0",

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

			// console.log("checkUserAuth / field_name : ", field_name ) ;

			var can_update_field 	= false  ;
			
			if (this.is_create) {
				can_update_field 	= true  ;
			}

			else {
				var isLogged 			= this.$store.state.auth.isLogged ;
				var user_id 			= this.$store.state.auth.user_id ;

				can_update_field = checkDocUserAuth(this.item_doc, field_name, isLogged, user_id)
			}

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
				
				this.$store.commit(`set_error`, error)

				if (error.response && error.response.data) {
					this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
				}

			})
		

		}

	}


}

</script>