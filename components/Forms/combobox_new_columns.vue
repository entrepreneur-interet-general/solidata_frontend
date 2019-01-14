<style scoped>

	
</style>


<template>

	<div>

			<!-- :filter="filter" -->
			<!-- hide-selected -->
		<v-select
			v-model="model"

			:hide-no-data="!search"
			:items="items"
			:search-input.sync="search"

			return-object

			multiple
			small-chips
			hide-details
			persistent-hint
			>
			<!-- label="Search for an option" -->

			<!-- NO DATA -->
			<template slot="no-data">
				<v-list-tile>

					<span class="subheading">
						{{ $t(`global.create`, $store.state.locale ) }}
					</span>

					<v-chip
						:color="`${colors[nonce - 1]} lighten-3`"
						label
						small
						>
						{{ search }}
					</v-chip>

				</v-list-tile>
			</template>

			<!-- SELECTED -->
			<template
				v-if="item === Object(item)"
				slot="selection"
				slot-scope="{ item, parent, selected }"
				>
				<v-chip
					:color="`${item.color}`"
					:selected="selected"
					label
					dark
					small
					>
					<span 
						class="pr-2 white--text"
						>
						{{ item.text }}
						<span 
							v-if="!item.can_delete"
							>
							&nbsp; *
						</span>
					</span>

					<v-icon
						v-if="item.can_delete"
						small
						@click="parent.selectItem(item)"
						>
						{{ $store.state.mainIcons.close.icon }}
					</v-icon>

				</v-chip>
			</template>


			<!-- LIST OF CHOICES -->
			<template
				slot="item"
				slot-scope="{ index, item, parent }"
				>

				<v-list-tile-content
					@click.prevent="can_delete(item, $event)"
					>

					<!-- <v-text-field
						v-if="editing === item"
						v-model="editing.text"
						autofocus
						flat
						background-color="transparent"
						hide-details
						solo
						@keyup.enter="edit(index, item)"
						>
					</v-text-field> -->

						<!-- v-else -->
					<v-chip
						:color="`${item.color}`"
						class="white--text"
						label
						small
						>
						{{ item.text }} 
						<span 
							v-if="!item.can_delete"
							>
							&nbsp; *
						</span>
					</v-chip>


				</v-list-tile-content>
			
				<!-- EDITION FOR COMBOBOX -->
				<!-- <v-spacer></v-spacer> -->

				<!-- <v-list-tile-action @click.stop>

					<v-btn
						icon
						@click.stop.prevent="edit(index, item)"
						>
						<v-icon>
							{{ editing !== item ? 
								$store.state.mainIcons.edit.icon : $store.state.mainIcons.check.icon
							}}
						</v-icon>
					</v-btn>

				</v-list-tile-action> -->

			</template>

		</v-select>




		<!-- DEBUG -->
		<v-flex 
			class="mt-4"
			v-if="$store.state.is_debug"
			>

			<v-divider class="my-2"></v-divider>
			<span>
				from within 'components/Forms/combobox_new_columns.vue' component
			</span>
			<v-divider class="my-2"></v-divider>

			- parentDoc_id : <code>{{ parentDoc_id }}</code><br>
			<v-divider></v-divider>

			- can_update : <code>{{ can_update }}</code><br>
			<v-divider></v-divider>

			- model : <code>{{ model }}</code><br>
			<v-divider></v-divider>

			<!-- - items : <code>{{ items }}</code><br> -->

		</v-flex>

	</div>

</template>



<script>

