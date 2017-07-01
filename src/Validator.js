import _ from 'lodash'

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

    _.forEach( validate, ( rules, field ) => {
      errors[ field ] = []

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
