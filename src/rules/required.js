import AbstractRule from './AbstractRule'

export default class Required extends AbstractRule {
  execute(value) {
    if (!value || value === '') {
      return false
    }

    return true
  }
}
