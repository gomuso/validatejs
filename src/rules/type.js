import _ from 'lodash'

export default type => ( value ) => {
  switch ( type ) {
    case 'string':
      return _.isString( value )
    case 'int':
      return _.isInteger( value )
    case 'number':
      return _.isNumber( value )
    case 'array':
      return _.isArray( value )
    case 'object':
      return _.isObject( value )
    case 'bool':
      return _.isBoolean( value )
    default:
      return false
  }
}
