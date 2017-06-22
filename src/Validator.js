import _ from 'lodash'

export default class Validator {
  // eslint-disable-next-line
  static check( data, validate, options ) {
    const errors = {}

    _.forEach( validate, ( rules, field ) => {
      const executed = _.map( rules, rule => rule( _.get( data, field ) ) )

      if ( !_.every( executed, true ) ) {
        errors[ field ] = 'error!'
      }
    } )

    return errors
  }
}
