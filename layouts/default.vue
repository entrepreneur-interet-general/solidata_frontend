<template>
	<v-app >

		<MainDrawer 
			@toggleMiniVariant="change_miniVariant" 
		/>
		<!-- <v-navigation-drawer
			:mini-variant.sync="$store.state.miniVariant"
			:clipped="$store.state.clipped"
			v-model="$store.state.drawer"
			fixed
			app
		>
			<v-list>
				<v-list-tile
					router
					v-for="(item, i) in $store.state.items"
					:to="item.to"
					:key="i"
					exact
				>
					<v-list-tile-action>
						<v-icon v-html="item.icon"></v-icon>
					</v-list-tile-action>

					<v-list-tile-content>
						<v-list-tile-title v-text="item.title"></v-list-tile-title>
					</v-list-tile-content>
				
				</v-list-tile>
			</v-list>

		</v-navigation-drawer> -->



		<Toolbar 
			@toggleClipped="change_clipped" 
			@toggleDrawer="change_drawer" 
			@toggleMiniVariant="change_miniVariant" 
			@toggleFixed="change_fixedNav" 
			@toggleRightDrawer="change_rightDrawer" 
		/>
		<!-- <v-toolbar :fixed="$store.state.fixed" app :clipped-left="$store.state.clipped">
			
			<v-toolbar-side-icon @click="change_drawer"></v-toolbar-side-icon>
			
			<v-btn
				icon
				@click.stop="change_miniVariant"
			>
				<v-icon v-html="$store.state.miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
			</v-btn>

			<v-btn
				icon
				@click.stop="change_clipped"
			>
				<v-icon>web</v-icon>
			</v-btn>
			
			<v-btn
				icon
				@click.stop="fixed = !fixed"
			>
				<v-icon>remove</v-icon>
			</v-btn>

			<v-btn flat nuxt to="/">
				<v-toolbar-title v-text="$store.state.title"></v-toolbar-title>
			</v-btn>

			<v-spacer></v-spacer>

					
				<v-btn icon nuxt to="/login">
					<v-icon>input</v-icon>
				</v-btn>

				<v-btn icon>
					<v-icon>person</v-icon>
				</v-btn>


				<v-menu :nudge-width="100">
					<v-toolbar-title slot="activator">
						<span>{{ $store.state.locale }}</span>
						<v-icon >arrow_drop_down</v-icon>
					</v-toolbar-title>

					<v-list>
						<v-list-tile
							v-for="item in $store.state.dropdown_lang "
							:key="item" 
							@click="change_lang(item.code)" 
						>
							<v-list-tile-title v-text="item.text"></v-list-tile-title>
						</v-list-tile>
					</v-list>
				</v-menu>

			<v-btn
				icon
				@click.stop="change_rightDrawer"
			>
				<v-icon>menu</v-icon>
			</v-btn>


		</v-toolbar> -->






		<v-content>
			<nuxt />
		</v-content>





		<!-- DEBUGGING / DISPLAY STORE CONTENTS -->
		<div 
			v-if="$store.state.is_debug"
			>
			<v-divider class="mt-0 "></v-divider>

			<!-- <v-content> -->
				<v-container mt-2>
					<v-layout class="xs-10 offset-xs-1 ">
						<v-flex >
							<v-alert
									
								:value="true"
								type="error"
								class="black--text"
								>
								<h3> ==> DEBUGGING - $STORE.STATE - DEFAULT LAYOUT</h3>

								<v-divider class="mb-1"></v-divider>
								
								<!-- AUTH  -->
								<div>auth.isAnonymous :<code>{{ $store.state.auth.isAnonymous }}</code></div>
								<div>auth.isLogged :<code>{{ $store.state.auth.isLogged}}</code></div>
								<div>locale :<code>{{ $store.state.locale }}</code></div>
								<!-- <div>subFieldsWithChoices : <br> 
									<code>{{ $store.state.subFieldsWithChoices | json }}</code>
								</div>
								<div>subFieldsWithBoolean : <br>
									<code>{{ $store.state.subFieldsWithBoolean }}</code>
								</div> -->
								
								<!-- AUTH / USER -->
								<v-divider class="my-3"></v-divider>
								<div>auth.user_infos : <br>
									<code>{{ $store.state.auth.user_infos | json }}</code>
								</div>
								<div>auth.user_id :<code>{{ $store.state.auth.user_id}}</code></div>
								
								<v-divider class="my-3"></v-divider>
								<div>access_token : <br>
									<code>{{ $store.state.auth.access_token}}</code>
								</div>
								<div>refresh_token : <br>
									<code>{{ $store.state.auth.refresh_token}}</code>
								</div>
								
								<!-- PRJ -->
								<v-divider class="my-3"></v-divider>
								<div>prj.alert :<code>{{ $store.state.prj.alert.message}}</code></div>
								
								<!-- DMF -->
								<v-divider class="my-3"></v-divider>
								<!-- <div>dmf.list : <br><code>{{ $store.state.dmf.list }}</code></div> -->
								<!-- <div>dmf.current : <br>
									<code>{{ $store.state.dmf.current | json }}</code>
								</div>
								<div>dmf.current_new : <br> 
									<code>{{ $store.state.dmf.current_new | json }}</code>
								</div> -->

								<!-- TAG -->
								<v-divider class="my-3"></v-divider>
								<!-- <div>tag.list :  <br><code>{{ $store.state.tag.list }}</code></div>
								<div>tag.current : <br> 
									<code>{{ $store.state.tag.current | json }} </code>
								</div>
								<div>tag.current_new : <br> 
									<code>{{ $store.state.tag.current_new | json }}</code>
								</div> -->

								<!-- DSI  -->
								<v-divider class="my-3"></v-divider>
								<!-- <div>dsi.current_filename :<code>{{ $store.state.dsi.current_filename }}</code></div>
								<div>dsi.csv_sep :<code>{{ $store.state.dsi.csv_sep }}</code></div>
								<div>dsi.list :  <br><code>{{ $store.state.dsi.list }}</code></div>
								<div>dsi.current : <br>
									<code>{{ $store.state.dsi.current | json }}</code>
								</div>
								<div>dsi.current_new : <br>
									<code>{{ $store.state.dsi.current_new | json }}</code>
								</div> -->
							</v-alert>
						</v-flex>
					</v-layout>
				</v-container> 
			<!-- </v-content> -->
		
		</div>


		<SecondaryDrawer 
			@toggleRight="change_right"
		/>
		<!-- <v-navigation-drawer
			temporary
			:right="$store.state.right"
			v-model="$store.state.rightDrawer"
			fixed
			>
			<v-list>
				<v-list-tile @click.native="change_right">
					<v-list-tile-action>
						<v-icon light>compare_arrows</v-icon>
					</v-list-tile-action>
					<v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer> -->




		<Footer/>
		<!-- <v-footer :fixed="fixed" app>
			<span>&copy; 2018</span>
		</v-footer> -->




	</v-app>
