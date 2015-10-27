# react-search-bar

A search bar with autosuggest, built in React.

## Installation

```
npm install react-search-bar --save
```

## Demo

View the [demo online](https://vakhtang.github.io/react-search-bar).

Alternatively, run it locally:

```
npm install
npm run demo
```

Then visit [localhost:5000](http://localhost:5000).

## Usage

```js
<SearchBar
  onChange={(input, resolve) => {
    // get suggestions based on `input`, then pass them to `resolve()`
  }} />
```

You must supply a callback to the `onChange` event handler to populate
suggestions. A callback to the `onSubmit` event handler is optional.

## Props

### autoFocus

type: `boolean`

indicates whether the component should take focus on
page load

### debounceDelay

type: `number`

the number of milliseconds to wait after the last key
stroke before performing autosuggest

### inputName

type: `string`

sets the `name` attribute on the input field

### onChange

type: `function`

callback that executes on input and populates suggestions

### onSubmit

type: `function`

callback that executes on search submit (overrides default form submit)

### placeholder

type: `string`

sets the `placeholder` attribute on the input field

## License

MIT
