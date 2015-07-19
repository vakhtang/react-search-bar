"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var Search = _react2["default"].createClass({
  displayName: "Search",

  getDefaultProps: function getDefaultProps() {
    return {
      autoFocus: true,
      autocompleteDelay: 250
    };
  },
  getInitialState: function getInitialState() {
    return {
      matches: []
    };
  },
  propTypes: {
    autoFocus: _react2["default"].PropTypes.bool,
    autocompleteDelay: _react2["default"].PropTypes.number
  },
  componentDidMount: function componentDidMount() {
    if (this.props.autoFocus) {
      _react2["default"].findDOMNode(this.refs.searchInput).focus();
    }
    this._searchInput = _react2["default"].findDOMNode(this.refs.searchInput);
  },
  getSearchInput: function getSearchInput() {
    return this._searchInput.value;
  },
  handleChange: function handleChange() {
    var _this = this;

    clearTimeout(this._timerId);
    this._timerId = setTimeout(function () {
      _this.setState({
        matches: _this.props.onChange(_this.getSearchInput())
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
    return _react2["default"].createElement(
      "div",
      { className: "search-wrapper" },
      _react2["default"].createElement(
        "div",
        { className: "search-bar" },
        _react2["default"].createElement(
          "form",
          { action: this.props.formAction },
          _react2["default"].createElement("input", {
            className: "search-input",
            name: "search",
            type: "text",
            maxLength: "100",
            autoComplete: "off",
            ref: "searchInput",
            placeholder: this.props.placeholder,
            onChange: this.handleChange }),
          _react2["default"].createElement("input", {
            className: "search-submit",
            type: "submit",
            onClick: this.search })
        )
      ),
      this.state.matches.length ? _react2["default"].createElement(Search.Suggestions, {
        matches: this.state.matches,
        onSelection: this.fillInSuggestion }) : null
    );
  }
});

Search.Suggestions = _react2["default"].createClass({
  displayName: "Suggestions",

  getDefaultProps: function getDefaultProps() {
    return {
      matches: []
    };
  },
  propTypes: {
    matches: _react2["default"].PropTypes.array
  },
  render: function render() {
    var _this2 = this;

    var matches = this.props.matches.map(function (match, index) {
      return _react2["default"].createElement(
        "li",
        { key: index, onClick: _this2.props.onSelection.bind(null, match) },
        match
      );
    });
    return _react2["default"].createElement(
      "ul",
      { className: "search-suggestions" },
      matches
    );
  }
});

exports["default"] = Search;
module.exports = exports["default"];