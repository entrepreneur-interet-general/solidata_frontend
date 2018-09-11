<template>

	<v-text-field 
		v-model="rawInput"
		@input="updateValue"

		:rules="[rules.email, rules.required]"
		:label="$t('global.email', $store.state.locale )"

		id="email"
		prepend-icon="person" 
		name="email" 
		type="text"
		>
	</v-text-field>

</template>


<script>

	export default {
		props : [ "rawInput"],
		data () {
			return {
				rules: {
						email	: v => (v || '').match(/@/) || this.$t('rules.email', this.$store.state.locale),
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