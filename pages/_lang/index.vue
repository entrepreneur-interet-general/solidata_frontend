<style scoped>

	/* cf : https://stackoverflow.com/questions/25970787/use-a-div-as-a-background-for-another-element */

	.content-above-particles {
		z-index: 2;
		position: relative;
	}

	.particles-js {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	.flat_background{
		background-color: #90e4e4 ;
	}

	.transp_background{
		background-color: transparent ;
	}

</style>

<template>

	<v-jumbotron 
		class="pa-0" 
		:gradient="gradient_jumbo"
		dark
		height="100%"
		>

		<v-container fill-height>

			<v-layout 
				:class="is_above_part"
				justify-center 
				align-center
				>

				<v-flex 
					text-xs-center
					>

					<h4 class="display-3 font-weight-thin pb-2 white--text">
						{{ $t('home.subtitle', $store.state.locale) }}
					</h4>

					<span class="title font-weight-light white--text">
						{{ $t('home.tagline', $store.state.locale) }}
					</span>


					<v-layout row wrap my-5 pt-4>

						<v-flex xs12 sm10 offset-sm1 md8 offset-md2 >
							<v-layout row wrap>


							<v-flex xs6 px-2 v-if="!$store.state.auth.isLogged">
								<v-btn flat  class="white grey--text" large block nuxt to="/login">
									<v-icon left>{{ $store.state.mainIcons.login.icon }}</v-icon>
									{{ $t('home.startbtn', $store.state.locale ) }}
								</v-btn>
							</v-flex>

							<v-flex xs6 px-2 v-if="!$store.state.auth.isLogged">
								<v-btn flat  class="white grey--text" large block nuxt to="/tutorials">
									<v-icon left>{{ $store.state.mainIcons.video.icon }}</v-icon>
									{{ $t('home.videobtn', $store.state.locale ) }}
								</v-btn>
							</v-flex>



							<v-flex xs6 px-2 v-if="$store.state.auth.isLogged">
								<v-btn flat  class="white grey--text" large block nuxt to="/dashboard">
									<v-icon left>{{ $store.state.mainIcons.dashboard.icon }}</v-icon>
									{{ $t('links.dashboard', $store.state.locale ) }}
								</v-btn>
							</v-flex>

							<v-flex xs6 px-2 v-if="$store.state.auth.isLogged">
								<v-btn flat  class="white grey--text" large block nuxt to="/prj">
									<v-icon left>{{ $store.state.mainIcons.projects.icon }}</v-icon>
									{{ $t('links.myprojects', $store.state.locale ) }}
								</v-btn>
							</v-flex>

							<!-- <v-flex xs12 px-2 v-if="$store.state.auth.isLogged">
								<v-btn flat outline class="white" large block nuxt to="/prj/create">
									<v-icon left>{{ $store.state.mainIcons.create.icon }}</v-icon>
									{{ $t('projects.create', $store.state.locale ) }}
								</v-btn>
							</v-flex> -->



							</v-layout>

						</v-flex>

					</v-layout>

				</v-flex>

			</v-layout>

		</v-container>

		<!-- cf : https://vue-particles.netlify.com/?ref=madewithvuejs.com  -->
		<template
			v-if="is_particles"
			>
			<vue-particles

				:class="'particles-js '+ color_class"

				color="#ffffff"
				:particleOpacity="0.6"
				:particlesNumber="100"
				shapeType="circle"
				:particleSize="4"

				linesColor="#ffffff"
				:linesWidth="1"
				:lineLinked="true"
				:lineOpacity="0.3"
				:linesDistance="170"

				:moveSpeed="2"

				:hoverEffect="false"
				hoverMode=""
				:clickEffect="false"
				clickMode=""

				>
			</vue-particles>
		
		</template>

	</v-jumbotron>

</template>


<script>

// import particlesJS from 'particles.js'

export default {

	created() {
		// console.log('callback - particles.js config loaded');
		// particlesJS.load('particles-js', '~/assets/particles.json', function() {});
	},

	data() {
		return {

			is_particles 	: true,
			is_flat_background : false,

			gradient_jumbo 	: 'to top right, #116565, #22C9C9',

		}
	},

	// middleware : ["checkTokens"],
	computed: {
		// user () { return (this.$store.state.auth || {}).user || null }
		user () { return (this.$store.state.auth.user_infos) },

		is_above_part () { return (this.is_particles)? "content-above-particles" : "" },

		color_class () { return (this.is_flat_background)? "flat_background" : "transp_background" }

	}


}
</script>