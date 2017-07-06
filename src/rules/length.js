import _ from 'lodash'

export default class Length {
  constructor( options ) {
    this._options = options
    this._errorMsg = ''
  }

  name() {
    return 'Length'
  }

  execute( value ) {
    const { min, max } = this._options

    // check for array length
    if ( _.isArray( value ) ) {
      this._errorMsg = `length of ${ this._options }`

      if ( min ) {
        return value.length >= min
      }

      return value.length <= max
    }


    // check for number min and max
    if ( _.isNumber( value ) ) {
      if ( min ) {
        return value >= min
      }

      return value <= max
    }

    // check for string length
    if ( _.isString( value ) ) {
      if ( min ) {
        return value.length >= min
      }

      return value.length <= max
    }

    return true
  }

  error() {
    return this._errorMsg
  }
}
