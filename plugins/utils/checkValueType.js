
const CheckValueType = {

  // cf : https://webbjocke.com/javascript-check-data-types/
  getValType (valueRaw, sep = '|') {
    // console.log("\ngetValType / valueRaw : ", valueRaw ) ;

    var valConcat = valueRaw
    var valType = typeof valueRaw
    // console.log("getValType / valType : ", valType ) ;

    // join array
    if (valueRaw != null) {
      if (valType === 'object' && valueRaw.constructor === Array) {
        valConcat = valConcat.join(sep)
        valType = 'array'
      };
    }
    // console.log("getValType / valConcat : ", valConcat ) ;

    return {
      value: valueRaw,
      as_str: (valueRaw === null) ? '' : valConcat.toString(),
      type: valType
    }
  }

}

export default CheckValueType
