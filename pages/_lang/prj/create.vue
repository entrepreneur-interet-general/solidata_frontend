<template>

  <div>

	<v-jumbotron 
		class="pa-0" 
		color="primary" 
		dark 
		:height="$store.state.mainSectionsHeight"
		>
	
		<SectionTitle
			:title="$t(itemType+'.name', $store.state.locale)"
			:intro="$t(itemType+'.create', $store.state.locale)"
			:icon="$store.state.mainIcons.projects.icon"
			>
		</SectionTitle>

	</v-jumbotron>




	<CreateItemForm
		:e6="e6"
		:itemType="itemType"
		:itemAbr="itemAbr"
		:itemSteps="itemSteps"
		>
	</CreateItemForm>



  </div>

</template>



<script>
import SectionTitle from '~/components/UI/sectionTitle.vue'
import CreateItemForm from '~/components/Forms/createItem.vue'

export default {
	components : {
		SectionTitle,
		CreateItemForm
	},

	// TO DO : middleware to check if logged and authenticated
	middleware : [ ],

	data () {
		return {
			// for form component
			e6: 1,
			itemType 	: "projects",
			itemAbr 	: "prj",
			itemSteps 	: [  "title", "description", "licence" ],

		}
	},

	methods: {
	},

}

</script>
