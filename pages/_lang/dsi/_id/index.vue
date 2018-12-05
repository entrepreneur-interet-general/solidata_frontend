<template>

	<div>

		<SectionTitle
			:title="$store.state.dsi.current.infos.title"
			:intro="$store.state.dsi.current.infos.description"
			:icon="$store.state.mainIcons.datasets.icon"
			:tab="tab"
			>
		</SectionTitle>


		<ViewEditBasicDoc
			:flex_vars="'xs8 offset-xs2'"
			:is_create="false"
			:is_preview="false"
			:coll="coll"
			:parentFieldslist="parentFieldsList"
			:item_doc="$store.state[coll].current"
			:is_switch="true"
			>
		</ViewEditBasicDoc>

	</div>

</template>



<script>
import SectionTitle from '~/components/UI/sectionTitle.vue'
import ViewEditBasicDoc from '~/components/UI/viewEditDMF.vue' 

export default {
	components : {

		SectionTitle,
		ViewEditBasicDoc, 

	},

	// add var-arg to middleware with meta
	// cf : https://github.com/nuxt/nuxt.js/issues/1687#issuecomment-331870619
	middleware : ["getItem"],
	meta : {
		collection 	: 'dsi',
		level 		: 'get_one',
	},

	data () {
		return {
			coll 	: "dsi",
			tab 	: 'datasets',

			parentFieldsList : [

				{ 
					parentFieldName : "infos",
					subFields 	: [
						"title", 
						"description",
						"licence"
					] 
				},

				{ 
					parentFieldName : "public_auth",
					subFields 	: [
						"open_level_show",
						"open_level_edit", 
					] 
				},

				{ 
					parentFieldName : "specs",
					subFields 	: [
						"src_type",
						"src_link",
						"src_parser",
					] 
				},
			]

		}
	},

	methods: {
	},

}

</script>
