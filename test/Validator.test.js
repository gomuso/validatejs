import Validator from '../src/Validator'

test('Simple non-nested validation', () => {
  const data = {
    id: '1',
    firstName: 'Davidwithasuperlongname',
    lastName: 1
  }

  const validation = Validator.check(data, {
    id: 'required, type:int',
    firstName: 'required, type:int, min:2, max: 10',
    lastName: 'required, type:string, min:2, max:10',
    email: 'required, email'
  }, {
    email: 'Email address'
  })

  expect(validation.failed()).toBe(true)
})
