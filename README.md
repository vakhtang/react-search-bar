### NOTE: This library is no longer under active development. Do with it as you will. If you're looking for an alternative, please use the excellent [react-autosuggest](https://github.com/moroshko/react-autosuggest) instead.

A general-purpose search bar, built in React. View the [demo](https://vakhtang.github.io/react-search-bar).

## Development

```sh
npm start
npm run check
```

## Props

| Prop                | Type              | Required | Description |
| :-----------------  | :---------------- | :------: | :---------- |
| autoFocus           | _boolean_         |          | If `true`, focuses the input when the component loads |
| delay               | _number_          |          | The number of milliseconds to wait after the last key stroke before calling `onChange` |
| onChange            | _function_        |    ✓     | Callback that executes on input change |
| onSearch            | _function_        |          | Callback that executes when clicking the search button or enter (presumes that search button is available) |
| onSelection         | _function_        |          | Callback that executes when selecting a suggestion |
| renderClearButton   | _boolean_         |          | Flag indicating whether to display the clear button |
| renderSearchButton  | _boolean_         |          | Flag indicating whether to display the search button |
| style               | _object_          |          | Style object |
| suggestionRenderer  | _function_        |          | Function to custom render suggestions |
| suggestions         | _array\<string>_  |    ✓     | Array of suggestions in string format |

Also accepts [supported HTML attributes](https://facebook.github.io/react/docs/dom-elements.html#all-supported-html-attributes) for the `<input>` element.

## License

MIT
