import { Min } from '../../src/rules'

describe('it tests for a the length of a variable', () => {
  test('it tests the minimum length for strings', () => {
    expect((new Min(3)).execute('')).toBe(false)
    expect((new Min(3)).execute('ab')).toBe(false)

    expect((new Min(3)).execute('abasd')).toBe(true)
  })

  test('it tests the minimum length for arrays', () => {
    expect((new Min(3)).execute([1, 2])).toBe(false)

    expect((new Min(3)).execute([1, 2, 3])).toBe(true)
  })

  test('it tests the minimum value for numbers', () => {
    expect((new Min(3)).execute(2)).toBe(false)

    expect((new Min(3)).execute(19230)).toBe(true)
  })
})
