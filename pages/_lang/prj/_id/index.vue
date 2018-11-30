<template>


	
	<SectionTitle
		:title="$store.state.prj.current.infos.title"
		:intro="$store.state.prj.current.infos.description"
		:icon="$store.state.mainIcons.projects.icon"
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
		collection 	: 'prj',
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
