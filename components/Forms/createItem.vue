<template>

	<v-container class="pt-5">
		<v-layout align-center justify-center row fill-height>

			<v-flex xs12 md9>

			<v-form 
				@submit.prevent="submitNewItem" 
				id="create-form"
				>

				<v-stepper 
					v-model="E6" 
					vertical 
					non-linear
					>

					<!-- <div>
						<v-divider></v-divider>
						==> DEBUGGING FORM
						<v-divider></v-divider>
						valuesToSend : <br>
						_ title : {{ valuesToSend.title }} <br>
						_ description : {{ valuesToSend.description }} <br>
						_ licence : {{ valuesToSend.licence }} <br>
						_ open_level_edit : {{ valuesToSend.open_level_edit }} <br>
						_ open_level_show : {{ valuesToSend.open_level_show }} <br>
						_ f_is_required : {{ valuesToSend.f_is_required }} <br>
						<v-divider></v-divider>
					</div> -->

					<!-- STEPS ITERATION -->
					<template
						v-for="(stepInfo, i) in itemSteps"
						>

						<v-stepper-step 
							:complete="E6 > i" 
							:step="i+1" 
							editable
							>
							{{ $t( itemType+'.'+stepInfo, $store.state.locale) }}
						</v-stepper-step>

						<v-stepper-content :step="i+1">
							
							<!-- <v-card color="white" class="" height="100%"> -->

							<v-card-text 
								class="mb-1"
								>

								<!-- <TextField
									v-if="stepInfo == 'title'"
									v-model="valuesToSend.title"
									:rawInput="valuesToSend.title"
									:labelText="'global.'+stepInfo"
									@input="updateTitle"
									>
								</TextField> -->
								<v-text-field
									v-if="stepInfo == 'title'"
									v-model="valuesToSend.title"
									:label="$t('global.'+stepInfo, $store.state.locale )"
									box
									color="primary"
									clearable
								></v-text-field>



								<!-- <TextArea
									v-if="stepInfo == 'description'"
									v-model="valuesToSend.description"
									:rawInput="valuesToSend.description"
									:labelText="'global.'+stepInfo"
									@input="updateDescription"
									>
								</TextArea> -->
								<v-textarea
									v-if="stepInfo == 'description'"
									v-model="valuesToSend.description"
									:label="$t('global.'+stepInfo, $store.state.locale )"
									auto-grow
									box
									color="primary"
									rows="3"
									clearable
								></v-textarea>



								<!-- <TextArea
									v-if="stepInfo == 'f_code'"
									v-model="valuesToSend.f_code"
									:rawInput="valuesToSend.f_code"
									:labelText="'global.'+stepInfo"
									@input="updateFCode"
									>
								</TextArea> -->
								<v-text-field
									v-if="stepInfo == 'f_code'"
									v-model="valuesToSend.f_code"
									:label="$t('global.'+stepInfo, $store.state.locale )"
									box
									color="primary"
									clearable
								></v-text-field>


								<!-- <TextArea
									v-if="stepInfo == 'f_type'"
									v-model="valuesToSend.f_type"
									:rawInput="valuesToSend.f_type"
									:labelText="'global.'+stepInfo"
									@input="updateFType"
									>
								</TextArea> -->
								<!-- <v-text-field
									v-if="stepInfo == 'f_type'"
									v-model="valuesToSend.f_type"
									:label="$t('global.'+stepInfo, $store.state.locale )"
									box
									color="primary"
									clearable
								></v-text-field> -->
								<v-select
									v-if="stepInfo == 'f_type'"
									v-model="valuesToSend.f_type"
									auto
									box
									hide-details
									:label="$t('global.'+stepInfo, $store.state.locale)"
									:items="$store.state.dmf.dmf_types"
									single-line
									>
								</v-select>


								<!-- <TextArea
									v-if="stepInfo == 'f_object'"
									v-model="valuesToSend.f_object"
									:rawInput="valuesToSend.f_object"
									:labelText="'global.'+stepInfo"
									@input="updateFObject"
									>
								</TextArea> -->
								<v-text-field
									v-if="stepInfo == 'f_object'"
									v-model="valuesToSend.f_object"
									:label="$t('global.'+stepInfo, $store.state.locale )"
									box
									color="primary"
									clearable
								></v-text-field>

								<!-- <TextArea
									v-if="stepInfo == 'f_comments'"
									v-model="valuesToSend.f_comments"
									:rawInput="valuesToSend.f_comments"
									:labelText="'global.'+stepInfo"
									@input="updateFComments"
									>
								</TextArea> -->
								<v-textarea
									v-if="stepInfo == 'f_comments'"
									v-model="valuesToSend.f_comments"
									:label="$t('global.'+stepInfo, $store.state.locale )"
									auto-grow
									box
									color="primary"
									rows="3"
									clearable
								></v-textarea>

								<!-- <CheckboxField
									v-if="stepInfo == 'f_is_required'"
									v-model="valuesToSend.f_is_required"
									:rawInput="valuesToSend.f_is_required"
									:labelText="'global.'+stepInfo"
									@input="updateFIsRequired"
									>
								</CheckboxField> -->
								<v-checkbox
									v-if="stepInfo == 'f_is_required'"
									v-model="valuesToSend.f_is_required"
									:label="$t('global.'+stepInfo, $store.state.locale)"
									>
								</v-checkbox>



								<!-- <SelectField
									v-if="stepInfo == 'licence'"
									v-model="valuesToSend.licence"
									:rawInput="valuesToSend.licence"
									:labelText="'global.'+stepInfo"
									@input="updateLicence"
									:choices="$store.state.licences"
									>
								</SelectField> -->
								<v-select
									v-if="stepInfo == 'licence'"
									v-model="valuesToSend.licence"
									auto
									box
									hide-details
									:label="$t('global.'+stepInfo, $store.state.locale)"
									:items="$store.state.licencesList"
									single-line
									>
								</v-select>



								<!-- <SelectField
									v-if="stepInfo == 'open_level_edit'"
									v-model="valuesToSend.open_level_edit"
									:rawInput="valuesToSend.open_level_edit"
									:labelText="'global.'+stepInfo"
									@input="updateOpenLevelEdit"
									:choices="$store.state.openlevel"
									>
								</SelectField> -->
								<v-select
									v-if="stepInfo == 'open_level_edit'"
									v-model="valuesToSend.open_level_edit"
									auto
									box
									hide-details
									:label="$t('global.'+stepInfo, $store.state.locale)"
									:items="$store.state.openlevelList"
									single-line
									>
								</v-select>

								<!-- <SelectField
									v-if="stepInfo == 'open_level_show'"
									v-model="valuesToSend.open_level_show"
									:rawInput="valuesToSend.open_level_show"
									:labelText="'global.'+stepInfo"
									@input="updateOpenLevelShow"
									:choices="$store.state.openlevel"
									>
								</SelectField> -->
								<v-select
									v-if="stepInfo == 'open_level_show'"
									v-model="valuesToSend.open_level_show"
									auto
									box
									hide-details
									:label="$t('global.'+stepInfo, $store.state.locale)"
									:items="$store.state.openlevelList"
									single-line
									>
								</v-select>



								<!-- <ComboboxField
									v-if="stepInfo == 'tags'"
									v-model="valuesToSend.tags"
									:rawInput="valuesToSend.tags"
									:labelText="'global.'+stepInfo"
									@input="updateTags"
									:choices="$store.state.tag.list"
									>
								</ComboboxField> -->
								<v-combobox
									v-if="stepInfo == 'tags'"
									v-model="valuesToSend.tags"
									:items="$store.state.tag.list.map(a => a.title)"
									:label="$t('global.'+stepInfo, $store.state.locale)"
									box
									clearable
									multiple
									chips
								></v-combobox>



								<FileField
									v-if="stepInfo == 'file'"
									v-model="valuesToSend.file"
									:rawInput="valuesToSend.file"
									:labelText="'global.'+stepInfo"
									@input="updateFile"
									>
								</FileField>



							</v-card-text>
							
							<!-- </v-card> -->


							<!-- continue button -->
							<v-btn 
								v-if=""
								color="primary"
								@click="E6 = (i+2)">
								{{ $t('global.next', $store.state.locale) }}
							</v-btn>

							<!-- return button or back to dashboard -->
							<v-btn 
								v-if="i == 0"
								flat 
								:to="'/'+itemAbr">
								{{ $t('global.cancel', $store.state.locale) }}
							</v-btn>
							<v-btn 
								v-else
								flat 
								@click="E6 = i ">
								{{ $t('global.back', $store.state.locale) }}
							</v-btn>

						</v-stepper-content>
						
					</template>


					<!-- resume and submit -->
					<template>

						<v-stepper-step 
							:complete="E6 > itemSteps.length " 
							:step="itemSteps.length + 1" 
							editable
							>
							{{ $t( itemType +'.resume', $store.state.locale) }}
						</v-stepper-step>

						<v-stepper-content :step=" itemSteps.length + 1">
							
							<!-- <v-card color="white" class="" height="100%"> -->

							<v-card-text 
								class="mb-2"
								>

								<template 
									v-for="(stepInfo, i) in itemSteps"
									>
									<p>
										{{ $t( 'global.'+stepInfo, $store.state.locale) }} : {{ valuesToSend[stepInfo] }}
									</p>
								</template>

							</v-card-text>
								
							<!-- </v-card> -->


							<!-- submit button -->
							<v-btn 
								color="primary"
								type="submit" 
								form="create-form"
								:loading="loading" 
								:disabled="loading"
								>
								{{ $t('global.create', $store.state.locale) }}
							</v-btn>

							<!-- back to previous step -->
							<v-btn 
								flat 
								@click="E6 = itemSteps.length ">
								{{ $t('global.back', $store.state.locale) }}
							</v-btn>

						</v-stepper-content>


					</template>


				</v-stepper>


			</v-form>

			</v-flex>

		</v-layout>

	</v-container>

