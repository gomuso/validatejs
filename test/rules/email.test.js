import { Email } from '../../src/rules'

test('it tests an email address', () => {
  expect((new Email()).execute('john.com')).toBe(false)
  expect((new Email()).execute('j#;ba.com')).toBe(false)
  expect((new Email()).execute('j#;ba.com')).toBe(false)

  expect((new Email()).execute('john@doe.com')).toBe(true)
  expect((new Email()).execute('john.doe@gmail.com')).toBe(true)
  expect((new Email()).execute('john_doe@gmx.de')).toBe(true)
  expect((new Email()).execute('12john_doe@gmx.de')).toBe(true)
  expect((new Email()).execute('john-doe12@gmx.de')).toBe(true)
})
