<template>

	<div>


		<v-card>
			
			<v-container
				fluid
				grid-list-md
				>
				
				<!-- CREATE CARD IF LOGGED GUEST -->
				<v-layout row wrap>

					<CardCreate
						v-if="$store.state.auth.isLogged"
						:tab="tab"
						:defaultFlex="defaultFlex"
						:defaultHeight="defaultHeightAdd"
						>
					</CardCreate>
				
				</v-layout>


				<!-- PREVIEW CARDS IS IN TEAM -->
				<div class="mb-3">
					<span class="title">
						{{ tab }} - {{ $t(`global.inTeam`, $store.state.locale) }}
					</span>
				</div>

				<v-layout row wrap>

					<CardPreview 
						v-for="(card,i) in items['docs_user_is_in_team']"
						:key="i"
						:index="i"
						:tab="tab"
						:item="card"
						:inTeam="'yes'"
						:defaultFlex="defaultFlex"
						:defaultHeight="defaultHeight"
						>
					</CardPreview>
					

				</v-layout>
				
				<!-- PREVIEW CARDS NOT IN TEAM -->
				<div class="mb-3 pt-5">
					<span class="title">
						{{ tab }} - {{ $t(`global.notTeam`, $store.state.locale) }}
					</span>
				</div>
				<v-layout row wrap>
					
					<CardPreview 
						v-for="(card,i) in items['docs_user_not_in_team']"
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

// import SectionTitle from '~/components/UI/sectionTitle.vue'
import CardPreview from '~/components/UI/cardPreview.vue'
// import CardCreate from '~/components/UI/cardCreate.vue'

export default {

	props : [ 
		"items_coll", 
		"tab", 
		"defaultHeightAdd", 
		"defaultHeight", 
		"defaultFlex" 
	],

	components : {
		// SectionTitle,
		CardPreview,
		// CardCreate
	},
	


}

</script>