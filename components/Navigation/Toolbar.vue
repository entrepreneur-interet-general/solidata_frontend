
<template>

	<!-- <div> -->

		<v-toolbar 
			class=" justify-center white elevation-1"
			flat
			app 
			:fixed="$store.state.fixedNav" 
			:clipped-left="$store.state.clipped"
			:height="$store.state.toolbar_h"
			>
			
			<!-- DRAWER -->
			<v-toolbar-side-icon 
				@click="$emit('toggleDrawer')"
				>
			</v-toolbar-side-icon>

			<!-- <v-btn
				icon
				@click.stop="$emit('toggleMiniVariant')"
				>
				<v-icon 
					v-html="$store.state.miniVariant ? 'chevron_right' : 'chevron_left'"
					></v-icon>
			</v-btn> -->


			<!-- SOLIDATA NAME -->
			<!-- &nbsp;
			<v-btn
				icon
				
				flat 
				
				dark
				to="/" 
				class="ma-0"
				color="grey"
				>
				<v-icon
					
					color=""
					>
					{{ $store.state.mainIcons.home.icon }}
				</v-icon>
			</v-btn > -->

			<!-- <v-spacer></v-spacer> -->

				<!-- href="/" -->
			<nuxt-link 
				
				:to="'/'"
				class="ml-3 mr-0 hidden-xs-only mt-0 pt-1"
				>
					<!-- src="@/assets/images/logo_solidata_8a.png"  -->
					<!-- src="/logos/logo_solidata_8a.png"  -->
				<img 
					:src="$store.state.app_logo" 
					height="30px"
					>
					<!-- <div class="fill-height bottom-gradient"></div> -->
				</img> 
			</nuxt-link>

			<!-- <v-toolbar-title >
				<a
					href="/"
					style="text-decoration: none"
					class="font-weight-thin black--text ml-0"
					v-html="$store.state.title"
				></a>
			</v-toolbar-title> -->

			<!-- <v-btn
				icon
				@click.stop="$emit('toggleClipped')"
				>
				<v-icon >web</v-icon>
			</v-btn> -->
			
			<!-- <v-btn
				icon
				@click.stop="$emit('toggleFixed')"
				>
				<v-icon >remove</v-icon>
			</v-btn>  -->
			

			<!-- SWITCH FOR DEBUG -->
			<v-spacer></v-spacer>
			<v-switch 
				label="debug"
				v-model="$store.state.is_debug"
				color="error"
				:input-value="$store.state.is_debug"
				hide-details
				>
			</v-switch>


			<!--  RIGHT SIZE OF THE TOOLBAR -->
			<v-spacer></v-spacer>

			<v-toolbar-items class="hidden-sm-and-down">

				<!-- STATIC PAGES -->

				<v-btn 
					disabled
					class="text-lowercase"
					flat 
					nuxt 
					to="/tutos"
					>
					{{ $t(`links.tutos`, $store.state.locale )}}
				</v-btn>

				<v-btn 
					disabled
					class="text-lowercase"
					flat 
					nuxt 
					to="/lexicon"
					>
					{{ $t(`links.lexicon`, $store.state.locale )}}
				</v-btn>

				<v-btn 
					disabled
					class="text-lowercase"
					flat 
					nuxt 
					to="/about"
					>
					{{ $t(`links.about`, $store.state.locale )}}
				</v-btn>

				<!-- LOGIN / REGISTER / SETTINGS USER -->

				<!-- not logged -->
				<template v-if="!$store.state.auth.isLogged" >
					
					<v-btn 
						nuxt to="/login"
						flat
						color="primary"
						class="px-0 ma-0"
						>
						<v-icon>
							{{ $store.state.mainIcons.login.icon }}
						</v-icon>
						<!-- {{ $t('home.loginPage', $store.state.locale ) }} -->
					</v-btn>

					<!-- </div>  -->
					
					<!-- <v-overflow-btn
						:items="$store.state.dropdown_lang"
						:label="$store.state.locale"
						target="#dropdown-example"
						>
					</v-overflow-btn> -->


				</template>

				<!-- logged -->
				<template v-if="$store.state.auth.isLogged" >
					
					<v-menu
						v-model="menu"
						:close-on-content-click="false"
						:nudge-width="200"
						offset-y
						offset-x
						>
						
						<v-btn
							color=""
							slot="activator"
							class="text-capitalize"
							flat 
							>
							<span>{{ $t('global.hi', $store.state.locale ) }}, {{ $store.state.auth.user_infos.name }}</span>
							<v-icon right>{{ $store.state.mainIcons.profile.icon }}</v-icon>
						</v-btn>

						<v-card>

							<v-list>
								<v-list-tile avatar>

									<v-list-tile-avatar>
										<v-icon right>{{ $store.state.mainIcons.profile.icon }}</v-icon>
									</v-list-tile-avatar>

									<v-list-tile-content>
										<v-list-tile-title>{{ $store.state.auth.user_infos.name }} {{ $store.state.auth.user_infos.surname }}</v-list-tile-title>
										<v-list-tile-sub-title>{{ $store.state.auth.user_infos.email }}</v-list-tile-sub-title>
									</v-list-tile-content>

								</v-list-tile>
							</v-list>

							<v-divider></v-divider>

							<v-list>

								<v-list-tile>
									<v-btn 
										color=""
										flat fab small
										nuxt to="/usr/settings"
										>
										<v-icon>{{ $store.state.mainIcons.settings.icon }}</v-icon>
									</v-btn>
									<v-list-tile-title>{{ $t('global.settings', $store.state.locale ) }}</v-list-tile-title>
								</v-list-tile>

								<!-- <v-divider></v-divider> -->

								<v-list-tile>
									<v-btn 
										color=""
										flat fab small
										nuxt to="/logout"
										>
										<v-icon>{{ $store.state.mainIcons.logout.icon }}</v-icon>
									</v-btn>
									<v-list-tile-title>{{ $t('home.logoutPage', $store.state.locale ) }}</v-list-tile-title>
								</v-list-tile>

							</v-list>

							<!-- <v-divider></v-divider>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn flat @click="menu = false">
									{{ $t('global.cancel', $store.state.locale ) }}
								</v-btn>
							</v-card-actions> -->

						</v-card>

					</v-menu>

				</template>

				<!-- LOCALES  -->
				<v-menu 
					transition="slide-y-transition"
					offset-y
					>

					<v-btn 
						slot="activator"
						
						flat
						>
						<span>{{ $store.state.locale }}</span>
						<v-icon >arrow_drop_down</v-icon>
					</v-btn>

					<v-list>
						<v-list-tile
							v-for="(item,i) in $store.state.dropdown_lang "
							:key="i" 
							@click="change_lang(item.code)" 
							>
							<v-list-tile-title v-text="item.text"></v-list-tile-title>
						</v-list-tile>
					</v-list>
				</v-menu>

			</v-toolbar-items>


			<!-- <v-btn
				icon
				@click.stop="$emit('toggleRightDrawer')"
				>
				<v-icon>menu</v-icon>
			</v-btn> -->

				
		</v-toolbar>


	<!-- </div> -->

