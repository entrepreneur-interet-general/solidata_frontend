<template>

	<v-container 
		grid-list-xl 
		text-xs-center
		>
		
		<!-- ITEM TITLE ROW -->
		<v-layout 
			v-if="!isPreview || is_create || is_switch"
			row 
			wrap 
			>

			<v-flex d-flex :class="flex_vars">

				<v-toolbar dark dense color="primary" xs12>
					
					<!-- BACK TO COLL LIST -->
					<v-btn 
						icon 
						small 
						color=""
						:to="'/'+coll"
						>					
						<v-icon small>
							{{ $store.state.mainIcons[collName]['icon'] }}
						</v-icon>
					</v-btn>

					<!-- ITEM TITLE -->
					<v-card-text 
						class="title text-uppercase"
						>
						<!-- {{$t(collName+'.edit', $store.state.locale )}} -->
						{{ item_doc.infos.title }}
					</v-card-text>

					<!-- SWITCH FOR PREVIEW -->
					<v-switch 
						:label="$t('global.preview', $store.state.locale)"
						v-model="isPreview"
						color="warning"
						:input-value="isPreview"
						hide-details
						>
					</v-switch>

					<!-- DELETE ITEM MENU -->
					<v-menu 
						bottom 
						left 
						v-if="!is_create">

						<v-btn 
							icon 
							small
							slot="activator"
							>
							<v-icon>
								more_vert
							</v-icon>
						</v-btn>

						<v-list class="pa-0">

							<v-list-tile
								@click=""
								>

								<v-list-tile-title class="pa-0 ma-0">

									<v-btn 
										flat 
										small
										block
										class="ma-0"
										:to="'/'+coll+'/'+itemId+'/delete'"
										>
										<v-icon small left color="error">
											delete
										</v-icon>
										{{ $t(`global.delete_i`, $store.state.locale) }}
									</v-btn>

								</v-list-tile-title>

							</v-list-tile>
						</v-list>
					</v-menu>


				</v-toolbar>

			</v-flex>

		</v-layout>



		<!-- ITEM VALUES ROW -->
		<v-layout 
			row wrap
			>

			<v-flex 
				ParentField_1
				d-flex 
				:class="flex_vars + parentPadding" 
				v-for="parentField in parentFieldslist"
				>

				<!-- parentFieldName -->
				<v-flex 
					ParentField_2
					v-if="!isPreview"
					:class="parentFieldsSize"
					d-flex 
					>
					<v-card 
						color="secondary" 
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
									d-flex
									:class="blockFullSize + valuePadding"
									>

									<v-card>

										<ValueEdit
											:coll="coll"
											:collName="collName"
											:parentField="parentField.parentFieldName"
											:subField="subField"
											:is_create="is_create"
											:is_preview="isPreview"
											:item_id="item_doc._id"
											:item_data="item_doc[parentField.parentFieldName][subField]"
											:item_auth="item_doc.public_auth"
											:canEdit="canEdit"
											:is_file="is_file"
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
			v-if="is_create"
			row 
			wrap 
			>

			<v-flex d-flex :class="flex_vars">
				
				<v-btn 
					block 
					dark 
					large
					class="mt-4 accent"
					:loading="loading" 
					@click="createItem()"
					>
					<v-icon left large>
						{{ $store.state.mainIcons.create.icon }}
					</v-icon>

					<span class="subheading">
						{{ $t(collName+`.create`, $store.state.locale) }}
					</span>

				</v-btn>

				<!-- <CardCreate
					v-if="$store.state.auth.isLogged"
					:tab="collName"
					:defaultFlex="createSize"
					:defaultHeight="defaultHeightAdd"
					>
				</CardCreate> -->

			</v-flex>

		</v-layout>




		<!-- DEBUG  -->
		<v-layout 
			v-if="is_debug"
			row wrap
			>

			<v-flex d-flex :class="flex_vars">

				<v-alert       
					:value="true"
					type="error"
					>
					---- DEBUG component - ItemViewEdit ----
					<hr>

					-- item_doc -- <br>
					{{ item_doc }}
					<hr>

					-- vars -- <br>
					is_file : {{ is_file }} - 
					coll : {{ coll }} - 
					collName : {{ collName }} - 
					is_create : {{ is_create }} - 
					item_doc._id : {{ item_doc._id}} - 
					canEdit : {{ canEdit }}
					flex_vars : {{flex_vars}} - 
					<hr>

					-- current_new in $store.state.{{coll}} -- <br>
					{{coll}}.current_new : {{ $store.state[coll].current_new }}
				</v-alert>

			</v-flex>

		</v-layout>



	</v-container>
	
