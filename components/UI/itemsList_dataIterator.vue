<template>

	<div>

		<!-- <div> items_coll : {{ items_coll }}</div> -->
		<!-- <br> -->
		<!-- <div> items_coll['docs_user_is_in_team'] : {{ items_coll['docs_user_is_in_team'] }}</div> -->

		<v-container 
			fluid grid-list-md
			pt-5
			>


			<!-- SEARCH CARD -->
			<v-layout 
				wrap
				class="mb-1 pt-0"
				>
	 		
				<v-flex 
					xs12 sm10 offset-sm1 md8 offset-md2
					>

					<!-- <v-toolbar 
						dark
						color="primary"
						> -->
						
    					<!-- <v-toolbar-title>
							{{ $t(`global.search`, $store.state.locale) + ' - ' + $t(`${tab}.name`, $store.state.locale) }}
						</v-toolbar-title> -->
	
						<!-- - itemsTitlesList : {{ itemsTitlesList }} -->
						<!-- - coll : {{ coll }} -->
						<!-- - tab : {{ tab }} -->

						<!-- AUTOCOMPLETE COMPONENT -->
						<v-card
							color="white"
							height=""
							>
							<v-card-text
								class="py-1 "
								>
								<v-autocomplete
									v-model="searchString"
									:items="itemsTitlesList"
									:label="$t(`global.search`, $store.state.locale) + ' - ' + $t(`${tab}.name`, $store.state.locale)"
									persistent-hint
									prepend-icon="search"
									class="ma-0"
									flat
									solo
									clearable
									hide-no-data
									hide-details
									>

									<!-- <v-slide-x-reverse-transition
										slot="append-outer"
										mode="out-in"
										>
										<v-icon
											:color="isEditing ? 'success' : 'info'"
											:key="`icon-${isEditing}`"
											@click="isEditing = !isEditing"
											v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
										>
										</v-icon>
									</v-slide-x-reverse-transition> -->

								</v-autocomplete>
							</v-card-text>
						</v-card>

					<!-- </v-toolbar> -->
				</v-flex>

			
			</v-layout>


			<!-- PREVIEW CARDS IS IN TEAM -->
			<v-data-iterator
				v-if="itemsIn != null"
				:items="itemsList('inTeam')" 

				:rows-per-page-items="rowsPerPageItems"
				:pagination.sync="pagination"

				content-tag="v-layout"
				row
				wrap
				>

				<!-- data iterator title -->
				<v-toolbar
					dense
					slot="header"
					class="mb-0 pb-0"
					color="transparent"
					flat
					>

					<v-toolbar-title
						class="body-2 grey--text"
						>
						<!-- - {{ coll }} - {{ tab }} -  -->
						<!-- {{ $t( tab+'.name', $store.state.locale)  }}
						-  -->
						{{ $t(`global.inTeam`, $store.state.locale) }}
					</v-toolbar-title>

				</v-toolbar>


				<!-- data iterator cards -->
				<v-flex
					slot="item"
					slot-scope="props"
					:class="cardSizes"
					mb-2
					>

					<CardPreviewDense 
						:coll="coll"
						:tab="tab"
						:item="props.item"
						:inTeam="'yes'"
						>
					</CardPreviewDense>

				</v-flex>


			</v-data-iterator>


			<!-- PREVIEW CARDS NOT IN TEAM -->
			<v-data-iterator
				v-if="itemsNot != null"
				:items="itemsList('notTeam')" 
				:rows-per-page-items="rowsPerPageItems"
				:pagination.sync="pagination"
				content-tag="v-layout"
				row
				wrap
				>

				<!-- data iterator title -->
				<v-toolbar
					
					slot="header"
					class="mb-0 pb-0"
					color="transparent"
					flat
					>
					<!-- :height="$store.state.dataIteratorHeight" -->

					<!-- <v-toolbar-side-icon disabled>
						<v-icon small>
							{{ $store.state.mainIcons[tab].icon }}
						</v-icon>
					</v-toolbar-side-icon> -->

					<v-toolbar-title
						class="body-2 grey--text"
						>

						<!-- {{ $t( tab+'.name', $store.state.locale)  }}
						-  -->
						{{ $t(`global.notTeam`, $store.state.locale) }}
					</v-toolbar-title>

				</v-toolbar>


				<!-- data iterator cards -->
				<v-flex
					slot="item"
					slot-scope="props"
					:class="cardSizes"
					>

					<CardPreviewDense 
						:coll="coll"
						:tab="tab"
						:item="props.item"
						:inTeam="'yes'"
						>
					</CardPreviewDense>

				</v-flex>



			</v-data-iterator>


		</v-container>



	</div>

</template>


<script>

// import SectionTitle from '~/components/UI/sectionTitle.vue'
// import CardPreview from '~/components/UI/cardPreview.vue'
import CardPreviewDense from '~/components/UI/cardPreview_dense.vue'
// import CardCreate from '~/components/UI/cardCreate.vue'
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
		// CardCreate
	},
	
	created () {
		console.log("\n itemList_dataIterator / col : ", this.coll )
	},

	data () {
		
		return {
			
			// ITEMS 
			itemsIn 	: this.items_coll['docs_user_is_in_team'],
			itemsNot 	: this.items_coll['docs_user_not_in_team'],

			// CARDS SIZES
			// cardSizes : "xs12 sm6 md4 l4",
			cardSizes : this.$store.state[this.coll].parameters.cardSizes,

			// SEARCH BAR
			isEditing	: false,
			searchString: null,
		
			// PAGINATION DATA ITERATOR
			rowsPerPageItems	: this.$store.state[this.coll].rowsPerPageItems,
			pagination			: this.$store.state[this.coll].pagination


		}

	},

	computed : {

			itemsTitlesList () {
				// get all docs' titles to fill autoplete

				var titlesList  = [];
				// const itemsIn 	= this.items_coll['docs_user_is_in_team'] ;
				// const itemsNot 	= this.items_coll['docs_user_not_in_team'] ;

				if( this.itemsIn != null ){
					for (var doc in this.itemsIn) {
						titlesList.push(this.itemsIn[doc].infos.title) ; 
					}
				};
				if( this.itemsNot != null ){
					for (var doc in this.itemsNot) {
						titlesList.push(this.itemsNot[doc].infos.title) ; 
					}
				};

				return titlesList

			},

	},

	methods : {

			itemsList (in_out) {
				
				console.log("-- itemsInList / in_out : ", in_out) ; 
				var searchStr 	= this.searchString ;

				var items_list = (in_out === "inTeam") ? this.itemsIn : this.itemsNot ;

				if (this.searchString != null ){
					
					// console.log("-- itemsInList / searchStr : ", searchStr) ; 
					// console.log("-- itemsInList / itemsList : ", itemsList) ; 
					// for (var d in itemsList){
					// 	console.log("itemsList[d] : ", itemsList[d] )
					// }

					items_list = items_list.filter( function(item) { 

						console.log("-- itemsInList / item : ", item) ; 
						return ( item.infos.title.includes(searchStr) )
					
					})


				};

				console.log("-- itemsInList / items_list : ", items_list) ; 
				return items_list
			},

	},

}

</script>