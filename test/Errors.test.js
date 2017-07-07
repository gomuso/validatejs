import Errors from '../src/Errors'
import * as Rules from '../src/rules'

describe('Check if a validation failed', () => {
  test('it passes the validation', () => {
    const errors = new Errors()
    expect(errors.failed()).toBe(false)

    const errors2 = new Errors({})
    expect(errors2.failed()).toBe(false)
  })

  test('it fails the validation', () => {
    const errors = new Errors({ id: 1 })
    expect(errors.failed()).toBe(true)
  })
})

describe('Return readable errors', () => {
  test('it returns readable errors for a single validation error', () => {
    const errors = new Errors({ id: [new Rules.Required()] })
    const errors2 = new Errors({ age: [new Rules.Type('int')] })

    expect(errors.errors()).toEqual({
      id: 'Id is required'
    })

    expect(errors2.errors()).toEqual({
      age: 'Age should be of type int'
    })
  })
})

test('Overwrite field names in error messages', () => {
  const errors = new Errors({
    dob: [new Rules.Required()]
  }, { dob: 'Date of birth' })

  expect(errors.errors()).toEqual({
    dob: 'Date of birth is required'
  })
})

test('Set custom error messages', () => {
  const errors = new Errors({
    dob: [new Rules.Required()]
  }, {}, { dob: 'Please provide your date of birth' })

  expect(errors.errors()).toEqual({
    dob: 'Please provide your date of birth'
  })
})
