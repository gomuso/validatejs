export default class Required {
  name() {
    return 'Required'
  }

  execute( value ) {
    if ( !value || value === '' ) {
      return false
    }

    return true
  }

  error() {
    return 'is required'
  }
}
