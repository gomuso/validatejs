export default () => ( value ) => {
  if ( !value || value === '' ) {
    return false
  }

  return true
}
