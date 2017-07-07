# ValidateJS
> An easy to use javascript library to validate form data and object structures.

This library has been written by our team to easily validate form data coming from our apps and websites. After looking through the internet we couldn't really find anything that we liked - either because of lacking functionality, too much functionality or just a shitty syntax.

## Installing / Getting started

A quick introduction of the minimal setup you need to get a hello world up & running.

```shell
yarn add gomuso-validatejs
or
npm install --save gomuso-validatejs
```

```javascript
import Validator from 'gomuso-validatejs'

const data = {
  id: 1,
  firstName: 'John_Doe',
  email: 'test@gmail.com',
  age: 25,
  luckyNumbers: [20, 12, 394, '8']
}

const validation = Validator.check(data, {
  id: 'required, type:int',
  firstName: 'required, type:alphanum, min:2, max:10',
  email: 'required, email',
  age: 'type:int, min:10, max:50',
  luckyNumbers: 'type:array',
  'luckyNumbers.*': 'type:int'
})

if (validation.failed()) {
  // do something with your errors
  console.log(validation.errors())
}
```

1. Install the library via yarn or npm
2. Import the validator
3. Define your form data
4. Define your validation rules
5. Check for errors

## More Examples

### Custom field names in error messages

It might happen that you have a name for a field within the code that you don't want to expose
to the user - either because you don't want them to know or because they wouldn't understand.

For example:
- slug => for the user it's more a URL
- dob => date of birth

For that reason we have implemented an overwrite function where you can define display names for your fields:

```javascript
const validation = Validator.check(data, {
  id: 'required, type:int',
  slug: 'required, type:alphanum, max:15',
  dob: 'type:int, min:01011900, max:12122017',
}, {
  // define custom display values
  slug: 'Custom URL',
  dob: 'Date of Birth'
})
```

Now if you the validation fails you would receive this output:
```javascript
{
  slug: 'Custom URL is required',
  dob: 'Date of birth should be of type int'
}
```

## Developing

### Built With

- Javascript
- Webpack
- Babel
- Jest

### Prerequisites

- Yarn or NPM

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/gomuso/validatejs.git
cd validatejs
yarn install
or
npm install
```

### Building

To build this project we'd recommend you test and lint the code first and then run the build command.

```shell
npm run test
npm run lint
npm run build
```


## Tests

These are the commands you can run to test and lint your code

```shell
npm run test
```

## Style guide

We're following the [airbnb javascript style guide](https://github.com/airbnb/javascript) with a few tweaks.
To check your code style run:

```shell
npm run lint
```
