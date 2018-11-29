const ObjectFormatterCreate = {

	prepareFormData (formData) {
			
		console.log("\nprepareFormData / formData : ", formData)

		var FormDataMarshalled = {} ;

		for (var parentField in formData) {
			console.log("\nprepareFormData / parentField : ", parentField)
			
			for (var subField in formData[parentField]) {
				console.log("\nprepareFormData / subField : ", subField)
				// var raw_field = {
				// "field_to_update" 	: subField,
				// "field_value" 		: formData[subField]
				// };
				FormDataMarshalled[subField] = formData[parentField][subField]
			}
		} ;

		console.log("\nprepareFormData / FormDataMarshalled : ", FormDataMarshalled)
		return FormDataMarshalled
	},
}

export default ObjectFormatterCreate