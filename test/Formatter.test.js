import Formatter from '../src/Formatter'

import * as Rules from '../src/rules'

test('It should format error strings for one rule', () => {
  const formatter = new Formatter({
    id: [new Rules.Type('int')],
    firstName: [new Rules.Type('alphanum')],
    email: [new Rules.Required()]
  })

  expect(formatter.formatList()).toEqual({
    id: ['Should be of type int'],
    firstName: ['Should be alphanumerical'],
    email: ['Is required']
  })
})
