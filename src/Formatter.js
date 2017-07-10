import _ from 'lodash'

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
    const returnErros = {}

    _.forEach(this._errors, (errors, field) => {
      const fieldName = this._formatFieldName(field)

      const errorStrings = _.map(errors, e => e.errorString())

      console.log(fieldName, errorStrings)
    })


    // return _.map(this._errors, ( errors, field ) => {
    //   _.forEach( errors, e => {


    //     console.log( this._formatFieldName( field ), e.errorString() )
    //   } )
    //   // return e.errorString
    // })
  }


  /**
   * Formats a field name into a human readable format
   * -> firstName => First name
   *
   * If a custom field name is given, we'll use that one instead.
   *
   * @param  {string} field
   * @return {string}
   */
  _formatFieldName(field) {
    if (_.get(this._fieldNames, field)) {
      return _.get(this._fieldNames, field)
    }

    // nested object
    if (field.indexOf('.*.') > -1) {
      const splitField = field.split('.*.')
      const getArrayField = _.first(splitField)
      const getObjectKey = _.last(splitField)

      return `Item ${getObjectKey} in ${getArrayField}`
    }

    // nested array
    if (field.indexOf('*') > -1) {
      const stripped = field.replace('.*', '')

      return `Elements in ${stripped}`
    }

    // standard
    const upperFirst = _.upperFirst(field)
    return upperFirst.split(/(?=[A-Z])/).join(' ')
  }
}
