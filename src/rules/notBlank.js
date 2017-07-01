export default class NotBlank {
  name() {
    return 'NotBlank'
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
