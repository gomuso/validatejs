import _ from 'lodash'

export default class Validator {
  constructor(errors, options = {}) {
    this._errors = errors
    this._options = options
  }

  /**
   * Check if the validation has failed
   *
   * @return {bool}
   */
  failed() {
    return !_.isEmpty(this._errors)
  }

  /**
   * Returns the errors in human readable format
   *
   * @return {Object}
   */
  errors() {
    const readable = {}

    _.forEach(this._errors, (rules, field) => {
      readable[field] = this._formatErrorsForField(field, rules)
    })

    return readable
  }

  /**
   * Creates an error string for a given field and set of rules
   *
   * @param  {string} field
   * @param  {array} rules
   * @return {string}
   */
  _formatErrorsForField(field, rules) {
    const errors = _.filter(rules, r => !_.isUndefined(r))

    const sorted = _.sortBy(errors, e => e.name() === 'Required').reverse()

    const length = sorted.length
    const mapErrors = _.map(sorted, e => e.error())
    const errorString = _.join(mapErrors, length === 2 ? ' and ' : ', ')

    const firstIsNotBlank = sorted[0].name() === 'Required'
    const firstPart = firstIsNotBlank ? ' ' : ' should be '

    let validation = this._formatFieldName(field)

    validation += firstPart

    validation += errorString

    // if firstIsNotBlank replace first and with and should be
    if (rules.length >= 2 && firstIsNotBlank) {
      validation = validation.replace('and', 'and should be')
    }

    return validation
  }

  /**
   * Formats a field name.
   * -> firstName => First name
   *
   * @param  {string} field
   * @return {string}
   */
  _formatFieldName(field) {
    if (_.get(this._options, field)) {
      return _.get(this._options, field)
    }

    const upperFirst = _.upperFirst(field)
    return upperFirst.split(/(?=[A-Z])/).join(' ')
  }
}
