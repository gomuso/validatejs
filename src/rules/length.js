import _ from 'lodash'

import AbstractRule from './AbstractRule'

export default class Length extends AbstractRule {
  constructor({ min = null, max = null }) {
    super()

    this._min = min
    this._max = max
  }

  execute(value) {
    const min = this._min
    const max = this._max

    // check for minimum values
    if (min) {
      if (_.isArray(value)) {
        return value.length >= min
      }

      if (_.isNumber(value)) {
        return value >= min
      }

      if (_.isString(value)) {
        return value.length >= min
      }
    }

    // check for maximum values
    if (max) {
      if (_.isArray(value)) {
        return value.length <= max
      }

      if (_.isNumber(value)) {
        return value <= max
      }

      if (_.isString(value)) {
        return value.length <= max
      }
    }

    return true
  }
}
