import _ from 'lodash'

import * as rules from './rules'

export default class RuleParser {
  /**
   * Takes in a rule object and parses it to the correct rule function
   * For example: { min: 10 } => rule min(10)
   *
   * @param  {Object} ruleObject
   * @return {array}
   */
  static parseRuleObject(ruleObject) {
    if (!ruleObject) {
      return []
    }

    return _.chain(ruleObject)
            .map((args, rule) => this.getRule(rule, args))
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
