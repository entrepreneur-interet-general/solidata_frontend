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



			<!-- CHOICES FOR GEOLOCALIZATION -->
			<v-card-text
				v-if="parent_DMT_oids && parent_DMT_oids.length != 0 && item_doc != undefined"
				class="px-5 pb-2"
				>

				<!-- SELECT COLUMNS TO GEOLOCALIZE -->
				<v-flex
					class="xs12"
					>

					<!-- HELP TEXT -->
					<span>

						<v-icon 
							color="grey"
							small
							>
							{{ $store.state.mainIcons.infos.icon }}
						</v-icon>

						{{ $t(`projects.geo_select_dmf`, $store.state.locale) }}

					</span>

					<!-- PRJ's DMT  -->
					<v-flex class="pt-3">
				
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
							:parentDoc_id="parentDoc_id"
							:parentDoc_coll="parentDoc_coll"

							:parent_scroll="0"

							@updateGeoloc="updateGeoloc"
							>
							<!-- @update_loading="updateLoading" -->
						</ViewEditDMT> 

					</v-flex>


				</v-flex>


				<!-- COMBOBOX - COLUMNS TO CREATE -->
				<v-flex
					class="mt-5 xs12"
					>

					<!-- HELP TEXT -->
					<span>
						<v-icon 
							color="grey"
							small
							>
							{{ $store.state.mainIcons.infos.icon }}
						</v-icon>
						{{ $t(`projects.new_dmfs`, $store.state.locale) }}
					</span>

					<!-- NEW COLUMNS -->
					<v-layout row justify-center> 
						<v-flex class="pt-3 xs12 sm10 md8">

							<NewColumns

								:parentDoc_id="parentDoc_id"
								:parentDoc_coll="parentDoc_coll"
								:parent_DMT_oids="parent_DMT_oids"

								:new_col_preselected="default_geoloc_dmf_preselect"
								:new_col_choices="default_geoloc_dmf"

								@updateNewColumns="update_new_columns"
								>
							</NewColumns>

							<span class="caption">
								{{ $t(`global.mandatory`, $store.state.locale) }}
							</span>

						</v-flex>
					</v-layout>

				</v-flex>


				<!-- ADDRESS COMPLEMENT -->
				<v-flex
					class="mt-5 xs12"
					>

					<!-- HELP TEXT -->
					<span>
						<v-icon 
							color="grey"
							small
							>
							{{ $store.state.mainIcons.infos.icon }}
						</v-icon>
						{{ $t(`projects.add_compl`, $store.state.locale) }}
					</span>

					<!-- INPUT ADDRESS COMPLEMENT -->
					<v-layout row justify-center> 
						<v-flex class="pt-3 xs12 sm10 md8">
							<v-text-field
								v-model="add_complement"
								:label="$t(`projects.add_compl`, $store.state.locale)"
								prepend-icon="place"
								>
							</v-text-field>
						</v-flex>
					</v-layout> 

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
						left
						>
						{{ $store.state.mainIcons.geoloc.icon }}
					</v-icon>

					{{ $t(`projects.geoloc`, $store.state.locale)  }}

				</v-btn>

			</v-card-actions>




			<!-- <v-divider class="my-5"></v-divider> -->

			<!-- DEBUG -->
			<v-flex 
				class="mt-5"
				> 
				<!-- v-if="$store.state.is_debug" -->

				<v-divider class="my-2"></v-divider>
				<span>
					from within 'components/Forms/recipes_geoloc.vue' component
				</span>
				<v-divider class="my-2"></v-divider>

				<!-- - parentDoc_id : <code>{{ parentDoc_id }}</code><br> -->
				<!-- - parentDoc_coll : <code>{{ parentDoc_coll }}</code><br> -->
				<!-- - selected_dmfs : <code>{{ selected_dmfs }}</code><br> -->
				<!-- - add_complement : <code>{{ add_complement }}</code><br> -->

				<!-- - new_dmfs : <code> {{ new_dmfs }} </code><br>
				<v-divider></v-divider> -->
				
				<!-- - default_geoloc_dmf : <code> {{ default_geoloc_dmf }} </code><br>
				<v-divider></v-divider> -->

				<!-- - default_geoloc_dmf_preselect: <code> {{ default_geoloc_dmf_preselect }} </code><br>
				<v-divider></v-divider> -->

				- pseudoForm : <code> {{ pseudoForm() }} </code><br>
				<v-divider></v-divider>

				- parent_REC_oids : <code>{{ parent_REC_oids }}</code><br>
				<v-divider></v-divider>

				- parent_DMT_oids : <code>{{ parent_DMT_oids }}</code><br>
				<v-divider></v-divider>

				- item_doc.mapping.dmf_to_rec : <code>{{ item_doc.mapping.dmf_to_rec }}</code><br>

			</v-flex>


		</v-flex>

	</v-layout>

