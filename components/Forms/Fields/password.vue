<template>

  <v-text-field 
    v-model="rawInput"
    @input="updateValue"

    :rules="[rules.required]"
    :label="$t('global.password', $store.state.locale )"

    id="password" 
    prepend-icon="lock" 
    name="password" 
    type="password">
  </v-text-field>
  
</template>


<script>
  export default {
    props: ['rawInput'],
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