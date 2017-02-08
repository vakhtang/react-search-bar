import React from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';
import SearchBar from '../src';
import styles from './demo.css';
import countries from './countries.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: []
    };

    autoBind(this);
  }

  handleChange(input) {
    if (!input) {
      this.setState({
        suggestions: []
      });

      return;
    }

    this.setState({
      suggestions: countries
        .map(country => country.capital)
        .filter(capital => capital.toLowerCase().startsWith(input) && capital)
        .sort()
    });
  }

  handleSelection(value) {
    this.setState({
      suggestions: []
    });

    if (value) {
      console.info(`Selected "${value}"`);
    }
  }

  handleSearch(value) {
    this.setState({
      suggestions: []
    });

    if (value) {
      console.info(`Searching "${value}"`);
    }
  }

  render() {
    return (
      <div>
        <SearchBar
          autoFocus
          renderClearButton
          renderSearchButton
          placeholder="search a national capital"
          onChange={this.handleChange}
          onSelection={this.handleSelection}
          onSearch={this.handleSearch}
          suggestions={this.state.suggestions}
          styles={styles}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
