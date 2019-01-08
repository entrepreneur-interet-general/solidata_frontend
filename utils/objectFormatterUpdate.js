const ObjectFormatterUpdate = {

	prepareFormData (formData) {
			
		console.log("\nprepareFormData / formData : ", formData)

		var FormDataMarshalled = [] ;

		for (var key in formData) {
			var raw_field = {
				"field_to_update" 	: key,
				"field_value" 		: formData[key]
			};
			FormDataMarshalled.push(raw_field)
		} ;

		return FormDataMarshalled
	},
}

export default ObjectFormatterUpdate