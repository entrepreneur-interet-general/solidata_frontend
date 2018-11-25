<template>

	<div>


		<ItemViewEdit
			:flex_vars="'xs8 offset-xs2'"
			:is_create="false"
			:parentFieldslist="parentFieldsList"
			:item_doc="$store.state.dmf.current"
			>
		</ItemViewEdit>


		<!-- <div
			class="primary white--text pa-0" 
			:height="$store.state.mainSectionsHeight"
			>
			
			<SectionTitle
				:title="$t('datamodel_fields.singular', $store.state.locale )"
				:intro="''"
				:icon="$store.state.mainIcons.datamodel_fields.icon"
				:to_link="'/dmf'"
				>
			</SectionTitle>
		
		</div> -->
	
		<!-- <CardDmf
			:dmf_data="$store.state.dmf.current"
			>
		</CardDmf> -->



	</div>

</template>



<script>

import SectionTitle from '~/components/UI/sectionTitle.vue'

import ItemViewEdit from '~/components/UI/itemViewEdit.vue' 
import CardDmf from '~/components/UI/cardDmf.vue'
// import CardInfos from '~/components/UI/parentFields/cardInfos.vue'

export default {
	components : {

		SectionTitle,

		ItemViewEdit, 
		CardDmf,
		// CardInfos,
	},

	// add var-arg to middleware with meta
	// cf : https://github.com/nuxt/nuxt.js/issues/1687#issuecomment-331870619
	middleware : ["getItem"],
	meta : {
		collection 	: 'dmf',
		level 		: 'get_one',
	},

	data () {
		return {
			parentFieldsList : [

				{ 
					parentFieldName : "infos",
					subFields 	: [
						"title", 
						"description"
					] 
				},

				{ 
					parentFieldName : "data_raw",
					subFields 	: [
						"f_code", 
						"f_object"
					] 
				},

			],
		}
	},

	methods: {
	},

}

</script>
