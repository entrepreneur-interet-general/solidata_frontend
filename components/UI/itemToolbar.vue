<template>

	<v-toolbar 
		dense 
		dark
		class="elevation-1"
		color="primary" 
		xs12
		>
		
		<!-- BACK TO COLL LIST -->
		<v-btn 
			icon 
			small 
			color=""
			:to="'/'+coll"
			>					
			<v-icon small>
				{{ $store.state.mainIcons[collName]['icon'] }}
			</v-icon>
		</v-btn>

		<!-- ITEM TITLE -->
		<v-toolbar-title
			class="title"
			>
			<!-- {{$t(collName+'.edit', $store.state.locale )}} -->
			{{ itemTitle }}
		</v-toolbar-title>

		<!-- SWITCH FOR PREVIEW -->
		<v-spacer></v-spacer>
		<v-switch 
			:label="$t('global.preview', $store.state.locale)"
			v-model="is_preview"
			color="white"
			:input-value="is_preview"
			hide-details
			@change="switchPreview()"
			>
		</v-switch>

		<v-spacer></v-spacer>

		<!--  -->
		<template 
			v-if="!is_create"
			>
			<v-btn icon
				:to="'/'+coll+'/'+itemId+'/team'"
				>
				<v-icon color="">
					{{ $store.state.mainIcons.parentFieldIcons.team.icon }}
				</v-icon>
			</v-btn>

			<v-btn icon
				:to="'/'+coll+'/'+itemId+'/settings'"
				>
				<v-icon color="">
					{{ $store.state.mainIcons.settings.icon }}
				</v-icon>
			</v-btn>
		</template>


		<!-- RESET / DELETE ITEM MENU -->
		<v-menu 
			v-if="!is_create"
			bottom 
			left 
			full-width
			>

			<v-btn 
				icon 
				small
				slot="activator"
				>
				<v-icon>
					more_vert
				</v-icon>
			</v-btn>

			<v-list class="pa-0">

				<!-- <v-list-tile
					:to="'/'+coll+'/'+itemId+'/team'"
					>
					<v-list-tile-title class="pa-0 ma-0">
						<v-icon left color="">
							{{ $store.state.mainIcons.team.icon }}
						</v-icon>
						<span>
							{{ $t(`global.team`, $store.state.locale) }}
						</span>
					</v-list-tile-title>
				</v-list-tile>

				<v-list-tile
					:to="'/'+coll+'/'+itemId+'/settings'"
					>
					<v-list-tile-title class="pa-0 ma-0">
						<v-icon left color="">
							{{ $store.state.mainIcons.settings.icon }}
						</v-icon>
						<span>
							{{ $t(`global.settings`, $store.state.locale) }}
						</span>
					</v-list-tile-title>
				</v-list-tile> -->


				<v-list-tile
					v-if="is_reset"
					:to="'/'+coll+'/'+itemId+'/reset'"
					>
					<v-list-tile-title class="pa-0 ma-0">
						<v-icon small left class="pr-1 mb-1" color="warning">
							{{ $store.state.mainIcons.reset.icon }}
						</v-icon>
						<span>
							{{ $t(`global.reset`, $store.state.locale) }}
						</span>
					</v-list-tile-title>
				</v-list-tile>

				<v-list-tile
					:to="'/'+coll+'/'+itemId+'/delete'"
					>
					<v-list-tile-title class="pa-0 ma-0">
						<v-icon small left class="pr-1 mb-1" color="error">
							{{ $store.state.mainIcons.delete.icon }}
						</v-icon>
						<span>
							{{ $t(`global.delete_i`, $store.state.locale) }}
						</span>
					</v-list-tile-title>
				</v-list-tile>



			</v-list>
		</v-menu>


	</v-toolbar>



</template>



<script>

export default {

	props : [ 
		"coll", 
		"collName", 
		"itemDoc",
		"is_create", 
		"isPreview",
		"is_reset"
	],

	data () {
		return {
			
			is_preview 	: this.isPreview,
			itemId 		: this.itemDoc._id,
			itemTitle 	: this.itemDoc.infos.title

		}
	},

	methods: {

		switchPreview() {

			console.log("switchPreview / this.is_preview : ", this.is_preview )
			
			this.$emit('input'
			// , {
			// 	prop : 'isPreview',
			// 	value  : this.is_preview,
			// }
			)
		}

	},

}


</script>