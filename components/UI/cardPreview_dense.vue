<template>

	<v-card>

		<v-card-title
			class="display-1 pa-0 font-weight-bold"
			>

			<v-btn 
				flat
				class="ma-0"
				block
				:to="$store.state.mainIcons[tab]['to'] + '/' + item._id"
				color="primary"
				>

				<v-icon small left color="accent"> 
					{{ $store.state.mainIcons[tab]['icon'] }}
				</v-icon>
				
				<span>
					{{ item.infos.title }}
				</span>


			</v-btn>

		</v-card-title>


		<v-divider></v-divider>


		<v-list no-line dense>

			<v-list-tile>
				<v-list-tile-title>Created by :</v-list-tile-title>
				<v-list-tile-content class="align-end">{{ item.log.created_by }}</v-list-tile-content>
			</v-list-tile>

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

		</v-list>

		<!-- <v-divider></v-divider> -->

		<v-list dense >
			
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
		</v-list>

		<v-divider></v-divider>


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


	</v-card>

</template>


<script>
export default {
	props : [ 
		"tab", 
		"item", 
		"index", 
		"inTeam" , 
		// "defaultHeight", 
		// "defaultFlex" 
	],
	data () {
		return {
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
}
</script>