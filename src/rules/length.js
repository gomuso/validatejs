import _ from 'lodash'

export default options => ( value ) => {
    // if value is an array
  if ( _.isArray( value ) ) {
    return value.length === options
  }

  const valLength = value.toString().length

  if ( _.isInteger( options ) ) {
    return valLength.length === options
  }

  if ( _.isObject( options ) ) {
    const { min, max } = options

    const executed = [
      min ? valLength === min : true,
      max ? valLength === max : true
    ]

    return _.every( executed, true )
  }

  return true
}
