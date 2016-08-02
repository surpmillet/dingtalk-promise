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
  }, {
    key: 'sendToChat',
    value: function sendToChat(query) {
      return _superagent2.default.post(this.getUrl('add_to_single_chat')).query(this.getQuery(query)).then(this.parse.bind(this));
    }
  }]);

  return Space;
}(_base2.default);

exports.default = Space;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwYWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFKQTs7Ozs7SUFLTSxLOzs7Ozs7Ozs7Ozs7OzttTUFDSixNLEdBQVMsUTs7Ozs7aUNBRUk7QUFDWCxhQUFPLHFCQUNKLEdBREksQ0FDQSxLQUFLLE1BQUwsQ0FBWSxrQkFBWixDQURBLEVBRUosS0FGSSxDQUVFLEtBQUssUUFBTCxDQUFjLEVBQUMsUUFBUSxLQUFLLE1BQWQsRUFBZCxDQUZGLEVBR0osSUFISSxDQUdDLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FIRCxDQUFQO0FBSUQ7OzsrQkFFVSxLLEVBQU87QUFDaEIsYUFBTyxxQkFDSixJQURJLENBQ0MsS0FBSyxNQUFMLENBQVksb0JBQVosQ0FERCxFQUVKLEtBRkksQ0FFRSxLQUFLLFFBQUwsQ0FBYyxLQUFkLENBRkYsRUFHSixJQUhJLENBR0MsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUhELENBQVA7QUFJRDs7Ozs7O2tCQUVZLEsiLCJmaWxlIjoic3BhY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzgvMi5cbiAqL1xuaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3N1cGVyYWdlbnQnO1xuY2xhc3MgU3BhY2UgZXh0ZW5kcyBCYXNlIHtcbiAgZG9tYWluID0gJ253YXRtYic7XG5cbiAgZ2V0U3BhY2VJZCgpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLmdldCh0aGlzLmdldFVybCgnZ2V0X2N1c3RvbV9zcGFjZScpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkoe2RvbWFpbjogdGhpcy5kb21haW59KSlcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZW5kVG9DaGF0KHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5wb3N0KHRoaXMuZ2V0VXJsKCdhZGRfdG9fc2luZ2xlX2NoYXQnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KHF1ZXJ5KSlcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFNwYWNlOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
