import _ from 'lodash'

import RuleParser from './RuleParser'
import Errors from './Errors'
import { Required } from './rules'

export default class Validator {
  /**
   * check rules for given data
   *
   * @param  {Object}  data
   * @param  {array}   validate
   * @param  {Object}  customFieldNames
   * @param  {Object}  customErrorMessages
   * @return {Errors}
   */
  static check(data, validate, customFieldNames, customErrorMessages) {
    const errors = {}

    _.forEach(validate, (ruleString, field) => {
      const isRequired = ruleString.indexOf('required') > -1
      const isNested = field.indexOf('*') > -1

      if (!isRequired && !_.get(data, field) && !isNested) {
        return
      }

      if (isRequired && !_.get(data, field) && !isNested) {
        errors[field] = [new Required()]
        return
      }

      const currentErrors = errors[field] || []

      const rules = RuleParser.parseString(ruleString)

      _.forEach(rules, (Rule) => {
        if (isNested) {
          const getOriginalField = field.replace('.*', '')

          if (_.isArray(_.get(data, getOriginalField))) {
            const truthy = _.map(_.get(data, getOriginalField), i => Rule.execute(i))
            const passed = _.filter(truthy, t => !t).length === 0

            if (!passed) {
              errors[field] = [...currentErrors, Rule]
            }
          }
        } else {
          const truthy = Rule.execute(_.get(data, field))

          if (!truthy) {
            errors[field] = [...currentErrors, Rule]
          }
        }
      })
    })

    return new Errors(errors, customFieldNames, customErrorMessages)
  }
}