</template>


<script>

import ObjectFormatterCreate from "~/utils/ObjectFormatterCreate.js"

import SectionTitle from '~/components/UI/sectionTitle.vue'

// import CardInfos from '~/components/UI/parentFields/cardInfos.vue'
import ValueEdit from '~/components/UI/parentFields/valueEdit.vue'
import CardCreate from '~/components/UI/cardCreate.vue'


export default {

	props : [ 
		"flex_vars",			// 
		"is_create",			// view | create
		"is_preview",			// 
		"parentFieldslist",		// 
		"coll",
		"item_doc", 			// complete item infos
		"is_debug",
		"is_switch",
	],

	components : {
		SectionTitle,
		// CardInfos,
		ValueEdit,
		CardCreate,
	},
	
	mounted () {
		console.log("\n- itemViewEdit / mounted ---> item_doc : ", this.item_doc ) ;
		this.canEdit = this.checkUserAuth(this.parentField+'.'+this.subField)

		// this.is_file = ( this.coll == "dsi" ) ? true : false ; 
		this.is_file = this.preloadIsFile() ; 
	},

	data () {

		return {
			
			loading 	: false,
			isPreview 	: this.is_preview,

			// coll 		: this.item_doc.specs.doc_type, 
			collName 	: this.$store.state.collectionsNames[this.coll],
			// collName 	: this.$store.state.collectionsNames[this.item_doc.specs.doc_type],
			canEdit		: false ,
			itemId 		: this.item_doc._id, 

			is_file 			: null,

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
		
		preloadIsFile () {
			var isFile = false ;
			if ( this.coll == "dsi"){
				if(this.item_doc.specs.src_type != "API") {
					isFile = true
				}
			}
			return isFile
		},

		updateIsFile(val) {
			
			if( val.subField == "src_type"){

				console.log("\n updateIsFile / val : ", val)
				this.is_file = val.is_file ;

			}
		},

		//  TO DO  --> FACTORIZE checkUserAuth for an item --> /utils
		checkUserAuth (field_name) {

			console.log("\ncheckUserAuth ...\n", this.item_doc.public_auth ) ;

			var can_update_field 	= false  ;
			var doc_auth_edit 		= this.item_doc.public_auth.open_level_edit ; 
			var doc_auth_team 		= this.item_doc.team ; 

			if (doc_auth_edit == 'open_data' ){
				can_update_field = true
			}

			else if (doc_auth_edit == 'commons') {
				//  check if user is connected
				can_update_field = true
			} 

			else if (doc_auth_edit == 'collective') {
				//  check if user is part of the team
				can_update_field = true
			} 

			else if (doc_auth_edit == 'private') {
				//  check if user is the owner
				can_update_field = true
			} 

			return can_update_field
		},

		// submit value to create item via API backend
		createItem () {
			
			console.log("\n VE createItem... ")

			var current_new = this.$store.state[this.coll].current_new ; 
			
			// this.formHasErrors = false ; 

			console.log("\n createItem - current_new : ", current_new )

			// Object.keys(this.form).forEach(f => {
				// 	if (!this.form[f]) this.formHasErrors = true
			// 	this.$refs[f].validate(true)
				
			// })

			// REFORMAT DATA
			// var data_to_send = JSON.parse(JSON.stringify(current_new)) ;
			var data_to_send = ObjectFormatterCreate.prepareFormData(current_new) ;
			console.log("\n VE createItem / data_to_send : ", data_to_send)

			//  PREPARE PAYLOAD
			var payload = { collection : this.coll, data : data_to_send } ; 
			console.log("\n VE createItem / payload : ", payload)

			// dispatch action from store
			this.$store.dispatch('createItem', payload )
			
			.then(result => {

				this.loading = false
				// this.alert = {type: 'success', message: result.msg}

				// retrieve new item id
				var new_item_id = response.data._id

				// redirect to edit-preview page 
				return this.$router.push(`/${this.coll}/${new_item_id}`)
		
			}).catch(error => {

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