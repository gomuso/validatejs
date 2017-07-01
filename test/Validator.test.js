import Validator from '../src/Validator'
import * as Rules from '../src/rules'

test( 'Simple non-nested validation', () => {
  const data = {
    id: '1',
    firstName: 'Davidwithasuperlongname',
    lastName: 1
  }

  const validation = Validator.check( data, {
    id: [ new Rules.NotBlank(), new Rules.Type( 'int' ) ],
    firstName: [ new Rules.Type( 'string' ), new Rules.Length( { min: 2, max: 10 } ) ],
    lastName: [ new Rules.Type( 'string' ), new Rules.Length( { min: 2, max: 10 } ) ],
    email: [ new Rules.NotBlank(), new Rules.Type( 'string' ) ]
  }, {
    email: 'Email address'
  } )

  console.log( validation.errors() )

  expect( validation.failed() ).toBe( true )
} )
