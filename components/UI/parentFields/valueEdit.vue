<template>

	<div>

		<v-layout row justify-center class="pa-0 ma-0">


			<!--  SUBFIELD NAME  -->
			<v-flex
				ValEdit_subField
				v-if="!is_preview"
				:class="subFieldsSize"
				>
				<v-btn 
					class="pa-0 ma-0"
					disabled 
					small
					block 
					color="grey" 
					style="text-transform: none !important;"
					>
					<span>
						{{ subField }} 
						<!-- <br> - {{ is_file }} -->
					</span>
				</v-btn>
			</v-flex>


			<!--  SUBFIELD VALUE + BUTTON  -->
			<v-flex
				ValEdit_field
				:class="valueBlockSize"
				class="pa-0 ma-0"
				>

				<!-- <v-btn 
					class="pa-0 ma-0"
					flat 
					block 
					:disabled="!canEdit"
					color="" 
					style="text-transform: none !important;"
					@click="open()"
					> -->


					<!-- <span> -->
						<!-- {{ item_data }}  -->
						<!-- - {{ coll }} / {{ collName }} -->
						<!-- - is_create :{{ is_create }} -->
						<!-- - {{ parentField }}.{{ subField }} -->
						<!-- - canEdit : {{ canEdit }} -->
						<!-- - {{ valueBlockSize }} -->

					<!-- </span> -->

					<!-- <v-icon small right v-if="canEdit" color="accent"> 
						edit
					</v-icon> -->



					<!-- CHOICES VALUE -->
					<v-select
						v-if="subField in $store.state.subFieldsWithChoices "
						:solo="is_preview"
						:hide-details="is_preview"
						v-model="itemData"
						:color="fieldColor"
						:disabled="!canEdit"
						:label="$t( collName+'.'+subField, $store.state.locale )"
						:items="$store.state.subFieldsWithChoices[subField]['choices']"
						@change="srcTypeSwitch() ; submitValue () ; save()"
						>
					</v-select>


					<!-- BOOLEAN VALUE -->
					<v-checkbox
						v-else-if=" $store.state.subFieldsWithBoolean.includes(subField) "
						:solo="is_preview"
						:hide-details="is_preview"
						:class="checkBoxPadding"
						:color="fieldColor"
						:disabled="!canEdit"
						v-model="itemData"
						:label="$t('global.'+subField, $store.state.locale)"
						@change="submitValue () ; save()"
						>
					</v-checkbox>





					<!-- SRC UPLOAD (SRC_LINK) -->
					<template
						v-else-if="$store.state.subFieldsWithFile.includes(subField)"
						>
						
						<div>
							
							<!-- DEBUGGING -->
							<!-- <p 
								v-if="is_file"
								>
								- itemData 	: {{ itemData }} <br>
								- filename 	: {{ filename }} <br>
							</p> -->

							<!-- FILE UPLOAD  -->
							<FileField
								v-if="is_file"
								v-model="itemData"
								:rawInput="itemData"
								:labelText="'global.'+subField"
								@click="snack_if_not_create()"
								@input="updateFile"
								>
							</FileField>

							<!-- TEXT VALUE -->
							<v-text-field
								v-else
								:solo="is_preview"
								:hide-details="is_preview"
								:ref="subField"
								:color="fieldColor"
								:readonly="!canEdit"
								v-model="itemData"
								:rules="[() => !!itemData || $t('rules.required', $store.state.locale )]"
								:label="$t( collName+'.'+subField, $store.state.locale )"
								:error-messages="errorMessages"
								:placeholder="$t('global.'+subField, $store.state.locale )"
								required
								@keyup.enter="submitValue () ; save()"
								@change="submitValue ()"
								@click="snack_if_not_create() "
							></v-text-field>

						</div>

					</template>





					<!-- COMBO VALUE  -->
					<!-- <v-flex xs12>
						<v-autocomplete
							:items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
							label="Interests"
							multiple
						></v-autocomplete>
					</v-flex> -->



					<!-- TEXT AREA VALUE -->
					<v-textarea
						v-else-if=" $store.state.subFieldsWithTextarea.includes(subField) "
						v-model="itemData"
						:solo="is_preview"
						hide-details
						:color="fieldColor"
						:disabled="!canEdit"
						:box="!is_preview"
						:label="$t( collName+'.'+subField, $store.state.locale )"
						auto-grow
						:rows="textAreaRows"
						:clearable="!is_preview"
						@keyup.enter="submitValue () ; save()"
						@change="submitValue ()"
						@click="snack_if_not_create()"
					></v-textarea>


					<!-- TEXT VALUE -->
					<v-text-field
						v-else
						:solo="is_preview"
						:hide-details="is_preview"
						:ref="subField"
						:color="fieldColor"
						:disabled="!canEdit"
						v-model="itemData"
						:rules="[() => !!itemData || $t('rules.required', $store.state.locale )]"
						:label="$t( collName+'.'+subField, $store.state.locale )"
						:error-messages="errorMessages"
						:placeholder="$t('global.'+subField, $store.state.locale )"
						required
						@keyup.enter="submitValue () ; save()"
						@change="submitValue ()"
						@click="snack_if_not_create() "
					></v-text-field>



				<!-- </v-btn> -->

			</v-flex>




			<!--  UPDATE DIALOG  -->
			<v-dialog 
				v-if="canEdit"
				v-model="dialog" 
				persistent 
				max-width="500px"
				>

				<v-card>

					<v-card-title>
						<span class="headline">
							{{$t('global.edit', $store.state.locale )}} : 
							{{$t('global.'+subField, $store.state.locale )}}
						</span>
					</v-card-title>

					<!-- <v-divider></v-divider> -->

					<v-card-text class="py-0 ma-0">
						<v-container grid-list-md class="py-0 ma-0">
							<v-layout wrap>

								<v-flex xs12>

								</v-flex>

							</v-layout>
						</v-container>

						<!-- <small>*indicates required field</small> -->

					</v-card-text>





					<!-- UPDATE | SAVE DIALOG -->
					<v-card-actions>

						<v-spacer></v-spacer>

						<!-- CANCEL -->
						<v-btn color="grey darken-1" flat @click="dialog = false ; cancel() ">
							{{$t('global.cancel', $store.state.locale )}}
						</v-btn>

						<!-- UPDATE VALUE BY API -->
						<v-btn 
							v-if="!is_create"
							color="accent darken-1" 
							flat 
							@click="dialog = false ; submitValue () ; save() "
							>
							{{$t('global.save', $store.state.locale )}}
						</v-btn>

						<!-- UPDATE VALUE IN STORE -->
						<v-btn 
							v-else
							color="accent darken-1" 
							flat 
							@click="dialog = false ; save() "
							>
							{{$t('global.save', $store.state.locale )}}
						</v-btn>

					</v-card-actions>

				</v-card>
			</v-dialog>





		</v-layout>


		<!-- SNACK -->
		<v-snackbar 
			v-model="snack" 
			:timeout="3000" 
			:color="snackColor"
			>

			{{$t('dialog.'+snackText, $store.state.locale )}}
			
			<v-btn 
				flat 
				@click="snack = false"
				>
				{{$t('global.close', $store.state.locale )}}
			</v-btn>

		</v-snackbar>

	</div>

