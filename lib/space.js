'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by michao on 16/8/2.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Space = function (_Base) {
  _inherits(Space, _Base);

  function Space() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Space);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Space)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.domain = 'nwatmb', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Space, [{
    key: 'getSpaceId',
    value: function getSpaceId() {
      return _superagent2.default.get(this.getUrl('get_custom_space')).query(this.getQuery({ domain: this.domain })).then(this.parse.bind(this));
    }
  }]);

  return Space;
}(_base2.default);

exports.default = Space;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFKQTs7Ozs7SUFLTSxLOzs7Ozs7Ozs7Ozs7OzttTUFDSixNLEdBQVMsUTs7Ozs7aUNBRUk7QUFDWCxhQUFPLHFCQUNKLEdBREksQ0FDQSxLQUFLLE1BQUwsQ0FBWSxrQkFBWixDQURBLEVBRUosS0FGSSxDQUVFLEtBQUssUUFBTCxDQUFjLEVBQUMsUUFBUSxLQUFLLE1BQWQsRUFBZCxDQUZGLEVBR0osSUFISSxDQUdDLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FIRCxDQUFQO0FBSUQ7Ozs7OztrQkFFWSxLIiwiZmlsZSI6InNwYWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi84LzIuXG4gKi9cbmltcG9ydCBCYXNlIGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICdzdXBlcmFnZW50JztcbmNsYXNzIFNwYWNlIGV4dGVuZHMgQmFzZSB7XG4gIGRvbWFpbiA9ICdud2F0bWInO1xuXG4gIGdldFNwYWNlSWQoKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoJ2dldF9jdXN0b21fc3BhY2UnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KHtkb21haW46IHRoaXMuZG9tYWlufSkpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBTcGFjZTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
