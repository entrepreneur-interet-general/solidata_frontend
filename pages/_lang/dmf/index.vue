<template>

	<v-jumbotron 
		class="pa-0" 
		color="primary" 
		dark 
		:height="$store.state.mainSectionsHeight"
		>
			
		<SectionTitle
			:title="$t('datamodels.name', $store.state.locale)"
			:intro="$t('datamodels.intro', $store.state.locale)"
			:icon="$store.state.mainIcons.datamodel_fields.icon"
		>
		</SectionTitle>

	</v-jumbotron>
	
</template>



<script>
import SectionTitle from '~/components/UI/sectionTitle.vue'

export default {
	components : {
		SectionTitle
	},
	// middleware : [""],

	data () {
		return {
		}
	},

	methods: {
	},

}

</script>
