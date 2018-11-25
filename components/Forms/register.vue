<template>

	<div>

		<v-card-text>

			<v-form 
				@submit.prevent="submitRegister" 
				id="register-form"
				>
				<v-alert v-if="alert" :type="alert.type" value="true">{{alert.message}}</v-alert>
				<v-text-field 
					id="email"
					v-model="email"
					:rules="[rules.email, rules.required]"
					prepend-icon="person" 
					name="email" 
					label="Email" 
					type="text">
				</v-text-field>
				<v-text-field 
					id="name" 
					v-model="name"
					:rules="[rules.required]"
					prepend-icon="person" 
					name="name" 
					:label="$t('global.name', $store.state.locale )"
					type="text">
				</v-text-field>
				<v-text-field 
					id="surname" 
					v-model="surname"
					:rules="[rules.required]"
					prepend-icon="person" 
					name="surname" 
					:label="$t('global.surname', $store.state.locale )"
					type="text">
				</v-text-field>
				<v-text-field 
					id="password" 
					v-model="password"
					:rules="[rules.required, rules.password]"
					prepend-icon="lock" 
					name="password" 
					:label="$t('global.password', $store.state.locale )"
					type="password">
				</v-text-field>
				<v-checkbox
					v-model="agreement"
					:rules="[rules.required]"
					>
					<template slot="label">
						{{ $t('home.agreement', $store.state.locale ) }}&nbsp;
						<a href="#" @click.stop.prevent="dialog = true">{{ $t('home.termsService', $store.state.locale ) }}</a>
						&nbsp;{{ $t('global.and', $store.state.locale ) }}&nbsp;
						<a href="#" @click.stop.prevent="dialog = true">{{ $t('home.privacyPolicy', $store.state.locale ) }}</a>*
					</template>
				</v-checkbox>
			</v-form>

		</v-card-text>

		<v-card-actions>
			
			<v-spacer></v-spacer>
			<v-btn 
				color="accent"
				type="submit" 
				form="register-form"
				:loading="loading" 
				:disabled="loading"
				>
				{{ $t('home.registerPage', $store.state.locale ) }}
			</v-btn>
		</v-card-actions>
	</div>

</template>


<script>

// cf : https://stackoverflow.com/questions/48937829/vuetify-component-v-form-is-not-responding-on-the-declared-submit-event-handler?rq=1
// import Cookie from 'js-cookie'


export default {

	components : {
	},

	middleware: [ // run this before load
		//   'notAuthenticated'
	], 
  
  data () {
	return {
		email: '',
		name: '',
		surname: '',
		password: '',
		alert: null,
		loading: false,
		agreement: false,

		rules: {
				email	: v => (v || '').match(/@/) || this.$t('rules.email', this.$store.state.locale),
				length	: len => v => (v || '').length >= len || this.$t('rules.length', this.$store.state.locale) ,
				password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
					this.$t('rules.password', this.$store.state.locale),
				required: v => !!v || this.$t('rules.required', this.$store.state.locale)
			}
	}
  },

  methods: {

	submitRegister (event) {

		console.log("submitLogin..." ) ; 

		this.alert    = null
		this.loading  = true

		
		// dispatch action from store/auth
		this.$store.dispatch('auth/register', {
			email   	: this.email,
			name    	: this.name,
			surname 	: this.surname,
			pwd     	: this.password,
			agreement 	: this.agreement
		})
		.then(result => {
			this.alert = { type: 'success', message: result.msg}
			this.loading = false
			this.$router.push('/') /////////
		})
		.catch(error => {
			console.log("submit / error..." ) ; 
			this.loading = false
			this.alert = {type: 'error', message: " error submitting request " }
			if (error.response && error.response.data) {
			this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
			}
		})
	},

  }
}

</script>