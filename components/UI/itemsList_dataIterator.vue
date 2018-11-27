<template>

	<div>

		<!-- <div> items_coll : {{ items_coll }}</div> -->
		<!-- <br> -->
		<!-- <div> items_coll['docs_user_is_in_team'] : {{ items_coll['docs_user_is_in_team'] }}</div> -->

		<v-container 
			fluid grid-list-md
			>


			<!-- CREATE CARD IF LOGGED GUEST -->
			<v-layout 
				class="mb-4"
				row 
				wrap
				>

				<CardCreate
					v-if="$store.state.auth.isLogged"
					:tab="tab"
					:defaultFlex="defaultFlex"
					:defaultHeight="defaultHeightAdd"
					>
				</CardCreate>
			
			</v-layout>


			<!-- PREVIEW CARDS IS IN TEAM -->
			<v-data-iterator
				v-if="items_coll['docs_user_is_in_team'] != null"
				:items="items_coll['docs_user_is_in_team']" 
				:rows-per-page-items="rowsPerPageItems"
				:pagination.sync="pagination"
				content-tag="v-layout"
				row
				wrap
				>

				<!-- data iterator title -->
				<v-toolbar
					dark
					slot="header"
					class="mb-2"
					color="secondary"
					flat
					:height="$store.state.dataIteratorHeight"
					>

					<v-toolbar-side-icon disabled>
						<v-icon small>
							{{ $store.state.mainIcons[tab].icon }}
						</v-icon>
					</v-toolbar-side-icon>

					<v-toolbar-title
						class="body-2"
						>
						<!-- - {{ coll }} - {{ tab }} -  -->
						{{ $t( tab+'.name', $store.state.locale)  }}
						- 
						{{ $t(`global.inTeam`, $store.state.locale) }}
					</v-toolbar-title>

				</v-toolbar>


				<!-- data iterator cards -->
				<v-flex
					slot="item"
					slot-scope="props"
					:class="cardSizes"
					>

					<CardPreviewDense 
						:tab="tab"
						:item="props.item"
						:inTeam="'yes'"
						>
					</CardPreviewDense>

				</v-flex>

				<!-- footer -->
				<!-- <v-toolbar
					slot="footer"
					class="mt-2"
					color="secondary"
					dark
					dense
					flat
				>
					<v-toolbar-title class="subheading">This is a footer</v-toolbar-title>
				</v-toolbar> -->

			</v-data-iterator>


			<!-- PREVIEW CARDS NOT IN TEAM -->
			<v-data-iterator
				v-if="items_coll['docs_user_not_in_team'] != null"
				:items="items_coll['docs_user_not_in_team']" 
				:rows-per-page-items="rowsPerPageItems"
				:pagination.sync="pagination"
				content-tag="v-layout"
				row
				wrap
				>

				<!-- data iterator title -->
				<v-toolbar
					dark
					slot="header"
					class="mb-2"
					color="grey lighten-1"
					flat
					:height="$store.state.dataIteratorHeight"
					>
					<v-toolbar-side-icon disabled>
						<v-icon small>
							{{ $store.state.mainIcons[tab].icon }}
						</v-icon>
					</v-toolbar-side-icon>

					<v-toolbar-title
						class="body-2"
						>

						{{ $t( tab+'.name', $store.state.locale)  }}
						- 
						{{ $t(`global.notTeam`, $store.state.locale) }}
					</v-toolbar-title>

				</v-toolbar>


				<!-- data iterator cards -->
				<v-flex
					slot="item"
					slot-scope="props"
					xs12
					sm6
					md4
					lg3
					>

					<CardPreviewDense 
						:tab="tab"
						:item="props.item"
						:inTeam="'yes'"
						>
					</CardPreviewDense>

				</v-flex>

				<!-- <v-toolbar
					slot="footer"
					class="mt-2"
					color="secondary"
					dark
					dense
					flat
				>
					<v-toolbar-title class="subheading">This is a footer</v-toolbar-title>
				</v-toolbar> -->

			</v-data-iterator>

		</v-container>











		<!-- <v-card>
			
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
				
				</v-layout>


				<div class="mb-3">
					<span class="title">
						{{ tab }} - {{ $t(`global.inTeam`, $store.state.locale) }}
					</span>
				</div>

				<v-layout row wrap>

					<CardPreviewDEnse 
						:tab="tab"
						:item="item"
						:inTeam="'yes'"
						>
					</CardPreviewDense>
					

				</v-layout>
				
				<div class="mb-3 pt-5">
					<span class="title">
						{{ tab }} - {{ $t(`global.notTeam`, $store.state.locale) }}
					</span>
				</div>
				<v-layout row wrap>
					
					<CardPreview 
						v-for="(card,i) in items_coll['docs_user_not_in_team']"
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
		</v-card> -->

	</div>

</template>


<script>

// import SectionTitle from '~/components/UI/sectionTitle.vue'
// import CardPreview from '~/components/UI/cardPreview.vue'
import CardPreviewDense from '~/components/UI/cardPreview_dense.vue'
import CardCreate from '~/components/UI/cardCreate.vue'
// import CardCreateDense from '~/components/UI/cardCreate_dense.vue'

export default {

	props : [ 
		"items_coll", 
		"tab", 
		"coll",
		"defaultHeightAdd", 
		"defaultHeight", 
		"defaultFlex", 
	],

	components : {
		// SectionTitle,
		// CardPreview,
		CardPreviewDense,
		CardCreate
	},
	
	data () {
		
		return {

			rowsPerPageItems: [ 4, 8, 12 ],
			pagination: {
				rowsPerPage: 4
			},

			// cardSizes : "xs12 sm6 md4 l4",
			cardSizes : this.$store.state[this.coll].parameters.cardSizes,

			/*
			items_test: {
				'docs_user_is_in_team' : [
					{
						value: false,
						infos : {
							title: 'Frozen Yogurt',
						},
						log : {
							created_by: 'Ice cream sandwich',
						},
						calories: 159,
						fat: 6.0,
						carbs: 24,
						protein: 4.0,
						sodium: 87,
						calcium: '14%',
						iron: '1%'
					},
					{
						value: false,
						infos : {
							title: 'Ice cream sandwich',
						},
						log : {
							created_by: 'Ice cream sandwich',
						},
						calories: 237,
						fat: 9.0,
						carbs: 37,
						protein: 4.3,
						sodium: 129,
						calcium: '8%',
						iron: '1%'
					},
					{
						value: false,
						infos : {
							title: 'Eclair',
						},
						log : {
							created_by: 'Ice cream sandwich',
						},
						calories: 262,
						fat: 16.0,
						carbs: 23,
						protein: 6.0,
						sodium: 337,
						calcium: '6%',
						iron: '7%'
					},
					{
						value: false,
						infos : {
							title: 'Chocolatine',
						},
						log : {
							created_by: 'Ice cream sandwich',
						},
						calories: 262,
						fat: 16.0,
						carbs: 23,
						protein: 6.0,
						sodium: 337,
						calcium: '6%',
						iron: '7%'
					},
					{
						value: false,
						infos : {
							title: 'Cupcake',
						},
						log : {
							created_by: 'Ice cream sandwich',
						},
						calories: 305,
						fat: 3.7,
						carbs: 67,
						protein: 4.3,
						sodium: 413,
						calcium: '3%',
						iron: '8%'
					}
				]
			}
			*/

		}

	}

}

</script>