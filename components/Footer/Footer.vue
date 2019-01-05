<style scoped>

	a {
		text-decoration: none;
		color: white;
	}

	a:hover{
		font-weight: bold;
	}

	.no-bullets {
		/* list-style-type:none */
	}

</style>


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


			<!-- SOCIAL -->
			<v-card-title 
				class="primary justify-center py-2"
				
				>
				<!-- <strong class="subheading">Get connected with us on social networks!</strong>
				<v-spacer></v-spacer> -->
				<v-btn
					v-for="icon in icons"
					:key="icons.indexOf(icon)"
					class="mx-3"
					:href="icon.href"
					target="_blank"
					dark
					small
					icon
					round
					outline
					>
					<v-icon small >
						{{ icon.icon }}
					</v-icon>
					<!-- <span class="text-lowercase">
						{{ icon.title }}
					</span> -->
				</v-btn>
			</v-card-title>



			<!-- LINKS -->
			<v-card-actions class="grey darken-1">
				
				<v-layout row justify-center>

					<!-- FAQ -->
					<v-flex sm4 md3 lg2>
						<v-card-title class="subheading justify-center font-weight-bold">
							{{ $t('links.faq', $store.state.locale ) }}
						</v-card-title>
						<v-card-text class="pt-0 justify-center">
							<ul class="no-bullets">
								<li>
									<nuxt-link to="/">documentation</nuxt-link>
								</li>
								<li>
									<nuxt-link to="/">lexicon</nuxt-link>
								</li>
								<li>
									<nuxt-link to="/">tutos</nuxt-link>
								</li>
								
							</ul>
						</v-card-text>
					</v-flex>

					<!-- ABOUT -->
					<v-flex sm4 md3 lg2>
						<v-card-title class="subheading justify-center font-weight-bold">
							{{ $t('links.about', $store.state.locale ) }}
						</v-card-title>
						<v-card-text class="pt-0 justify-center">
							<ul class="no-bullets">
								<li>
									<nuxt-link to="/">why_solidata</nuxt-link>
								</li>
								<li>
									<nuxt-link to="/">co_demos</nuxt-link>
								</li>
								<li>
									<nuxt-link to="/">values</nuxt-link>
								</li>
								<li>
									<nuxt-link to="/">stack</nuxt-link>
								</li>
							</ul>
						</v-card-text>
					</v-flex>
					
					<!-- LEGAL -->
					<v-flex sm4 md3 lg2>
						<v-card-title class="subheading justify-center font-weight-bold">
							{{ $t('links.legal', $store.state.locale ) }}
						</v-card-title>
						<v-card-text class="pt-0 justify-center">
							<ul class="no-bullets">
								<li>
									<nuxt-link to="/">legal</nuxt-link>
								</li>
								<li>
									<nuxt-link to="/">cgu</nuxt-link>
								</li>
								<li>
									<nuxt-link to="/">confidentiality</nuxt-link>
								</li>
								<li>
									<nuxt-link to="/">contact</nuxt-link>
								</li>
							</ul>
						</v-card-text>
					</v-flex>


				</v-layout>

			</v-card-actions>


			<v-divider></v-divider>


			<!-- INFOS -->
			<v-card-actions class="grey darken-3 justify-center">
				
				<span v-html="$store.state.title"></span> 
				&nbsp; 
				&nbsp; 
				<span v-html="$store.state.version"></span> 

				<v-divider vertical class="mx-3" ></v-divider>

				<span> {{ $t('home.project_by', $store.state.locale ) }} </span>
				
				<img 
					:src="$store.state.app_codemos" 
					height="25px"
					>
				</img> 
				
				<v-divider vertical class="mr-3" ></v-divider>

				<span v-html="$store.state.year"></span>


			</v-card-actions>


		</v-card>


		<v-snackbar
			v-model="$store.state.show_agreement_cgu"
			color="accent text-xs-center"
			:timeout="0"
			bottom
			multi-line
			>

			<span 
				class="ml-5"
				>
				{{ $t(`global.cgu`, $store.state.locale) }}
			</span>

			<v-btn
				class="mx-5"
				dark
				small
				flat
				block
				outline
				@click="$store.state.show_agreement_cgu = false"
				>
				
				<v-icon
					dark
					left
					small
					class="pl-2"
					>
					{{ $store.state.mainIcons.close.icon }}
				</v-icon>

				<span 
					class="pr-3"
					>

					{{ $t(`global.yes`, $store.state.locale) }}

				</span>

			</v-btn>

		</v-snackbar>

	</v-footer>

</template>

<script>

export default {

	data: () => ({

		icons: [
			{ 	
				label : "frontend", 
				href : "https://github.com/entrepreneur-interet-general/solidata_frontend", 
				icon : 'fab fa-vuejs',
				title : "frontend"
			} , 
			{ 
				label : "", 
				href : "http://twitter.com/jparis_py", 
				icon : 'fab fa-twitter',
				title : "twitter"
			} , 
			{ 
				label : "backend", 
				href : "https://github.com/entrepreneur-interet-general/solidata_backend", 
				icon : 'fab fa-python',
				title : "backend"
			} , 
			// {label : "", href : "/", icon : 'fab fa-facebook'} , 
			// {label : "", href : "/", icon : 'fab fa-google-plus'} , 
			// {label : "", href : "/", icon : 'fab fa-linkedin'} , 
			// {label : "", href : "/", icon : 'fab fa-instagram' }
		]
	})
}
</script>