</template>


<script>

import ViewEditDMT from '~/components/UI/viewEditDMT.vue' 

import NewColumns from '~/components/Forms/combobox_new_columns.vue' 


export default {

	props 		: [

		"item_doc",
		"parentDoc_id",
		"parentDoc_coll",

		"isPreview",
		"isLoading",
		"canEdit_ol",

		"parent_REC_oids",
		"parent_DMT_oids",

	],

	components 	: {

		ViewEditDMT,
		NewColumns,
	
	},

	// middleware : ["getListItems"],
	// meta : {
	// 	collection 	: [
	// 		'dmf'
	// 	],
	// 	level : 'get_list',
	// },

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


			// PSEUDO FORM
			selected_dmfs 	: [],
			new_dmfs		: [],
			add_complement	: '',
			

			// CHOICES AND PRESELECTION NEW COLUMNS
			col_preselected		: [
				'longitude',
				'latitude',
			],
			col_choices		: [
				'address',
				'longitude',
				'latitude',
				'altitude',
				'point',
				'raw'
			],

			new_col_preselected : [
				{
					text		: 'longitude',
					color		: 'primary',
					can_delete 	: false
				},
				{
					text		: 'latitude',
					color		: 'primary',
					can_delete 	: false
				}
			],

			new_col_choices 	: [
				{ header: this.$t(`projects.choose_col`, this.$store.state.locale) },
				{
					text		: 'address',
					color		: 'accent',
					can_delete 	: true
				},
				{
					text		: 'longitude',
					color		: 'primary',
					can_delete 	: false
				},
				{
					text		: 'latitude',
					color		: 'primary',
					can_delete 	: false
				},
				{
					text		: 'altitude',
					color		: 'accent',
					can_delete 	: true
				},
				{
					text		: 'point',
					color		: 'accent',
					can_delete 	: true
				},
				{
					text		: 'raw',
					color		: 'accent',
					can_delete 	: true
				},
			],

		}
	},

	computed : {

		default_geoloc_dmf () {
			
			// BASED ON SYSTEM'S STANDARD DMFS

			var dmf_geoloc_related = this.col_choices ;

			var all_dmf	= this.$store.getters['dmf/ConcatList'] ; 
			
			// filter out wanted dmf
			var filtered_dmf ;
			if ( this.col_choices != undefined ) {
				filtered_dmf = all_dmf.filter(function(el) {
					return dmf_geoloc_related.includes(el.infos.title )
				})
			}

			// remap filtered
			var remapped = []
			if ( filtered_dmf != undefined ) {
				remapped = filtered_dmf.map(dmf => ({
					text 		: dmf.infos.title,
					color 		: this.col_preselected.includes(dmf.infos.title ) ? 'primary' : 'accent' ,
					oid_dmf		: dmf._id,
					can_delete 	: this.col_preselected.includes(dmf.infos.title ) ? false : true 
				}))
			}

			return remapped

		},

		default_geoloc_dmf_preselect () {
			return this.default_geoloc_dmf.filter(function(el) {
				return el.can_delete == false
			})
		},

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

		update_new_columns(input) {
			this.new_dmfs = input
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
						new_dmf_list	: this.new_dmfs,
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
				// this.alert 		= { type: 'success', message: result.msg }
				this.loading 	= false				
			})
			
			.catch(error => {
				console.log("submit / error... : ", error ) ; 
				this.$store.commit('set_error', error )

				this.loading = false

				this.$store.commit(`set_error`, error)

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

