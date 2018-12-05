<template>

	<v-btn 
		:flat="flat"
		:icon="is_icon"
		:outline="outline"
		:block="is_block"
		:to="$store.state.mainIcons[tab]['to']+'/create'" 
		:color="color"
		:class="btn_class"
		>
		<v-icon 
			:left="!is_icon" 
			:large="large"
			>
			{{ $store.state.mainIcons.create.icon }}
		</v-icon>
		<span 
			v-if="!is_icon"
			class="title text-lowercase font-weight-light" >
			{{ $t(tab+'.create', $store.state.locale) }}
		</span>
	</v-btn>

</template>


</<script>
export default {
	props : [ 
		"tab", 
		"is_icon",
		"large",
		"is_block",
		"outline",
		"color",
		"flat",
		"btn_class",
	],

	mounted () {
		console.log("- btnCreate / mounted ---> tab... ", this.tab ) ;
	},

	data () {
	  return {
	  }
	},
}
</script>
