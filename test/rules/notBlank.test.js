import { NotBlank } from '../../src/rules'

test( 'it tests if a value is blank', () => {
  expect( NotBlank()() ).toBe( false )
  expect( NotBlank()( null ) ).toBe( false )
  expect( NotBlank()( false ) ).toBe( false )
  expect( NotBlank()( '' ) ).toBe( false )

  expect( NotBlank()( 'A' ) ).toBe( true )
  expect( NotBlank()( 12 ) ).toBe( true )
  expect( NotBlank()( [ 1, 2, 3 ] ) ).toBe( true )
  expect( NotBlank()( { a: '1', b: '2' } ) ).toBe( true )
} )