
const ObjectCleaner = {

  replaceUndefinedOrNull (key, value) {
    if (value === null || value === undefined || value.length === 0 || value === '') {
      return undefined
    }
    return value
  },

  returnCleanObject (rawObject) {
    console.log('\n// returnCleanObject ... ')
    console.log('// returnCleanObject / rawObject : ', rawObject)

    var stringyfiedObject = JSON.stringify(rawObject, this.replaceUndefinedOrNull)
    var cleanObject = JSON.parse(stringyfiedObject)
    console.log('// returnCleanObject / cleanObject : ', cleanObject)

    return cleanObject
  }
}

export default ObjectCleaner
