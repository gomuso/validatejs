import Errors from '../src/Errors'
import * as Rules from '../src/rules'

describe( 'Check if a validation failed', () => {
  test( 'it passes the validation', () => {
    const errors = new Errors()
    expect( errors.failed() ).toBe( false )

    const errors2 = new Errors( {} )
    expect( errors2.failed() ).toBe( false )
  } )

  test( 'it fails the validation', () => {
    const errors = new Errors( { id: 1 } )
    expect( errors.failed() ).toBe( true )
  } )
} )

describe( 'Return readable errors', () => {
  test( 'it returns readable errors for a single validation error', () => {
    const errors = new Errors( { id: [ new Rules.Required() ] } )
    const errors2 = new Errors( { age: [ new Rules.Type( 'int' ) ] } )

    expect( errors.errors() ).toEqual( {
      id: 'Id is required'
    } )

    expect( errors2.errors() ).toEqual( {
      age: 'Age should be of type int'
    } )
  } )
} )
