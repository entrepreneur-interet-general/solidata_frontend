<template>


	<div>

		<!-- COMPONENT PREVIEW/EDIT : INFOS + TEAM -->

		<v-layout row justify-center class="pa-0 ma-0">


			<v-btn 
				class="pa-0 ma-0"
				flat 
				block 
				:disabled="!canEdit"
				color="" 
				style="text-transform: none !important;"
				@click="open()"
				>
				
				<span>
					{{ item_data }} 
					<!-- - {{ coll }} / {{ collName }}
					- is_create :{{ is_create }}
					- {{ parentField }}.{{ subField }}
					- canEdit : {{ canEdit }} -->
				</span>

				<v-icon small right v-if="canEdit"> 
					edit
				</v-icon>

			</v-btn>

			<v-dialog 
				v-model="dialog" 
				persistent 
				max-width="600px"
				>

				<v-card>

					<v-card-title>
						<span class="headline">
							{{$t('global.edit', $store.state.locale )}} : 
							{{$t('global.'+subField, $store.state.locale )}}
						</span>
					</v-card-title>

					<v-card-text>
						<v-container grid-list-md class="py-0 ma-0">
							<v-layout wrap>

								<!-- <v-flex xs12 sm6 md4>
									<v-text-field label="Legal first name*" required>
									</v-text-field>
								</v-flex> -->

								<v-flex xs12>
									<v-text-field
										:ref="subField"
										v-model="item_data"
										:rules="[() => !!item_data || $t('rules.required', $store.state.locale )]"
										:label="$t( collName+'.'+subField, $store.state.locale )"
										:error-messages="errorMessages"
										:placeholder="$t('global.'+subField, $store.state.locale )"
										required
									></v-text-field>
								</v-flex>



								<!-- <v-flex xs12 sm6 md4>
									<v-text-field
										label="Legal last name*"
										hint="example of persistent helper text"
										persistent-hint
										required
									></v-text-field>
								</v-flex>

								<v-flex xs12 sm6>
									<v-select
										:items="['0-17', '18-29', '30-54', '54+']"
										label="Age*"
										required
									></v-select>
								</v-flex>

								<v-flex xs12 sm6>
									<v-autocomplete
										:items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
										label="Interests"
										multiple
									></v-autocomplete>
								</v-flex> -->

							</v-layout>
						</v-container>

						<!-- <small>*indicates required field</small> -->

					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="grey darken-1" flat @click="dialog = false ; cancel() ">
							{{$t('global.cancel', $store.state.locale )}}
						</v-btn>
						<v-btn color="accent darken-1" flat @click="dialog = false ; submitValue () ; save() ">
							{{$t('global.save', $store.state.locale )}}
						</v-btn>
					</v-card-actions>

				</v-card>
			</v-dialog>

		</v-layout>

		<v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
			{{$t('dialog.'+snackText, $store.state.locale )}}
			<v-btn flat @click="snack = false">
				{{$t('global.close', $store.state.locale )}}
			</v-btn>
		</v-snackbar>

	</div>

</template>


<script>

// import ObjectFormatterUpdate from "~/utils/objectFormatterUpdate.js"

export default {

	props : [ 

		"coll",
		"collName",
		"is_create",
		"parentField",
		"subField",
		"item_id",
		"item_data",
		"canEdit"

	],

	mounted () {
		console.log("\n- valueEdit / mounted ---> item_data : ", this.item_data ) ;
	},


	data: function () {

		return {
			
			edit_mode		: false,

			dialog			: false,

			snack			: false,
			snackColor		: '',
			snackText		: 'closed',

			is_req 			: ['yes','no'],
			errorMessages	: '',
			formHasErrors	:	false
		
		}
	},

	computed: {

		form () {

			return {

				"field_to_update" 	: this.parentField+'.'+this.subField ,
				"field_value"		: this.item_data,

			}
		}
	},

	watch: {
		name () {
			this.errorMessages = ''
		}
	},

	methods: {

		// dialog functions
		save () {
			this.dialog = false
			this.snack = true
			this.snackColor = 'accent'
			this.snackText = 'saved'
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


		// values checks
		contentCheck () {
			this.errorMessages = !this.item_data 
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
		
		// submit values for update via API backend
		submitValue () {

			console.log("\n submitValue... ")

			this.formHasErrors = false

			// Object.keys(this.form).forEach(f => {
			// 	if (!this.form[f]) this.formHasErrors = true
			// 	this.$refs[f].validate(true)
				
			// })

			// var formData = ObjectFormatterUpdate.prepareFormData(this.form) ;
			var formData = [this.form] ;
			console.log("\n submitValue / formData : ", formData)

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
	}
}
</script>

