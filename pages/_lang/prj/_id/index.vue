<template>

	<div>

		<SectionTitle
			v-if="$store.state.auth.isLogged"
			:title="$t(`${tab}.name`, $store.state.locale)"
			:intro="$t(`${tab}.edit`, $store.state.locale)"
			:icon="$store.state.mainIcons[tab]['icon']"
			:to_link="'/dashboard'"
			:color="''"
			:tab="tab"
			>
		</SectionTitle>

		<SectionTitle
			v-else
			:title="$t(`${tab}.name`, $store.state.locale)"
			:intro="$t(`${tab}.introAnon`, $store.state.locale)"
			:icon="$store.state.mainIcons[tab].icon"
			:color="''"
			:tab="tab"
			>
		</SectionTitle>


		<v-layout mx-5 px-4 pb-5 pt-0>
			<v-flex xs12>
				<v-card flat color="grey lighten-3">

					<ViewEditPRJ
						:flex_vars="'xs12'"
						:is_create="false"
						:is_preview="false"
						:coll="coll"
						:parentFieldslist="parentFieldsList"
						:item_doc="$store.state[coll].current"
						:is_switch="true"
						>
					</ViewEditPRJ> 

				</v-card>
			</v-flex>
		</v-layout>

	</div>

	
</template>



<script>
import SectionTitle from '~/components/UI/sectionTitle.vue'
import ViewEditPRJ from '~/components/UI/viewEditPRJ.vue' 

export default {
	components : {
		SectionTitle,
		ViewEditPRJ
	},

	// add var-arg to middleware with meta
	// cf : https://github.com/nuxt/nuxt.js/issues/1687#issuecomment-331870619
	middleware : ["getItem"],
	meta : {
		collection 	: 'prj',
		level 		: 'get_one',
	},

	data () {
		return {
			coll 	: "prj",
			tab 	: 'projects',

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

			],
		}
	},

	methods: {
	},

}

</script>
