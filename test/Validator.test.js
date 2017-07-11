import _ from 'lodash'

import Validator from '../src/Validator'

test('It should pass the validation', () => {
  const data = {
    id: 1,
    name: 'John',
    email: 'john@gmail.com',
    age: 23,
    numbers: [1, 2, 3, 4],
    links: [
      { id: 1, url: 'www.google.com' }
    ]
  }

  const validation = Validator.check(data, {
    id: { required: true, type: 'int' },
    name: { required: true, type: 'alphanum', min: 2, max: 10 },
    email: { required: true, email: true },
    age: { required: true, type: 'int', min: 10, max: 50 },
    numbers: { type: 'array' },
    'numbers.*': { type: 'int' },
    links: { type: 'array' },
    'links.*.id': { type: 'int' },
    'links.*.url': { type: 'string' }
  })

  expect(validation.failed()).toBe(false)
})

test('Test the example on Readme', () => {
  const data = {
    id: 1,
    firstName: 'John_Doe',
    email: 'test@gmail.com',
    age: 25,
    luckyNumbers: [20, 12, 394, '8'],
    homeTown: {
      city: 'London-City',
      country: 'UK',
      zipcode: '12345'
    },
    links: [
      { id: '1', url: 1920303003 },
      { id: 2, url: 'www.facebook.com' }
    ]
  }

  const validation = Validator.check(data, {
    id: { required: true, type: 'int' },
    firstName: { required: true, type: 'alphanum', min: 2, max: 10 },
    email: { required: true, email: true },
    age: { type: 'int', min: 10, max: 50 },
    luckyNumbers: { type: 'array' },
    'luckyNumbers.*': { type: 'int' },
    homeTown: { required: true, type: 'object' },
    'homeTown.city': { type: 'alphanum' },
    'homeTown.country': { type: 'alphanum', min: 2, max: 2 },
    'homeTown.zipcode': { type: 'int' },
    links: { type: 'array' },
    'links.*.id': { type: 'int' },
    'links.*.url': { type: 'string' }
  })

  expect(validation.failed()).toBe(true)

  const errors = _.keys(validation.errors().asList())
  expect(errors).toHaveLength(6)
  expect(errors).toEqual([
    'firstName', 'luckyNumbers.*', 'homeTown.city', 'homeTown.zipcode', 'links.*.id', 'links.*.url'
  ])
})

test('Do not validate non-required fields if they are not present', () => {
  const data = {
    id: '1'
  }

  const validation = Validator.check(data, {
    id: { required: true, type: 'int' },
    name: { type: 'alphanum' }
  })

  const errors = _.keys(validation.errors().asList())
  expect(errors).toHaveLength(1)
  expect(errors[0]).toBe('id')
})

test('Validate non-required fields if they are present', () => {
  const data = {
    name: 'John#Doe'
  }

  const validation = Validator.check(data, {
    name: { type: 'alphanum' }
  })

  expect(validation.failed()).toBe(true)

  const errors = _.keys(validation.errors().asList())
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
    id: { required: true, type: 'int' },
    name: { required: true, type: 'alphanum', min: 2, max: 10 },
    email: { required: true, email: true },
    age: { required: true, type: 'int', min: 10, max: 50 }
  })

  expect(validation.failed()).toBe(true)

  const errors = _.keys(validation.errors().asList())
  expect(errors).toHaveLength(2)
  expect(errors).toEqual(['email', 'age'])
})

test('Validate simple nested fields', () => {
  const data = {
    dates: [20170303, 20172009, '20183030']
  }

  const validation = Validator.check(data, {
    dates: { required: true, type: 'array', min: 1 },
    'dates.*': { type: 'int' }
  })

  expect(validation.failed()).toBe(true)

  const errors = _.keys(validation.errors().asList())
  expect(errors).toHaveLength(1)
  expect(errors).toEqual(['dates.*'])
})

test('Validate nested objects', () => {
  const data = {
    name: {
      given: 'John',
      middle: 12,
      family: 'Doe_Doe'
    }
  }

  const validation = Validator.check(data, {
    name: { required: true, type: 'object' },
    'name.given': { required: true, type: 'string', min: 2, max: 10 },
    'name.middle': { type: 'string' },
    'name.family': { required: true, type: 'string', min: 2, max: 3 }
  })

  const errors = _.keys(validation.errors().asList())
  expect(errors).toHaveLength(2)

  expect(errors).toEqual(['name.middle', 'name.family'])
})

test('Validate objects nested within an array', () => {
  const data = {
    links: [
      { id: '1', url: 'www.google.com' },
      { id: '2', url: 'www.facebook.com' }
    ]
  }

  const validation = Validator.check(data, {
    links: { type: 'array' },
    'links.*': { type: 'object' },
    'links.*.id': { type: 'int' },
    'links.*.url': { type: 'string' }
  })

  expect(validation.failed()).toBe(true)

  const errors = _.keys(validation.errors().asList())
  expect(errors).toHaveLength(1)
  expect(errors).toEqual(['links.*.id'])
})
