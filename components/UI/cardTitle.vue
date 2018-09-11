<template>

	<v-card-title 
		dark 
		class="primary white--text"
		>

		<v-btn icon dark>
			<v-icon>{{ icon }}</v-icon>
		</v-btn> 
		<span class="headline">{{ title }}</span>

		<v-spacer></v-spacer>

		<v-menu center right>
			<v-btn
				nuxt
				slot="activator"
				dark
				icon
				to='/'
				>
				<v-icon>clear</v-icon>
			</v-btn>
		</v-menu>

	</v-card-title>
	
</template>

<script>
export default {
	props : [ "title", "icon" ],
	data () {
	  return {
	  }
	},
}
</script>