export default class AbstractRule {
  constructor(args) {
    this._errorString = ''
    this._args = args
  }

  get args() {
    return this._args
  }
}
