import _ from 'lodash'

export default class Validator {
  constructor( errors ) {
    this._errors = errors
  }

  failed() {
    return !_.isEmpty( this._errors )
  }
}
