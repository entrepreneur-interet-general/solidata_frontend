<template>
  
  <!-- <v-textarea
    v-model="rawInput"
    @input="updateValue"

    auto-grow
    box
    color="primary"
    label="description"
    rows="3"
    clearable
  ></v-textarea> -->

  <v-text-field
    v-model="rawInput"
    @input="updateValue"
    box
    :label="$t(labelText, $store.state.locale)"
    clearable
    >
  </v-text-field>

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