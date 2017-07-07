import Length from './length'

export default class Max {
  constructor(options) {
    this._options = options
    this._errorMsg = ''
  }

  name() {
    return 'Max'
  }

  execute(value) {
    const lengthRule = new Length({ max: this._options })

    return lengthRule.execute(value)
  }

  error() {
    return this._errorMsg
  }
}
