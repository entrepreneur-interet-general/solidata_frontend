<template>

	<div>

		
		<SectionTitle
			v-if="$store.state.auth.isLogged"
			:title="$t(`${tab}.name`, $store.state.locale)"
			:intro="$t(`${tab}.edit`, $store.state.locale)"
			:icon="$store.state.mainIcons[tab]['icon']"
			:to_link="'/dashboard'"
			:tab="tab"
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


		

		<v-layout mx-5 px-4 pb-5 pt-0>
			<v-flex sm12 md10 offset-md1 lg8 offset-lg2>
				<v-card flat color="grey lighten-2">

						<!-- :flex_vars="'xs12'" -->
					<ViewEditTag
						:is_create="false"
						:is_preview="true"
						:coll="coll"
						:parentFieldslist="parentFieldsList"
						:item_doc="$store.state[coll].current"
						:is_switch="true"
						>
					</ViewEditTag>
	
				</v-card>
			</v-flex>
		</v-layout>

	</div>

</template>



<script>

import SectionTitle from '~/components/UI/sectionTitle.vue'
import ViewEditTag from '~/components/UI/viewEditTAG.vue' 

// import CardDMF from '~/components/UI/cardDMF.vue' 

export default {
	components : {

		SectionTitle,
		ViewEditTag, 

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
