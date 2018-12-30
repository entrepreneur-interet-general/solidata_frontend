
const CheckValueType = {

	// cf : https://webbjocke.com/javascript-check-data-types/
	getValType (value_raw, sep="|") {

		// console.log("getValType / value_raw : ", value_raw ) ;
		
		var val_concat = value_raw ;
		var val_type = typeof value_raw ; 
		// console.log("getValType / val_type : ", val_type ) ;
		
		// join array
		if (value_raw != null ) {
			if (val_type === 'object' && value_raw.constructor === Array) {
				val_concat 	= val_concat.join(sep) ;
				val_type	= 'array'
			};
		}
		// console.log("getValType / val_concat : ", val_concat ) ;

		return { 
			value 	: value_raw, 
			as_str 	: (value_raw === null )? '' : val_concat.toString(),
			type 	: val_type 
		}
		
	}

}

export default CheckValueType