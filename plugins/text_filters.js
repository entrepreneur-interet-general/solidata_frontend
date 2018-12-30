import Vue from 'vue'

import CheckValueType from "~/utils/checkValueType.js"

Vue.filter('json', function(value) { 
	// console.log("json filter / value : ", value) ; 
	var pretty =  JSON.stringify(value, null, 2 );
	// console.log("json filter / pretty : ", pretty) ; 
	return pretty
} )
// Vue.filter('capitalize', val => "... from plugins/json_filter.js ..." )


Vue.filter('date_str', function(date_raw) { 
	// console.log("date_str filter / date_raw : ", date_raw) ; 
	var clean_date = new Date(date_raw).toDateString() ;
	// console.log("date_str filter / clean_date : ", clean_date) ; 
	return clean_date
} )

Vue.filter('truncate', function(value, length, suffix, sep=" ") { 

	// console.log("\ntruncate filter / value : ", value) ;

	if ( value == undefined ){
		value = ""
	}

	var value_type = CheckValueType.getValType(value, sep) ; 
	// console.log("truncate filter / value_type : ", value_type ) ;

	var truncated = "" ; 

	if (value === null || value == undefined) {
		truncated = ''
	}
	else if (value_type.type === 'number'){
		truncated = value
	}
	else if (value_type.type === 'array'){
		truncated = value_type.as_str ;
	}
	else {
		truncated = value ;
	}

	if (truncated.length > length && length > 0 ){
		truncated = truncated.substring(0, length) + suffix; 
	}
	

	// console.log("truncate filter / truncated : ", truncated ) ;
	return truncated
} )