import _ from 'lodash'

export default class Length {
  constructor({ min = null, max = null }) {
    this._min = min
    this._max = max
  }

  errorString() {
    return this._errorString
  }

  execute(value) {
    const min = this._min
    const max = this._max

    // check for minimum values
    if (min) {
      if (_.isArray(value)) {
        this._errorString = `at least ${min} items`
        return value.length >= min
      }

      if (_.isNumber(value)) {
        this._errorString = `minimum ${min}`
        return value >= min
      }

      if (_.isString(value)) {
        this._errorString = `at least ${min} chars`
        return value.length >= min
      }
    }

    // check for maximum values
    if (max) {
      if (_.isArray(value)) {
        this._errorString = `maximum ${max} items`
        return value.length <= max
      }

      if (_.isNumber(value)) {
        this._errorString = `maximum ${max}`
        return value <= max
      }

      if (_.isString(value)) {
        this._errorString = `maximum ${max} chars`
        return value.length <= max
      }
    }

    return true
  }
}
