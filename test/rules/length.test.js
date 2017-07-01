import { Length } from '../../src/rules'

describe( 'it tests for a the length of a variable', () => {
  test( 'it tests the length for strings', () => {
    expect( ( new Length( 3 ) ).execute( '' ) ).toBe( false )
    expect( ( new Length( 3 ) ).execute( 'abcd' ) ).toBe( false )

    expect( ( new Length( { min: 5 } ) ).execute( 'abcd' ) ).toBe( false )
    expect( ( new Length( { max: 2 } ) ).execute( 'abcd' ) ).toBe( false )

    expect( ( new Length( { min: 1, max: 3 } ) ).execute( 'abcd' ) ).toBe( false )

    expect( ( new Length( 4 ) ).execute( 'abcd' ) ).toBe( true )
    expect( ( new Length( { min: 5 } ) ).execute( 'abcddas' ) ).toBe( true )
    expect( ( new Length( { max: 10 } ) ).execute( 'abcdd' ) ).toBe( true )

    expect( ( new Length( { min: 1, max: 3 } ) ).execute( 'ab' ) ).toBe( true )
    expect( ( new Length( { min: 1, max: 3 } ) ).execute( 'a' ) ).toBe( true )
  } )

  test( 'it tests the length for arrays', () => {
    expect( ( new Length( 3 ) ).execute( [ 1, 2 ] ) ).toBe( false )

    expect( ( new Length( 3 ) ).execute( [ 1, 2, 3 ] ) ).toBe( true )
  } )
} )
