<template>

	<!-- <v-layout
		v-bind="{ [`xs${defaultFlex}`]: true }"
		align-center
		class="pt-2"
		> -->

	<v-layout
		align-center
		class="pb-3 pt-4"
		>

		<v-flex 
			xs12 sm10 offset-sm1 md8 offset-md2
			text-md-center
			>

			<!-- <v-btn 
				outline
				:block="is_block"
				:to="$store.state.mainIcons[tab]['to']+'/create'" 
				color="accent"
				>
				<v-icon left large>
					{{ $store.state.mainIcons.create.icon }}
				</v-icon>
				<span class="title" >
					{{ $t(tab+'.create', $store.state.locale) }}
				</span>
			</v-btn> -->

			<BtnCreate
				:tab="tab"
				:block="is_block"
				:outline="false"
				>

			</BtnCreate>

		</v-flex>



		<!-- <v-card 
			:to="$store.state.mainIcons[tab]['to']+'/create'"
			dark
			color="primary"
			>
			
			<v-card-media
				:height="defaultHeight"
				>
				<v-container
					fill-height
					fluid
					pa-2
				>
					<v-layout fill-height class="text-md-center">
						<v-flex xs12 align-end flexbox>
							<br>
							<br>
							<v-icon large>{{ $store.state.mainIcons.create.icon }}</v-icon>
							<v-spacer></v-spacer>
							<span class="headline">{{ $t(tab+'.create', $store.state.locale) }}</span>
						</v-flex>
					</v-layout>

				</v-container>
			</v-card-media>

		</v-card> -->



	</v-layout>
		
</template>

<script>
import BtnCreate from '~/components/UI/btnCreate.vue'

export default {
	props : [ 
		"tab", 
		"defaultHeight", 
		"defaultFlex",
		"is_block"
	],

	components : {
		BtnCreate,
	},

	mounted () {
		console.log("- cardCreate / mounted ---> tab... ", this.tab ) ;
	},

	data () {
	  return {
		  
	  }
	},
}
</script>
