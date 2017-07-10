export default class Required {
  errorString() {
    return 'is required'
  }

  execute(value) {
    if (!value || value === '') {
      return false
    }

    return true
  }
}
