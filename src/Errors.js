import _ from 'lodash'

export default class Validator {
  constructor( errors, options = {} ) {
    this._errors = errors
    this._options = options
  }

  /**
   * Check if the validation has failed
   *
   * @return {bool}
   */
  failed() {
    return !_.isEmpty( this._errors )
  }

  /**
   * Returns the errors in human readable format
   *
   * @return {Object}
   */
  errors() {
    const readable = {}

    _.forEach( this._errors, ( rules, field ) => {
      readable[ field ] = this._formatErrorsForField( field, rules )
    } )

    return readable
  }

  _formatErrorsForField( field, rules ) {
    const errors = _.filter( rules, r => !_.isUndefined( r ) )

    const sorted = _.sortBy( errors, e => e.name() === 'NotBlank' ).reverse()

    const length = sorted.length
    const mapErrors = _.map( sorted, e => e.error() )
    const errorString = _.join( mapErrors, length === 2 ? ' and ' : ', ' )

    const firstPart = sorted[ 0 ].name() === 'NotBlank' ? '' : ' should be'

    return `${ this.formatFieldName( field ) }${ firstPart } ${ errorString }`
  }

  formatFieldName( field ) {
    if ( _.get( this._options, field ) ) {
      return _.get( this._options, field )
    }

    const upperFirst = _.upperFirst( field )
    const split = upperFirst.split( /(?=[A-Z])/ ).join( ' ' )

    return split
  }
}
