import _ from 'lodash'

import RuleParser from './RuleParser'
import Errors from './Errors'

export default class Validator {
  /**
   * check rules for given data
   *
   * @param  {Object}  data
   * @param  {array}   validate
   * @param  {Options} options
   * @return {Errors}
   */
  // eslint-disable-next-line
  static check( data, validate, options ) {
    const errors = {}

    _.forEach( validate, ( ruleString, field ) => {
      errors[ field ] = []

      const rules = RuleParser.parseString( ruleString )

      _.forEach( rules, ( Rule ) => {
        const truthy = Rule.execute( _.get( data, field ) )

        if ( !truthy ) {
          errors[ field ] = [ ...errors[ field ], Rule ]
        }
      } )
    } )

    return new Errors( errors, options )
  }
}
