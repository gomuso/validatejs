import _ from 'lodash'

import AbstractRule from './AbstractRule'

const VALID_TYPES = [
  'string', 'int', 'number', 'alphanum', 'array', 'object', 'bool'
]

export default class Type extends AbstractRule {
  constructor(type) {
    super(type)

    if (VALID_TYPES.indexOf(type) === -1) {
      throw new Error('Invalid type')
    }

    this._type = type
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
