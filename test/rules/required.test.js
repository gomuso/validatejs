import { Required } from '../../src/rules'

test( 'it tests if a value is blank', () => {
  expect( ( new Required() ).execute() ).toBe( false )
  expect( ( new Required() ).execute( null ) ).toBe( false )
  expect( ( new Required() ).execute( false ) ).toBe( false )
  expect( ( new Required() ).execute( '' ) ).toBe( false )

  expect( ( new Required() ).execute( 'A' ) ).toBe( true )
  expect( ( new Required() ).execute( 12 ) ).toBe( true )
  expect( ( new Required() ).execute( [ 1, 2, 3 ] ) ).toBe( true )
  expect( ( new Required() ).execute( { a: '1', b: '2' } ) ).toBe( true )
} )
