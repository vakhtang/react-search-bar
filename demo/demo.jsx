import React from 'react';
import SearchBar from '../src/SearchBar';

const suggestions = [
  'imac',
  'imac 5k',
  'iphone 5',
  'iphone 6'
];

let App = React.createClass({
  onChange(input, resolve) {
    // Simulate AJAX request
    setTimeout(() => {
      resolve(suggestions.filter((suggestion) =>
        suggestion.match(new RegExp('^' + input.replace(/\W\s/g, ''), 'i'))
      ));
    }, 25);
  },
  onSubmit(input) {
    if (!input) return;
    console.info(`Searching "${input}"`);
  },
  render() {
    return (
      <form>
        <SearchBar
          placeholder="type 'i'"
          onChange={this.onChange}
          onSubmit={this.onSubmit} />
      </form>
    );
  }
});

React.render(<App />, document.getElementById('root'));
