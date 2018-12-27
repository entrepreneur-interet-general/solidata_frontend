<style scoped>

	.ol-selector {
		max-width: 200px !important; 
		width: 200px; 
		overflow-y: hidden ;
		text-align : center ;
		/* display: inline-block; */
	}

</style>

<template>

	<div>

		<span v-if="$store.state.is_debug">
			parentDoc_id : <br> <code>{{ parentDoc_id }}</code><br>
			parentDoc_coll : <code>{{ parentDoc_coll }}</code><br>
			parent_map : <br> <code>{{ parent_map }}</code><br>

			<v-divider></v-divider>

			dmf._id : <br> <code>{{ dmf._id }}</code><br>
			<!-- dmf : <br> <code>{{ dmf }}</code><br> -->

			<v-divider></v-divider>
		</span>

		<v-select
			class="ol-selector ma-1 body-1 text-xs-center"
			solo
			dense
			v-model="dmf_ol_value"
			:label="$t( 'projects.open_level_show', $store.state.locale )"
			hide-details
			:items="$store.state.subFieldsWithChoices['open_level_show']['choices']"
			@change="update_mapping( { 
				item_id 		: dmf._id, 
				map_field 		: 'dmf_to_open_level', 
			} ) "
			>
		</v-select>

	</div>

</template>



<script>



export default {

	props : [
		"dmt_id",
		"dmf",
		"parent_map",
		"parentDoc_id",
		"parentDoc_coll",
	],

	created () {

		console.log("\n viewEditDMF_openlevel / col : ", this.coll )

	},

	data () {

		return {

			dmf_ol_value : '' ,

		}

	},

	methods : {

		update_mapping (item_infos) {
			
			console.log("\n...viewEditDMF_openlevel - update_mapping / item_infos : \n ", item_infos)
			var input = {

				doc_id	: this.parentDoc_id, 
				coll 	: this.parentDoc_coll, 
				
				form 	: [
					{
						mapping_field	: item_infos.map_field,
						field_value		: this.dmf_ol_value,
						item_id			: item_infos.item_id,
					}
				]

			}
			console.log("update_mapping / input : ", input )

			// this.$store.dispatch('updateMapping', input )

		},

	}
	
}


</script>