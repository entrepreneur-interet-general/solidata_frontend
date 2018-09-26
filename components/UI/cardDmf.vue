<template>

	<v-layout 
		class="pt-5"
		justify-center
		>

		<v-flex xs12 sm8 md6 lg6 >
			
			<v-toolbar 
				color="primary" 
				class="pa-0 ma-0"
				dark
				tabs
				>
			
				<!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
				
				<v-toolbar-title>

					<!-- <span>{{$t('global.edit', $store.state.locale )}} </span> -->
					<!-- <v-btn flat icon> 
						<v-icon>{{ $store.state.mainIcons.delete.icon }}</v-icon>
					</v-btn> -->
					<!-- <v-btn icon>
						<v-icon>more_vert</v-icon>
					</v-btn> -->

					<!-- <v-icon>{{ $store.state.mainIcons.delete.icon }}</v-icon> -->

					<v-layout row  spacer>
						<span>{{ title }} </span>
					</v-layout>

					<v-spacer></v-spacer>

				</v-toolbar-title>


				<v-spacer></v-spacer>

				<v-switch 
					:label="`Edit : ` + $store.state.dmf.edit_mode " 
					v-model="$store.state.dmf.edit_mode"
					color="warning"
					:input-value="$store.state.dmf.edit_mode"
					hide-details
					>
				</v-switch>

				
				<v-btn icon
					to="/dmf"
					>
					<v-icon>clear</v-icon>
				</v-btn>

				<v-tabs
					slot="extension"
					v-model="tab"
					color="primary"
					align-with-title
					grow
				>
					<v-tabs-slider color="yellow"></v-tabs-slider>

					<v-tab 
						v-for="r_field in root_fields" 
						:key="r_field"
						>
						{{$t(`root_fields.${r_field}`, $store.state.locale )}}
					</v-tab>

				</v-tabs>

			</v-toolbar>



			<v-tabs-items	v-model="tab">
				<v-tab-item
					v-for="r_field in root_fields"
					:key="r_field"
					>
					<v-card flat>
						
						<v-card-text class="pt-5 pb-4">
			
							<template v-if="r_field == 'infos'">
								<!-- INFOS -->
								<v-layout row>
									<v-flex xs3>
										<v-subheader>{{$t('global.title', $store.state.locale )}}</v-subheader>
									</v-flex>
									<v-flex xs9>

										<v-text-field
											v-if="checkUserAuth('title') && $store.state.dmf.edit_mode"
											ref="title"
											v-model="title"
											:rules="[() => !!title || $t('rules.required', $store.state.locale )]"
											:label="$t('datamodel_fields.title', $store.state.locale )"
											:error-messages="errorMessages"
											:placeholder="$t('global.title', $store.state.locale )"
											required
											box
										></v-text-field>

										<v-text-field
											v-else
											ref="title"
											v-model="title"
											solo
											single-line
											readonly
										></v-text-field>

									</v-flex>
								</v-layout>

								<v-layout row>
									<v-flex xs3>
										<v-subheader>{{$t('global.description', $store.state.locale )}}</v-subheader>
									</v-flex>
									<v-flex xs9>		

										<v-textarea
											v-if="checkUserAuth('description') && $store.state.dmf.edit_mode"
											ref="description"
											v-model="description"
											:rules="[() => !!description || $t('rules.required', $store.state.locale )]"
											:label="$t('datamodel_fields.description', $store.state.locale )"
											:error-messages="errorMessages"
											:placeholder="$t('global.description', $store.state.locale )"
											rows=1
											box
											auto-grow
											required
										></v-textarea>

										<v-textarea
											v-else
											ref="description"
											v-model="description"
											solo
											readonly
										></v-textarea>

									</v-flex>
								</v-layout>
							</template>

							<template v-if="r_field == 'public_auth'">
								<!-- EDIT AUTH -->
								<v-layout row>
									<v-flex xs3>
										<v-subheader>{{$t('global.open_level_show', $store.state.locale )}}</v-subheader>
									</v-flex>
									<v-flex xs9>			
										<v-autocomplete
											v-if="checkUserAuth('open_level_show') && $store.state.dmf.edit_mode"
											ref="open_level_show"
											:rules="[() => !!f_type || $t('rules.required', $store.state.locale )]"
											:items="$store.state.openlevel"
											v-model="open_level_show"
											:label="$t('datamodel_fields.open_level_show', $store.state.locale )"
											:placeholder="$t('global.select', $store.state.locale )"
											required
										></v-autocomplete>

										<v-text-field
											v-else
											ref="open_level_show"
											v-model="open_level_show"
											solo
											readonly
										></v-text-field>

									</v-flex>
								</v-layout>

								<v-layout row>
									<v-flex xs3>
										<v-subheader>{{$t('global.open_level_edit', $store.state.locale )}}</v-subheader>
									</v-flex>
									<v-flex xs9>			
										<v-autocomplete
											v-if="checkUserAuth('open_level_edit') && $store.state.dmf.edit_mode"
											ref="open_level_edit"
											:rules="[() => !!f_type || $t('rules.required', $store.state.locale )]"
											:items="$store.state.openlevel"
											v-model="open_level_edit"
											:label="$t('datamodel_fields.open_level_edit', $store.state.locale )"
											:placeholder="$t('global.select', $store.state.locale )"
											required
										></v-autocomplete>

										<v-text-field
											v-else
											ref="open_level_edit"
											v-model="open_level_edit"
											solo
											readonly
										></v-text-field>

									</v-flex>
								</v-layout>
							</template>
							
							<template v-if="r_field == 'data_raw'">
								<!-- EDIT AUTH -->
								<v-layout row>
									<v-flex xs3>
										<v-subheader>{{$t('global.f_code', $store.state.locale )}}</v-subheader>
									</v-flex>
									<v-flex xs9>			
										<v-text-field
											v-if="checkUserAuth('f_code') && $store.state.dmf.edit_mode"
											ref="f_code"
											v-model="f_code"
											:rules="[() => !!f_code || $t('rules.required', $store.state.locale )]"
											:label="$t('datamodel_fields.f_code', $store.state.locale )"
											:error-messages="errorMessages"
											:placeholder="$t('global.f_code', $store.state.locale )"
											required
										></v-text-field>

										<v-text-field
											v-else
											ref="f_code"
											v-model="f_code"
											solo
											readonly
										></v-text-field>

									</v-flex>
								</v-layout>

								<v-layout row>
									<v-flex xs3>
										<v-subheader>{{$t('global.f_object', $store.state.locale )}}</v-subheader>
									</v-flex>
									<v-flex xs9>			
										<v-text-field
											v-if="checkUserAuth('f_object') && $store.state.dmf.edit_mode"
											ref="f_object"
											v-model="f_object"
											:rules="[() => !!f_object || $t('rules.required', $store.state.locale )]"
											:label="$t('datamodel_fields.f_object', $store.state.locale )"
											:error-messages="errorMessages"
											:placeholder="$t('global.f_object', $store.state.locale )"
											required
										></v-text-field>

										<v-text-field
											v-else
											ref="f_object"
											v-model="f_object"
											solo
											readonly
										></v-text-field>

									</v-flex>
								</v-layout>

								<v-layout row>
									<v-flex xs3>
										<v-subheader>{{$t('global.f_type', $store.state.locale )}}</v-subheader>
									</v-flex>
									<v-flex xs9>			
										<v-autocomplete
											v-if="checkUserAuth('f_type') && $store.state.dmf.edit_mode"
											ref="f_type"
											:rules="[() => !!f_type || $t('rules.required', $store.state.locale )]"
											:items="$store.state.dmf.dmf_types"
											v-model="f_type"
											:label="$t('datamodel_fields.f_type', $store.state.locale )"
											:placeholder="$t('global.select', $store.state.locale )"
											required
										></v-autocomplete>

										<v-text-field
											v-else
											ref="f_type"
											v-model="f_type"
											solo
											readonly
										></v-text-field>

									</v-flex>
								</v-layout>

								<v-layout row>
									<v-flex xs3>
										<v-subheader>{{$t('global.f_comments', $store.state.locale )}}</v-subheader>
									</v-flex>
									<v-flex xs9>			
										<v-textarea
											v-if="checkUserAuth('f_comments') && $store.state.dmf.edit_mode"
											ref="f_comments"
											v-model="f_comments"
											:rules="[
												() => !!f_comments || $t('rules.required', $store.state.locale ),
												() => !!f_comments && f_comments.length <= 140 || $t('rules.length', $store.state.locale ) + ' 140 ',
												contentCheck
											]"
											:label="$t('datamodel_fields.f_comments', $store.state.locale )"
											:error-messages="errorMessages"
											:placeholder="$t('global.f_comments', $store.state.locale )"
											rows=1
											counter=140
											auto-grow
											required
										></v-textarea>

										<v-text-field
											v-else
											ref="f_comments"
											v-model="f_comments"
											solo
											readonly
										></v-text-field>

									</v-flex>
								</v-layout>
							</template>

						</v-card-text>

					</v-card>
				</v-tab-item>
			</v-tabs-items>




			<!--
			<v-card 
				ref="form"
				class="pa-0"
				>

				<v-card-text>

					<!-- INFOS - ->
					<v-layout row>
						<v-flex xs3>
							<v-subheader>{{$t('global.title', $store.state.locale )}}</v-subheader>
						</v-flex>
						<v-flex xs9>			
							<v-text-field
								ref="title"
								v-model="title"
								:rules="[() => !!title || $t('rules.required', $store.state.locale )]"
								:label="$t('datamodel_fields.title', $store.state.locale )"
								:error-messages="errorMessages"
								:placeholder="$t('global.title', $store.state.locale )"
								required
							></v-text-field>
						</v-flex>
					</v-layout>

					<v-layout row>
						<v-flex xs3>
							<v-subheader>{{$t('global.description', $store.state.locale )}}</v-subheader>
						</v-flex>
						<v-flex xs9>			
							<v-textarea
								ref="description"
								v-model="description"
								:rules="[() => !!description || $t('rules.required', $store.state.locale )]"
								:label="$t('datamodel_fields.description', $store.state.locale )"
								:error-messages="errorMessages"
								:placeholder="$t('global.description', $store.state.locale )"
								rows=1
								auto-grow
								required
							></v-textarea>
						</v-flex>
					</v-layout>


					<v-divider class="mt-2 mb-4"></v-divider>

					<!-- EDIT AUTH - ->
					<v-layout row>
						<v-flex xs3>
							<v-subheader>{{$t('global.open_level_show', $store.state.locale )}}</v-subheader>
						</v-flex>
						<v-flex xs9>			
							<v-autocomplete
								ref="open_level_show"
								:rules="[() => !!f_type || $t('rules.required', $store.state.locale )]"
								:items="$store.state.openlevel"
								v-model="open_level_show"
								:label="$t('datamodel_fields.open_level_show', $store.state.locale )"
								:placeholder="$t('global.select', $store.state.locale )"
								required
							></v-autocomplete>
						</v-flex>
					</v-layout>

					<v-layout row>
						<v-flex xs3>
							<v-subheader>{{$t('global.open_level_edit', $store.state.locale )}}</v-subheader>
						</v-flex>
						<v-flex xs9>			
							<v-autocomplete
								ref="open_level_edit"
								:rules="[() => !!f_type || $t('rules.required', $store.state.locale )]"
								:items="$store.state.openlevel"
								v-model="open_level_edit"
								:label="$t('datamodel_fields.open_level_edit', $store.state.locale )"
								:placeholder="$t('global.select', $store.state.locale )"
								required
							></v-autocomplete>
						</v-flex>
					</v-layout>



					<v-divider class="mt-2 mb-4"></v-divider>

					<!-- DATA RAW - ->
					<v-layout row>
						<v-flex xs3>
							<v-subheader>{{$t('global.f_code', $store.state.locale )}}</v-subheader>
						</v-flex>
						<v-flex xs9>			
							<v-text-field
								ref="f_code"
								v-model="f_code"
								:rules="[() => !!f_code || $t('rules.required', $store.state.locale )]"
								:label="$t('datamodel_fields.f_code', $store.state.locale )"
								:error-messages="errorMessages"
								:placeholder="$t('global.f_code', $store.state.locale )"
								required
							></v-text-field>
						</v-flex>
					</v-layout>

					<v-layout row>
						<v-flex xs3>
							<v-subheader>{{$t('global.f_object', $store.state.locale )}}</v-subheader>
						</v-flex>
						<v-flex xs9>			
							<v-text-field
								ref="f_object"
								v-model="f_object"
								:rules="[() => !!f_object || $t('rules.required', $store.state.locale )]"
								:label="$t('datamodel_fields.f_object', $store.state.locale )"
								:error-messages="errorMessages"
								:placeholder="$t('global.f_object', $store.state.locale )"
								required
							></v-text-field>
						</v-flex>
					</v-layout>

					<v-layout row>
						<v-flex xs3>
							<v-subheader>{{$t('global.f_type', $store.state.locale )}}</v-subheader>
						</v-flex>
						<v-flex xs9>			
							<v-autocomplete
								ref="f_type"
								:rules="[() => !!f_type || $t('rules.required', $store.state.locale )]"
								:items="$store.state.dmf.dmf_types"
								v-model="f_type"
								:label="$t('datamodel_fields.f_type', $store.state.locale )"
								:placeholder="$t('global.select', $store.state.locale )"
								required
							></v-autocomplete>
						</v-flex>
					</v-layout>

					<v-layout row>
						<v-flex xs3>
							<v-subheader>{{$t('global.f_comments', $store.state.locale )}}</v-subheader>
						</v-flex>
						<v-flex xs9>			
							<v-textarea
								ref="f_comments"
								v-model="f_comments"
								:rules="[
									() => !!f_comments || $t('rules.required', $store.state.locale ),
									() => !!f_comments && f_comments.length <= 140 || $t('rules.length', $store.state.locale ) + ' 140 ',
									contentCheck
								]"
								:label="$t('datamodel_fields.f_comments', $store.state.locale )"
								:error-messages="errorMessages"
								:placeholder="$t('global.f_comments', $store.state.locale )"
								rows=1
								counter=140
								auto-grow
								required
							></v-textarea>
						</v-flex>
					</v-layout>

					<!--
					<v-text-field
						ref="description"
						:rules="[
						() => !!address || 'This field is required',
						() => !!address && address.length <= 140 || 'Description must be less than 140 characters',
						addressCheck
						]"
						v-model="description"
						label="description"
						:placeholder="$t('global.description', $store.state.locale )"
						counter="140"
						required
					></v-text-field>

					<v-autocomplete
						ref="country"
						:rules="[() => !!country || 'This field is required']"
						:items="is_req"
						v-model="country"
						label="Country"
						placeholder="select ..."
						required
					></v-autocomplete>
					- ->


				</v-card-text>

				-->





			<v-card 
				ref="form"
				class=""
				>
				<v-divider class="mt-0 pa-0"></v-divider>

				<v-card-actions>
					<v-btn flat>
						{{$t('global.cancel', $store.state.locale )}}
					</v-btn>

					<v-spacer></v-spacer>
					
					<v-slide-x-reverse-transition>
						<v-tooltip
							v-if="formHasErrors"
							left
							>
							<v-btn
								slot="activator"
								icon
								class="my-0"
								@click="resetForm"
								>
								<v-icon>
									{{$t('global.save', $store.state.locale )}}
								</v-icon>
							</v-btn>
							<span>
								{{$t('global.refresh', $store.state.locale )}}
							</span>
						</v-tooltip>
					</v-slide-x-reverse-transition>
					<v-btn 
						color="primary" 
						
						@click="submitDmf"
						>
						{{$t('global.save', $store.state.locale )}}
					</v-btn>
				</v-card-actions>



			</v-card>





		</v-flex>
	</v-layout>
