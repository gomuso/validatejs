export default class Formatter {
  /**
   * @param  {Object} errors
   * @param  {Object} fieldNames
   * @param  {Object} errorMessages
   */
  constructor(errors, fieldNames = null, errorMessages = null) {
    this._errors = errors
    this._fieldNames = fieldNames
    this._errorMessages = errorMessages
  }

  /**
   * Formats errors
   * @return {Object}
   */
  formatList() {
    return this._errors
  }
}
