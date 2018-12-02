<template>

	<v-jumbotron 
		class="pa-0" 
		gradient="to top right, #116565, #22C9C9"
		dark 
		height="100%"
		>

		<v-container fill-height>

			<v-layout justify-center align-center>
				<v-flex text-xs-center>

					<h4 class="display-3 pb-2">
						{{ $t('home.subtitle', $store.state.locale) }}
					</h4>

					<span class="title font-weight-thin">
						{{ $t('home.tagline', $store.state.locale) }}
					</span>

					<!-- <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span> -->
					<!-- <v-divider class="my-3"></v-divider> -->
					<!-- <div class="title mb-3">Check out our newest features!</div> -->
					<!-- <v-btn
						class="mx-0"
						color="primary"
						large
						>
						See more
					</v-btn> -->

					<v-layout row wrap my-5 pt-4>

						<v-flex xs6 px-2 v-if="!$store.state.auth.isLogged">
							<v-btn flat  class="white primary--text" large block nuxt to="/login">
								<v-icon left>{{ $store.state.mainIcons.login.icon }}</v-icon>
								{{ $t('home.startbtn', $store.state.locale ) }}
							</v-btn>
						</v-flex>

						<v-flex xs6 px-2 v-if="!$store.state.auth.isLogged">
							<v-btn flat  class="white primary--text" large block nuxt to="/tutorials">
								<v-icon left>{{ $store.state.mainIcons.video.icon }}</v-icon>
								{{ $t('home.videobtn', $store.state.locale ) }}
							</v-btn>
						</v-flex>



						<v-flex xs6 px-2 v-if="$store.state.auth.isLogged">
							<v-btn flat  class="white primary--text" large block nuxt to="/dashboard">
								<v-icon left>{{ $store.state.mainIcons.dashboard.icon }}</v-icon>
								{{ $t('links.dashboard', $store.state.locale ) }}
							</v-btn>
						</v-flex>

						<v-flex xs6 px-2 v-if="$store.state.auth.isLogged">
							<v-btn flat  class="white primary--text" large block nuxt to="/prj">
								<v-icon left>{{ $store.state.mainIcons.projects.icon }}</v-icon>
								{{ $t('links.myprojects', $store.state.locale ) }}
							</v-btn>
						</v-flex>

						<v-flex xs12 px-2 v-if="$store.state.auth.isLogged">
							<v-btn flat outline class="white" large block nuxt to="/prj/create">
								<v-icon left>{{ $store.state.mainIcons.create.icon }}</v-icon>
								{{ $t('projects.create', $store.state.locale ) }}
							</v-btn>
						</v-flex>


					</v-layout>


					<!-- 
					<div class="ma-5" v-if="!$store.state.auth.isLogged">
						<v-btn color="secondary" large nuxt to="/login">
							<v-icon left>{{ $store.state.mainIcons.login.icon }}</v-icon>
							{{ $t('home.startbtn', $store.state.locale ) }}
						</v-btn>
						<v-btn color="secondary" large nuxt to="/tutorials">
							<v-icon left>{{ $store.state.mainIcons.video.icon }}</v-icon>
							{{ $t('home.videobtn', $store.state.locale ) }}
						</v-btn>
					</div> 
					-->





				</v-flex>

				<!--
				<v-flex xs12 sm10 md10>

					<!- - <div class="text-xs-center">
						<img src="/v.png" alt="Vuetify.js" class="mb-5" />
					</div> - ->

					<v-card>
						<v-card-title class="headline">Welcome to the Vuetify + Nuxt.js template </v-card-title>
						<v-card-title class="headline"> {{ $t('home.title', $store.state.locale) }} </v-card-title>

						<v-card-text>
							<p v-if="user">Hello, {{user.name}}</p>
							<p v-else>The user is not authenticated!</p>
						</v-card-text>

						<!- - <v-card-text> -->
							
							<!-- cf i18n snippet : https://stackoverflow.com/questions/49233698/vue-vuex-vue-i18n-change-language-button-event -->
							<!-- <p>{{ $t('home.introduction', $store.state.locale ) }} </p> - ->
							
							<!- - <div class="text-xs-right">
								<em><small>&mdash; John Leider</small></em>
							</div> - ->

						<!- - </v-card-text> - ->


						<v-card-actions v-if="!$store.state.auth.isLogged">
							<v-spacer></v-spacer>
							<v-btn color="primary" flat nuxt to="/login">{{ $t('home.loginPage', $store.state.locale ) }}</v-btn>
							<v-btn color="primary" flat nuxt to="/register">{{ $t('home.registerPage', $store.state.locale ) }}</v-btn>
						</v-card-actions>

						<v-card-actions v-else>
							<v-spacer></v-spacer>
							<v-btn color="primary" flat nuxt to="/logout">{{ $t('home.logoutPage', $store.state.locale ) }}</v-btn>
						</v-card-actions>

					</v-card>

				</v-flex>
				-->

			</v-layout>

		</v-container>

	</v-jumbotron>

</template>


<script>
export default {
	// middleware : ["checkTokens"],
	computed: {
		// user () { return (this.$store.state.auth || {}).user || null }
		user () { return (this.$store.state.auth.user_infos) }
	}
}
</script>
