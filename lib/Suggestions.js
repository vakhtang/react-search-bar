'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

exports['default'] = _reactAddons2['default'].createClass({
  displayName: 'Suggestions',
  getDefaultProps: function getDefaultProps() {
    return {
      suggestions: [],
      highlightedItem: -1
    };
  },
  propTypes: {
    suggestions: _reactAddons2['default'].PropTypes.array,
    highlightedItem: _reactAddons2['default'].PropTypes.number
  },
  render: function render() {
    var _this = this;

    var suggestions = this.props.suggestions.map(function (match, index) {
      return _reactAddons2['default'].createElement(
        'li',
        {
          className: _reactAddons2['default'].addons.classSet({
            highlighted: _this.props.highlightedItem == index
          }),
          key: index,
          onClick: _this.props.onSelection.bind(null, match) },
        match
      );
    });
    return _reactAddons2['default'].createElement(
      'ul',
      { className: "search-suggestions" },
      suggestions
    );
  }
});
module.exports = exports['default'];