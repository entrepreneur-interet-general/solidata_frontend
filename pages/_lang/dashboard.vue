<template>

	<div>

		<v-jumbotron 
			class="pa-0" 
			color="primary" 
			dark 
			:height="$store.state.mainSectionsHeight"
			>
			
			<SectionTitle
				v-if="$store.state.auth.isLogged"
				:title="$t('dashboard.name', $store.state.locale)"
				:intro="$t('dashboard.intro', $store.state.locale)"
				:icon="$store.state.mainIcons.dashboard.icon"
				:isDashboard="true"
			>
			</SectionTitle>

			<SectionTitle
				v-else
				:title="$t('dashboard.name', $store.state.locale)"
				:intro="$t('dashboard.introAnon', $store.state.locale)"
				:icon="$store.state.mainIcons.dashboard.icon"
				:isDashboard="true"
			>
			</SectionTitle>

		</v-jumbotron>
	


		<v-tabs
			centered
			color=""
			icons-and-text
		>
			<v-tabs-slider color="primary"></v-tabs-slider>


			<!-- TAB HEAD -->
			<v-tab 
				v-for="(tab,i) in tabsList"
				:key="i"
				:href="'#'+tab">
				{{ $t( tab+'.name', $store.state.locale)  }}
				<v-icon>{{ tabs[tab]['icon'] }}</v-icon>
			</v-tab>

			<!-- TAB ITEMS CONTAINER -->
			<v-tab-item
				v-for="(tab,i) in tabsList"
				:id="tab"
				:key="i"
			>

				<!-- TAB ITEMS SUBTITLE -->
				<v-container 
					v-if="$store.state.auth.isLogged"
					fluid 
					>

					<v-layout 
						row 
						align-center 
						spacer
						>
						<v-flex>
							<span class="display-1">
								<span>{{ $t(tab+'.intro', $store.state.locale) }}</span>
								<!-- <span v-else>{{ $t(tab+'.name', $store.state.locale) }}</span> -->
							</span>
						</v-flex>
					</v-layout>
					
				</v-container>


				<!-- PREVIEW CARDS NOT IN TEAM -->
				<v-card>
					
					<v-container
						fluid
						grid-list-md
					>
						<v-layout row wrap>

							<CardCreate
								v-if="$store.state.auth.isLogged"
								:tab="tab"
								:defaultFlex="defaultFlex"
								:defaultHeight="defaultHeightAdd"
								>
							</CardCreate>
						

							
							<!-- <template 
							 		v-if="$store.state[tab].alert != {}" 
								> -->
								<CardPreview 
									v-for="(card,i) in items[tab]['docs_user_is_in_team']"
									:key="i"
									:index="i"
									:tab="tab"
									:item="card"
									:inTeam="'yes'"
									:defaultFlex="defaultFlex"
									:defaultHeight="defaultHeight"
									>
								</CardPreview>
								
								
								<CardPreview 
									v-for="(card,i) in items[tab]['docs_user_not_in_team']"
									:key="i"
									:index="i"
									:tab="tab"
									:item="card"
									:inTeam="'no'"
									:defaultFlex="defaultFlex"
									:defaultHeight="defaultHeight"
									>
								</CardPreview>


							<!-- </template>

							<template 
									v-else
								>
								<p >
									there was a fucking alert : <br>
									{{ $store.state.prj.alert.message }}
								</p>
							</template> -->

						</v-layout>
					</v-container>
				</v-card>


			</v-tab-item>


		</v-tabs>



	</div>


</template>



<script>

import SectionTitle from '~/components/UI/sectionTitle.vue'
import CardPreview from '~/components/UI/cardPreview.vue'
import CardCreate from '~/components/UI/cardCreate.vue'

