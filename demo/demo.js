import React, { useState } from "react";
import ReactDOM from "react-dom";
import SearchBar from "../src";
import styles from "./styles.scss";
import movies from "./movies.json";

const App = () => {
  const [items, setItems] = useState([]);

  const sortedMovies = movies.sort();

  const inputAttributes = {
    placeholder: "search AFI's Top 100 movies"
  };

  const onClear = () => setItems([]);

  const onChange = async input => {
    setItems(sortedMovies.filter(title => title.toLowerCase().includes(input)));
  };

  const onSelect = value => {
    if (value) {
      console.info(`Selected '${value}'`);
    }
  };

  return (
    <SearchBar
      autoFocus
      inputAttributes={inputAttributes}
      onChange={onChange}
      onClear={onClear}
      onSelect={onSelect}
      items={items}
      styles={styles}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
