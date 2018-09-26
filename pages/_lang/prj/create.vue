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
			:to_link="'/prj'"
			>
		</SectionTitle>

	</v-jumbotron>




	<CreateItemForm
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
			itemType 	: "projects",
			itemAbr 	: "prj",
			itemSteps 	: [  "title", "description", "licence", "open_level_edit", "open_level_show" ],

		}
	},

	methods: {
	},

}

</script>
