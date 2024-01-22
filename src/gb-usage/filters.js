import Vue from 'vue'
import _ from 'lodash'
import { format, fromUnixTime, isDate } from 'date-fns'
import { UNITS } from '../commons/constants'

/* define customized filters here */

Vue.filter('nameFromCode', function (value, array) {
  let type = _.find(array, (x) => x.code === value)
  if (type) {
    return type.name
  } else {
    return ''
  }
})

//timestamp in seconds
Vue.filter('customDatetime', function (timestampVal) {
  const _date = fromUnixTime(timestampVal)
  if (isDate(_date)) {
    return format(_date, 'yyyy/MM/dd hh:mmaaa')
  } else {
    return ''
  }
})

Vue.filter('unitName', function (val, mesureType) {
  const unitsByType = UNITS[mesureType]
  if (unitsByType && unitsByType.length > 0) {
    const unit = unitsByType.find((x) => x.code === val)
    return unit ? unit.name : ''
  } else {
    return ''
  }
})
