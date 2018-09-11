<template>

	<v-flex
		v-bind="{ [`xs${defaultFlex}`]: true }"
		>
		<v-card 
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

		</v-card>

	</v-flex>
		
</template>

<script>
export default {
	props : [ "tab", "defaultHeight", "defaultFlex" ],
	data () {
	  return {
		  
	  }
	},
}
</script>
