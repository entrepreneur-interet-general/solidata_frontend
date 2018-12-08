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

					<v-layout row wrap my-5 pt-4>

						<v-flex xs12 sm10 offset-sm1 md8 offset-md2 >
							<v-layout row wrap>

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
						</v-flex>

					</v-layout>





				</v-flex>

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