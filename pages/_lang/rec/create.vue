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
			:icon="$store.state.mainIcons.datamodels.icon"
			:to_link="'/rec'"
			>
		</SectionTitle>

	</v-jumbotron>


`
	<CreateItem
		:itemType="itemType"
		:itemAbr="itemAbr"
		:itemSteps="itemSteps"
		>
	</CreateItem>



  </div>

</template>



<script>
import SectionTitle from '~/components/UI/sectionTitle.vue'
import CreateItem from '~/components/Forms/createItem.vue'

export default {
	components : {
		SectionTitle,
		CreateItem
	},

	// TO DO : middleware to check if logged and authenticated
	middleware : [ ],

	data () {
		return {
			// for form component
			itemType 	: "recipes",
			itemAbr 	: "rec",
			itemSteps 	: [  
				"title", 
				"description",	
			],

		}
	},

	methods: {
	},

}

</script>
