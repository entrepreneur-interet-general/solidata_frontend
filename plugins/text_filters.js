import Vue from 'vue'

import CheckValueType from "~/utils/checkValueType.js"

Vue.filter('json', function(value) { 
	// console.log("json filter / value : ", value) ; 
	var pretty =  JSON.stringify(value, null, 2 );
	// console.log("json filter / pretty : ", pretty) ; 
	return pretty
} )
// Vue.filter('capitalize', val => "... from plugins/json_filter.js ..." )



Vue.filter('truncate', function(value, length, suffix, sep=" ") { 

	// console.log("\ntruncate filter / value : ", value) ;

	var value_type = CheckValueType.getValType(value, sep) ; 
	// console.log("truncate filter / value_type : ", value_type ) ;

	var truncated ; 

	if (value === null ) {
		truncated = ''
	}
	else if (value_type.type === 'number'){
		truncated = value
	}
	else {
		truncated = value_type.as_str ;

		if (truncated.length > length && length > 0 ){
			truncated = truncated.substring(0, length) + suffix; 
		}
	}

	// console.log("truncate filter / truncated : ", truncated ) ;
	return truncated
} )