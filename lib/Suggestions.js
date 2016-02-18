'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Suggestions = function (_React$Component) {
  _inherits(Suggestions, _React$Component);

  function Suggestions(props) {
    _classCallCheck(this, Suggestions);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Suggestions).call(this, props));

    _this.state = {
      activeItem: -1
    };
    return _this;
  }

  _createClass(Suggestions, [{
    key: 'onTouchStart',
    value: function onTouchStart(index) {
      var _this2 = this;

      this.timer = setTimeout(function () {
        _this2.setState({ activeItem: index });
      }, 200);
    }
  }, {
    key: 'onTouchMove',
    value: function onTouchMove() {
      clearTimeout(this.timer);
      this.touchedMoved = true;
      this.setState({ activeItem: -1 });
    }
  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd(suggestion) {
      var _this3 = this;

      if (!this.touchedMoved) {
        setTimeout(function () {
          _this3.props.onSelection(suggestion);
        }, 220);
      }
      this.touchedMoved = false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props;
      var highlightedItem = _props.highlightedItem;
      var searchTerm = _props.searchTerm;
      var suggestions = _props.suggestions;
      var activeItem = this.state.activeItem;

      return _react2.default.createElement(
        'ul',
        {
          className: 'search-bar-suggestions',
          onMouseLeave: function onMouseLeave() {
            return _this4.setState({ activeItem: -1 });
          } },
        suggestions.map(function (suggestion, index) {
          return _react2.default.createElement(
            'li',
            {
              className: (0, _classnames2.default)({
                highlighted: highlightedItem === index || activeItem === index
              }),
              key: index,
              onClick: function onClick() {
                return _this4.props.onSelection(suggestion);
              },
              onMouseEnter: function onMouseEnter() {
                return _this4.setState({ activeItem: index });
              },
              onMouseDown: function onMouseDown(e) {
                return e.preventDefault();
              },
              onTouchStart: function onTouchStart() {
                return _this4.onTouchStart(index);
              },
              onTouchMove: function onTouchMove() {
                return _this4.onTouchMove();
              },
              onTouchEnd: function onTouchEnd() {
                return _this4.onTouchEnd(suggestion);
              } },
            _react2.default.createElement(
              'span',
              null,
              searchTerm,
              _react2.default.createElement(
                'strong',
                null,
                suggestion.substr(searchTerm.length)
              )
            )
          );
        })
      );
    }
  }]);

  return Suggestions;
}(_react2.default.Component);

Suggestions.propTypes = {
  highlightedItem: _react2.default.PropTypes.number,
  searchTerm: _react2.default.PropTypes.string.isRequired,
  suggestions: _react2.default.PropTypes.array.isRequired
};

exports.default = Suggestions;