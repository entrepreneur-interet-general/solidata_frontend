
<template>

	<v-toolbar 
			class="secondary justify-center"
			dark
			app 
			:fixed="$store.state.fixedNav" 
			:clipped-left="$store.state.clipped"
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

			<v-btn 
				icon
				flat 
				nuxt 
				dark 
				to="/" 
				class="ma-0"
				>
				<v-icon>
					home
				</v-icon>
			</v-btn>

			<!-- <v-spacer></v-spacer> -->

			<v-toolbar-title 
				class="text-uppercase"
				v-text="$store.state.title"
				>
			<!-- <v-toolbar-title> -->
			</v-toolbar-title>

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
		 




			<!--  RIGHT SIZE OF THE TOOLBAR -->
			<v-spacer></v-spacer>

			<v-toolbar-items class="hidden-sm-and-down">


				<!-- STATIC PAGES -->

				<v-btn 
					disabled
					flat 
					nuxt 
					to="/tutos">
					{{ $t(`links.tutos`, $store.state.locale )}}
				</v-btn>

				<v-btn 
					disabled
					flat 
					nuxt 
					to="/about">
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
						<v-icon dark>
							fas fa-sign-in-alt
						</v-icon>
						<!-- {{ $t('home.loginPage', $store.state.locale ) }} -->
					</v-btn>

					<!-- <v-btn 
						nuxt to="/register"
						flat
						class="px-0 ma-0"
						>
						<v-icon dark > 
							fas fa-user-plus
						</v-icon>
						<!- - {{ $t('home.registerPage', $store.state.locale ) }} - ->
					</v-btn> -->




					<!-- LOCALES  -->
					<!-- <div class="ml-3"> -->

						<v-menu 
							transition="slide-y-transition"
							:nudge-width="100" 
							>

							<v-btn 
								slot="activator"
								dark
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

								<!-- <v-list-tile>
									<v-list-tile-action>
										<v-switch v-model="message" color="purple"></v-switch>
									</v-list-tile-action>
									<v-list-tile-title>Enable messages</v-list-tile-title>
								</v-list-tile>

								<v-list-tile>
									<v-list-tile-action>
										<v-switch v-model="hints" color="purple"></v-switch>
									</v-list-tile-action>
									<v-list-tile-title>Enable hints</v-list-tile-title>
								</v-list-tile> -->

								<v-list-tile>
									<v-menu :nudge-width="100" >
										<!-- <span  slot="activator">
											<span>{{ $store.state.locale }}</span>
											<v-icon >arrow_drop_down</v-icon>
										</span> -->
									<v-btn 
										color=""
										slot="activator"
										flat fab small
										>
										<v-icon>{{ $store.state.mainIcons.language.icon }}</v-icon>
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
									<v-list-tile-title>
										{{ $t('global.lang', $store.state.locale ) }} : {{ $store.state.locale }}
									</v-list-tile-title>
								</v-list-tile>

								<v-list-tile>
										<v-btn 
											color=""
											flat fab small
											nuxt to="/usr/settings">
											<v-icon>{{ $store.state.mainIcons.settings.icon }}</v-icon>
										</v-btn>
										<v-list-tile-title>{{ $t('global.settings', $store.state.locale ) }}</v-list-tile-title>
								</v-list-tile>

								<v-divider></v-divider>

								<v-list-tile>
										<v-btn 
											color=""
											flat fab small
											nuxt to="/logout">
											<v-icon>{{ $store.state.mainIcons.logout.icon }}</v-icon>
										</v-btn>
										<v-list-tile-title>{{ $t('home.logoutPage', $store.state.locale ) }}</v-list-tile-title>
								</v-list-tile>

							</v-list>

							<v-divider></v-divider>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn flat @click="menu = false">
									{{ $t('global.cancel', $store.state.locale ) }}
								</v-btn>
								<!-- <v-btn color="primary" flat @click="menu = false">{{ $t('global.save', $store.state.locale ) }}</v-btn> -->
							</v-card-actions>


						</v-card>

					</v-menu>


				</template>


			</v-toolbar-items>


			<!-- <v-btn
				icon
				@click.stop="$emit('toggleRightDrawer')"
				>
				<v-icon>menu</v-icon>
			</v-btn> -->

				
		</v-toolbar>

</template>


<script>
export default {

		// middleware : 'change_lang',

		data() {
			return {

				fav: true,
				menu: false,
				message: false,
				hints: true

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
		methods: {
			change_lang(new_locale) {
				console.log("change_lang / new_locale : ", new_locale ) ; 
				this.$store.commit('SET_LANG', new_locale )
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
