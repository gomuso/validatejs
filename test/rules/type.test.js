import { Type } from '../../src/rules'

describe( 'it tests for a variables type', () => {
  test( 'it tests for type string', () => {
    expect( Type( 'string' )( null ) ).toBe( false )
    expect( Type( 'string' )( 123 ) ).toBe( false )
    expect( Type( 'string' )( [ 1, 2 ] ) ).toBe( false )
    expect( Type( 'string' )( { a: '12' } ) ).toBe( false )

    expect( Type( 'string' )( 'David' ) ).toBe( true )
  } )

  test( 'it tests for type int', () => {
    expect( Type( 'int' )( null ) ).toBe( false )
    expect( Type( 'int' )( '12' ) ).toBe( false )
    expect( Type( 'int' )( { a: '12' } ) ).toBe( false )
    expect( Type( 'int' )( 123.23 ) ).toBe( false )

    expect( Type( 'int' )( 12 ) ).toBe( true )
  } )

  test( 'it tests for type number', () => {
    expect( Type( 'number' )( null ) ).toBe( false )
    expect( Type( 'number' )( '12' ) ).toBe( false )
    expect( Type( 'number' )( [ 123, 43 ] ) ).toBe( false )
    expect( Type( 'number' )( { a: '12' } ) ).toBe( false )

    expect( Type( 'number' )( 12 ) ).toBe( true )
    expect( Type( 'number' )( 39.123 ) ).toBe( true )
  } )

  test( 'it tests for type array', () => {
    expect( Type( 'array' )( null ) ).toBe( false )
    expect( Type( 'array' )( 123 ) ).toBe( false )
    expect( Type( 'array' )( 'John' ) ).toBe( false )
    expect( Type( 'array' )( { a: '123' } ) ).toBe( false )

    expect( Type( 'array' )( [ 1, 2, 3 ] ) ).toBe( true )
  } )

  test( 'it tests for type object', () => {
    expect( Type( 'object' )( null ) ).toBe( false )
    expect( Type( 'object' )( 123 ) ).toBe( false )
    expect( Type( 'object' )( 'David' ) ).toBe( false )
    expect( Type( 'object' )( [ 2, 3 ] ) ).toBe( false )

    expect( Type( 'object' )( { a: 1, b: 2 } ) ).toBe( true )
  } )

  test( 'it tests for type boolean', () => {
    expect( Type( 'bool' )( null ) ).toBe( false )
    expect( Type( 'bool' )( 123 ) ).toBe( false )
    expect( Type( 'bool' )( 'David' ) ).toBe( false )
    expect( Type( 'bool' )( [ 2, 3 ] ) ).toBe( false )

    expect( Type( 'bool' )( false ) ).toBe( true )
    expect( Type( 'bool' )( true ) ).toBe( true )
  } )
} )