</template>

<script>

	import axios from 'axios'

	// import components
	import MainDrawer from '~/components/Navigation/MainDrawer.vue'
	import SecondaryDrawer from '~/components/Navigation/SecondaryDrawer.vue'
	import Toolbar from '~/components/Navigation/Toolbar.vue'
	import Footer from '~/components/Footer/Footer.vue'

	export default {

		// load components
		components : {
			Toolbar, 
			MainDrawer,
			SecondaryDrawer,
			Footer,
		},

		// middleware : ["checkTokens"],
		
		data () {
			return {
				// items: [
				//   { icon: 'apps', title: 'Welcome', to: '/' },
				//   { icon: 'input', title: 'Login', to: '/login' },
				//   { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
				// ],
				// miniVariant: true,
				// clipped: true,
				// drawer: true,
				// fixed: true,
				// right: true,
				// rightDrawer: false,
				// title: 'Solidata'
			}
		},

		methods: {
			
			change_lang(new_locale) {
				// console.log("change_lang / new_locale : ", new_locale ) ; 
				this.$store.commit('SET_LANG', new_locale )
			},
			change_miniVariant() {
				this.$store.commit('set_miniVariant' )
			},
			change_clipped() {
				this.$store.commit('set_clipped' )
			},
			change_drawer() {
				this.$store.commit('set_drawer' )
			},
			change_fixedNav() {
				this.$store.commit('set_fixedNav' )
			},
			change_right() {
				this.$store.commit('set_right' )
			},
			change_rightDrawer() {
				this.$store.commit('set_rightDrawer' )
			},
		},

		// async asyncData ({ params }) {
		//   let { data } = await axios.get(`https://my-api/posts/${params.id}`)
		//   return { title: data.title }
		// }
	}



</script>
