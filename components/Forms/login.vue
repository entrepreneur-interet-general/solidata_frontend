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
				<v-alert 
					v-if="alert" 
					:type="alert.type" 
					value="true"
					>
					msg : {{alert.message}}
				</v-alert>
				

				<EmailField
					:rawInput="email"
					v-model="email"
					@input="updateEmail"
					>
				</EmailField>
				<!-- <v-text-field 
					id="email2"
					v-model="email2"
					:rules="[rules.email, rules.required]"
					prepend-icon="person" 
					name="email2" 
					:label="$t('global.email', $store.state.locale )+'2'"
					type="text">
				</v-text-field> -->


				<PasswordField
					:rawInput="password"
					v-model="password"
					@input="updatePassword"
					>
				</PasswordField>
				<!-- <v-text-field 
					id="password" 
					v-model="password"
					:rules="[rules.required]"
					prepend-icon="lock" 
					name="password" 
					:label="$t('global.password', $store.state.locale )"
					type="password">
				</v-text-field> -->



			</v-form>


			<v-spacer></v-spacer>
			<div class="text-xs-right">
				<nuxt-link class="text-lowercase"
				to="/forgotpwd"
				>
					{{ $t('home.forgotPwd', $store.state.locale ) }}
				</nuxt-link>
			</div>
			

		</v-card-text>


		<v-card-actions>

			<v-spacer></v-spacer>

			<v-btn 
				color="primary"
				type="submit" 
				form="login-form"
				:loading="loading" 
				:disabled="loading"
			>
				{{ $t('home.loginPage', $store.state.locale ) }}
			</v-btn>

			<!-- DEBUGGING : button to request anonymous login -->
			<!-- <v-btn 
				color="primary"
				@click.stop="submitLoginAnonymous" 
				:loading="loading" 
				:disabled="loading"
			>
				load anonymous token
			</v-btn> -->

		</v-card-actions>

	</div>

</template>


<script>
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
			email: '',
			// email2: '',
			password: '',

			alert: null,
			loading: false,
			
			rules: {
					email	: v => (v || '').match(/@/) || this.$t('rules.email', this.$store.state.locale),
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
			
			// dispatch action from store/auth
			this.$store.dispatch('auth/login', {
				email : this.email,
				pwd   : this.password
			}).then(result => {
				this.alert = {type: 'success', message: result.msg}
				this.loading = false
				this.$router.push('/') /////////
			}).catch(error => {
				console.log("submit / error... : ", error ) ; 
				this.loading = false
				this.alert = {type: 'error', message: "login error" }
				if (error.response && error.response.data) {
					this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
				}
			})
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

