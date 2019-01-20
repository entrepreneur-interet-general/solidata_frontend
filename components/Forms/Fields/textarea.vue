<template>
  
  <v-textarea
    v-model="rawInput"
    @input="updateValue"
    :label="$t(labelText, $store.state.locale )"

    auto-grow
    box
    color="primary"
    rows="3"
    clearable
  ></v-textarea>

</template>


<script>
  export default {
    props: ['rawInput', 'labelText'],
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