# validatejs
A javascript library to validate (form) data

# Usage

```javascript
import Validator from './src/Validator'

const formData = {
  id: '1',
  firstName: 'John Doe is way too long',
  lastName: 1,
  email: '123atgmx.com'
}

const validation = Validator.check( data, {
  id: 'required, type:int',
  firstName: 'required, type:int, min:2, max: 10',
  lastName: 'required, type:string, min:2, max:10',
  email: 'required, email'
} )

validation.failed() -> true

```