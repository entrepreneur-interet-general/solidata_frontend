<template>

	<!-- <v-hover> -->
	<v-card
		:to="$store.state.mainIcons[tab]['to'] + '/' + item._id"
		:height="height_card"
		class="elevation-2"
		mb-3
		>

		<v-card-media 
			:height="height_card_content"
			flat 
			>
			<!-- :height="h_percent" -->
			<!--  -->



			<v-layout 
				:class="padding_y"
				row 
				spacer 
				mb-0
				>



				<v-flex sm3 md2 hidden-xs-only text-xs-center ml-3>
					<v-avatar size="30" color="grey">
						<v-icon small dark> 
							{{ $store.state.mainIcons[tab]['icon'] }}
						</v-icon>
					</v-avatar>
				</v-flex>



				<v-flex sm9 md10 px-3>

					<h4 
						:class="'my-0 '+is_main_coll"
						>
						{{ item.infos.title }}
					</h4>

					<div
						v-if="!not_main_colls.includes(coll)"
						class="pt-2 caption"
						>
						{{ item.infos.description }} 
					</div>


					<!-- <v-divider></v-divider> -->

					<!-- <v-list no-line dense> -->

						<!-- <v-list-tile>
							<v-list-tile-title>Created by :</v-list-tile-title>
							<v-list-tile-content class="align-end">{{ item.log.created_by }}</v-list-tile-content>
						</v-list-tile> -->

						<!-- <v-list-tile>
							<v-list-tile-title>id :</v-list-tile-title>
							<v-list-tile-content class="align-end">{{ item._id }}</v-list-tile-content>
						</v-list-tile>
						<v-list-tile>
							<v-list-tile-title>open_level_show :</v-list-tile-title>
							<v-list-tile-content class="align-end">{{ item.public_auth.open_level_show }}</v-list-tile-content>
						</v-list-tile>
						<v-list-tile>
							<v-list-tile-title>open_level_edit :</v-list-tile-title>
							<v-list-tile-content class="align-end">{{ item.public_auth.open_level_edit }}</v-list-tile-content>
						</v-list-tile> -->

					<!-- </v-list> -->

					<!-- <v-divider></v-divider> -->

					<!-- <v-list dense >
						<v-list-group
							v-for="p_field in parent_fields"
							v-model="p_field.active"
							:key="p_field.title"
							:prepend-icon="p_field.action"
							no-action
							>
							<v-list-tile slot="activator">
								<v-list-tile-content>
									<v-list-tile-title>{{ p_field.title }}</v-list-tile-title>
								</v-list-tile-content>
							</v-list-tile>

							<v-list-tile
								v-for="subItem in p_field.items"
								:key="subItem.title"
								@click=""
								>
								<v-list-tile-title>
									{{ subItem.subField }}
								</v-list-tile-title>
								<v-list-tile-sub-title>
									{{ item[p_field.title][subItem.subField] }}
								</v-list-tile-sub-title>

							</v-list-tile>

						</v-list-group>
					</v-list> -->


					<!-- <v-divider></v-divider> -->

					<!-- <v-card-actions>
						
						<!- - team button - ->
						<v-btn 
							flat block class="text-lowercase" 
							:to="$store.state.mainIcons[tab]['to'] + '/' + item._id + '/team'"
							> 
							<v-icon left>{{ $store.state.mainIcons.profile.icon }}</v-icon>
							{{ $t('global.team', $store.state.locale) }}
						</v-btn>

						<!- - settings button - ->
						<v-btn 
							v-if="inTeam === 'yes'"
							flat block class="text-lowercase" 
							:to="$store.state.mainIcons[tab]['to'] + '/' + item._id + '/settings'"
							> 
							<v-icon left>{{ $store.state.mainIcons.settings.icon }}</v-icon>
							{{ $t('global.settings', $store.state.locale) }}
						</v-btn>
					
					</v-card-actions> -->
				
				</v-flex>

			</v-layout>

		</v-card-media>


		<v-card-text 
			class="secondary py-1 white--text text-lowercase caption"
			:height="height_footer"
			>
			<div class="text-xs-center">
				{{ $t(`global.see_this`, $store.state.locale) }}
				{{ $t( tab+'.singular', $store.state.locale)  }}
			</div>
		</v-card-text>


	</v-card>

	<!-- </v-hover> -->



</template>


<script>
export default {
	props : [ 
		"coll",
		"tab", 
		"item", 
		"index", 
		"inTeam" , 
		// "defaultHeight", 
		// "defaultFlex" 
	],
	data () {
		return {

			not_main_colls : ['dmf', 'tag'],
			height_footer : "20px",

			parent_fields: [
				{
					action: 'infos',
					title: 'infos',
					// active: true,
					items: [
						{ subField: 'title' },
						{ subField: 'description' },
					]
				},
				{
					action: 'lock',
					title: 'public_auth',
					items: [
						{ subField: 'open_level_edit' },
						{ subField: 'open_level_show' },
					]
				},
	
			]
		}
	},

	computed : {

		is_main_coll () { 
			return (this.not_main_colls.includes(this.coll)) ? "body-2" : "subheading" 
		},
		
		padding_y () { 
			return (this.not_main_colls.includes(this.coll)) ? "py-2" : "py-4" 
		},

		h_percent () { 
			return (this.not_main_colls.includes(this.coll)) ? "57%" : "81%" 
		},

		height_card () { 
			return (this.not_main_colls.includes(this.coll)) ? "75px" : "150px" 
		},
		height_card_content () { 
			return (this.not_main_colls.includes(this.coll)) ? "55px" : "130px" 
		},

	}
}
</script>