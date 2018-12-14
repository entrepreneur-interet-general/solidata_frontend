<template>

	<div>

		<v-card
			:to="$store.state.mainIcons[tab]['to'] + '/' + item._id"
			flat
			class="pa-0"
			>

			<v-toolbar 
				flat 
				color="transparent text-xs-center" 
				dense
				:height="height_title"
				>
				<v-card-text 
					class="body-2 font-weight-bold py-1 ma-0"
					>
					{{ item.infos.title | truncate( 30, '...' )}}
				</v-card-text>


			</v-toolbar>

			<v-btn
				fab
				small
				flat
				
				class="secondary"
				color=""
				bottom
				right
				absolute
				>
				<v-icon>
					{{$store.state.mainIcons[tab].icon}}
				</v-icon>
			</v-btn>

			<v-divider ></v-divider>


			<v-card-media
				v-if="!not_main_colls.includes(coll)"
				:height="height_main_coll_content"
				>
				<v-card-text mx-1>
					<p>{{ item.infos.description | truncate(100, '...') }}</p>
				</v-card-text>
			</v-card-media>



			<v-card-media
				v-if="not_main_colls.includes(coll) && coll!='tag'"
				text-xs-center
				class="mx-2 py-1"
				absolute
				>

				<v-card-text mx-1 >

				<!-- <v-container pa-0 ma-0 text-xs-center align-center> -->

				<v-list dense two-line class="ma-0">

					<v-list-tile class="">

						<!-- <v-list-tile-action>
							<v-icon color="indigo">mail</v-icon>
						</v-list-tile-action> -->

						<v-list-tile-content>
							<v-list-tile-sub-title>
								{{ $t(`global.f_code`, $store.state.locale) }}
							</v-list-tile-sub-title>
							<v-list-tile-title>
								{{ item.data_raw.f_code}}
							</v-list-tile-title>
						</v-list-tile-content>

					</v-list-tile>

					<v-divider class=""></v-divider>

					<v-list-tile >
						
						<!-- <v-list-tile-action>
							<v-icon color="indigo">mail</v-icon>
						</v-list-tile-action> -->

						<v-list-tile-content>
							<v-list-tile-sub-title>
								{{ $t(`global.f_type`, $store.state.locale) }}
							</v-list-tile-sub-title>
							<v-list-tile-title>
								{{ item.data_raw.f_type}}
							</v-list-tile-title>
						</v-list-tile-content>

					</v-list-tile>

				</v-list>

				<!-- </v-container> -->

				</v-card-text>

			</v-card-media>


		</v-card>
		
		<v-card>

			<v-card-media 
				class="grey lighten-1 text-lowercase caption"
				:height="height_footer"
				>
				<!-- <v-container pa-0 ma-0 text-xs-center align-center>
					<v-layout align-center class=" pa-0 ma-0 ">
						<v-flex class="white--text  pa-0 ma-0 pt-1">
							{{ $t(`global.see_this`, $store.state.locale) }}
							{{ $t( tab+'.singular', $store.state.locale)  }}
						</v-flex>
					</v-layout>
				</v-container> -->

			</v-card-media>

		</v-card>

	</div>

</template>


<script>
export default {
	props : [ 
		"coll",
		"tab", 
		"item", 
		"index", 
		"inTeam" , 
		
		"add_to_parent",
		"parentDoc_id"

	],
	data () {
		return {

			not_main_colls 				: ['dmf', 'tag'],

			height_footer 				: "0px",
			height_main_coll_content 	: "120px",

			direction: 'left',
			fab: false,
			fling: false,
			tabs: null,
			transition: 'slide-y-reverse-transition'

		}
	},

	computed : {

		is_main_coll () { 
			return (this.not_main_colls.includes(this.coll)) ? "body-2" : "subheading" 
		},

		height_title () { 
			return (this.not_main_colls.includes(this.coll)) ? 
				((this.coll=='tag')? '75px': '100px') : "60px" 
		},

      activeFab () {
        switch (this.tabs) {
          case 'one': return { 'class': 'purple', icon: 'account_circle' }
          case 'two': return { 'class': 'red', icon: 'edit' }
          case 'three': return { 'class': 'green', icon: 'keyboard_arrow_up' }
          default: return {}
        }
      }
	
	}
}
</script>