import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '../src';
import styles from './demo.css';
import words from './words.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    this.inputAttributes = {
      placeholder: 'select an SAT word'
    };
  }

  onClear = () => {
    this.setState({
      items: []
    });
  };

  onChange = async input => {
    this.setState({
      items: words.filter(word => word.startsWith(input))
    });
  };

  onSelect = value => {
    if (value) {
      console.info(`Selected '${value}'`);
    }
  };

  itemRenderer(item, searchTerm) {
    return (
      <span>
        <span>{searchTerm}</span>
        <strong>{item.substr(searchTerm.length)}</strong>
      </span>
    );
  }

  render() {
    return (
      <SearchBar
        autoFocus
        inputAttributes={this.inputAttributes}
        onChange={this.onChange}
        onClear={this.onClear}
        onSelect={this.onSelect}
        items={this.state.items}
        itemRenderer={this.itemRenderer}
        styles={styles}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
