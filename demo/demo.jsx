import "babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '../src/SearchBar';

const suggestions = [
  "Batman v Superman: Dawn of Justice",
  "Superman Returns",
  "Superman",
  "Superman II",
  "Superman III",
  "Superman IV: The Quest for Peace",
  "Superman/Batman: Apocalypse",
  "Lois & Clark: The New Adventures of Superman",
  "Superman/Batman: Public Enemies",
  "Superman/Doomsday",
];

const App = React.createClass({
  onChange(input, resolve) {
    // Simulate AJAX request
    setTimeout(() => {
      if (input.toLowerCase() === 'superman') {
        resolve(suggestions);
      }
    }, 25);
  },
  onSearch(input) {
    if (!input) return;
    console.info(`Searching "${input}"`);
  },
  render() {
    return (
      <SearchBar
        placeholder="search 'superman'"
        onChange={this.onChange}
        onSearch={this.onSearch} />
    );
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
