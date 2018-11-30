<template>


	
	<SectionTitle
		:title="$store.state.dsi.current.infos.title"
		:intro="$store.state.dsi.current.infos.description"
		:icon="$store.state.mainIcons.datasets.icon"
	>
	</SectionTitle>




	
</template>



<script>
import SectionTitle from '~/components/UI/sectionTitle.vue'

export default {
	components : {
		SectionTitle,
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
		}
	},

	methods: {
	},

}

</script>
