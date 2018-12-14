<template>

	<div>

		<v-hover>

		<v-card
			flat
			slot-scope="{ hover }"
			:class="`pa-0 elevation-${hover ? 5 : 0}`"
			:style="{ cursor: 'pointer'}"
			@click="itemClickBehaviour()"
			>
			<!-- :to="$store.state.mainIcons[tab]['to'] + '/' + item._id" -->


			<!-- ITEM TITLE -->
			<v-responsive 
				flat 
				dense
				:height="height_title"
				>
				<v-layout align-center fill-height ma-0>
					<v-card-text 
						:class="`px-1 py-2 ${hover ? 'primary' : 'black' }--text`"
						>
						<p class="body-2 text-xs-center font-weight-bold ma-0">
							{{ item.infos.title | truncate( 30, '...' )}}
						</p>
					</v-card-text>
				</v-layout>
			</v-responsive>


			<!-- FLOATING BTN -->
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


			<!-- DEBUG -->
			<!-- <v-card-text >
				- add_to_parent : <code> {{ add_to_parent }} </code> <br>
				- parentDoc_id : <code> {{ parentDoc_id }} </code>
			</v-card-text > -->


			<v-divider ></v-divider>

			<!-- if - PRJ / DSI / dmt -->
			<template
				v-if="!not_main_colls.includes(coll)"
				>
				<div>

					<v-card-text 
						class="pa-2 text-xs-center"
						>
						<v-icon 
							small
							left
							>
							{{$store.state.mainIcons.view.icon}}
						</v-icon>
						{{ item.public_auth.open_level_show }}
					</v-card-text>

					<v-divider ></v-divider>

					<v-responsive
						:height="height_main_coll_content"
						>
						<v-card-text mx-1>
							<p>{{ item.infos.description | truncate(100, '...') }}</p>
						</v-card-text>
					</v-responsive>

				</div>

			</template>


			<!-- if - DMF / TAG -->
			<template
				v-if="not_main_colls.includes(coll) && coll!='tag'"
				>
				<v-responsive
					text-xs-center
					class="mx-0 py-1"
					absolute
					>

					<v-card-text class="pa-0" >

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

				</v-responsive>

			</template>


		</v-card>
		

		 <!-- FOOTER -->
		<v-card>

			<v-responsive 
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

			</v-responsive>

		</v-card>


		</v-hover>

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
	
	},

	methods : {

		itemClickBehaviour () {

			console.log("itemClickBehaviour..." )

			if ( this.add_to_parent ) {
				console.log("itemClickBehaviour / add_to_parent..." )

				// commit action update from main $store
			}

			else {
				console.log("itemClickBehaviour / go to edit item..." )

				// redirect to edit-preview page 
				return this.$router.push(`/${this.coll}/${this.item._id}`)

			}



		}

	}


}
</script>