import React from 'react';
import SearchBar from '../src/SearchBar.jsx';

const suggestions = [
  'imac',
  'imac 5k',
  'iphone 5',
  'iphone 6'
];

let onChange = (input) => {
  if (!input) return [];
  return suggestions.filter((suggestion) =>
    suggestion.match(new RegExp('^' + input.replace(/\W/g, ''), 'i'))
  );
};

let onSearch = (input, e) => {
  if (!input) return;
  console.info(`Searching "${input}"`);
};

React.render(
  <SearchBar
    placeholder="type 'i'"
    onChange={onChange}
    onSearch={onSearch} />, 
  document.getElementById('root')
);
