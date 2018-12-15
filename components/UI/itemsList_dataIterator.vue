<template>

	<v-card 
		:class="classMainCard"
		>

		<v-container 
			fluid grid-list-md
			pt-4
			>

			<!-- SEARCH CARD -->
			<v-layout 
				row
				wrap
				:class="classPaddingBottomSearch"
				align-center
				>
	 		
				<v-flex 
					xs10 sm8 md6 lg6
					>
	
					<!-- - itemsTitlesList : {{ itemsTitlesList }} -->
					<!-- - coll : {{ coll }} -->
					<!-- - tab : {{ tab }} -->

					<!-- AUTOCOMPLETE COMPONENT -->
					<v-card
						class="elevation-0"
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

							</v-autocomplete>
						</v-card-text>
					</v-card>

				</v-flex>

				<v-flex
					xs2  sm4  md4 offset-md2  lg3 offset-lg3
					text-xs-center
					>

					<BtnCreate
						:is_icon="false"
						:tab="tab"
						:color="'primary'"
						:btn_class="'primary'"
						:is_block="true"
						:outline="true"
						:large="true"
						:flat="true"
						>
					</BtnCreate>

				</v-flex>

			</v-layout>


			<!-- PREVIEW CARDS - IS IN TEAM -->
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
					v-if="!add_to_parent"
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
						<!-- - {{ parentDoc_id }} -  -->
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
					mb-4
					>

					<CardPreviewDense 
						:coll="coll"
						:tab="tab"
						:item="props.item"
						:inTeam="'yes'"
						:add_to_parent="add_to_parent"
						:parentDoc_id="parentDoc_id"
						:parentDoc_coll="parentDoc_coll"
						@update_parent_dataset="updateParentDatasetList"
						>
					</CardPreviewDense>

				</v-flex>


			</v-data-iterator>


			<!-- PREVIEW CARDS - NOT IN TEAM -->
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
					v-if="!add_to_parent"
					dense
					slot="header"
					class="mb-0 pb-0"
					color="transparent"
					flat
					>

					<v-toolbar-title
						class="body-2 grey--text"
						>
						{{ $t(`global.notTeam`, $store.state.locale) }}

					</v-toolbar-title>

				</v-toolbar>


				<!-- data iterator cards -->
				<v-flex
					slot="item"
					slot-scope="props"
					:class="'pa-3 ' + cardSizes"
					>

					<CardPreviewDense 
						:coll="coll"
						:tab="tab"
						:item="props.item"
						:inTeam="'yes'"
						:add_to_parent="add_to_parent"
						:parentDoc_id="parentDoc_id"
						@update_parent_dataset="updateParentDatasetList"
						>
					</CardPreviewDense>

					<!-- <template slot="pageText" slot-scope="props">
						Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
					</template> -->


				</v-flex>



			</v-data-iterator>


		</v-container>

	</v-card>

</template>


<script>

import BtnCreate from '~/components/UI/btnCreate.vue'

import CardPreviewDense from '~/components/UI/cardPreview_dense.vue'


export default {

	props : [ 

		"items_coll", 
		"tab", 
		"coll",

		"no_margin",

		// props to add item to parent
		"add_to_parent",
		"parentDoc_id",
		"parentDoc_coll",

	],
	
	components : {
		CardPreviewDense,
		BtnCreate,
	},
	
	created () {
		console.log("\n itemList_dataIterator / col : ", this.coll )
	},

	data () {
		
		return {
			
			// ITEMS 
			itemsIn 	: this.items_coll['docs_user_is_in_team'],
			itemsNot 	: this.items_coll['docs_user_not_in_team'],

			// MAIN CARD SIZE 
			with_margin 	: "grey lighten-3 elevation-0 mb-5 mx-5 px-3",
			with_no_margin 	: "grey lighten-3 elevation-0 mt-1 mx-0 px-3",

			with_padding 	: "pb-2 mb-1",
			with_no_padding : "pb-2 mb-0",

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

			classMainCard () {
				return (this.no_margin) ? this.with_no_margin : this.with_margin ;
			},

			classPaddingBottomSearch () {
				return (this.no_margin) ? this.with_no_padding : this.with_padding ;
			},


	},

	methods : {

		itemsList (in_out) {
			
			console.log("-- itemsInList ..." ) ; 
			// console.log("-- itemsInList / in_out : ", in_out) ; 

			var searchStr 	= this.searchString ;

			var items_list = (in_out === "inTeam") ? this.itemsIn : this.itemsNot ;

			if (this.searchString != null ){
				
				// console.log("-- itemsInList / searchStr : ", searchStr) ; 
				// console.log("-- itemsInList / itemsList : ", itemsList) ; 
				// for (var d in itemsList){
				// 	console.log("itemsList[d] : ", itemsList[d] )
				// }

				items_list = items_list.filter( function(item) { 

					// console.log("-- itemsInList / item : ", item) ; 
					return ( item.infos.title.includes(searchStr) )
				
				})

			};

			// console.log("-- itemsInList / items_list : ", items_list) ; 
			return items_list
		},


		updateParentDatasetList (input) {
			console.log("updateParentDatasetList / input : ", input )
			this.$emit('update_parent_dataset', input )
		}

	},

}

</script>