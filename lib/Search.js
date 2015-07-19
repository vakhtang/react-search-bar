"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _reactAddons = require("react/addons");

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var keyCodes = {
  UP: 38,
  DOWN: 40
};

var Search = _reactAddons2["default"].createClass({
  displayName: "Search",

  getDefaultProps: function getDefaultProps() {
    return {
      autoFocus: true,
      autocompleteDelay: 250
    };
  },
  getInitialState: function getInitialState() {
    return {
      matches: [],
      highlightedItem: -1
    };
  },
  propTypes: {
    autoFocus: _reactAddons2["default"].PropTypes.bool,
    autocompleteDelay: _reactAddons2["default"].PropTypes.number
  },
  componentDidMount: function componentDidMount() {
    this._searchInput = _reactAddons2["default"].findDOMNode(this.refs.searchInput);
    if (this.props.autoFocus) {
      this._searchInput.focus();
    }
  },
  getSearchInput: function getSearchInput() {
    return this._searchInput.value;
  },
  handleKeyDown: function handleKeyDown(e) {
    var highlightedItem = this.state.highlightedItem;

    if ((e.which == keyCodes.UP || e.which == keyCodes.DOWN) && this.state.matches.length) {
      e.preventDefault();

      if (e.which == keyCodes.UP) {
        if (highlightedItem <= 0) return;
        --highlightedItem;
      }
      if (e.which == keyCodes.DOWN) {
        if (highlightedItem >= this.state.matches.length - 1) return;
        ++highlightedItem;
      }

      this._searchInput.value = this.state.matches[highlightedItem];
      this.setState({ highlightedItem: highlightedItem });
    }
  },
  handleChange: function handleChange() {
    var _this = this;

    clearTimeout(this._timerId);
    this._timerId = setTimeout(function () {
      _this.setState({
        matches: _this.props.onChange(_this.getSearchInput()),
        highlightedItem: -1
      });
    }, this.props.autocompleteDelay);
  },
  search: function search(e) {
    if (!this.props.onSearch) return;
    e.preventDefault();
    clearTimeout(this._timerId);
    this.setState({ matches: [] });
    this.props.onSearch(this.getSearchInput(), e);
  },
  fillInSuggestion: function fillInSuggestion(value) {
    this.setState({ matches: [] });
    this._searchInput.value = value;
  },
  render: function render() {
    return _reactAddons2["default"].createElement(
      "div",
      { className: "search-wrapper" },
      _reactAddons2["default"].createElement(
        "div",
        { className: "search-bar" },
        _reactAddons2["default"].createElement(
          "form",
          { action: this.props.formAction },
          _reactAddons2["default"].createElement("input", {
            className: "search-input",
            name: "search",
            type: "text",
            maxLength: "100",
            autoComplete: "off",
            ref: "searchInput",
            placeholder: this.props.placeholder,
            onChange: this.handleChange,
            onKeyDown: this.handleKeyDown }),
          _reactAddons2["default"].createElement("input", {
            className: "search-submit",
            type: "submit",
            onClick: this.search })
        )
      ),
      this.state.matches.length ? _reactAddons2["default"].createElement(Search.Suggestions, {
        matches: this.state.matches,
        highlightedItem: this.state.highlightedItem,
        onSelection: this.fillInSuggestion }) : null
    );
  }
});

Search.Suggestions = _reactAddons2["default"].createClass({
  displayName: "Suggestions",

  getDefaultProps: function getDefaultProps() {
    return {
      matches: [],
      highlightedItem: -1
    };
  },
  propTypes: {
    matches: _reactAddons2["default"].PropTypes.array
  },
  render: function render() {
    var _this2 = this;

    var matches = this.props.matches.map(function (match, index) {
      return _reactAddons2["default"].createElement(
        "li",
        {
          className: _reactAddons2["default"].addons.classSet({
            "highlighted": _this2.props.highlightedItem == index
          }),
          key: index,
          onClick: _this2.props.onSelection.bind(null, match) },
        match
      );
    });
    return _reactAddons2["default"].createElement(
      "ul",
      { className: "search-suggestions" },
      matches
    );
  }
});

exports["default"] = Search;
module.exports = exports["default"];