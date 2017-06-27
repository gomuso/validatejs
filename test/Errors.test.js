import Errors from '../src/Errors'

describe ( 'Check if a validation failed', () => {
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
