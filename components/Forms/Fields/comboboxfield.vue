<template>

   <v-combobox
    v-model="rawInput"
    @input="updateValue"
    :items="choices.map(a => a.title)"
    :label="$t(labelText, $store.state.locale)"
    box
    clearable
    multiple
    chips
  ></v-combobox>


</template>


<script>
  export default {
    props: ['rawInput', 'labelText', 'choices'],
    data () {
      return {
        rules: {
          required: v => !!v || this.$t('rules.required', this.$store.state.locale)
        }
      }
    },
    methods: {
      updateValue (str) {
        this.$emit('input', str)
      }
    }
  }
</script>