import _ from 'lodash'

import Validator from '../src/Validator'

test.only('It should pass the validation', () => {
  const data = {
    id: 1,
    name: 'John',
    email: 'john@gmail.com',
    age: 23
  }

  const validation = Validator.check(data, {
    id: 'required, type:int',
    name: 'required, type:alphanum, min:2, max:10',
    email: 'required, email',
    age: 'required, type:int, min:10, max:50'
  })

  expect(validation.failed()).toBe(false)
})

test('Test the example on Readme', () => {
  const data = {
    id: 1,
    firstName: 'John_Doe',
    email: 'test@gmail.com',
    age: 25,
    luckyNumbers: [20, 12, 394, '8']
  }

  const validation = Validator.check(data, {
    id: 'required, type:int',
    firstName: 'required, type:alphanum, min:2, max:10',
    email: 'required, email',
    age: 'type:int, min:10, max:50',
    luckyNumbers: 'type:array',
    'luckyNumbers.*': 'type:int'
  })

  expect(validation.failed()).toBe(true)

  const errors = _.keys(validation.errors())
  expect(errors).toHaveLength(2)
  expect(errors).toEqual(['firstName', 'luckyNumbers.*'])
})

test('Do not validate non-required fields if they are not present', () => {
  const data = {
    id: '1'
  }

  const validation = Validator.check(data, {
    id: 'required, type:int',
    name: 'type:alphanum'
  })

  expect(validation.failed()).toBe(true)

  const errors = _.keys(validation.errors())
  expect(errors).toHaveLength(1)
  expect(errors[0]).toBe('id')
})

test('Validate non-required fields if they are present', () => {
  const data = {
    name: 'John#Doe'
  }

  const validation = Validator.check(data, {
    name: 'type:alphanum'
  })

  expect(validation.failed()).toBe(true)

  const errors = _.keys(validation.errors())
  expect(errors).toHaveLength(1)
  expect(errors[0]).toBe('name')
})

test('Validate required fields', () => {
  const data = {
    id: 1,
    name: 'John',
    age: 54
  }

  const validation = Validator.check(data, {
    id: 'required, type:int',
    name: 'required, type:alphanum, min:2, max:10',
    email: 'required, email',
    age: 'required, type:int, min:10, max:50'
  })

  expect(validation.failed()).toBe(true)

  const errors = _.keys(validation.errors())
  expect(errors).toHaveLength(2)
  expect(errors).toEqual(['email', 'age'])
})

test('Validate simple nested fields', () => {
  const data = {
    dates: [20170303, 20172009, '20183030']
  }

  const validation = Validator.check(data, {
    dates: 'required, type:array, min:1',
    'dates.*': 'type:int'
  })

  expect(validation.failed()).toBe(true)

  const errors = _.keys(validation.errors())
  expect(errors).toHaveLength(1)
  expect(errors).toEqual(['dates.*'])
})
