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

View the demo for an example of how to use the component. You must supply a
callback to the `onChange` event handler to populate suggestions. A callback
to the `onSubmit` event handler is optional.

## Props

### autoFocus

default: `false`

indicates whether the component should take focus on
page load

### debounceDelay

default: `100`

the number of milliseconds to wait after the last key
stroke before performing autosuggest

### inputName

default: `"query"`

sets the `name` attribute for the input field

## License

MIT
