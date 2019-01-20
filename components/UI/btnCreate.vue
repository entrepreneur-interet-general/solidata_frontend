<template>

  <v-layout class="justify-center">
    
    <!-- BTN AS LINK -->
    <v-btn 
      v-if="!is_calling"
      :flat="flat"
      :icon="isIcon || isMobile"
      :round="!isIcon && !isMobile"
      :outline="outline"
      :block="is_block && !isMobile"
      :to="to_link" 
      :color="color"
      :class="btn_class"
      :large="large"
      >
        <!-- :left="!isIcon && !isMobile"  -->
      <v-icon 
        :large="large"
        >
        {{ $store.state.mainIcons.create.icon }}
      </v-icon>
      <span 
        v-if="!isIcon && !isMobile"
        class="subheading text-lowercase font-weight-medium" >
        {{ $t(tab+'.create', $store.state.locale) }}
      </span>
    </v-btn>

    <!-- BTN AS CALL -->
    <v-btn 
      v-else
      :flat="flat"
      :icon="isIcon || isMobile"
      :round="!isIcon && !isMobile"
      :outline="outline"
      :block="is_block && !isMobile"
      @click="callCreate()" 
      :color="color"
      :class="btn_class"
      :large="large"
      >
        <!-- :left="!isIcon && !isMobile"  -->
      <v-icon 
        :large="large"
        >
        {{ $store.state.mainIcons.create.icon }}
      </v-icon>
      <span 
        v-if="!isIcon && !isMobile"
        class="subheading text-lowercase font-weight-medium" >
        {{ $t(tab+'.create', $store.state.locale) }}
      </span>
    </v-btn>

  </v-layout>

</template>


<script>
export default {
  props: [
    'tab',
    'is_icon',
    'large',
    'is_block',
    'outline',
    'color',
    'flat',
    'btn_class',
    'is_calling'
  ],

  mounted () {
    // console.log("\n- btnCreate / mounted ---> tab... ", this.tab ) ;
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },

  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },

  data () {
    return {

      isMobile: false,
      isIcon: this.is_icon

    }
  },

  computed: {

    to_link () {
      return this.$store.state.mainIcons[this.tab]['to'] + '/create'
    }

  },

  methods: {

    onResize () {
      this.isMobile = window.innerWidth < 950
    },

    callCreate () {
      // console.log("callCreate... " )
      this.$emit('input')
    }
  }

}
</script>
