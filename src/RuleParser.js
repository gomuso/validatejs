import _ from 'lodash'

import * as rules from './rules'

export default class RuleParser {
  /**
   * Takes in a rule string and parses it to the correct rule function
   * For example: min:10 => rule min(10)
   *
   * @param  {string} ruleString
   * @return {array}
   */
  static parseString(ruleString) {
    if (!ruleString) {
      return []
    }

    return _.chain(ruleString)
            .split(',')
            .map((x) => {
              const split = x.trim().split(':')
              const args = split[1] ? split[1].trim() : null

              return {
                string: x.trim(),
                func: this.getRule(split[0], args)
              }
            })
            .filter()
            .value()
  }

  /**
   * Simple mapping between rule name and the right function
   *
   * @param  {string}   rule
   * @param  {string}   args
   * @return {Function}
   */
  static getRule(rule, args) {
    switch (rule) {
      case 'required':
        return new rules.Required()
      case 'min':
        return new rules.Length({ min: args })
      case 'max':
        return new rules.Length({ max: args })
      case 'type':
        return new rules.Type(args)
      case 'email':
        return new rules.Email()
      default:
        return null
    }
  }
}
