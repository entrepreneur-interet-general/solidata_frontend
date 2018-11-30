<template>

	<div>
			
		<SectionTitle
			v-if="$store.state.auth.isLogged"
			:title="$t('dashboard.name', $store.state.locale)"
			:intro="$t('dashboard.intro', $store.state.locale)"
			:icon="$store.state.mainIcons.dashboard.icon"
			:isDashboard="true"
			:to_link="'/'"
		>
		</SectionTitle>

		<SectionTitle
			v-else
			:title="$t('dashboard.name', $store.state.locale)"
			:intro="$t('dashboard.introAnon', $store.state.locale)"
			:icon="$store.state.mainIcons.dashboard.icon"
			:isDashboard="true"
			:to_link="'/'"
		>
		</SectionTitle>

	


		<v-tabs
			centered
			color=""
			icons-and-text
			>
			<v-tabs-slider color="primary"></v-tabs-slider>


			<!-- TABS HEAD -->
			<v-tab 
				v-for="(tab,i) in tabsList"
				:key="i"
				:href="'#'+tab"
				>
				{{ $t( tab+'.name', $store.state.locale)  }}
				<v-icon small>
					{{ tabs[tab]['icon'] }}
				</v-icon>
			</v-tab>



			<!-- TABS ITEMS CONTAINER -->
			<v-tab-item
				v-for="(tab,i) in tabsList"
				:id="tab"
				:key="i"
				>


				<!-- TAB ITEMS SUBTITLE -->
				<!-- <v-container 
					v-if="$store.state.auth.isLogged"
					fluid 
					>

					<v-layout 
						row 
						align-center 
						spacer
						>
						<v-flex class="text-xs-center">
							<span class="headline">
								<span>{{ $t(tab+'.intro', $store.state.locale) }}</span>
							</span>
						</v-flex>
					</v-layout>
					
				</v-container> -->



				<!-- ITEMS LIST -->
				<ItemsListDI
					:tab="tab"
					:coll="coll(tab)"
					:items_coll="items[tab]"
					:defaultFlex="defaultFlex"
					:defaultHeight="defaultHeightAdd"
					>
				</ItemsListDI>

				

			</v-tab-item>



		</v-tabs>



	</div>


</template>



<script>

import ItemsListDI from '~/components/UI/itemsList_dataIterator.vue'
// import ItemsList from '~/components/UI/itemsList.vue'
import SectionTitle from '~/components/UI/sectionTitle.vue'
// import CardPreview from '~/components/UI/cardPreview.vue'
// import CardCreate from '~/components/UI/cardCreate.vue'

export default {
	components : {
		// ItemsList,
		ItemsListDI,
		SectionTitle,
		// CardPreview,
		// CardCreate
	},
	
	middleware : ["getListItems"],
	meta : {
		collection 	: [
			'prj',
			'dmt',
			'dmf',
			'dsi',
			'tag',
		],
		level 		: 'get_list',
	},

	computed: {

		tabs () { return this.$store.state.mainIcons },

		items () { 
			return { 
				projects			: this.$store.state.prj.list,
				datamodels			: this.$store.state.dmt.list,
				datamodel_fields	: this.$store.state.dmf.list,
				datasets			: this.$store.state.dsi.list,
				tags				: this.$store.state.tag.list,
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
				"datamodel_fields",
				"datasets", 
				"tags"
			],
		}
	},

	methods: {

		goToCreate(event, data){
			log.console("goToCreate : ", data )
		},

		coll (tab) { 
			// console.log( "get coll ... tab : ", tab) ;
			return this.$store.state.mainIcons[tab].abr 
		},

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
