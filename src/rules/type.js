import _ from 'lodash'

export default class Type {
  constructor( type ) {
    this._type = type
  }

  name() {
    return 'Type'
  }

  execute( value ) {
    switch ( this._type ) {
      case 'string':
        return _.isString( value )
      case 'int':
        return _.isInteger( value )
      case 'number':
        return _.isNumber( value )
      case 'array':
        return _.isArray( value )
      case 'object':
        return _.isObject( value ) && !_.isArray( value )
      case 'bool':
        return _.isBoolean( value )
      default:
        return false
    }
  }

  error() {
    return `of type ${ this._type }`
  }
}
