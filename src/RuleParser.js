import _ from 'lodash'

import * as rules from './rules'

export default class RuleParser {
  static parseString = ( ruleString ) => {
    if ( !ruleString ) {
      return []
    }

    return _.chain( ruleString )
            .split( ',' )
            .map( ( x ) => {
              const split = x.trim().split( ':' )

              return { rule: split[ 0 ], args: split[ 1 ] }
            } )
            .map( ( { rule, args } ) => {
              if ( rule === 'required' ) {
                return new rules.Required()
              } else if ( rule === 'min' ) {
                return new rules.Min( args )
              } else if ( rule === 'max' ) {
                return new rules.Max( args )
              } else if ( rule === 'type' ) {
                return new rules.Type( args )
              } else if ( rule === 'email' ) {
                return new rules.Email()
              }

              return null
            } )
            .value()
  }
}
