import _ from 'lodash'

const VALID_TYPES = [
  'string', 'int', 'number', 'alphanum', 'array', 'object', 'bool'
]

export default class Type {
  constructor(type) {
    if (VALID_TYPES.indexOf(type) === -1) {
      throw new Error('Invalid type')
    }

    this._type = type
  }

  errorString() {
    switch (this._type) {
      case 'string':
        return 'a string'
      case 'int':
        return 'of type int'
      case 'number':
        return 'a number'
      case 'alphanum':
        return 'alphanumerical'
      case 'array':
        return 'an array'
      case 'object':
        return 'an object'
      case 'bool':
        return 'a boolean'
      default:
        return 'a valid type'
    }
  }

  execute(value) {
    switch (this._type) {
      case 'string':
        return _.isString(value)
      case 'int':
        return _.isInteger(value)
      case 'number':
        return _.isNumber(value)
      case 'alphanum':
        return new RegExp(/^[a-z0-9]+$/i).test(value)
      case 'array':
        return _.isArray(value)
      case 'object':
        return _.isObject(value) && !_.isArray(value)
      case 'bool':
        return _.isBoolean(value)
      default:
        throw new Error('Invalid type')
    }
  }
}
