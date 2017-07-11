import { Length } from '../../src/rules'

describe('test for minimum length values', () => {
  test('it tests the minimum length for strings', () => {
    expect((new Length({ min: 3 })).execute('')).toBe(false)
    expect((new Length({ min: 3 })).execute('ab')).toBe(false)

    expect((new Length({ min: 3 })).execute('abasd')).toBe(true)
  })

  test('it tests the minimum length for arrays', () => {
    expect((new Length({ min: 3 })).execute([1, 2])).toBe(false)

    expect((new Length({ min: 3 })).execute([1, 2, 3])).toBe(true)
  })

  test('it tests the minimum value for numbers', () => {
    expect((new Length({ min: 3 })).execute(2)).toBe(false)

    expect((new Length({ min: 3 })).execute(19230)).toBe(true)
  })
})


describe('test for maximum length values', () => {
  test('it tests the maximum length for strings', () => {
    expect((new Length({ max: 10 })).execute('asdlkjkasdklqwelkasdfj')).toBe(false)
    expect((new Length({ max: 3 })).execute('abasd')).toBe(false)

    expect((new Length({ max: 3 })).execute('ab')).toBe(true)
  })

  test('it tests the maximum length for arrays', () => {
    expect((new Length({ max: 3 })).execute([1, 2, 3, 4])).toBe(false)

    expect((new Length({ max: 5 })).execute([1, 2, 3])).toBe(true)
  })

  test('it tests the maximum value for numbers', () => {
    expect((new Length({ max: 3 })).execute(132)).toBe(false)

    expect((new Length({ max: 3 })).execute(2)).toBe(true)
    expect((new Length({ max: 3 })).execute(2.3)).toBe(true)
  })
})
