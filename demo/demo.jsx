import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '../src/SearchBar';

const matches = {
  'macbook a': [
    'macbook air 13 case',
    'macbook air 11 case',
    'macbook air charger'
  ],
  'macbook p': [
    'macbook pro 13 case',
    'macbook pro 15 case',
    'macbook pro charger'
  ]
};

const App = React.createClass({
  onChange(input, resolve) {
    // Simulate AJAX request
    setTimeout(() => {
      const suggestions = matches[Object.keys(matches).find((partial) => {
        return input.match(new RegExp(partial), 'i');
      })] || ['macbook', 'macbook air', 'macbook pro'];

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

ReactDOM.render(<App />, document.getElementById('root'));
