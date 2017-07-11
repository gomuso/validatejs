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
      returnErros[field] = _.map(errors, e => e.errorString())
    })

    return returnErros
  }

  formatSentence() {
    const returnErros = {}

    _.forEach(this._errors, (errors, field) => {
      const fieldName = this._formatFieldName(field)

      const rules = _.map(errors, e => e.constructor.name)
      const isRequired = rules.indexOf('Required') > -1

      const totalRules = errors.length

      const errorsAsStrings = _.map(errors, e => e.errorString())
                               .join(totalRules === 2 ? ' and ' : ', ')
      const firstJoin = isRequired ? '' : ' should be'
      let errorString = `${fieldName}${firstJoin} ${errorsAsStrings}`

      if (totalRules > 2) {
        errorString = this._replaceLast(errorString, ',', ' and')
      }

      returnErros[field] = errorString
    })

    return returnErros
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
    const name = field.split(/(?=[A-Z])/).join(' ').toLowerCase()
    return _.upperFirst(name)
  }

  _replaceLast(x, y, z) {
    const a = x.split('')
    a[x.lastIndexOf(y)] = z
    return a.join('')
  }
}
