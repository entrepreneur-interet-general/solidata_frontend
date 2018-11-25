<template>


	<!-- <v-footer :fixed="$store.state.fixedNav" app>
		<span>&copy; 2018</span>
	</v-footer> -->

	<v-footer
		dark
		height="auto"
		class=""
		>

		<v-card
			class="flex"
			flat
			tile
			>
			<v-card-title class="primary justify-center">

				<!-- <strong class="subheading">Get connected with us on social networks!</strong>

				<v-spacer></v-spacer> -->

				<v-btn
					v-for="icon in icons"
					:key="icon"
					class="mx-3"
					:href="icon.href"
					dark
					icon
					>
					<v-icon size="24px">{{ icon.icon }}</v-icon>
				</v-btn>
			</v-card-title>

			<v-card-actions class="grey darken-3 justify-center">
				&copy;2018 — <strong>Solidata</strong>
			</v-card-actions>

		</v-card>
	</v-footer>
</template>

<script>
 export default {
    data: () => ({
      icons: [
        {label : "frontend", href : "https://github.com/entrepreneur-interet-general/solidata_frontend", icon : 'fab fa-vuejs'} , 
        {label : "", href : "http://twitter.com/jparis_py", icon : 'fab fa-twitter'} , 
        {label : "backend", href : "https://github.com/entrepreneur-interet-general/solidata_backend", icon : 'fab fa-python'} , 
        // {label : "", href : "/", icon : 'fab fa-facebook'} , 
        // {label : "", href : "/", icon : 'fab fa-google-plus'} , 
        // {label : "", href : "/", icon : 'fab fa-linkedin'} , 
        // {label : "", href : "/", icon : 'fab fa-instagram' }
      ]
    })
  }
</script>

