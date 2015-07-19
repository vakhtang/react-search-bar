var React = require('react');
var Search = require('../src/Search.jsx');

const suggestions = [
  'imac',
  'imac 5k',
  'iphone 5',
  'iphone 6'
];

let onChange = (input) => {
  if (!input) return [];
  return suggestions.filter((suggestion) =>
    suggestion.match(new RegExp('^' + input, 'i'))
  );
};

let onSearch = (input, e) => {
  if (!input) return;
  console.info(`Searching "${input}"`);
};

React.render(
  <Search
    placeholder="Enter search"
    onChange={onChange}
    onSearch={onSearch} />, 
  document.getElementById('root')
);
