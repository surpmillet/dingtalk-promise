'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by michao on 16/7/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var User = function (_Base) {
  _inherits(User, _Base);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(User).apply(this, arguments));
  }

  _createClass(User, [{
    key: 'getSimpleList',
    value: function getSimpleList() {
      var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return _superagent2.default.get(this.getUrl('simplelist')).query(this.getQuery(query)).then(this.parse.bind(this));
    }
  }, {
    key: 'removeAll',
    value: function removeAll(options) {
      return _superagent2.default.post(this.getUrl('batchdelete')).query(this.getQuery()).send(options).then(this.parse.bind(this));
    }
  }, {
    key: 'getDetail',
    value: function getDetail(query) {
      var _this2 = this;

      var name = query.name;
      var userid = query.userid;

      if (userid) {
        return _get(Object.getPrototypeOf(User.prototype), 'getDetail', this).call(this, { userid: userid });
      }
      if (name) {
        var dept = this.service.createDepartment();
        return _bluebird2.default.resolve().then(dept.getList.bind(dept)).then(function (data) {
          return _bluebird2.default.reduce(data.department, function (total, item) {
            return _this2.getList({ department_id: item.id }).then(function (data) {
              return _lodash2.default.concat(total, data.userlist.filter(function (user) {
                if (user.name == name) {
                  return true;
                }
              }));
            });
          }, []).then(function (data) {
            return _this2.assemble(_lodash2.default.uniqBy(data, 'userid'));
          });
        });
      }
    }
  }]);

  return User;
}(_base2.default);

exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQU5BOzs7OztJQVFNLEk7Ozs7Ozs7Ozs7O29DQUNzQjtBQUFBLFVBQVosS0FBWSx5REFBSixFQUFJOztBQUN4QixhQUFPLHFCQUNKLEdBREksQ0FDQSxLQUFLLE1BQUwsQ0FBWSxZQUFaLENBREEsRUFFSixLQUZJLENBRUUsS0FBSyxRQUFMLENBQWMsS0FBZCxDQUZGLEVBR0osSUFISSxDQUdDLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsQ0FIRCxDQUFQO0FBSUQ7Ozs4QkFFUyxPLEVBQVM7QUFDakIsYUFBTyxxQkFDSixJQURJLENBQ0MsS0FBSyxNQUFMLENBQVksYUFBWixDQURELEVBRUosS0FGSSxDQUVFLEtBQUssUUFBTCxFQUZGLEVBR0osSUFISSxDQUdDLE9BSEQsRUFJSixJQUpJLENBSUMsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUpELENBQVA7QUFLRDs7OzhCQUVTLEssRUFBTztBQUFBOztBQUFBLFVBQ1YsSUFEVSxHQUNNLEtBRE4sQ0FDVixJQURVO0FBQUEsVUFDSixNQURJLEdBQ00sS0FETixDQUNKLE1BREk7O0FBRWYsVUFBSSxNQUFKLEVBQVk7QUFDVix5RkFBdUIsRUFBQyxjQUFELEVBQXZCO0FBQ0Q7QUFDRCxVQUFJLElBQUosRUFBVTtBQUNSLFlBQUksT0FBTyxLQUFLLE9BQUwsQ0FBYSxnQkFBYixFQUFYO0FBQ0EsZUFBTyxtQkFBUSxPQUFSLEdBQ0osSUFESSxDQUNDLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsSUFBbEIsQ0FERCxFQUVKLElBRkksQ0FFQyxVQUFDLElBQUQsRUFBUztBQUNiLGlCQUFPLG1CQUFRLE1BQVIsQ0FBZSxLQUFLLFVBQXBCLEVBQWdDLFVBQUMsS0FBRCxFQUFRLElBQVIsRUFBZ0I7QUFDckQsbUJBQU8sT0FBSyxPQUFMLENBQWEsRUFBQyxlQUFlLEtBQUssRUFBckIsRUFBYixFQUF1QyxJQUF2QyxDQUE0QyxVQUFDLElBQUQsRUFBUztBQUMxRCxxQkFBTyxpQkFBRSxNQUFGLENBQVMsS0FBVCxFQUFnQixLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLFVBQUMsSUFBRCxFQUFTO0FBQ25ELG9CQUFJLEtBQUssSUFBTCxJQUFhLElBQWpCLEVBQXVCO0FBQ3JCLHlCQUFPLElBQVA7QUFDRDtBQUNGLGVBSnNCLENBQWhCLENBQVA7QUFLRCxhQU5NLENBQVA7QUFPRCxXQVJNLEVBUUosRUFSSSxFQVFBLElBUkEsQ0FRSyxVQUFDLElBQUQsRUFBUztBQUNuQixtQkFBTyxPQUFLLFFBQUwsQ0FBYyxpQkFBRSxNQUFGLENBQVMsSUFBVCxFQUFlLFFBQWYsQ0FBZCxDQUFQO0FBQ0QsV0FWTSxDQUFQO0FBV0QsU0FkSSxDQUFQO0FBZUQ7QUFDRjs7Ozs7O2tCQUVZLEkiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8xOS5cbiAqL1xuaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3N1cGVyYWdlbnQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcblxuY2xhc3MgVXNlciBleHRlbmRzIEJhc2Uge1xuICBnZXRTaW1wbGVMaXN0KHF1ZXJ5ID0ge30pIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLmdldCh0aGlzLmdldFVybCgnc2ltcGxlbGlzdCcpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkocXVlcnkpKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHJlbW92ZUFsbChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5wb3N0KHRoaXMuZ2V0VXJsKCdiYXRjaGRlbGV0ZScpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkoKSlcbiAgICAgIC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZ2V0RGV0YWlsKHF1ZXJ5KSB7XG4gICAgbGV0IHtuYW1lLCB1c2VyaWR9ID0gcXVlcnk7XG4gICAgaWYgKHVzZXJpZCkge1xuICAgICAgcmV0dXJuIHN1cGVyLmdldERldGFpbCh7dXNlcmlkfSk7XG4gICAgfVxuICAgIGlmIChuYW1lKSB7XG4gICAgICBsZXQgZGVwdCA9IHRoaXMuc2VydmljZS5jcmVhdGVEZXBhcnRtZW50KCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgLnRoZW4oZGVwdC5nZXRMaXN0LmJpbmQoZGVwdCkpXG4gICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWR1Y2UoZGF0YS5kZXBhcnRtZW50LCAodG90YWwsIGl0ZW0pPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGlzdCh7ZGVwYXJ0bWVudF9pZDogaXRlbS5pZH0pLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gXy5jb25jYXQodG90YWwsIGRhdGEudXNlcmxpc3QuZmlsdGVyKCh1c2VyKT0+IHtcbiAgICAgICAgICAgICAgICBpZiAodXNlci5uYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgW10pLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXNzZW1ibGUoXy51bmlxQnkoZGF0YSwgJ3VzZXJpZCcpKTtcbiAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFVzZXI7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
