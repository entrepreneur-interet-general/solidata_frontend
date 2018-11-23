import Vue from 'vue'
import Vuetify from 'vuetify'

// import colors from 'vuetify/es5/util/colors'


// Vue.use(Vuetify)


Vue.use(Vuetify, {
	theme: {
		// primary: colors.purple.base,
		// secondary: colors.grey.darken1,
		// accent: colors.shades.black,
		// error: colors.red.accent3,

		// primary:      colors.red.darken-2,
		// secondary:    colors.grey.lighten-1,
		// accent:       colors.red.accent-2,
		// info:         colors.blue.lighten-2,
		// warning:      colors.amber.darken-2,
		// error:        colors.red.accent-4,
		// success:      colors.green.lighten-2,
	
		// CUSTOM : cf https://vuetifyjs.com/en/theme-generator 
			//"#8E24AA", main purple
			//"#9c27b0", light purple
			//"#cf6c37", coral
		primary		: "#209A82", // jpy green
		secondary	: "#29c7a7", // jpy light green
		accent		: "#cf6c37", 
		error		: "#FF5252", 
		warning		: "#FFC107", 
		info		: "#26A69A", 
		success		: "#64DD17"
		 
		// DEFAULT
		// primary	: '#1976D2',
		// info		: '#2196F3',
		// secondary: '#424242',
		// accent	: '#82B1FF',
		// error	: '#FF5252',
		// success	: '#4CAF50',
		// warning	: '#FFC107'
	}
})

