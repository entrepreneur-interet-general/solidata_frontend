<template>

	<v-layout row justify-center>

		<v-flex
			class="xs12 sm10 md8 justify-center"
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

			<!-- HELP TEXT -->
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


			<!-- CHOICES FOR GEOLOCALIZATION -->
			<v-card-text
				v-if="parent_DMT_oids && parent_DMT_oids.length != 0 && item_doc != undefined"
				class="px-5 pb-2"
				>

				<!-- PRJ's DMT  -->

				<!-- SELECT COLUMNS TO GEOLOCALIZE -->
				<v-flex
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


				<!-- ADDRESS COMPLEMENT -->
				<v-flex
					xs12 sm8 md6
					>

					<v-text-field
						class="mt-4"
						v-model="add_complement"
						:label="$t(`projects.add_compl`, $store.state.locale)"
						prepend-icon="place"
					></v-text-field>

				</v-flex>

				<!-- HIDDEN EXTRA SETTINGS -->
				<!-- timeout -->
				<!-- delay -->
				<!--  -->

			</v-card-text>


			<!-- SUBMIT GEOLOCALIZATION BTN -->
			<v-card-actions
				class="justify-center my-3"
				>

				<v-btn
					flat
					round
					dark
					class="accent"
					@click="geolocalize()"
					>
					<v-icon 
						>
						{{ $store.state.mainIcons.geoloc.icon }}
					</v-icon>

					geolocalize

				</v-btn>

			</v-card-actions>




			<!-- <v-divider class="my-5"></v-divider> -->

			<!-- DEBUG -->
			<!-- <span v-if="$store.state.is_debug"> -->

				<v-divider></v-divider>

				<!-- - parentDoc_id : <code>{{ parentDoc_id }}</code><br> -->
				<!-- - parentDoc_coll : <code>{{ parentDoc_coll }}</code><br> -->
				<!-- - selected_dmfs : <code>{{ selected_dmfs }}</code><br> -->
				<!-- - add_complement : <code>{{ add_complement }}</code><br> -->

				- pseudoForm : <code> {{ pseudoForm() }} </code><br>
				<v-divider></v-divider>

				- parent_REC_oids : <code>{{ parent_REC_oids }}</code><br>
				<v-divider></v-divider>

				- parent_DMT_oids : <code>{{ parent_DMT_oids }}</code><br>
				<v-divider></v-divider>

				- item_doc.mapping.dmf_to_rec : <code>{{ item_doc.mapping.dmf_to_rec }}</code><br>

			<!-- </span> -->


		</v-flex>

	</v-layout>

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
			add_complement	: '',


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

		parent_REC_oids : {
			immediate : true,
			handler ( newVal, oldVal) {
				console.log( "\nRecipesGeoloc / watch ~ parent_REC_oids / newVal : \n", newVal )
			}
		},

	},

	methods: {
		
		updateGeoloc(input) {
			this.selected_dmfs = input
		},

		pseudoForm() {

			var input = {

				doc_id	: this.parentDoc_id, 
				coll 	: this.parentDoc_coll, 
				
				form 	: [
					{
						is_mapping		: true,
						field_to_update	: "mapping.dmf_to_rec",
						dmf_list		: this.selected_dmfs,
						add_complement	: this.add_complement,
					}
				]

			}
			return input

		},

		update_mapping () {
			
			console.log("\n...RecipesGeoloc - update_mapping...")
			// var input = {

			// 	doc_id	: this.parentDoc_id, 
			// 	coll 	: this.parentDoc_coll, 
				
			// 	form 	: [
			// 		{
			// 			is_mapping		: true,
			// 			field_to_update	: "mapping.dmf_to_rec",
			// 			dmf_list		: this.selected_dmfs,
			// 			add_complement	: this.add_complement,
			// 		}
			// 	]

			// }
			var input = this.pseudoForm() ; 
			console.log("RecipesGeoloc - update_mapping / input : ", input )

			this.$store.dispatch('updateMapping', input )

			.then(result => {
				this.alert 		= { type: 'success', message: result.msg }
				this.loading 	= false				
			})
			
			.catch(error => {
				console.log("submit / error... : ", error ) ; 
				this.$store.commit('set_error', error )

				this.loading = false
				this.alert = {type: 'error', message: "login error" }
				if (error.response && error.response.data) {
					this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
				}
			})

		},

		geolocalize() {

			console.log("\n...RecipesGeoloc - geolocalize...")
			var input = this.pseudoForm() ; 
		
			console.log("\n...RecipesGeoloc - geolocalize / input : \n", input)

		}
	}
}

</script>