export default {

	props : [
		"parentDoc_id",
		"parentDoc_coll",
		"parent_DMT_oids",
		"parent_REC_mapping",

		"new_col_preselected",
		"new_col_choices",
	],

	components : {
		
	},

	created () {
		console.log("\n REC combobox_new_columns / created ... " ) ;
		this.items = this.new_col_choices ; 
		this.populateModel( this.parent_REC_mapping ) ;
	},

	data () {

		return {

			activator	: null,
			attach		: null,

			fromRecParams : null,
			can_update : false,

			colors		: [
				// 'green', 
				// 'purple', 
				// 'indigo', 
				// 'cyan', 
				// 'teal', 
				// 'orange'
			],
			editing		: null,
			index		: -1,


			// CHOICES
			items		: [
				// { header: this.$t(`projects.new_col`, this.$store.state.locale) },
				// {
				// 	text: 'longitude',
				// 	color: 'accent'
				// },
				// {
				// 	text: 'latitude',
				// 	color: 'accent'
				// },
				// {
				// 	text: 'address',
				// 	color: 'accent'
				// }
			],

			nonce		: 1,
			menu		: false,


			// INPUT CONTENT
			model		: [
				// {
				// 	text: 'longitude',
				// 	color: 'accent'
				// },
				// {
				// 	text: 'latitude',
				// 	color: 'accent'
				// }
			],

			x			: 0,
			search		: null,
			y			: 0

		}
	},

	computed : {

	},

	watch : {

		parent_REC_mapping (newVal, oldVal) {

			console.log( "\n REC combobox_new_columns / watch ~ parent_REC_mapping / newVal : \n", newVal )
			this.populateModel ( newVal )

		},

		model (newVal, oldVal) {

			console.log( "\n REC combobox_new_columns / watch ~ model / newVal : \n", newVal )

			if (newVal.length === oldVal.length) return

			// this.model = newVal.map( newInput => {

			// 	// if (typeof newInput === 'string') {

			// 	// 	 newInput = {
			// 	// 		text:  newInput,
			// 	// 		// color: this.colors[this.nonce - 1]
			// 	// 		color: "grey"
			// 	// 	}
			// 	// 	this.items.push(newInput)
			// 	// 	this.nonce++
			// 	// }

			if ( this.can_update ) {
				if ( newVal != this.fromRecParams ) {
					console.log( "\n REC combobox_new_columns / watch ~ model / emitting updateNewColumns " )
					this.$emit('updateNewColumns', this.model  )
				}
			}

			// 	return  newInput
			// })
		},
	
	},

	methods : {

		can_delete (item, event) {
			
			// console.log( "\n REC can_delete - item.can_delete :", item.can_delete );
			// console.log( " can_delete - event :", event );

			// stop propagation if not allowed to delete from selection
			if ( !item.can_delete ) {
				event.stopPropagation() 
			} 

		},

		populateModel ( parent_REC_mapping ) {
			
			console.log( "\n REC combobox_new_columns - populateModel ..." );
			console.log( "REC combobox_new_columns -  parent_REC_mapping : \n", parent_REC_mapping );

			if ( parent_REC_mapping != undefined ) {
				
				var rec_params = parent_REC_mapping.rec_params ; 

				console.log( "\n REC combobox_new_columns - rec_params not undefined ..." );

				if ( rec_params.new_dmfs_list.length > 0 ) {	
					
					console.log( "\n REC combobox_new_columns - rec_params.new_dmfs_list.length > 1 ..." );
					
					this.fromRecParams 		= rec_params.new_dmfs_list
					this.model 				= rec_params.new_dmfs_list
					this.can_update = true
				}

				// parent PRJ has no parent_REC_mapping.rec_params.new_dmfs_list
				else {
					this.model 		= this.new_col_preselected ; 
					this.can_update = false
					this.$emit('updateNewColumns', this.model  )
				} 
			} 

			// parent PRJ has no parent_REC_mapping at all
			else {
				this.model 		= this.new_col_preselected ; 
				this.can_update = true
				this.$emit('updateNewColumns', this.model  )
			}
		},

		// edit (index, item) {

		// 	if (!this.editing) {
		// 		this.editing 	= item
		// 		this.index 		= index
		// 	} 
		// 	else {
		// 		this.editing 	= null
		// 		this.index 		= -1
		// 	}
		// },

		// filter (item, queryText, itemText) {

		// 	if (item.header) return false

		// 	const hasValue = val => val != null ? val : ''

		// 	const text 	= hasValue(itemText)
		// 	const query = hasValue(queryText)

		// 	return text.toString()
		// 	.toLowerCase()
		// 	.indexOf(query.toString().toLowerCase()) > -1
		// }

	},

}


</script>