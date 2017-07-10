import _ from 'lodash'

import RuleParser from './RuleParser'
import Formatter from './Formatter'

export default class Validator {
  /**
   * @param  {Object} errors
   * @param  {Object} customFieldNames
   * @param  {Object} customErrorMessages
   */
  constructor(errors, customFieldNames = null, customErrorMessages = null) {
    this._errors = errors

    this._formatter = new Formatter(errors, customFieldNames, customErrorMessages)
  }

  /**
   * check rules for given data
   *
   * @param  {Object}  data
   * @param  {Object}  validate
   * @param  {Object}  customFieldNames
   * @param  {Object}  customErrorMessages
   * @return {Errors}
   */
  static check(data, validate, customFieldNames = null, customErrorMessages = null) {
    const errors = {}

    _.forEach(validate, (ruleString, field) => {
      const isRequired = ruleString.indexOf('required') > -1
      const isNested = field.indexOf('*') > -1
      const isNestedObject = field.indexOf('.*.') > -1

      if (!isRequired && !_.get(data, field) && !isNested && !isNestedObject) {
        return
      }

      if (isRequired && !_.get(data, field) && !isNested && !isNestedObject) {
        errors[field] = [ruleString]
        return
      }

      const currentErrors = errors[field] || []

      const rules = RuleParser.parseString(ruleString)

      _.forEach(rules, (rule) => {
        if (isNestedObject) {
          const splitField = field.split('.*.')
          const getArrayField = _.first(splitField)
          const getObjectKey = _.last(splitField)

          if (_.isArray(_.get(data, getArrayField))) {
            const truthy = _.map(_.get(data, getArrayField), f =>
              rule.func.execute(_.get(f, getObjectKey))
            )
            const passed = _.filter(truthy, t => !t).length === 0

            if (!passed) {
              errors[field] = [...currentErrors, rule.func]
            }
          }
        } else if (isNested) {
          const getOriginalField = field.replace('.*', '')

          if (_.isArray(_.get(data, getOriginalField))) {
            const truthy = _.map(_.get(data, getOriginalField), i => rule.func.execute(i))
            const passed = _.filter(truthy, t => !t).length === 0

            if (!passed) {
              errors[field] = [...currentErrors, rule.func]
            }
          }
        } else {
          const truthy = rule.func.execute(_.get(data, field))

          if (!truthy) {
            errors[field] = [...currentErrors, rule.func]
          }
        }
      })
    })

    return new Validator(errors, customFieldNames, customErrorMessages)
  }

  /**
   * Check if the current validation failed
   *
   * @return {bool}
   */
  failed() {
    return this._errors && _.keys(this._errors) > 0
  }

  /**
   * Return the errors for the current validation
   *
   * @return {Object}
   */
  errors() {
    return this._errors
  }

  /**
   * Returns the formatted errors using the formatter
   *
   * @return {Object}
   */
  format() {
    return this._formatter.formatList()
  }
}
