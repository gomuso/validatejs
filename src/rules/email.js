export default class Email {
  name() {
    return 'NotBlank'
  }

  execute( value ) {
    if ( !value || value === '' ) {
      return false
    }

    // eslint-disable-next-line
    const regex = new RegExp( /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ )

    return regex.test( value )
  }

  error() {
    return 'valid'
  }
}
