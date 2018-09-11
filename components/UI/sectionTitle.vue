<template>

  <v-container fluid fill-height>
	  <v-layout row align-center spacer>
			<v-flex>
				<h3 class="display-3">
					<v-btn icon outline fab dark>
						<v-icon>
							{{ icon }}
						</v-icon> 
					</v-btn>
					<span>{{ title }}</span>
				</h3>
				<span class="subheading pl-4 ml-5">
					{{ intro }}
				</span>
			</v-flex>
	  </v-layout>

		<template
			v-if="!isDashboard"
			>
			<v-spacer></v-spacer>

			<v-menu center right>
				<v-btn
					nuxt
					slot="activator"
					dark
					icon
					to='/dashboard'
					>
					<v-icon>clear</v-icon>
				</v-btn>
			</v-menu>
		</template>

	</v-container>
	
</template>


<script>
export default {
	props : [ "title", "icon", "intro", "isDashboard" ],
	data () {
	  return {
	  }
	},
}
</script>
