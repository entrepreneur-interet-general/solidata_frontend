<template>

	<!-- <v-jumbotron 
		class="pb-0" 
		color="" 

		> -->
		<!-- :height="$store.state.mainSectionsHeight" -->

	<v-container 
		fluid 
		fill-height
		class="pt-4 mt-2 pb-0"
		>
		
		<v-layout row align-center spacer>
			<v-flex>
				<!-- typos : cf : https://vuetifyjs.com/en/style/typography#font-sizes -->
				<div 
					class="pl-3 "
					>
					
					<v-btn 
						icon
						flat
						
						color="white"
						class="display-1 mb-3"
						:to='to_link'
						>
						<v-icon 
							 
							color="primary"
							class=""
							
							>
							{{ icon }}
						</v-icon> 
					</v-btn>

					<span
						class="display-1"
						>
						{{ title }}
					</span>
					
					<!-- <span> - </span> -->

					<span 
						class="subheading pl-3"
						>
						{{ intro }}
					</span>

				</div>

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
					icon
					:to="'/dashboard'"
					>
					<v-icon>
						clear
					</v-icon>
				</v-btn>
			</v-menu>
		</template>

	</v-container>

	<!-- </v-jumbotron> -->

</template>


<script>
export default {
	props : [ 
		"title",
		"icon",
		"intro",
		"isDashboard",
		"to_link"
	],
	data () {
		return {
		}
	},
}
</script>
