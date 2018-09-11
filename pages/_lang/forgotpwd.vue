<template>

	<v-container fluid fill-height>
		<v-layout align-center justify-center>
			<v-flex xs10 sm8 md8>
				<v-card class="elevation-12 pa-3 mt-5">

					<!-- <v-card-title primary-title>
						<div class="headline">
						 {{ $t('home.forgotPwd', $store.state.locale ) }}
						</div>
					</v-card-title> -->

					<CardTitle 
						:icon="$store.state.mainIcons.password.icon"
						:title="$t('home.forgotPwdPage', $store.state.locale )">
					</CardTitle>


					<v-card-text>

						<h3 class="pa-3 text-xs-center">
							{{ $t('home.forgotPwd', $store.state.locale ) }}<br>
							{{ $t('home.forgotPwdAction', $store.state.locale ) }}<br>
						</h3>
						
						<v-form 
							@submit.prevent="submitForgotPwd" 
							id="forgotpwd-form"
							>
							<v-alert 
								v-if="alert" 
								:type="alert.type" 
								value="true"
							>
								msg : {{alert.message}}
							</v-alert>
							<v-text-field 
								v-model="email"
								prepend-icon="person" 
								name="email" 
								:label="$t('global.email', $store.state.locale )"
								type="text">
							</v-text-field>
						</v-form>

					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn 
							color="primary"
							type="submit" 
							form="forgotpwd-form"
							:loading="loading" 
							:disabled="loading"
						>
							{{ $t('home.forgotPwdPage', $store.state.locale ) }}
						</v-btn>


					</v-card-actions>

				
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
 
</template>

<script>

// cf : https://stackoverflow.com/questions/48937829/vuetify-component-v-form-is-not-responding-on-the-declared-submit-event-handler?rq=1
// import Cookie from 'js-cookie'

import CardTitle from '~/components/UI/cardTitle.vue'

export default {

	components : {
		CardTitle,
	},

	// run middleware before load
	middleware: [
		// 'notAuthenticated'
	], 
	
	data () {
			return {
				email: '',
				alert: null,
				loading: false
			}
	},

	methods: {

		submitForgotPwd (event) {

			console.log("submitForgotPwd..." ) ; 

			this.alert    = null
			this.loading  = true

			// dispatch action from store/auth
			this.$store.dispatch('auth/forgotpwd', {
				email : this.email,
			}).then(result => {
				this.alert = {type: 'success', message: result.msg}
				this.loading = false
				this.$router.push('/') /////////
			}).catch(error => {
				console.log("submit / error..." ) ; 
				this.loading = false
				this.alert = {type: 'error', message: "login error" }
				if (error.response && error.response.data) {
					this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
				}
			})
		},

	}
}

</script>