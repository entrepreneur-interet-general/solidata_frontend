import Vue from 'vue'

// const ObjectFormatterCreate = {

Vue.prototype.$prepareFormData = (formData) => {
  console.log('\nObjectFormatterCreate / formData : ', formData)

  let FormDataMarshalled = {}

  for (const parentField in formData) {
    console.log('ObjectFormatterCreate / parentField : ', parentField)

    for (const subField in formData[parentField]) {
      console.log('ObjectFormatterCreate / subField : ', subField)
      // var raw_field = {
      // "field_to_update" : subField,
      // "field_value" : formData[subField]
      // };
      FormDataMarshalled[subField] = formData[parentField][subField]
    }
  } ;

  console.log('ObjectFormatterCreate / FormDataMarshalled : ', FormDataMarshalled)
  return FormDataMarshalled
}
// }

// export default ObjectFormatterCreate
