import React from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';

import SearchBar from '../src';
import styles from './demo.css';
import words from './words.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: []
    };

    autoBind(this, 'handleChange', 'handleClear', 'handleSelection');
  }

  handleClear() {
    this.setState({
      suggestions: []
    });
  }

  handleChange(input) {
    this.setState({
      suggestions: words.filter(word => word.startsWith(input))
    });
  }

  handleSelection(value) {
    if (value) {
      console.info(`Selected "${value}"`);
    }
  }

  handleSearch(value) {
    if (value) {
      console.info(`Searching "${value}"`);
    }
  }

  suggestionRenderer(suggestion, searchTerm) {
    return (
      <span>
        <span>{searchTerm}</span>
        <strong>{suggestion.substr(searchTerm.length)}</strong>
      </span>
    );
  }

  render() {
    return (
      <SearchBar
        autoFocus
        renderClearButton
        renderSearchButton
        placeholder="select an SAT word"
        onChange={this.handleChange}
        onClear={this.handleClear}
        onSelection={this.handleSelection}
        onSearch={this.handleSearch}
        shouldRenderClearButton={true}
        shouldRenderSearchButton={true}
        suggestions={this.state.suggestions}
        suggestionRenderer={this.suggestionRenderer}
        styles={styles}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
