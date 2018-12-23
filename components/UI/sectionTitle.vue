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
		:class="sectionTopPadding"
		:color="sectionColor"
		:dark="is_dark"
		>
					
		<v-toolbar-side-icon 
			icon
			flat
			
			color="white"
			class="headline ml-2 "
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
			class="ml-1"
			>

			<span 
				class="headline font-weight-thin"
				>
				{{ title }}
			</span>

			&nbsp;

			<span 
				class="caption"
				>
				{{ intro }}
			</span>

		</v-toolbar-title>
				

		<!-- CREATE BTN -->
		<!-- <v-spacer v-if="show_create"></v-spacer>
		<BtnCreate
			v-if="show_create"
			:is_icon="false"
			:tab="tab"
			:color="''"
			:btn_class="'primary'"
			:is_block="true"
			:outline="false"
			:large="true"
			:flat="true"
			>
		</BtnCreate> -->

		<v-spacer v-if="!isDashboard"></v-spacer>

		<v-btn
			v-if="!isDashboard"
			icon
			nuxt
			:to="'/dashboard#'+tab"
			>
			<v-icon>
				{{ $store.state.mainIcons.back.icon }}  
			</v-icon>
		</v-btn>


	</v-toolbar>


</template>


<script>
// import BtnCreate from '~/components/UI/btnCreate.vue'

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
		// BtnCreate,
	},

	data () {
		return {

			sectionTopPadding_dft 	: "px-3 pt-2 pb-2",
			sectionTopPadding_color : "pt-2 pb-2"

		}
	},
	computed : {

		is_dark () {
			return (this.color)? true : false ;
		},

		sectionColor () {
			return (this.color)? this.color : 'transparent' ;
		},

		sectionTopPadding () {
			return (this.color)? this.sectionTopPadding_color : this.sectionTopPadding_dft ;
		},

		icon_color () {
			return (this.color)? "white" : 'primary' ;
		},


	},
}
</script>
