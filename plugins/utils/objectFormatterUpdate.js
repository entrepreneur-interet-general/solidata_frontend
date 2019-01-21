import Vue from 'vue'

// const ObjectFormatterUpdate = {

Vue.prototype.$prepareFormDataUpdate = (formData) => {
  console.log('\nprepareFormData / formData : ', formData)

  var FormDataMarshalled = []

  for (var key in formData) {
    var rawField = {
      'field_to_update': key,
      'field_value': formData[key]
    }
    FormDataMarshalled.push(rawField)
  } ;

  return FormDataMarshalled
}
// }

// export default ObjectFormatterUpdate
