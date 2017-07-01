import { NotBlank } from '../../src/rules'

test( 'it tests if a value is blank', () => {
  expect( ( new NotBlank() ).execute() ).toBe( false )
  expect( ( new NotBlank() ).execute( null ) ).toBe( false )
  expect( ( new NotBlank() ).execute( false ) ).toBe( false )
  expect( ( new NotBlank() ).execute( '' ) ).toBe( false )

  expect( ( new NotBlank() ).execute( 'A' ) ).toBe( true )
  expect( ( new NotBlank() ).execute( 12 ) ).toBe( true )
  expect( ( new NotBlank() ).execute( [ 1, 2, 3 ] ) ).toBe( true )
  expect( ( new NotBlank() ).execute( { a: '1', b: '2' } ) ).toBe( true )
} )
