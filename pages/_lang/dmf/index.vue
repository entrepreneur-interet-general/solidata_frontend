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
				:title="$t(`${tab}.name`, $store.state.locale)"
				:intro="$t(`${tab}.intro`, $store.state.locale)"
				:icon="$store.state.mainIcons[tab].icon"
				:to_link="'/dashboard'"
				>
			</SectionTitle>

			<SectionTitle
				v-else
				:title="$t(`${tab}.name`, $store.state.locale)"
				:intro="$t(`${tab}.introAnon`, $store.state.locale)"
				:icon="$store.state.mainIcons[tab].icon"
				>
			</SectionTitle>

		</v-jumbotron>
	

		<v-card>
			
			<v-container
				fluid
				grid-list-md
			>
				<v-layout row wrap>

					<!-- CREATE CARD IF LOGGED GUEST -->
					<CardCreate
						v-if="$store.state.auth.isLogged"
						:tab="tab"
						:defaultFlex="defaultFlex"
						:defaultHeight="defaultHeightAdd"
						>
					</CardCreate>
				
					<!-- PREVIEW CARDS IS IN TEAM -->
					<CardPreview 
						v-for="(card,i) in items.docs['docs_user_is_in_team']"
						:key="i"
						:index="i"
						:tab="tab"
						:item="card"
						:inTeam="'yes'"
						:defaultFlex="defaultFlex"
						:defaultHeight="defaultHeight"
						>
					</CardPreview>
					
					
					<!-- PREVIEW CARDS NOT IN TEAM -->
					<CardPreview 
						v-for="(card,i) in items.docs['docs_user_not_in_team']"
						:key="i"
						:index="i"
						:tab="tab"
						:item="card"
						:inTeam="'no'"
						:defaultFlex="defaultFlex"
						:defaultHeight="defaultHeight"
						>
					</CardPreview>

				</v-layout>
			</v-container>
		</v-card>

	
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
	meta : {
		collection 	: ['dmf'],
		level 		: 'get_list',
	},
	
	computed: {

		items () { 
			return { 
				docs 	: this.$store.state.dmf.list,
			} 
		},

	},

	mounted () {
		console.log("\n- dashboard / mounted ---> tab... ", this.tab ) ;
		console.log("- dashboard / mounted ---> items... ", this.items ) ;
	},
	
	data () {
		return {
			tab 				: 'datamodel_fields',
			defaultHeightAdd	: "240px",
			defaultHeight		: "150px",
			defaultFlex			: 2,
		}
	},

	methods: {
	},

}

</script>
