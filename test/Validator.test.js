import Validator from '../src/Validator'
import * as Rules from '../src/rules'

test ( 'Simple non-nested validation', () => {
  const data = {
    id: '1',
    firstName: 'Davidwithasuperlongname',
    lastName: 'F'
  }

  const validated = Validator.check( data, {
    id: [ Rules.NotBlank(), Rules.Type( 'int' ) ],
    firstName: [ Rules.Type( 'string' ), Rules.Length( { min: 2, max: 10 } ) ],
    lastName: [ Rules.Type( 'string' ), Rules.Length( { min: 2, max: 10 } ) ],
    email: [ Rules.Type( 'string' ) ]
  } )

  expect( validated.failed() ).toBe( true )
} )
