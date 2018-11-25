<template>

	<div>

		<!-- <v-card-title 
			dark 
			height="15"
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

		</v-card-title> -->
	
		<v-toolbar
			color="primary"
			dark
			>
			<v-toolbar-side-icon>
				<v-icon>{{ icon }}</v-icon>
			</v-toolbar-side-icon>
			<v-toolbar-title>{{ title }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn 
				icon
				to='/'
				>
				<v-icon>clear</v-icon>
			</v-btn>
		</v-toolbar>

	</div>


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