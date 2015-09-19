import React from 'react';
import SearchBar from '../src/SearchBar';

const suggestions = [
  'mac pro',
  'mac mini',
  'macbook',
  'macbook air',
  'macbook pro'
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
          placeholder="search 'mac'"
          onChange={this.onChange}
          onSubmit={this.onSubmit} />
      </form>
    );
  }
});

React.render(<App />, document.getElementById('root'));
