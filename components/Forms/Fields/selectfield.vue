<template>

	<v-select
		v-model="rawInput"
		@input="updateValue"
		auto
		box
		hide-details
		:label="$t(labelText, $store.state.locale)"
		:items="choices"
		single-line
		>
	</v-select>


</template>


<script>

	export default {
		props : [ "rawInput", "labelText", "choices"],
		data () {
			return {
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