</template>


<script>
export default {

	props : [ "dmf_data" ],

	mounted () {
		console.log("\n- cardDmf / mounted ---> dmf_data : ", this.dmf_data ) ;
	},

	data: function () {
		return {
			tab				: null,

			// countries		: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
			is_req 			: ['yes','no'],
			errorMessages	: '',

			root_fields		: [
					'infos', 
					'public_auth', 
					'data_raw', 
					// 'team', 
					// 'rules'
			],

			item_id			: this.dmf_data._id,

			title			: this.dmf_data.infos.title,
			description		: this.dmf_data.infos.description,

			open_level_show	: this.dmf_data.public_auth.open_level_show,
			open_level_edit	: this.dmf_data.public_auth.open_level_edit,

			f_code			:	this.dmf_data.data_raw.f_code,
			f_object		:	this.dmf_data.data_raw.f_object,
			f_type			:	this.dmf_data.data_raw.f_type,
			f_comments		:	this.dmf_data.data_raw.f_comments,
			f_is_required	:	this.dmf_data.data_raw.f_is_required,
			
			formHasErrors	:	false
		
		}
	},

	computed: {

		form () {
			return {
				'infos.title': 				this.title,
				'infos.description': 		this.description,

				'public_auth.open_level_show': 		this.open_level_show,
				'public_auth.open_level_edit': 		this.open_level_edit,

				'data_raw.f_code': 			this.f_code,
				'data_raw.f_object':		this.f_object,
				'data_raw.f_type': 			this.f_type,
				'data_raw.f_comments':		this.f_comments,
				'data_raw.f_is_required':	this.f_is_required
			}
		}
	},

	watch: {
		name () {
			this.errorMessages = ''
		}
	},

	methods: {

		checkUserAuth (field_name) {

			// console.log("\ncheckUserAuth ...") ;
			var can_update_field 	= false  ;
			var doc_auth_edit 		= this.dmf_data.public_auth.open_level_edit ; 
			var doc_auth_team 		= this.dmf_data.public_auth.team ; 

			if (doc_auth_edit == 'open_data' ){
				can_update_field = true
			}
			else if (doc_auth_edit == 'commons') {
				can_update_field = true
			} 
			else if (doc_auth_edit == 'collective') {
				can_update_field = true
			} 
			else if (doc_auth_edit == 'private') {
				can_update_field = true
			} 

			return can_update_field
		},

		contentCheck () {
			this.errorMessages = this.description && !this.title
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
		
		submitDmf () {

			console.log("n\Submit_dmf... ")

			this.formHasErrors = false

			// Object.keys(this.form).forEach(f => {
			// 	if (!this.form[f]) this.formHasErrors = true
			// 	this.$refs[f].validate(true)
				
			// })

			// dispatch action from store
			this.$store.dispatch('updateItem', {
				coll	: 'dmf',
				doc_id  : this.item_id,
				form 	: this.form,
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

