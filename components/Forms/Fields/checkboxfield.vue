<template>

	<v-checkbox
		v-model="rawInput"
		@input="updateValue"
		:label="$t(labelText, $store.state.locale)"
		>
	</v-checkbox>


</template>


<script>

	// cf : https://vuetifyjs.com/en/components/selection-controls 

	export default {
		props : [ "rawInput", "labelText"],
		data () {
			return {
				checkbox1 : false,
				rules: {
						required: v => !!v || this.$t('rules.required', this.$store.state.locale)
					}
			}
		},
		methods : {
			updateValue (str) {
				this.$emit('input', str)
			},
		}
	}

</script>