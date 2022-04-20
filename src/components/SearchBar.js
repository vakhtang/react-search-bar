import PropTypes from "prop-types";
import React, { Component } from "react";
import classNames from "classnames";
import debounce from "lodash.debounce";
import ItemList from "./ItemList";
import styles from "./styles";

class SearchBar extends Component {
  static propTypes = {
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

  static defaultProps = {
    inputAttributes: {
      autoCapitalize: "off",
      autoComplete: "off",
      autoCorrect: "off"
    },
    autoFocus: false,
    delay: 0,
    maxLength: 100,
    maxVisibleItems: 8,
    styles,
    placeholder: "",
    itemRenderer: item => <div>{item}</div>
  };

  constructor(props) {
    super(props);

    this.state = {
      focusedItemIndex: null,
      isFocused: false,
      searchTerm: null,
      inputValue: ""
    };

    this.containerRef = React.createRef();
    this.inputRef = React.createRef();

    this.onDebouncedChange = debounce(this.onDebouncedChange, props.delay);
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.inputRef.current.focus();
    }

    document.addEventListener("click", this.onDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onDocumentClick);
  }

  onDocumentClick = event => {
    if (!this.containerRef.current.contains(event.target)) {
      this.props.onClear();
    }
  };

  setFocusedItem(event) {
    let { focusedItemIndex, searchTerm } = this.state;
    let { items } = this.props;
    let nextIndex = this.getNextItemIndex(event.key, focusedItemIndex);

    this.setState({
      focusedItemIndex: nextIndex,
      inputValue: items[nextIndex] || searchTerm
    });
  }

  getNextItemIndex(eventKey, current) {
    let last = this.props.items.length - 1;
    let next = null;

    if (eventKey === "ArrowDown" && current !== last) {
      next = current == null ? 0 : current + 1;
    } else if (eventKey === "ArrowUp" && current !== 0) {
      next = current == null ? last : current - 1;
    }

    return next;
  }

  clearInput = () => {
    this.setState({
      focusedItemIndex: null,
      searchTerm: null,
      inputValue: ""
    });

    this.inputRef.current.focus();
    this.props.onClear();
  };

  toggleFocus = () => {
    this.setState({
      isFocused: !this.state.isFocused
    });
  };

  onDebouncedChange = searchTerm => {
    this.setState({
      searchTerm
    });

    this.props.onChange(searchTerm);
  };

  onChange = event => {
    let { value } = event.target;
    let searchTerm = value.toLowerCase().trim();

    if (!value) {
      this.clearInput();
      return;
    }

    this.setState({
      inputValue: value,
      focusedItemIndex: null
    });

    if (searchTerm) {
      this.onDebouncedChange(searchTerm);
    }
  };

  onKeyDown = event => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
        if (this.props.items.length > 0) {
          event.preventDefault();
          this.setFocusedItem(event);
        }
        break;

      case "Backspace":
        this.onBackspace();
        break;

      case "Enter":
        this.onSelect(this.state.inputValue);
        break;

      case "Escape":
        this.onEscape();
        break;
    }
  };

  onBackspace = () => {
    this.setState({
      focusedItemIndex: null
    });
  };

  onEscape = () => {
    this.setState({
      focusedItemIndex: null,
      searchTerm: ""
    });

    this.inputRef.current.blur();
    this.props.onClear();
  };

  onHover = current => {
    this.setState({
      focusedItemIndex: current
    });
  };

  onSelect = item => {
    this.setState({
      inputValue: item,
      focusedItemIndex: null
    });

    this.props.onClear();

    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
  };

  render() {
    let { props, state } = this;

    return (
      <div className={props.styles.container} ref={this.containerRef}>
        <div
          className={classNames({
            [props.styles.inputContainer]: true,
            [props.styles.hasItems]: props.items.length > 0,
            [props.styles.fieldFocused]: state.isFocused
          })}
        >
          <input
            {...this.props.inputAttributes}
            className={classNames({
              [props.styles.input]: true,
              [props.styles.fieldFocused]: state.isFocused
            })}
            type="text"
            ref={this.inputRef}
            value={state.inputValue}
            onChange={this.onChange}
            onFocus={this.toggleFocus}
            onBlur={this.toggleFocus}
            onKeyDown={props.items && this.onKeyDown}
          />
          {state.inputValue && (
            <div className={props.styles.clearButton} onClick={this.clearInput} />
          )}
        </div>
        {state.inputValue &&
          props.items.length > 0 && (
            <ItemList
              focusedItemIndex={this.state.focusedItemIndex}
              maxVisibleItems={this.props.maxVisibleItems}
              onSelect={this.onSelect}
              onItemHover={this.onHover}
              styles={props.styles}
              searchTerm={state.searchTerm}
              items={this.props.items}
              itemRenderer={this.props.itemRenderer}
            />
          )}
      </div>
    );
  }
}

export default SearchBar;
