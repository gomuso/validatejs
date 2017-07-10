import AbstractRule from './AbstractRule'

export default class Email extends AbstractRule {
  constructor() {
    super('email', 'valid')
  }

  execute(value) {
    if (!value || value === '') {
      return false
    }

    // eslint-disable-next-line
    const regex = new RegExp( /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ )

    return regex.test(value)
  }
}
