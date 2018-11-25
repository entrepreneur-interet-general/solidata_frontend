<template>

	<div>

		<v-jumbotron 
			class="pa-0" 
			color="primary" 
			dark 
			:height="$store.state.mainSectionsHeight"
			>
		
			<SectionTitle
				v-if="$store.state.auth.isLogged"
				:title="$t(`${tab}.name`, $store.state.locale)"
				:intro="$t(`${tab}.edit`, $store.state.locale)"
				:icon="$store.state.mainIcons[tab]['icon']"
				:to_link="'/dashboard'"
				>
			</SectionTitle>

			<SectionTitle
				v-else
				:title="$t(`${tab}.name`, $store.state.locale)"
				:intro="$t(`${tab}.introAnon`, $store.state.locale)"
				:icon="$store.state.mainIcons[tab].icon"
				>
			</SectionTitle>

		</v-jumbotron>

		


		<ViewEditDMF
			:flex_vars="'xs8 offset-xs2'"
			:is_create="false"
			:is_preview="false"
			:parentFieldslist="parentFieldsList"
			:item_doc="$store.state.dmf.current"
			>
		</ViewEditDMF>


		{{ meta_collection }}

		<!-- <div
			class="primary white--text pa-0" 
			:height="$store.state.mainSectionsHeight"
			>
			
			<SectionTitle
				:title="$t('datamodel_fields.singular', $store.state.locale )"
				:intro="''"
				:icon="$store.state.mainIcons.datamodel_fields.icon"
				:to_link="'/dmf'"
				>
			</SectionTitle>
		
		</div> -->
	


	</div>

</template>



<script>

import SectionTitle from '~/components/UI/sectionTitle.vue'
import ViewEditDMF from '~/components/UI/viewEditDMF.vue' 

export default {
	components : {

		SectionTitle,
		ViewEditDMF, 

	},

	// add var-arg to middleware with meta
	// cf : https://github.com/nuxt/nuxt.js/issues/1687#issuecomment-331870619
	middleware : ["getItem"],
	meta : {
		collection 	: 'dmf',
		level 		: 'get_one',
	},

	data () {
		return {

			tab : 'datamodel_fields',

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
						"f_type", 
						"f_comments", 
						"f_is_required", 
					] 
				},

			],
		}
	},


}

</script>
