<template>

	<v-container 
		fluid 
		fill-height
		>
		
		<v-layout row align-center spacer>
			<v-flex>
				<!-- typos : cf : https://vuetifyjs.com/en/style/typography#font-sizes -->
				<div class="title pl-5 pb-0 mt-0">
					
					<v-btn 
						icon
						flat
						small
						class="ml-0 py-0"
						:to='to_link'
						>
						<v-icon 
							small 
							dark
							class="pa-0 ma-0"
							left
							>
							{{ icon }}
						</v-icon> 
					</v-btn>
					<span>{{ title }}</span>
					
					<span> - </span>

				<!-- </div>
				<div class="pl-4 ml-5 mt-0">  -->
					<span class="subheading">
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
					dark
					icon
					:to="'/dashboard'"
					>
					<v-icon>clear</v-icon>
				</v-btn>
			</v-menu>
		</template>

	</v-container>
	
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
