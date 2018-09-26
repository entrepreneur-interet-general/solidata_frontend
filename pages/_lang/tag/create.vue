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
			:icon="$store.state.mainIcons.tags.icon"
			:to_link="'/tag'"
			>
		</SectionTitle>

	</v-jumbotron>


`
	<CreateItem
		:e6="e6"
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
			e6: 1,
			itemType 	: "tags",
			itemAbr 	: "tag",
			itemSteps 	: [  
				"title", 
				"description", 
				"f_code",
				"f_object",
				"f_comments",
				"open_level_edit" 
			],

		}
	},

	methods: {
	},

}

</script>
