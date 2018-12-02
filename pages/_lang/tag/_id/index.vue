<template>

	<div>

		
		<SectionTitle
			v-if="$store.state.auth.isLogged"
			:title="$t(`${tab}.name`, $store.state.locale)"
			:intro="$t(`${tab}.edit`, $store.state.locale)"
			:icon="$store.state.mainIcons[tab]['icon']"
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

// import CardDMF from '~/components/UI/cardDMF.vue' 

export default {
	components : {

		SectionTitle,
		ViewEditBasicDoc, 

	},

	// add var-arg to middleware with meta
	// cf : https://github.com/nuxt/nuxt.js/issues/1687#issuecomment-331870619
	middleware : ["getItem"],
	meta : {
		collection 	: 'tag',
		level 		: 'get_one',
	},

	data () {
		return {
			
			coll 	: "tag",
			tab 	: 'tags',

			parentFieldsList : [

				{ 
					parentFieldName : "infos",
					subFields 	: [
						"title", 
						"description"
					] 
				},

				{ 
					parentFieldName : "public_auth",
					subFields 	: [
						"open_level_edit", 
					] 
				},

				{ 
					parentFieldName : "data_raw",
					subFields 	: [
						"f_code", 
						// "f_type", 
						"f_object",
						"f_comments", 
						// "f_is_required", 
					] 
				},

			],
		}
	},


}

</script>
