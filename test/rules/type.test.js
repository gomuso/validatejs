import { Type } from '../../src/rules'

describe( 'it tests for a variables type', () => {
  test( 'it tests for type string', () => {
    expect( ( new Type( 'string' ) ).execute( null ) ).toBe( false )
    expect( ( new Type( 'string' ) ).execute( 123 ) ).toBe( false )
    expect( ( new Type( 'string' ) ).execute( [ 1, 2 ] ) ).toBe( false )
    expect( ( new Type( 'string' ) ).execute( { a: '12' } ) ).toBe( false )

    expect( ( new Type( 'string' ) ).execute( 'David' ) ).toBe( true )
  } )

  test( 'it tests for type int', () => {
    expect( ( new Type( 'int' ) ).execute( null ) ).toBe( false )
    expect( ( new Type( 'int' ) ).execute( '12' ) ).toBe( false )
    expect( ( new Type( 'int' ) ).execute( { a: '12' } ) ).toBe( false )
    expect( ( new Type( 'int' ) ).execute( 123.23 ) ).toBe( false )

    expect( ( new Type( 'int' ) ).execute( 12 ) ).toBe( true )
  } )

  test( 'it tests for type number', () => {
    expect( ( new Type( 'number' ) ).execute( null ) ).toBe( false )
    expect( ( new Type( 'number' ) ).execute( '12' ) ).toBe( false )
    expect( ( new Type( 'number' ) ).execute( [ 123, 43 ] ) ).toBe( false )
    expect( ( new Type( 'number' ) ).execute( { a: '12' } ) ).toBe( false )

    expect( ( new Type( 'number' ) ).execute( 12 ) ).toBe( true )
    expect( ( new Type( 'number' ) ).execute( 39.123 ) ).toBe( true )
  } )

  test( 'it tests for type alphanumerical', () => {
    expect( ( new Type( 'alphanum' ) ).execute( 'a#293!' ) ).toBe( false )
    expect( ( new Type( 'alphanum' ) ).execute( 'john_doe~' ) ).toBe( false )
    expect( ( new Type( 'alphanum' ) ).execute( 'john doe' ) ).toBe( false )

    expect( ( new Type( 'alphanum' ) ).execute( 'JohnDoe' ) ).toBe( true )
    expect( ( new Type( 'alphanum' ) ).execute( 'Johny1123' ) ).toBe( true )
  } )

  test( 'it tests for type array', () => {
    expect( ( new Type( 'array' ) ).execute( null ) ).toBe( false )
    expect( ( new Type( 'array' ) ).execute( 123 ) ).toBe( false )
    expect( ( new Type( 'array' ) ).execute( 'John' ) ).toBe( false )
    expect( ( new Type( 'array' ) ).execute( { a: '123' } ) ).toBe( false )

    expect( ( new Type( 'array' ) ).execute( [ 1, 2, 3 ] ) ).toBe( true )
  } )

  test( 'it tests for type object', () => {
    expect( ( new Type( 'object' ) ).execute( null ) ).toBe( false )
    expect( ( new Type( 'object' ) ).execute( 123 ) ).toBe( false )
    expect( ( new Type( 'object' ) ).execute( 'David' ) ).toBe( false )
    expect( ( new Type( 'object' ) ).execute( [ 2, 3 ] ) ).toBe( false )

    expect( ( new Type( 'object' ) ).execute( { a: 1, b: 2 } ) ).toBe( true )
  } )

  test( 'it tests for type boolean', () => {
    expect( ( new Type( 'bool' ) ).execute( null ) ).toBe( false )
    expect( ( new Type( 'bool' ) ).execute( 123 ) ).toBe( false )
    expect( ( new Type( 'bool' ) ).execute( 'David' ) ).toBe( false )
    expect( ( new Type( 'bool' ) ).execute( [ 2, 3 ] ) ).toBe( false )

    expect( ( new Type( 'bool' ) ).execute( false ) ).toBe( true )
    expect( ( new Type( 'bool' ) ).execute( true ) ).toBe( true )
  } )
} )
