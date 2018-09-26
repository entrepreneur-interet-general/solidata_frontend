<template>

	<v-container fluid fill-height
		>
		<v-layout row align-center spacer
		>
			<v-flex>
				<!-- typos : cf : https://vuetifyjs.com/en/style/typography#font-sizes -->
				<div class="display-1">
					<v-btn 
						icon 
						outline 
						fab 
						dark
						>
						<v-icon>
							{{ icon }}
						</v-icon> 
					</v-btn>
					<span>{{ title }}</span>
					<span class="subheading pl-4 ml-5">
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
					:to='to_link'
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
