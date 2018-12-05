<template>

	<div>

		
		<SectionTitle
			:title="$t(tab+'.name', $store.state.locale)"
			:intro="$t(tab+'.create', $store.state.locale)"
			:icon="$store.state.mainIcons[tab]['icon']"
			:to_link="'/'+coll"
			:tab="tab"
			>
		</SectionTitle>



		<!-- CREATE EDIT TAG -->
		<v-container class="pt-3">
			<v-layout align-center justify-center row fill-height>
				<v-flex xs12>

					<ViewEditDoc
						:flex_vars="$store.state.createSize"
						:is_create="true"
						:is_preview="true"
						:coll="coll"
						:parentFieldslist="parentFieldsList"
						:item_doc="$store.state[coll].current_new"
						:is_switch="true"
						>
					</ViewEditDoc>
				
				</v-flex>
			</v-layout>
		</v-container>

		<!-- <CreateItem
			:e6="e6"
			:itemType="itemType"
			:itemAbr="itemAbr"
			:itemSteps="itemSteps"
			>
		</CreateItem> -->


	</div>

</template>



<script>
import SectionTitle from '~/components/UI/sectionTitle.vue'
import ViewEditDoc from '~/components/UI/viewEditDMF.vue' 

import CreateItem from '~/components/Forms/createItem.vue'

export default {
	components : {
		SectionTitle,
		CreateItem,
		ViewEditDoc
	},

	// TO DO : middleware to check if logged and authenticated
	middleware : [ ],

	data () {
		return {


			// for ViewEditDoc component

			coll 	: "tag",
			tab 	: 'tags',

			parentFieldsList : [

				{ 
					parentFieldName : "infos",
					subFields 	: [
						"title", 
						"description"
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
						// "f_type", 
						"f_object", 
						"f_comments", 
						// "f_is_required", 
					] 
				},
			],

			/*
			emptyNewItem : {
				"infos"			: { 
					"title"			: "your new tag", 
					"description"	: null 
				},
				"public_auth"	: { 
					"open_level_edit": "collective", 
					// "open_level_show": "open_data" 
				}, 
				// "specs": { 
				// 	"doc_type": "dmf" 
				// }, 
				// "log": { 
				// 	"created_at": "2018-11-20T14:20:47.661000+00:00", 
				// 	"created_by": "5b55fee90a828659a93e9fc6" 
				// }, 
				// "translations": [
				// ], 
				"data_raw": { 
					"f_code": "", 
					"f_object": "", 
					// "f_type": "tag", 
					"f_comments": null, 
					"f_is_required": false 
				}, 
				// "modif_log": [
				// ], 
				// "datasets": { 
				// 	"tag_list": [] 
				// }, 
				// "_id": "5bf4183f0a8286180b53183c", 
				// "team": [ 
				// 	{ 
				// 		"oid_usr": "5b55fee90a828659a93e9fc6", 
				// 		"edit_auth": "owner", 
				// 		"added_at": "2018-11-20T14:20:47.661000+00:00", 
				// 		"added_by": "5b55fee90a828659a93e9fc6" 
				// 	} 
				// ], 
				// "uses": { 
				// 	"by_usr": [ 
				// 		{ 
				// 			"used_by": "5b55fee90a828659a93e9fc6", 
				// 			"used_at": [ "2018-11-20T14:20:47.661000+00:00" ] 
				// 		} 
				// 	], 
				// 	"by_dmt": [

				// 	] 
				// }
			},
			*/

			// for form component
			// e6: 1,
			// itemType 	: "tags",
			// itemAbr 	: "tag",
			// itemSteps 	: [  
			// 	"title", 
			// 	"description", 
			// 	"f_code",
			// 	"f_object",
			// 	"f_comments",
			// 	"open_level_edit" 
			// ],

		}
	},

	methods: {
	},

}

</script>
