<template>

	<div>


		
		<SectionTitle
			v-if="$store.state.auth.isLogged"
			:title="$t(`${tab}.name`, $store.state.locale)"
			:intro="$t(`${tab}.intro`, $store.state.locale)"
			:icon="$store.state.mainIcons[tab]['icon']"
			:to_link="'/dashboard'"
			:tab="tab"
			:show_create="true"
			>
		</SectionTitle>

		<SectionTitle
			v-else
			:title="$t(`${tab}.name`, $store.state.locale)"
			:intro="$t(`${tab}.introAnon`, $store.state.locale)"
			:icon="$store.state.mainIcons[tab].icon"
			:tab="tab"
			>
		</SectionTitle>



		<!-- ITEMS LIST -->
		<!-- <ItemsList
			:tab="tab"
			:items="items.docs"
			:defaultFlex="defaultFlex"
			:defaultHeight="defaultHeightAdd"
			>
		</ItemsList> -->

		<!-- ITEMS LIST -->
		<ItemsListDI
			:tab="tab"
			:items_coll="items.docs"
			:defaultFlex="defaultFlex"
			:defaultHeight="defaultHeightAdd"
			:coll="coll"
			>
		</ItemsListDI>


	</div>

</template>



<script>

	import SectionTitle from '~/components/UI/sectionTitle.vue'

	import ItemsListDI from '~/components/UI/itemsList_dataIterator.vue'
	// import ItemsList from '~/components/UI/itemsList.vue'
	// import CardPreview from '~/components/UI/cardPreview.vue'
	// import CardCreate from '~/components/UI/cardCreate.vue'

	export default {

		components : {
			ItemsListDI,
			// ItemsList,
			SectionTitle,
			// CardPreview,
			// CardCreate
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
				coll				: "dmf",
				defaultHeightAdd	: "240px",
				defaultHeight		: "150px",
				defaultFlex			: 3,
			}
		},

		methods: {
		},

	}

</script>
