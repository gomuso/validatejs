# ValidateJS
> An easy to use javascript library to validate form data and object structures.

This library has been written by our team to easily validate form data coming from our apps and websites. After looking through the internet we couldn't really find anything that we liked - either because of lacking functionality, too much functionality or just a shitty syntax.

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

## Guides and examples

### How errors are displayed

The errors are generated based on the field name and the rules. Our internal convention for fieldnames
is camelcase so we decided to split the fieldname by uppercase letters. For example:

firstName => First name
dateOfBirth => Date of birth

In addition to that we're generating a string for every rule that failed and concat those. If for example
the required and minimum length rule failed we'd generate the following error:
```
First name is required and should be at least 2 characters long
```

We decided to concat all rules because you can see all requirements straight away rather than having to validate again.


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

### Custom error messages for fields

You might not like the error string that is being returned from this library. It may look something like this:
```
First name is required and should be between 2 and 10 characters long
```

The messages can get quite long and you might not have that much space in your interface. Therefore, you have
the option to overwrite the error messages returned for a field.

```javascript
const validation = Validator.check(data, {
  id: 'required, type:int',
  firstName: 'required, type:alphanum, min:2, max:10'
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
