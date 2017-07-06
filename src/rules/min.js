import Length from './length'

export default class Min {
  constructor( options ) {
    this._options = options
    this._errorMsg = ''
  }

  name() {
    return 'Min'
  }

  execute( value ) {
    const lengthRule = new Length( { min: this._options } )

    return lengthRule.execute( value )
  }

  error() {
    return this._errorMsg
  }
}