</template>


<script>
export default {

	// middleware : 'change_lang',

	data() {
		return {

			fav		: true,
			menu	: false,
			message	: false,
			hints	: true,

			loading : false,

			// clipped: true,
			// drawer: false,
			// fixed: true,

			// items: [
			//   { icon: 'apps', title: 'Welcome', to: '/' },
			//   { icon: 'input', title: 'Login', to: '/login' },
			//   { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
			// ],

			// miniVariant: false,
			// // right: true,
			// rightDrawer: false,
			// title: 'Solidata',

		}
	},

	computed : {
		parentPadding () {
			return (this.isPreview) ? this.parentNoBotPadding : this.parentBotPadding ;
		},
	},

	methods: {

		change_lang(new_locale) {

			console.log("change_lang / new_locale : ", new_locale ) ; 

			// change locale in store
			this.$store.commit('SET_LANG', new_locale ) ;

			// update user in API if user is logged
			if ( this.$store.state.auth.isLogged ){
				
				console.log("change_lang / updating user... " ) ; 

				this.loading = true ;

				var input = {
					coll 	: "usr",
					doc_id	: this.$store.state.auth.user_id, 
					form	: [{ 
						"field_to_update" 	: "profile.lang",
						"field_value" 		: new_locale 
					}]
				}; 

				// dispatch action from store for update
				this.$store.dispatch('updateItem', input )
				
				.then(result => {

					console.log("change_lang / success ... " ) ; 
					this.alert 		= { type: 'success', message: result.msg }
					this.loading 	= false

				})
				
				.catch(error => {
					console.log("change_lang / submit / error... : ", error ) ; 
					this.loading = false
					this.alert = {type: 'error', message: "login error" }
					if (error.response && error.response.data) {
						this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
					}
				})

			}

		},
		
		// change_drawer() {
		//   this.$store.commit('set_drawer' )
		// },
		// change_clipped() {
		//   this.$store.commit('set_clipped' )
		// },
		// change_miniVariant() {
		//   this.$store.commit('set_miniVariant' )
		// },
		// change_rightDrawer() {
		//   this.$store.commit('set_rightDrawer' )
		// },
		// change_fixed() {
		//   this.$store.commit('set_fixed' )
		// },
		// change_right() {
		//   this.$store.commit('set_right' )
		// },

	}, 

}
</script>


<style scoped>



</style>
