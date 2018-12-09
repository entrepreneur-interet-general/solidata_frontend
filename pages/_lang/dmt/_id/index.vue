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


		
		<ViewEditDMT
			:flex_vars="'xs8 offset-xs2'"
			:is_create="false"
			:is_preview="true"
			:coll="coll"
			:parentFieldslist="parentFieldsList"
			:item_doc="$store.state[coll].current"
			:is_switch="true"
			>
		</ViewEditDMT> 
		


	</div>
	
</template>



<script>
import SectionTitle from '~/components/UI/sectionTitle.vue'

import ViewEditDMT from '~/components/UI/viewEditDMT.vue' 

export default {
	components : {

		SectionTitle,
		ViewEditDMT,

	},

	// add var-arg to middleware with meta
	// cf : https://github.com/nuxt/nuxt.js/issues/1687#issuecomment-331870619
	middleware : ["getItem"],
	meta : {
		collection 	: 'dmt',
		level 		: 'get_one',
	},

	data () {
		return {

			coll 	: "dmt",
			tab 	: 'datamodels',

		}
	},

	methods: {
	},

}

</script>
