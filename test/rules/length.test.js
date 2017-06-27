import { Length } from '../../src/rules'

describe( 'it tests for a the length of a variable', () => {
  test( 'it tests the length for strings', () => {
    expect( Length( 3 )( '' ) ).toBe( false )
    expect( Length( 3 )( 'abcd' ) ).toBe( false )

    expect( Length( { min: 5 } )( 'abcd' ) ).toBe( false )
    expect( Length( { max: 2 } )( 'abcd' ) ).toBe( false )

    expect( Length( { min: 1, max: 3 } )( 'abcd' ) ).toBe( false )

    expect( Length( 4 )( 'abcd' ) ).toBe( true )
    expect( Length( { min: 5 } )( 'abcddas' ) ).toBe( true )
    expect( Length( { max: 10 } )( 'abcdd' ) ).toBe( true )

    expect( Length( { min: 1, max: 3 } )( 'ab' ) ).toBe( true )
    expect( Length( { min: 1, max: 3 } )( 'a' ) ).toBe( true )
  } )

  test( 'it tests the length for arrays', () => {
    expect( Length( 3 )( [ 1, 2 ] ) ).toBe( false )

    expect( Length( 3 )( [ 1, 2, 3 ] ) ).toBe( true )
  } )
} )