# ValidateJS
> An easy to use javascript library to validate form data and object structures.

This library has been written by our team to easily validate form data coming from our apps and websites. After looking through the internet we couldn't really find anything that we liked - either because of lacking functionality, too much functionality or just a shitty syntax.

#### Main Features

- Easy, distraction free syntax
- Different error return formats
- Custom error messaging
- Validate nested arrays
- Validate nested objects within arrays

## Contributing to this repo

This project is a lunch time project so the time to work on this is limited. However, we hope you like this library
and use it. If you have any ideas for improvements and new features feel free to create a PR!

## Installing / Getting started

A quick introduction of the minimal setup you need to get a hello world up & running.

```shell
yarn add muso-validatejs
or
npm install --save muso-validatejs
```

```javascript
import Validator from 'muso-validatejs'

const data = {
  id: 1,
  firstName: 'John_Doe',
  email: 'test@gmail.com',
  age: 25,
  luckyNumbers: [20, 12, 394, '8'],
  homeTown: {
    city: 'London-City',
    country: 'UK',
    zipcode: '12345'
  },
  links: [
    { id: '1', url: 1920303003 },
    { id: 2, url: 'www.facebook.com' }
  ]
}

const validation = Validator.check(data, {
  id: { required: true, type: 'int' },
  firstName: { required: true, type: 'alphanum', min: 2, max: 10 },
  email: { required: true, email: true },
  age: { type: 'int', min: 10, max: 50 },
  luckyNumbers: { type: 'array' },
  'luckyNumbers.*': { type: 'int' },
  homeTown: { required: true, type: 'object' },
  'homeTown.city': { type: 'alphanum' },
  'homeTown.country': { type: 'alphanum', min: 2, max: 2 },
  'homeTown.zipcode': { type: 'int' },
  links: { type: 'array' },
  'links.*.id': { type: 'int' },
  'links.*.url': { type: 'string' }
})

if (validation.failed()) {
  const errors = validation.errors()

  // 2 formatters:
  const asList = errors.asList()
  const asSentence = errors.asSentence()

  // do something with your errors
}
```

1. Install the library via yarn or npm
2. Import the validator
3. Define your form data
4. Define your validation rules
5. Check for errors

## Guides and examples

### Overview of the available rules

| Rule           | Keyword         | Description  |
| -------------- | --------------- | -------------|
| Required       | `required`      | This key has to exist in the data object and cannot be blank
| Email          | `email`         | Matches a (simple) email address format
| Length: Min    | `length:min`    | Requires a minimum length for a string, array length or minimum number
| Length: Max    | `length:max`    | Requires a maximum length for a string, array length or minimum number
| Type: String   | `type:string`   | Matches everything that is a string
| Type: Integer  | `type:int`      | Matches everything that is an integer
| Type: Number   | `type:number`   | Matches everything that is a number
| Type: Alphanum | `type:alphanum` | Matches everything that is alpha numerical
| Type: Array    | `type:array`    | Matches everything that is an array
| Type: Object   | `type:object`   | Matches everything that is an object
| Type: Boolean  | `type:bool`     | Matches everything that is a boolean

### Make use of the error formatters

We have two different ways of returning the validation errors for a given field:
- as list
- as sentence

#### As List

This one is useful if you want to construct your own error message using the different parts. For example
you could receive this:

```javascript
const errors = validation.errors().asList()

// output:
errors = {
  id: ['of type int', 'minimum 1']
}
```

So you could go ahead and concat them in the way you want, for example display them as a list underneath the input.

#### As Sentence

If you have a lot of space and you'd rather show one big red box with the errors you could use the asSentence formatter.

```javascript
const errors = validation.errors().asSentence()

// output:
errors = {
  id: 'Id should be of type int and minimum 1'
}
```

The field names in the errors are generated based on the field name and the rules. Our internal convention for fieldnames
is camelcase so we decided to split the fieldname by uppercase letters. For example:

- firstName => First name
- dateOfBirth => Date of birth


### Custom field names in error messages

*Please note: Custom field names only work when using the `asSentence` formatter!*

It might happen that you have a name for a field within the code that you don't want to expose
to the user - either because you don't want them to know or because they wouldn't understand.

For example:
- slug => for the user it's more a URL
- dob => date of birth

For that reason we have implemented an overwrite function where you can define display names for your fields:

```javascript
const validation = Validator.check(data, {
  id: { required: true, type: 'int' },
  slug: { required: true, type: 'alphanum', max: 15 },
  dob: { type: 'int', min: 01011900, max: 12122017 },
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

### Custom error messages for fields

*Please note: Custom error messages only work when using the `asSentence` formatter!*

You might not like the error string that is being returned from this library. It may look something like this:
```
First name is required and should be between 2 and 10 characters long
```

The messages can get quite long and you might not have that much space in your interface. Therefore, you have
the option to overwrite the error messages returned for a field.

```javascript
const validation = Validator.check(data, {
  id: { required: true, type:int },
  firstName: { required: true, type: 'alphanum', min: 2, max: 10 }
}, null, {
  firstName: 'First name is invalid!'
})
```

Your returned error would look like:
```javascript
{
  firstName: 'First name is invalid!'
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
