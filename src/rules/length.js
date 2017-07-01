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
    // if value is an array
    if ( _.isArray( value ) ) {
      this._errorMsg = `length of ${ this._options }`
      return value.length === this._options
    }

    const valLength = value.toString().length

    if ( _.isInteger( this._options ) ) {
      this._errorMsg = `length of ${ this._options }`
      return valLength === this._options
    }

    if ( _.isObject( this._options ) ) {
      const { min, max } = this._options

      if ( min && !max ) {
        this._errorMsg = `minimum length of ${ min }`
      }

      if ( max && !min ) {
        this._errorMsg = `minimum length of ${ max }`
      }

      if ( min && max ) {
        this._errorMsg = `between ${ min } and ${ max } characters long`
      }

      const executed = [
        min ? valLength >= min : true,
        max ? valLength <= max : true
      ]

      return _.every( executed, e => e === true )
    }

    return true
  }

  error() {
    return this._errorMsg
  }
}
