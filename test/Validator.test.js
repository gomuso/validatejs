import Validator from '../src/Validator'
import * as Rules from '../src/rules'

test( 'Validate something', () => {
  const formData = {
    firstname: '',
    email: 'hello@gmail.com',
    age: '12'
  }

  const validated = Validator.check( formData, {
    firstname: [ Rules.NotBlank() ],
    email: [ Rules.NotBlank() ],
    age: [ Rules.NotBlank(), Rules.Type( 'int' ) ],
  } )
} )