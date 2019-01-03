<template>

	<div>


		
		<SectionTitle
			v-if="$store.state.auth.isLogged"
			:title="$t(`${tab}.name`, $store.state.locale)"
			:intro="$t(`${tab}.edit`, $store.state.locale)"
			:icon="$store.state.mainIcons[tab]['icon']"
			:to_link="'/'+coll"
			:color="''"
			:tab="tab"
			>
		</SectionTitle>

		<SectionTitle
			v-else
			:title="$t(`${tab}.name`, $store.state.locale)"
			:intro="$t(`${tab}.introAnon`, $store.state.locale)"
			:icon="$store.state.mainIcons[tab].icon"
			:to_link="'/'+coll"
			:color="''"
			:tab="tab"
			>
		</SectionTitle>

		

		<v-layout mx-5 px-4 pb-5 pt-0>
			<v-flex sm12 md10 offset-md1 lg10 offset-lg1>
				<v-card flat color="grey lighten-2">

						<!-- :flex_vars="'xs12'" -->
					<ViewEditDMF
						:is_create="false"
						:is_preview="false"
						:coll="coll"
						:parentFieldslist="parentFieldsList"
						:item_doc="$store.state[coll].current"
						:is_switch="true"
						>
					</ViewEditDMF>

				</v-card>
			</v-flex>
		</v-layout>


	</div>

</template>



<script>

import SectionTitle from '~/components/UI/sectionTitle.vue'
import ViewEditDMF from '~/components/UI/viewEditDMF.vue' 

// import CardDMF from '~/components/UI/cardDMF.vue' 

export default {
	components : {

		SectionTitle,
		ViewEditDMF, 

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
			
			coll 	: "dmf",
			tab 	: 'datamodel_fields',

			parentFieldsList : [

				{ 
					parentFieldName : "infos",
					subFields 	: [
						"title", 
						"description",
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
						"f_type", 
						"f_object",
						"f_comments", 
						"f_is_required", 
					] 
				},

			],
		}
	},

	methods: {
	},

}

</script>
