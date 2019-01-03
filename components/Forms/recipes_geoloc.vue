<template>

	<div 
		>

		<!-- TITLE GEOLOC -->
		<v-card-title
			class="pa-5"
			>

			<v-icon 
				class="mr-2"
				color="primary"
				>
				{{ $store.state.mainIcons.projects.icon }}
			</v-icon>

			<v-icon 
				class="mr-2"
				color="accent"
				>
				{{ $store.state.mainIcons.map_doc.icon }}
			</v-icon>

			<v-icon 
				class="mr-4"
				large
				color="primary"
				>
				{{ $store.state.mainIcons.geoloc.icon }}
			</v-icon>

			<span 
				class="title "
				>

				{{ $t(`projects.geoloc`, $store.state.locale ) }} 
			</span>

		</v-card-title>


		<v-card-text
			class="px-5 pb-2"
			>


			<v-alert 
				v-if="alert" 
				:type="alert.type" 
				value="true"
				ma-2
				>
				{{ alert.msg }}
			</v-alert>


			{{ $t(`projects.geo_select_dmf`, $store.state.locale) }}

		</v-card-text>


		<v-card-text
			class="px-5 pb-2"
			>

			- selected_dmfs : <code>{{ selected_dmfs }}</code><br>

			<!-- PRJ's DMT  -->
			<v-flex 
				v-if="parent_DMT_oids && parent_DMT_oids.length != 0 && item_doc != undefined"
				xs12
				>
				
				<ViewEditDMT

					:item_doc="undefined"
					:item_doc_id="parent_DMT_oids"
					
					:coll="'dmt'"

					:is_create="false"
					:is_preview="true"
					:is_loading="isLoading"

					:is_switch="true"
					:no_toolbar="true"

					:is_geoloc="true"

					:is_map="false"
					:parent_map="item_doc.mapping.dmf_to_open_level"
					:canEdit_ol="canEdit_ol"

					:add_to_parent="false"
					:parentDoc_id="itemId"
					:parentDoc_coll="parentDoc_coll"

					:parent_scroll="0"

					@updateGeoloc="updateGeoloc"
					>
					<!-- @update_loading="updateLoading" -->
				</ViewEditDMT> 

			</v-flex>



		</v-card-text>



		<!-- <v-divider class="my-5"></v-divider> -->

		<!-- DEBUG -->
		<!-- <span v-if="$store.state.is_debug"> -->

			<!-- - parentDoc_id : <code>{{ parentDoc_id }}</code><br>
			- parentDoc_coll : <code>{{ parentDoc_coll }}</code><br>
			- parent_REC_oids : <code>{{ parent_REC_oids }}</code><br>
			- parent_DMT_oids : <code>{{ parent_DMT_oids }}</code><br>
			- item_doc : <code>{{ item_doc }}</code><br> -->

		<!-- </span> -->


	</div>

</template>


<script>

import ViewEditDMT from '~/components/UI/viewEditDMT.vue' 

export default {

	props 		: [

		"item_doc",
		"parentDoc_id",
		"parentDoc_coll",

		"itemId",

		"isPreview",
		"isLoading",
		"canEdit_ol",

		"parent_REC_oids",
		"parent_DMT_oids",

	],

	components 	: {

		ViewEditDMT,
	
	},


	created () {

		console.log("\n- RecipesGeoloc / created ---> item_doc : ", this.item_doc ) ;
		console.log("\n- RecipesGeoloc / created ---> parent_DMT_oids : ", this.parent_DMT_oids ) ;

	},

	data () {
		return {

			alert 			: '',
			loading 		: false,

			tab				: 'recipes',
			coll			: 'rec',

			selected_dmfs 	: [],

		}
	},

	computed : {

	},

	watch : {

		item_doc : {
			immediate : true,
			handler ( newVal, oldVal) {
				console.log( "\nRecipesGeoloc / watch ~ item_doc / newVal : \n", newVal )
			}
		},

		parent_DMT_oids : {
			immediate : true,
			handler ( newVal, oldVal) {
				console.log( "\nRecipesGeoloc / watch ~ parent_DMT_oids / newVal : \n", newVal )
			}
		},

	},

	methods: {
		
		updateGeoloc(input) {
			this.selected_dmfs = input
		},

	}
}

</script>

