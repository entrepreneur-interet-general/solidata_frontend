<template>

	<div>
		<!-- <div>
			email : {{ email }} <br>
			email2 : {{ email2 }} <br>
			pwd : {{ password }}
		</div> -->

		<v-card-text>

			<v-form 
				@submit.prevent="submitLogin" 
				id="login-form"
				>

				<!-- <v-alert 
					v-if="alert" 
					:type="alert.type" 
					value="true"
					ma-2
					>
					{{alert.message}}
				</v-alert> -->

				<!-- ANTI-SPAMS -->
				<v-text-field 
					v-show="$store.state.is_debug"
					id="email_bis"
					v-model="email_bis"
					prepend-icon="warning" 
					name="email_bis" 
					label="email_bis" 
					type="text">
				</v-text-field>


				<!-- REAL USER INFOS FOR REGISTER -->

				<!-- <EmailField
					:rawInput="email"
					v-model="email"
					@input="updateEmail"
					>
				</EmailField> -->
				<v-text-field 
					v-model="email"

					:rules="[rules.email, rules.required]"
					:label="$t('global.email', $store.state.locale )"

					id="email"
					prepend-icon="person" 
					name="email" 
					type="text"
					>
				</v-text-field>


				<!-- <PasswordField
					:rawInput="password"
					v-model="password"
					@input="updatePassword"
					>
				</PasswordField> -->
				<!-- <v-text-field 
					id="password" 
					v-model="password"
					:rules="[rules.required]"
					prepend-icon="lock" 
					name="password" 
					:label="$t('global.password', $store.state.locale )"
					type="password">
				</v-text-field> -->
				<v-text-field 
					v-model="password"

					:rules="[rules.required]"
					:label="$t('global.password', $store.state.locale )"

					id="password" 
					prepend-icon="lock" 
					name="password" 
					type="password">
				</v-text-field>


			</v-form>


		</v-card-text>


		<v-card-actions>

			<v-layout row wrap>
				

				<v-flex 
					class="xs4 offset-xs1" 
					>

					<v-btn 
						outline 
						nuxt 
						block
						to="/register" 
						class="ml-2 " 
						color="accent"
						>
						{{ $t('home.registerPage', $store.state.locale ) }}
					</v-btn>

					<div class="text-xs-center pt-2 caption">
						{{ $t('home.registerToLogin', $store.state.locale ) }} 
					</div>

				</v-flex>


				<v-flex 
					class="xs4 offset-xs2" >

					<v-btn 
						flat
						block
						class="accent"
						type="submit" 
						form="login-form"
						:loading="loading" 
						:disabled="loading"
						>
						{{ $t('home.loginPage', $store.state.locale ) }}
					</v-btn>

				<!-- </v-flex>

				<v-flex xs12 md-6 offset-md6 pt-2> -->
					
					<div class="text-xs-center pt-2 caption">
						<nuxt-link 
							class="text-lowercase"
							to="/forgotpwd"
							>
							{{ $t('home.forgotPwd', $store.state.locale ) }}
							<!-- <span slot="loader" class="white"></span> -->
						</nuxt-link>
					</div>

					<!-- DEBUGGING : button to request anonymous login -->
					<!-- <v-btn 
						color="primary"
						@click.stop="submitLoginAnonymous" 
						:loading="loading" 
						:disabled="loading"
					>
						load anonymous token
					</v-btn> -->

				</v-flex>

			</v-layout row wrap>

		</v-card-actions>

	</div>

</template>


<script>

import EncryptString from '~/utils/encryptPWD.js'

import EmailField from '~/components/Forms/Fields/email.vue'
import PasswordField from '~/components/Forms/Fields/password.vue'

export default {

	props 		: [ ],

	components 	: {
		EmailField,
		PasswordField
	},
	
	data () {
		return {

			email_bis: '',
			email: '',
			// email2: '',
			password: '',

			alert: null,
			loading: false,
			
			rules: {
					// email	: v => (v || '').match(/@/) || this.$t('rules.email', this.$store.state.locale),
					email: v => {
						const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						return pattern.test(v) || this.$t('rules.email', this.$store.state.locale)
					},
					length	: len => v => (v || '').length >= len || this.$t('rules.length', this.$store.state.locale) ,
					// password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
					// password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
					// this.$t('rules.password', this.$store.state.locale),
					required: v => !!v || this.$t('rules.required', this.$store.state.locale)
				}
		}
	},

	methods: {
		
		// UPDATE DATA
		updateEmail(str) {
			this.email = str ;
		},
		updatePassword(str) {
			this.password = str ;
		},

		// SUBMIT TO API
		submitLogin (event) {

			console.log("submitLogin..." ) ; 

			this.alert    = null
			this.loading  = true
			
			// anti spam preventive measure
			if ( this.email_bis == '' ) {
				
				// - - - - - - - - - - - - - // 
				// ENCRYPT EMAIL & PWD 
				// - - - - - - - - - - - - - // 

				// use salt_token as public_key for RSA encryption 
				var salt_token 		= this.$store.state.auth.salt_token
			
				var encrypted_pwd 	= EncryptString.EncryptionRSA(this.password, salt_token )
				console.log("encrypted_pwd : ", encrypted_pwd ) ; 

				var encrypted_email 	= EncryptString.EncryptionRSA(this.email, salt_token )
				console.log("encrypted_pwd : ", encrypted_email ) ; 

				// dispatch action from store/auth
				this.$store.dispatch('auth/login', {
					// email			: this.email,
					email_encrypt	: encrypted_email.hashed,
					// pwd				: this.password,
					pwd_encrypt		: encrypted_pwd.hashed,
				})
				
				.then(result => {
					this.alert 		= {type: 'success', message: result.msg}
					this.loading 	= false

					this.$store.commit(`set_alert`, result.msg)

					this.$router.push('/dashboard') 
				})
				
				.catch(error => {
					console.log("submit / error... : ", error ) ; 
					this.loading 	= false
					this.alert 		= {type: 'error', message: "login error" }

					this.$store.commit(`set_error`, error)

					if (error.response && error.response.data) {
						this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
					}
				})

			}

		},

		submitLoginAnonymous (event) {

			console.log("submitLogin..." ) ; 

			this.alert    = null
			this.loading  = true

			// dispatch action from store/auth
			// this.$store.dispatch('auth/login', {
			this.$store.dispatch('auth/loginAnonymous')
			.then(result => {
				this.alert = {type: 'success', message: result.msg}
				this.loading = false
				// this.$router.push('/login') /////////
			}).catch(error => {
				console.log("submit / error..." ) ; 
				this.loading = false
				this.alert = {type: 'error', message: "fuck you ! your code is so bad !" }
				if (error.response && error.response.data) {
				this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
				}
			})
		},

	}
}

</script>

