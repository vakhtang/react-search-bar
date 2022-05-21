import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import ItemList from "./ItemList";
import styles from "./styles";

const SearchBar = props => {
  const [focusedItemIndex, setFocusedItemIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);

  const containerRef = React.createRef();
  const inputRef = React.createRef();

  useEffect(() => {
    if (props.autoFocus) {
      inputRef.current.focus();
    }

    document.addEventListener("click", onDocumentClick);

    return () => document.removeEventListener("click", onDocumentClick);
  });

  const onDocumentClick = event => {
    if (!containerRef.current.contains(event.target)) {
      props.onClear();
    }
  };

  const setFocusedItem = event => {
    let nextIndex = getNextItemIndex(event.key, focusedItemIndex);
    setFocusedItemIndex(nextIndex);
    setInputValue(props.items[nextIndex] || searchTerm);
  };

  const getNextItemIndex = (eventKey, current) => {
    let last = props.items.length - 1;
    let next = null;

    if (eventKey === "ArrowDown" && current !== last) {
      next = current == null ? 0 : current + 1;
    } else if (eventKey === "ArrowUp" && current !== 0) {
      next = current == null ? last : current - 1;
    }

    return next;
  };

  const clearInput = () => {
    setFocusedItemIndex(null);
    setSearchTerm(null);
    setInputValue("");

    inputRef.current.focus();
    props.onClear();
  };

  const toggleFocus = () => setIsFocused(!isFocused);

  const onChange = event => {
    let { value } = event.target;
    let searchTerm = value.toLowerCase().trim();

    if (!value) {
      clearInput();
      return;
    }

    setInputValue(value);
    setFocusedItemIndex(null);

    if (searchTerm) {
      setSearchTerm(searchTerm);
      props.onChange(searchTerm);
    }
  };

  const onKeyDown = event => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
        if (props.items.length > 0) {
          event.preventDefault();
          setFocusedItem(event);
        }
        break;

      case "Backspace":
        onBackspace();
        break;

      case "Enter":
        onSelect(inputValue);
        break;

      case "Escape":
        onEscape();
        break;
    }
  };

  const onBackspace = () => setFocusedItemIndex(null);

  const onEscape = () => {
    setFocusedItemIndex(null);
    setSearchTerm("");

    inputRef.current.blur();
    props.onClear();
  };

  const onHover = index => setFocusedItemIndex(index);

  const onSelect = item => {
    setInputValue(item);
    setFocusedItemIndex(null);

    props.onClear();

    if (props.onSelect) {
      props.onSelect(item);
    }
  };

  const inputAttributes = Object.assign(
    {},
    SearchBar.defaultProps.inputAttributes,
    props.inputAttributes
  );

  return (
    <div className={props.styles.container} ref={containerRef}>
      <div
        className={classNames({
          [props.styles.inputContainer]: true,
          [props.styles.hasItems]: props.items.length > 0,
          [props.styles.fieldFocused]: isFocused
        })}
      >
        <input
          {...inputAttributes}
          className={classNames({
            [props.styles.input]: true,
            [props.styles.fieldFocused]: isFocused
          })}
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={onChange}
          onFocus={toggleFocus}
          onBlur={toggleFocus}
          onKeyDown={props.items && onKeyDown}
        />
        {inputValue && <div className={props.styles.clearButton} onClick={clearInput} />}
      </div>
      {inputValue &&
        props.items.length > 0 && (
          <ItemList
            focusedItemIndex={focusedItemIndex}
            items={props.items}
            itemRenderer={props.itemRenderer}
            maxVisibleItems={props.maxVisibleItems}
            onSelect={onSelect}
            onItemHover={onHover}
            styles={props.styles}
            searchTerm={searchTerm}
          />
        )}
    </div>
  );
};

SearchBar.propTypes = {
  autoFocus: PropTypes.bool,
  delay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  inputAttributes: PropTypes.object,
  items: PropTypes.array.isRequired,
  itemRenderer: PropTypes.func,
  maxVisibleItems: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  onSelect: PropTypes.func,
  styles: PropTypes.object
};

SearchBar.defaultProps = {
  inputAttributes: {
    autoCapitalize: "off",
    autoComplete: "off",
    autoCorrect: "off",
    spellCheck: "off"
  },
  autoFocus: false,
  delay: 0,
  maxLength: 100,
  maxVisibleItems: 8,
  styles,
  placeholder: "",
  itemRenderer: item => <span>{item}</span>
};

export default SearchBar;
