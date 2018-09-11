<template>

	<v-container class="pt-5">
		<v-layout align-center justify-center row fill-height>
			<v-flex xs12 md9>

			<v-stepper v-model="e6" vertical non-linear>

				<!-- <div>
					<v-divider></v-divider>
					==> DEBUGGING FORM
					<v-divider></v-divider>
					valuesToSend : <br>
					_ title : {{ valuesToSend.title }} <br>
					_ description : {{ valuesToSend.description }} <br>
					_ licence : {{ valuesToSend.licence }} <br>
					_ openlevel : {{ valuesToSend.openlevel }} <br>
					<v-divider></v-divider>
				</div> -->

				<!-- STEPS ITERATION -->
				<template
					v-for="(stepInfo, i) in itemSteps"
					>

					<v-stepper-step 
						:complete="e6 > i" 
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

								<TextField
									v-if="stepInfo == 'title'"
									v-model="valuesToSend.title"
									:rawInput="valuesToSend.title"
									:labelText="'global.'+stepInfo"
									@input="updateTitle"
									>
								</TextField>

								<TextArea
									v-if="stepInfo == 'description'"
									v-model="valuesToSend.description"
									:rawInput="valuesToSend.description"
									:labelText="'global.'+stepInfo"
									@input="updateDescription"
									>
								</TextArea>

								<SelectField
									v-if="stepInfo == 'licence'"
									v-model="valuesToSend.licence"
									:rawInput="valuesToSend.licence"
									:labelText="'global.'+stepInfo"
									@input="updateLicence"
									:choices="$store.state.licences"
									>
								</SelectField>

								<ComboboxField
									v-if="stepInfo == 'tags'"
									v-model="valuesToSend.tags"
									:rawInput="valuesToSend.tags"
									:labelText="'global.'+stepInfo"
									@input="updateTags"
									:choices="$store.state.tag.list"
									>
								</ComboboxField>

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
							@click="e6 = (i+2)">
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
							@click="e6 = i ">
							{{ $t('global.back', $store.state.locale) }}
						</v-btn>

					</v-stepper-content>
					
				</template>


				<!-- resume and submit -->
				<template>

					<v-stepper-step 
						:complete="e6 > itemSteps.length " 
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
							color="primary">
							{{ $t('global.create', $store.state.locale) }}
						</v-btn>

						<!-- back to previous step -->
						<v-btn 
							flat 
							@click="e6 = itemSteps.length ">
							{{ $t('global.back', $store.state.locale) }}
						</v-btn>

					</v-stepper-content>


				</template>


			</v-stepper>

			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>
import TextArea from '~/components/Forms/Fields/textarea.vue'
import TextField from '~/components/Forms/Fields/textfield.vue'
import SelectField from '~/components/Forms/Fields/selectfield.vue'
import ComboboxField from '~/components/Forms/Fields/comboboxfield.vue'
import FileField from '~/components/Forms/Fields/filefield.vue'

export default {

	props : [ "e6", "itemType", "itemAbr", "itemSteps" ],
	
	components : {
		TextArea,
		TextField,
		SelectField,
		ComboboxField,
		FileField
	},
	
	data () {
		return {
			alert 		: null,
			loading 	: false,
			
			valuesToSend : {
				title 		: '',
				description : '',
				licence 	: '',
				openlevel 	: '',
				tags		: [ ] , 
				file		: '',
				filename	: '',
			},

			// title 		: '',
			// description : '',
			// licence 	: '',
			// tags		: [ ] , 
			// file		: '',
		}
	},

	computed: {

		// working getters
		tagsListName () {
			return this.$store.getters['tag/tagsListName']
		}

	},

	methods : {

		// UPDATE DATA
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

		////////////////////////
		// TO DO : SUBMIT TO API TO CREATE ITEM
		submitNewItem (event) {

			console.log("submitNewItem..." ) ; 

			this.alert    = null
			this.loading  = true

			// dispatch action from store/prj...
			this.$store.dispatch( itemAbr +'/create', {

				// email : this.email,
				// pwd   : this.password

			}).then(result => {
				this.alert = {type: 'success', message: result.msg}
				this.loading = false
				this.$router.push('/'+ itemAbr + '/' ) 
			}).catch(error => {
				console.log("submit / error..." ) ; 
				this.loading = false
				this.alert = {type: 'error', message: "login error" }
				if (error.response && error.response.data) {
				this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
				}
			})

		}

	}
}

</script>