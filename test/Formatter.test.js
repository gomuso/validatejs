import Formatter from '../src/Formatter'

test('It should format error strings for one rule', () => {
  const formatter = new Formatter({
    id: 'type:int',
    firstName: 'type:alphanum',
    email: 'required'
  })

  expect(formatter.formatList()).toEqual({
    id: ['Should be of type int'],
    firstName: ['Should be alphanumerical'],
    email: ['Is required']
  })
})
