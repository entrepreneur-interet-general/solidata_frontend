import Vue from 'vue'

Vue.filter('json', function(value) { 
	// console.log("json filter / value : ", value) ; 
	var pretty =  JSON.stringify(value, null, 2 );
	// console.log("json filter / pretty : ", pretty) ; 
	return pretty
} )
// Vue.filter('capitalize', val => "... from plugins/json_filter.js ..." )

Vue.filter('truncate', function(text, length, suffix) { 
	var truncated = null ; 
	if (text != null) {
		truncated = text.substring(0, length) + suffix; ; 
	}
	return truncated
} )