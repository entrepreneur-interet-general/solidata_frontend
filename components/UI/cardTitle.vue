<template>

	<div>
	
		<v-toolbar
			color="primary"
			dark
			flat
			>

			<v-toolbar-side-icon>
				<v-icon>
					{{ icon }}
				</v-icon>
			</v-toolbar-side-icon>

			<v-toolbar-title>
				{{ title }}
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn 
				icon
				to='/'
				>
				<v-icon>
					{{ $store.state.mainIcons.cancel.icon }}
				</v-icon>
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