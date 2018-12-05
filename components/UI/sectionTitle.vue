<template>

	<!-- <v-jumbotron 
		class="pb-0" 
		color="" 

		> -->
		<!-- :height="$store.state.mainSectionsHeight" -->

	<v-toolbar 
		fluid 
		flat
		dense
		class="pt-3 pb-3"
		:color="sectionColor"
		:dark="is_dark"
		>
					
		<v-toolbar-side-icon 
			icon
			flat
			
			color="white"
			class="display-1"
			:to='to_link'
			>
			<v-icon 
					
				:color="icon_color"
				class=""
				
				>
				{{ icon }}
			</v-icon> 

		</v-toolbar-side-icon>

		<v-toolbar-title
			class=""
			>

			<span 
				class="display-1 font-weight-thin"
				>
				{{ title }}
			</span>

			&nbsp;

			<span 
				class="subheading"
				>
				{{ intro }}
			</span>

		</v-toolbar-title>
				

		<!-- CREATE BTN -->
		<v-spacer v-if="show_create"></v-spacer>
		<BtnCreate
			v-if="show_create"
			:is_icon="false"
			:tab="tab"
			:color="''"
			:btn_class="'primary'"
			:block="is_block"
			:outline="false"
			:large="true"
			:flat="true"
			>
		</BtnCreate>

		<v-spacer v-if="!isDashboard"></v-spacer>

		<v-btn
			v-if="!isDashboard"
			icon
			nuxt
			:to="'/dashboard'"
			>
			<v-icon>
				clear
			</v-icon>
		</v-btn>


	</v-toolbar>


</template>


<script>
import BtnCreate from '~/components/UI/btnCreate.vue'

export default {
	props : [ 
		"title",
		"icon",
		"intro",
		"isDashboard",
		"to_link",
		"color",
		"tab",
		"show_create"
	],

	components : {
		BtnCreate,
	},

	data () {
		return {
			// sectionColor : this.color
		}
	},
	computed : {

		is_dark () {
			return (this.color)? true : false ;
		},

		sectionColor () {
			return (this.color)? this.color : 'transparent' ;
		},

		icon_color () {
			return (this.color)? "white" : 'primary' ;
		},
	},
}
</script>
