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
			<v-btn 
				icon
				disabled
				:to="'/'+coll+'/'+itemId+'/team'"
				>
				<v-icon color="">
					{{ $store.state.mainIcons.parentFieldIcons.team.icon }}
				</v-icon>
			</v-btn>

			<v-btn 
				icon
				disabled
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
			:nudge-bottom="10"
			offset-y
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


				<!-- RESET BTN -->
				<v-list-tile
					v-if="is_reset"
					@click="dialog_reset = true"
					>

					<!-- RESET IN MENU -->
					<v-list-tile-title class="pa-0 ma-0">
						<v-icon small left class="pr-1 mb-1" color="warning">
							{{ $store.state.mainIcons.reset.icon }}
						</v-icon>
						<span>
							{{ $t(`global.reset`, $store.state.locale) }}
						</span>
					</v-list-tile-title>

					<!-- CONFIRM RESET DIALOG -->
					<v-dialog 
						v-model="dialog_reset" 
						max-width="500"
						>
						
						<v-card>

							<v-card-title class="headline text-xs-center pb-1">
								<v-icon left class="pr-3" color="grey">
									{{ $store.state.mainIcons.reset.icon }}
								</v-icon>
								{{ $t(`global.reset`, $store.state.locale) }}
							</v-card-title>

							<v-card-text class="subheading text-xs-center mb-2">
								<v-icon large class="mb-1" color="warning">
									{{ $store.state.mainIcons.warning.icon }}
								</v-icon>
								<br>
								{{ $t(`global.confirm_reset`, $store.state.locale) }}
							</v-card-text>


							<v-card-actions>

								<v-btn 
									color="primary" 
									dark
									block
									@click="dialog_reset = false"
									ma-2
									>
									<v-icon left>
										{{ $store.state.mainIcons.cancel.icon }}
									</v-icon>
									{{ $t(`global.cancel`, $store.state.locale) }}
								</v-btn>
								
								<v-btn 
									color="warning " 
									dark
									block
									@click=" ; dialog_reset = false"
									ma-2
									>
									<v-icon left>
										{{ $store.state.mainIcons.reset.icon }}
									</v-icon>
									{{ $t(`global.reset`, $store.state.locale) }}
								</v-btn>

							</v-card-actions>

						</v-card>
					
					</v-dialog>

				</v-list-tile>


				<!-- DELETE BTN -->
				<v-list-tile
					>

					<!-- BTN IN MENU -->
					<v-list-tile-title 
						class="pa-0 ma-0"
						@click="dialog_del=true"
						>
						<v-icon small left class="pr-1 mb-1" color="error">
							{{ $store.state.mainIcons.delete.icon }}
						</v-icon>
						<span>
							{{ $t(`global.delete_i`, $store.state.locale) }}
						</span>
					</v-list-tile-title>
						
					<!-- CONFIRM DELETE DIALOG -->
					<v-dialog 
						v-model="dialog_del" 
						max-width="500"
						>
						
						<v-card>

							<v-card-title class="headline text-xs-center pb-1">
								<v-icon left class="pr-3" color="grey">
									{{ $store.state.mainIcons.delete.icon }}
								</v-icon>
								{{ $t(`global.delete_i`, $store.state.locale) }}
							</v-card-title>

							<v-card-text class="subheading text-xs-center mb-2">
								<v-icon large class="mb-1" color="error">
									{{ $store.state.mainIcons.warning.icon }}
								</v-icon>
								<br>
								{{ $t(`global.confirm_del`, $store.state.locale) }}
							</v-card-text>
							
							
							<v-card-actions>

								<v-btn 
									color="primary" 
									dark
									block
									@click="dialog_del = false"
									ma-2
									>
									<v-icon left>
										{{ $store.state.mainIcons.cancel.icon }}
									</v-icon>
									{{ $t(`global.cancel`, $store.state.locale) }}
								</v-btn>
								
								<v-btn 
									color="error " 
									dark
									block
									@click="deleItem() ; dialog_del = false"
									ma-2
									>
									<v-icon left>
										{{ $store.state.mainIcons.delete.icon }}
									</v-icon>
									{{ $t(`global.delete_i`, $store.state.locale) }}
								</v-btn>

							</v-card-actions>

						</v-card>
					
					</v-dialog>

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
			itemTitle 	: this.itemDoc.infos.title,

			loading		: false,
			alert		: null,

			dialog_del 		: false,
			dialog_reset 	: false,

		}
	},

	methods: {

		switchPreview() {

			console.log("itemToolbar - switchPreview / this.is_preview : ", this.is_preview )
			
			this.$emit('input'
			// , {
			// 	prop : 'isPreview',
			// 	value  : this.is_preview,
			// }
			)
		},

		deleItem() {

			console.log("\n itemToolbar - deleItem ... " )

			this.loading 		= true

			var call_input = {
				coll 	: this.coll, 
				doc_id	: this.itemId
			}

			this.$store.dispatch('deleteItem', call_input )

			.then( result => {
				
				console.log("itemToolbar - deleItem / result: ", result ) ; 
				
				this.loading 		= false
				this.alert   		= {type: 'success', message: result.msg}

				return this.$router.push(`/${this.coll}`)

			})

			.catch( error => {
				console.log("itemToolbar - deleItem / error... : ", error ) ; 
				this.loading = false
				if (error.response && error.response.data) {
					this.alert = {type: 'error', message: error.response.data.msg || error.reponse.status}
				}
			})

		},

	},

}


</script>