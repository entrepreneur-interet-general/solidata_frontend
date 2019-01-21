import Vue from 'vue'

// import CheckValueType from '~/plugins/utils/checkValueType.js'

const getValType = (valueRaw, sep = '|') => {
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

Vue.filter('json', function (value) {
  // console.log("> > > plugin json filter / value : ", value) ;
  var pretty = JSON.stringify(value, null, 2)
  // console.log("> > > plugin json filter / pretty : ", pretty) ;
  return pretty
})
// Vue.filter('capitalize', val => "... from plugins/json_filter.js ..." )

Vue.filter('date_str', function (dateRaw) {
  // console.log("> > > plugin date_str filter / dateRaw : ", dateRaw) ;
  var cleanDate = new Date(dateRaw).toDateString()
  // console.log("> > > plugin date_str filter / cleanDate : ", cleanDate) ;
  return cleanDate
})

Vue.filter('truncate', function (value, length, suffix, sep = ' ') {
  // console.log("\n> > > plugin truncate filter / value : ", value) ;

  if (value === undefined) {
    value = ''
  }

  var valueType = getValType(value, sep)
  // console.log("> > > plugin truncate filter / valueType : ", valueType ) ;

  var truncated = ''

  if (value === null || value === undefined) {
    truncated = ''
  } else if (valueType.type === 'number') {
    truncated = value
  } else if (valueType.type === 'array') {
    truncated = valueType.as_str
  } else {
    truncated = value
  }

  if (truncated.length > length && length > 0) {
    truncated = truncated.substring(0, length) + suffix
  }

  // console.log("> > > plugin truncate filter / truncated : ", truncated ) ;
  return truncated
})
