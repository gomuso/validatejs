import Formatter from '../src/Formatter'

import * as Rules from '../src/rules'

test('It should format error lists for one rule', () => {
  const formatter = new Formatter({
    id: [new Rules.Type('int')],
    firstName: [new Rules.Type('alphanum')],
    email: [new Rules.Required()]
  })

  expect(formatter.asList()).toEqual({
    id: ['of type int'],
    firstName: ['alphanumerical'],
    email: ['is required']
  })
})

test('It should format error lists for multiple rules', () => {
  const formatter = new Formatter({
    id: [new Rules.Type('int'), new Rules.Length({ min: 1 })]
  })

  expect(formatter.asList()).toEqual({
    id: ['of type int', 'minimum 1']
  })
})

test('It should format an error sentence for one rule', () => {
  const formatter = new Formatter({
    id: [new Rules.Type('int')],
    firstName: [new Rules.Type('alphanum')],
    email: [new Rules.Required()]
  })

  expect(formatter.asSentence()).toEqual({
    id: 'Id should be of type int',
    firstName: 'First name should be alphanumerical',
    email: 'Email is required'
  })
})

test('It should format an error sentence for two rules', () => {
  const formatter = new Formatter({
    id: [new Rules.Type('int'), new Rules.Length({ min: 1 })],
    firstName: [
      new Rules.Type('alphanum'),
      new Rules.Length({ max: 10 }, 'string')
    ]
  })

  expect(formatter.asSentence()).toEqual({
    id: 'Id should be of type int and minimum 1',
    firstName: 'First name should be alphanumerical and maximum 10 chars'
  })
})

test.only('It should format an error sentence for more than two rules', () => {
  const formatter = new Formatter({
    id: [
      new Rules.Type('int'),
      new Rules.Length({ min: 1 }),
      new Rules.Length({ max: 5 })
    ],
    firstName: [
      new Rules.Type('alphanum'),
      new Rules.Length({ min: 2 }, 'string'),
      new Rules.Length({ max: 10 }, 'string')
    ],
    lastName: [new Rules.Required(), new Rules.Length({ min: 2 }, 'string')],
    anotherField: [
      new Rules.Required(),
      new Rules.Length({ min: 2 }, 'string'),
      new Rules.Length({ max: 10 }, 'string')
    ]
  })

  expect(formatter.asSentence()).toEqual({
    id: 'Id should be of type int, minimum 1 and maximum 5',
    firstName:
      'First name should be alphanumerical, minimum 2 chars and maximum 10 chars',
    lastName: 'Last name is required and should be minimum 2 chars',
    anotherField:
      'Another field is required and should be minimum 2 chars and maximum 10 chars'
  })
})

test('It should use custom field names for error sentences', () => {
  const formatter = new Formatter(
    {
      id: [new Rules.Type('int')],
      dob: [new Rules.Required()]
    },
    {
      id: 'Identification',
      dob: 'Date of birth'
    }
  )

  expect(formatter.asSentence()).toEqual({
    id: 'Identification should be of type int',
    dob: 'Date of birth is required'
  })
})

test('It should use custom error messages for error sentences', () => {
  const formatter = new Formatter(
    {
      id: [new Rules.Type('int')],
      dob: [new Rules.Required()]
    },
    null,
    {
      id: 'Id is required and has to be valid',
      dob: 'Date of birth is required and has to be MM/DD/YYYY'
    }
  )

  expect(formatter.asSentence()).toEqual({
    id: 'Id is required and has to be valid',
    dob: 'Date of birth is required and has to be MM/DD/YYYY'
  })
})
