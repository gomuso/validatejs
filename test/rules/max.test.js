import { Max } from '../../src/rules'

describe('it tests for a the length of a variable', () => {
  test('it tests the Maximum length for strings', () => {
    expect((new Max(10)).execute('asdlkjkasdklqwelkasdfj')).toBe(false)
    expect((new Max(3)).execute('abasd')).toBe(false)

    expect((new Max(3)).execute('ab')).toBe(true)
  })

  test('it tests the Maximum length for arrays', () => {
    expect((new Max(3)).execute([1, 2, 3, 4])).toBe(false)

    expect((new Max(5)).execute([1, 2, 3])).toBe(true)
  })

  test('it tests the Maximum value for numbers', () => {
    expect((new Max(3)).execute(132)).toBe(false)

    expect((new Max(3)).execute(2)).toBe(true)
    expect((new Max(3)).execute(2.3)).toBe(true)
  })
})