</template>


<script>

import FileField from '~/components/Forms/Fields/filefield.vue'
// import ObjectFormatterUpdate from "~/utils/objectFormatterUpdate.js"

export default {

	props : [ 

		"coll",
		"collName",
		"is_create",
		"is_preview",
		"parentField",
		"subField",
		"item_id",
		"item_data",
		"canEdit",

		"is_file"

	],

	components : {
		FileField,
	},

	// created vs mounted
	// cf : https://stackoverflow.com/questions/45813347/difference-between-the-created-and-mounted-events-in-vue-js
	created () {
		// console.log("\n- valueEdit / created ---> item_data : ", this.item_data ) ;
	},

	created () {
		console.log("- valueEdit / mounted ---> item_data : ", this.item_data ) ;
		this.itemData = this.item_data ;
	},


	data: function () {

		return {
			
			itemData 		: null,

			// edit_mode	: false,

			file			: '',
			filename		: '',

			dialog			: false,
			snack			: false,
			snackColor		: 'primary',
			snackText		: 'edit',

			fieldColor		: "accent",
			textAreaRows 	: 3,

			valueFullSize 	: "xs12 ma-0 pa-0",
			valuePartSize 	: "xs12 md9 ma-0 pa-2",
			subFieldsSize 	: "xs12 md3 ma-0 pa-2",

			checkBoxNoPadding 	: " mt-0 pl-2",

			is_req 			: ['yes','no'],
			errorMessages	: '',
			formHasErrors	: false
		
		}
	},

	computed: {

		valueBlockSize () {
			return (this.is_preview) ? this.valueFullSize : this.valuePartSize ;
		},

		checkBoxPadding () {
			return (this.is_preview) ? this.checkBoxNoPadding : "" ;
		},

		form () {
			return {
				"field_to_update" 	: this.parentField+'.'+this.subField ,
				"field_value"		: this.itemData,
			}
		},

	},

	watch: {
		name () {
			this.errorMessages = ''
		}
	},

	methods: {

		// dialog functions
		save () {
			if (!this.is_create){
				this.dialog = false
				this.snack = true
				this.snackColor = 'success'
				this.snackText = 'saved'
			}
		},
		cancel () {
			this.dialog = false
			this.snack = true
			this.snackColor = 'error'
			this.snackText = 'canceled'
		},
		open () {
			this.dialog = true
			this.snack = true
			this.snackColor = 'info'
			this.snackText = 'opened'
		},
		close () {
			console.log('Dialog closed')
		},

		snack_if_not_create() {
			if (!this.is_create && this.canEdit){
				this.snack = true
			}
		},

		// values checks
		contentCheck () {
			this.errorMessages = !this.iteData 
			? $t('rules.required', $store.state.locale )
			: ''

			return true
		},

		resetForm () {
			this.errorMessages = []
			this.formHasErrors = false

			Object.keys(this.form).forEach(f => {
				this.$refs[f].reset()
			})
		},
		

		// FILE INFOS UPDATE 
		updateFile(val) {

			console.log("\n updateFile / val.file : ", val.file)
			console.log("updateFile / val.fileName : ", val.fileName)

			this.itemData	= val.fileName ;

			this.file 		= val.file ;
			this.filename 	= val.fileName ;

			this.$store.commit(`${this.coll}/set_current_file`, val.file );

			this.submitValue () ;

		},

		// FILE-API SWITCH
		srcTypeSwitch(event) {

			if( this.subField == "src_type" ) {

				console.log("\n srcTypeSwitch... ")
				var isFile = true ; 

				console.log("srcTypeSwitch / this.isFile : ", this.isFile )
				console.log("srcTypeSwitch / this.itemData : ", this.itemData)

				if (this.itemData == "API") {
					isFile = false ;
				}

				console.log("srcTypeSwitch / isFile : ", isFile )

				// send data back to parent component
				this.$emit('input', {
					subField : this.subField,
					is_file  : isFile,
				})
			}
		},


		// submit value for update : via API backend | via $store.set_current_new
		submitValue () {

			console.log("\n submitValue... ")

			this.formHasErrors = false

			// Object.keys(this.form).forEach(f => {
			// 	if (!this.form[f]) this.formHasErrors = true
			// 	this.$refs[f].validate(true)
				
			// })



			// UPDATE VALUE TO API
			if (!this.is_create) {

				// var formData = ObjectFormatterUpdate.prepareFormData(this.form) ;
				var formData = [this.form] ;
				console.log("submitValue - update / formData : ", formData)

				// dispatch action from store
				this.$store.dispatch('updateItem', {
					coll	: this.coll,
					doc_id  : this.item_id,
					form 	: formData, //this.form,
				}).then(result => {
					this.alert = {type: 'success', message: result.msg}
					this.loading = false
					// this.$router.push('/') /////////
				}).catch(error => {
					console.log("submit / error... : ", error ) ; 
					this.loading = false
					this.alert = {type: 'error', message: "login error" }
					if (error.response && error.response.data) {
						this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
					}
				})

			}

			// UPDATE VALUE TO STORE at current_new
			else {

				var valueData = {
					"parentField" 	: this.parentField,
					"subField" 		: this.subField,
					"item_data" 	: this.itemData , 
				} ;
				
				console.log("submitValue - create / valueData : ", valueData)
				this.$store.commit(`${this.coll}/set_current_new`, valueData );

			}



		}

	}
}
</script>