</template>


<script>
import FileField from '~/components/Forms/Fields/filefield.vue'

import TextArea from '~/components/Forms/Fields/textarea.vue'
import TextField from '~/components/Forms/Fields/textfield.vue'
import SelectField from '~/components/Forms/Fields/selectfield.vue'
import ComboboxField from '~/components/Forms/Fields/comboboxfield.vue'
import CheckboxField from '~/components/Forms/Fields/checkboxfield.vue'

export default {

	props : [ "itemType", "itemAbr", "itemSteps" ],
	
	components : {
		TextArea,
		TextField,
		SelectField,
		ComboboxField,
		FileField
	},
	
	data () {
		return {

			E6: 1,
			alert 		: null,
			loading 	: false,
			
			valuesToSend : {
				
				title 				: '',
				description 		: '',
				licence 			: '',
				tags				: [ ] , 
				file				: '',
				filename			: '',

				f_code				: '',
				f_object			: '',
				f_type				: '',
				f_comments 			: '',
				f_is_required		: false,

				// openlevel 			: '',
				open_level_show 	: '',
				open_level_edit 	: '',
			},

			// title 		: '',
			// description : '',
			// licence 	: '',
			// tags		: [ ] , 
			// file		: '',
		}
	},

	computed: {

		// E6 : function () {
		// 	return this.e6
		// },

		// working getters
		tagsListName () {
			return this.$store.getters['tag/tagsListName']
		}

	},

	methods : {

		//// UPDATE DATA

		// common infos
		updateTitle(str) {
			this.valuesToSend.title = str ;
		},
		updateDescription(str) {
			this.valuesToSend.description = str ;
		},
		updateLicence(str) {
			this.valuesToSend.licence = str ;
		},
		updateTags(str) {
			this.valuesToSend.tags = str ;
		},
		updateFile(str) {
			this.valuesToSend.file = str.fileName ;
			this.valuesToSend.filename = str.file ;
		},
		
		// open levels
		updateOpenLevelEdit(str) {
			this.valuesToSend.open_level_edit = str ;
		},
		updateOpenLevelShow(str) {
			this.valuesToSend.open_level_show = str ;
		},

		// specific fields data
		updateFCode(str) {
			this.valuesToSend.f_code = str ;
		},
		updateFObject(str) {
			this.valuesToSend.f_object = str ;
		},
		updateFType(str) {
			this.valuesToSend.f_type = str ;
		},
		updateFComments(str) {
			this.valuesToSend.f_comments = str ;
		},
		updateFIsRequired(str) {
			this.valuesToSend.f_is_required = str ;
		},


		// SUBMIT TO API TO CREATE ITEM
		async submitNewItem (event) {

			console.log("\n~ ~ ~ submitNewItem..." ) ; 

			this.alert    = null
			this.loading  = true

			// console.log("~ ~ ~ submitNewItem / this.valuesToSend : ", this.valuesToSend ) ; 
			// console.log("~ ~ ~ submitNewItem / this.valuesToSend.title : ", this.valuesToSend.title ) ; 
			
			// convert data to normal object before passing it as payload
			var data_to_send = JSON.parse(JSON.stringify(this.valuesToSend)) ;

			var payload = { collection : this.itemAbr, data : data_to_send } ; 

			// create item by sending post request to backend api
			this.$store.dispatch(`createItem`, payload )
				.then(response => {

					this.alert 		= {type: 'success', message: result.msg}
					this.loading  	= false
					
					// redirect to edit-preview page 
					return this.$router.push(`/${this.itemAbr}/${new_item_id}`)
				})
				.catch(error => {
					this.alert 		= {type: 'success', message: result.msg}
					this.loading  	= false
					return error
				}) ; 

			// return this.$axios.$post(`${this.itemAbr}/create/`, this.valuesToSend, config)
			// 	.then(response => {
			// 		console.log("~ ~ ~ submitNewItem / response : ", response ) ; 

			// 		// set up corresponding store 
			// 		this.$store.commit( `${this.itemAbr}/set_current`, response.data )
					
			// 		// retrieve item id
			// 		const new_item_id = response.data._id

			// 		// redirect to edit-preview page 
			// 		return this.$router.push(`/${this.itemAbr}/${new_item_id}`)

			// 	})
			// 	.catch(error => {
			// 		console.log("~ ~ ~ submitNewItem / error : ", error ) ; 
			// 		return
			// 	})

			// dispatch action from store/prj...
			// this.$store.dispatch( itemAbr +'/create', {

			// 	// email : this.email,
			// 	// pwd   : this.password

			// }).then(result => {
			// 	this.alert = {type: 'success', message: result.msg}
			// 	this.loading = false
			// 	this.$router.push(`${itemAbr}/${result.data._id}/` ) 
			// }).catch(error => {
			// 	console.log("submit / error..." ) ; 
			// 	this.loading = false
			// 	this.alert = {type: 'error', message: "login error" }
			// 	if (error.response && error.response.data) {
			// 	this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
			// 	}
			// })

		}

	}
}

</script>