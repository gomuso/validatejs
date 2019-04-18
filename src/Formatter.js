import _ from 'lodash'

export default class Formatter {
  /**
   * @param  {Object} errors
   * @param  {Object} fieldNames
   * @param  {Object} errorMessages
   */
  constructor(errors, fieldNames = {}, errorMessages = {}) {
    this._errors = errors
    this._fieldNames = fieldNames
    this._errorMessages = errorMessages
  }

  /**
   * Formats errors as list so the user can concat pieces themselves.
   *
   * @return {Object}
   */
  asList() {
    const returnErros = {}

    _.forEach(this._errors, (errors, field) => {
      returnErros[field] = _.map(errors, e => e.errorString())
    })

    return returnErros
  }

  /**
   * Returns the validation errors as sentence
   *
   * @return {Object}
   */
  asSentence() {
    const returnErros = {}

    _.forEach(this._errors, (errors, field) => {
      const fieldName = this._formatFieldName(field)

      const rules = _.map(errors, e => e.constructor.name)
      const isRequired = rules.indexOf('Required') > -1

      const totalRules = errors.length

      const errorsAsStrings = _.chain(errors)
        .map((e, i) => {
          const er = e.errorString()
          if (isRequired) {
            if (i === 0) {
              return [er, ' and should be ']
            } else if (i === 1 && i < totalRules - 1) {
              return [er, ' and ']
            }

            return i < totalRules - 1 ? [er, ', '] : [er]
          }

          if (i === 0) {
            return ['should be ', er]
          }

          if (totalRules > 2) {
            if (i > 0 && i < totalRules - 1) {
              return [', ', er]
            }
            return [' and ', er]
          }
          return [' and ', er]
        })
        .flatten()
        .join('')
        .value()

      const errorString = `${fieldName} ${errorsAsStrings}`

      returnErros[field] = errorString

      // or just overwrite if we have a custom message
      if (_.get(this._errorMessages, field)) {
        returnErros[field] = _.get(this._errorMessages, field)
      }
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
    const name = field
      .split(/(?=[A-Z])/)
      .join(' ')
      .toLowerCase()
    return _.upperFirst(name)
  }

  _replaceLast(x, y, z) {
    const a = x.split('')
    a[x.lastIndexOf(y)] = z
    return a.join('')
  }
}