export default {
	components : {
		SectionTitle,
		CardPreview,
		CardCreate
	},
	
	middleware : ["getListItems"],

	computed: {

		tabs () { return this.$store.state.mainIcons },

		items () { 
			return { 
				projects    : this.$store.state.prj.list,
				datamodels  : this.$store.state.dmt.list,
				datasets    : this.$store.state.dsi.list,
				tags        : this.$store.state.tag.list,
			} 
		},

	},

	mounted () {
		console.log("dashboard / mounted ---> items... ", this.items ) ;
	},

	data () {
		return {
			defaultHeightAdd  : "240px",
			defaultHeight     : "150px",
			defaultFlex       : 3,
			tabsList          : [
				"projects", 
				"datamodels", 
				"datasets", 
				"tags"
			],
			// cards: [
			//   { title: 'Pre-fab homes',       id:"DSQFGH" },
			//   { title: 'Favorite road trips', id:"azghjrue" },
			//   { title: 'Best airlines',       id:"dzerst" }
			// ]
		}
	},

	methods: {
		goToCreate(event, data){
			log.console("goToCreate : ", data )
		}
	},


	// fetch ({ store, params }) {

	// 	console.log("- - - Fetch from page : getListItems.js ...") ;

	// 	// dispatch action to get prj
	// 	return store.dispatch('prj/getList' )
	// 		.then(result => {
	// 			console.log("dispatch prj / ok..." ) ; 
	// 			// this.alert = {type: 'success', message: result.msg}
	// 		})
	// 		.catch(error => {
	// 			console.log("dispatch prj / error..." ) ; 
	// 			console.log("... error : ", error ) ; 

	// 			if (error.response && error.response.data) {
	// 				// store.state.prj.alert = { type: 'error', message : error } ;
	// 				store.state.prj.alert = { type: 'error', message: error.response.data.msg || error.reponse.status } ;
	// 				// this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
	// 			}
	// 		})

	// 	// dispatch action to get prj
	// 	store.dispatch('dmt/getList' )
	// 		.then(result => {
	// 			console.log("dispatch dmt / ok..." ) ; 
	// 			// this.alert = {type: 'success', message: result.msg}
	// 		})
	// 		.catch(error => {
	// 			console.log("dispatch dmt / error..." ) ; 
	// 			console.log("... error : ", error ) ; 

	// 			if (error.response && error.response.data) {
	// 				// store.state.dmt.alert = { type: 'error', message : error } ;
	// 				store.state.dmt.alert = { type: 'error', message: error.response.data.msg || error.reponse.status } ;
	// 				// this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
	// 			}
	// 		})

	// 	// dispatch action to get prj
	// 	store.dispatch('dsi/getList' )
	// 	.then(result => {
	// 		console.log("dispatch dsi / ok..." ) ; 
	// 		// this.alert = {type: 'success', message: result.msg}
	// 	})
	// 	.catch(error => {
	// 		console.log("dispatch dsi / error..." ) ; 
	// 		console.log("... error : ", error ) ; 

	// 		if (error.response && error.response.data) {
	// 			// store.state.dsi.alert = { type: 'error', message : error } ;
	// 			store.state.dsi.alert = { type: 'error', message: error.response.data.msg || error.reponse.status } ;
	// 			// this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
	// 		}
	// 	})

	// 	// dispatch action to get prj
	// 	store.dispatch('tag/getList' )
	// 	.then(result => {
	// 		console.log("dispatch tag / ok..." ) ; 
	// 		// this.alert = {type: 'success', message: result.msg}
	// 	})
	// 	.catch(error => {
	// 		console.log("dispatch tag / error..." ) ; 
	// 		console.log("... error : ", error ) ; 

	// 		if (error.response && error.response.data) {
	// 			// store.state.tag.alert = { type: 'error', message : error } ;
	// 			store.state.tag.alert = { type: 'error', message: error.response.data.msg || error.reponse.status } ;
	// 			// this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
	// 		}
	// 	})

	// },
	
	// asyncData (context) {
	// 	console.log("- - - AsyncData : getListItems.js ...") ;
	// }

}

</script>
