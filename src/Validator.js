import _ from 'lodash'

import RuleParser from './RuleParser'
import Formatter from './Formatter'
import { Required } from './rules'

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

    _.forEach(validate, (ruleObject, field) => {
      const isRequired = _.has(ruleObject, 'required')
      const isNested = field.indexOf('*') > -1
      const isNestedObject = field.indexOf('.*.') > -1

      if (!isRequired && !_.get(data, field) && !isNested && !isNestedObject) {
        return
      }

      if (isRequired && !_.get(data, field) && !isNested && !isNestedObject) {
        errors[field] = [new Required()]
        return
      }

      const currentErrors = errors[field] || []

      const rules = RuleParser.parseRuleObject(ruleObject)

      _.forEach(rules, (rule) => {
        if (isNestedObject) {
          const splitField = field.split('.*.')
          const getArrayField = _.first(splitField)
          const getObjectKey = _.last(splitField)

          if (_.isArray(_.get(data, getArrayField))) {
            const truthy = _.map(_.get(data, getArrayField), f =>
              rule.execute(_.get(f, getObjectKey))
            )
            const passed = _.filter(truthy, t => !t).length === 0

            if (!passed) {
              errors[field] = [...currentErrors, rule]
            }
          }
        } else if (isNested) {
          const getOriginalField = field.replace('.*', '')

          if (_.isArray(_.get(data, getOriginalField))) {
            const truthy = _.map(_.get(data, getOriginalField), i => rule.execute(i))
            const passed = _.filter(truthy, t => !t).length === 0

            if (!passed) {
              errors[field] = [...currentErrors, rule]
            }
          }
        } else {
          const truthy = rule.execute(_.get(data, field))

          if (!truthy) {
            errors[field] = [...currentErrors, rule]
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
    return this._errors && !_.isEmpty(this._errors)
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
