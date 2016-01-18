# react-search-bar

A search bar with autosuggest, built in React.

![search bar](http://s3.io/aU1rkdpjjSajYDvv8Xlv069w.gif)

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
  onChange={(searchTerm, resolve) => {
    // get suggestions asynchronously based on `searchTerm`,
    // then pass them to `resolve()` to populate suggestions
  }}
  onSearch={(searchTerm) => {
    // do something on search
  }} />
```

## Suggestion items
### Can be simple array
```
['macbook', 'macbook air', 'macbook pro']
```
### Or they can be passed like an object with properties id and name
```
[{id: 1, name: "macbook"}, {id: 2, name: 'macbook air'}, {id: 3, name: 'macbook pro'}];
```

## Props

### autoFocus

type: `boolean`

indicates whether the component should take focus on
page load

### delay

type: `number`

the number of milliseconds to wait after the last key
stroke before performing autosuggest

### inputName

type: `string`

sets the `name` attribute on the input field

### onChange

type: `function`

callback that executes on input and populates suggestions

### onSearch

type: `function`

callback that executes on search, triggered either by selecting a suggestion
or clicking the submit button

### placeholder

type: `string`

sets the `placeholder` attribute on the input field

## License

MIT
