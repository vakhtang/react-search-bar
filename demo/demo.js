import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchBar from "../src";
import styles from "./demo.scss";
import movies from "./movies.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    this.movies = movies.sort();

    this.inputAttributes = {
      autoCapitalize: "off",
      autoComplete: "off",
      spellCheck: "false",
      placeholder: "search AFI's Top 100 movies"
    };
  }

  onClear = () => {
    this.setState({
      items: []
    });
  };

  onChange = async input => {
    this.setState({
      items: this.movies.filter(title => title.toLowerCase().includes(input))
    });
  };

  onSelect = value => {
    if (value) {
      console.info(`Selected '${value}'`);
    }
  };

  render() {
    return (
      <SearchBar
        autoFocus
        inputAttributes={this.inputAttributes}
        onChange={this.onChange}
        onClear={this.onClear}
        onSelect={this.onSelect}
        items={this.state.items}
        styles={styles}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
