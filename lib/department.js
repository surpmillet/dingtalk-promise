'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by michao on 16/7/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Department = function (_Base) {
  _inherits(Department, _Base);

  function Department() {
    _classCallCheck(this, Department);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Department).apply(this, arguments));
  }

  _createClass(Department, [{
    key: 'getId',
    value: function getId(options) {
      var _this2 = this;

      if (options && options.name) {
        return this.getList().then(function (data) {
          return _this2.assemble({
            id: data.department.filter(function (item) {
              return item.name == options.name;
            })[0].id
          });
        });
      } else {
        return this.assemble(null, '部门名称不能为空');
      }
    }
  }, {
    key: 'getBranches',
    value: function getBranches(options) {
      var _this3 = this;

      if (options && options.id) {
        return this.getList().then(function (data) {
          return _this3.assemble({
            department: data.department.filter(function (item) {
              return item.parentid = options.id;
            })
          });
        });
      }
    }
  }]);

  return Department;
}(_base2.default);

exports.default = Department;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlcGFydG1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHQTs7Ozs7Ozs7OzsrZUFIQTs7Ozs7SUFJTSxVOzs7Ozs7Ozs7OzswQkFDRSxPLEVBQVM7QUFBQTs7QUFDYixVQUFJLFdBQVcsUUFBUSxJQUF2QixFQUE2QjtBQUMzQixlQUFPLEtBQUssT0FBTCxHQUNKLElBREksQ0FDQyxVQUFDLElBQUQsRUFBUztBQUNiLGlCQUFPLE9BQUssUUFBTCxDQUFjO0FBQ25CLGdCQUFJLEtBQUssVUFBTCxDQUFnQixNQUFoQixDQUF1QixVQUFDLElBQUQsRUFBUztBQUNsQyxxQkFBTyxLQUFLLElBQUwsSUFBYSxRQUFRLElBQTVCO0FBQ0QsYUFGRyxFQUVELENBRkMsRUFFRTtBQUhhLFdBQWQsQ0FBUDtBQUtELFNBUEksQ0FBUDtBQVFELE9BVEQsTUFVSztBQUNILGVBQU8sS0FBSyxRQUFMLENBQWMsSUFBZCxFQUFvQixVQUFwQixDQUFQO0FBQ0Q7QUFDRjs7O2dDQUVXLE8sRUFBUztBQUFBOztBQUNuQixVQUFJLFdBQVcsUUFBUSxFQUF2QixFQUEyQjtBQUN6QixlQUFPLEtBQUssT0FBTCxHQUNKLElBREksQ0FDQyxVQUFDLElBQUQsRUFBUztBQUNiLGlCQUFPLE9BQUssUUFBTCxDQUFjO0FBQ25CLHdCQUFZLEtBQUssVUFBTCxDQUFnQixNQUFoQixDQUF1QixVQUFDLElBQUQsRUFBUztBQUMxQyxxQkFBTyxLQUFLLFFBQUwsR0FBZ0IsUUFBUSxFQUEvQjtBQUNELGFBRlc7QUFETyxXQUFkLENBQVA7QUFLRCxTQVBJLENBQVA7QUFRRDtBQUNGOzs7Ozs7a0JBRVksVSIsImZpbGUiOiJkZXBhcnRtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzE5LlxuICovXG5pbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuY2xhc3MgRGVwYXJ0bWVudCBleHRlbmRzIEJhc2Uge1xuICBnZXRJZChvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5uYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMaXN0KClcbiAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmFzc2VtYmxlKHtcbiAgICAgICAgICAgIGlkOiBkYXRhLmRlcGFydG1lbnQuZmlsdGVyKChpdGVtKT0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZSA9PSBvcHRpb25zLm5hbWU7XG4gICAgICAgICAgICB9KVswXS5pZFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5hc3NlbWJsZShudWxsLCAn6YOo6Zeo5ZCN56ew5LiN6IO95Li656m6Jyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0QnJhbmNoZXMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuaWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExpc3QoKVxuICAgICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYXNzZW1ibGUoe1xuICAgICAgICAgICAgZGVwYXJ0bWVudDogZGF0YS5kZXBhcnRtZW50LmZpbHRlcigoaXRlbSk9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBpdGVtLnBhcmVudGlkID0gb3B0aW9ucy5pZDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IERlcGFydG1lbnQ7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
