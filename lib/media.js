'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by michao on 16/7/31.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Media = function (_Base) {
  _inherits(Media, _Base);

  function Media() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Media);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Media)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.mime = {
      '.jpg': 'image',
      '.png': 'image',
      '.amr': 'voice'
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Media, [{
    key: 'getType',
    value: function getType(filePath) {
      return _lodash2.default.has(this.mime, _path2.default.extname(filePath)) ? this.mime[_path2.default.extname(filePath)] : 'file';
    }
  }, {
    key: 'write',
    value: function write(options) {
      var dir = options.dir;
      var data = options.data;

      var filePath = _path2.default.join(dir, _path2.default.basename(data.redirects[0]));
      return new Promise(function (resolve, reject) {
        _fs2.default.writeFile(filePath, data.body, function (err) {
          if (err) {
            return reject(err);
          }
          return resolve({ filePath: filePath });
        });
      });
    }
  }, {
    key: 'upload',
    value: function upload(filePath) {
      var _this2 = this;

      return this.read({ filePath: filePath }).then(this.buildFormData.bind(this)).then(function (data) {
        return _lodash2.default.assign(data, { query: { type: _this2.getType(filePath), media: data.contentHeader } });
      }).then(_get(Object.getPrototypeOf(Media.prototype), 'upload', this).bind(this));
    }
  }, {
    key: 'download',
    value: function download(media_id, dir) {
      return _get(Object.getPrototypeOf(Media.prototype), 'download', this).call(this, { media_id: media_id }).then(function (data) {
        return { dir: dir, data: data };
      }).then(this.write.bind(this)).then(this.assemble.bind(this));
    }
  }]);

  return Media;
}(_base2.default);

exports.default = Media;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lZGlhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFOQTs7Ozs7SUFPTSxLOzs7Ozs7Ozs7Ozs7OzttTUFDSixJLEdBQU87QUFDTCxjQUFRLE9BREg7QUFFTCxjQUFRLE9BRkg7QUFHTCxjQUFRO0FBSEgsSzs7Ozs7NEJBTUMsUSxFQUFVO0FBQ2hCLGFBQU8saUJBQUUsR0FBRixDQUFNLEtBQUssSUFBWCxFQUFpQixlQUFLLE9BQUwsQ0FBYSxRQUFiLENBQWpCLElBQTJDLEtBQUssSUFBTCxDQUFVLGVBQUssT0FBTCxDQUFhLFFBQWIsQ0FBVixDQUEzQyxHQUErRSxNQUF0RjtBQUNEOzs7MEJBRUssTyxFQUFTO0FBQUEsVUFDUixHQURRLEdBQ0csT0FESCxDQUNSLEdBRFE7QUFBQSxVQUNILElBREcsR0FDRyxPQURILENBQ0gsSUFERzs7QUFFYixVQUFJLFdBQVcsZUFBSyxJQUFMLENBQVUsR0FBVixFQUFlLGVBQUssUUFBTCxDQUFjLEtBQUssU0FBTCxDQUFlLENBQWYsQ0FBZCxDQUFmLENBQWY7QUFDQSxhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBb0I7QUFDckMscUJBQUcsU0FBSCxDQUFhLFFBQWIsRUFBdUIsS0FBSyxJQUE1QixFQUFrQyxVQUFDLEdBQUQsRUFBUTtBQUN4QyxjQUFJLEdBQUosRUFBUztBQUNQLG1CQUFPLE9BQU8sR0FBUCxDQUFQO0FBQ0Q7QUFDRCxpQkFBTyxRQUFRLEVBQUMsa0JBQUQsRUFBUixDQUFQO0FBQ0QsU0FMRDtBQU1ELE9BUE0sQ0FBUDtBQVFEOzs7MkJBRU0sUSxFQUFVO0FBQUE7O0FBQ2YsYUFBTyxLQUFLLElBQUwsQ0FBVSxFQUFDLGtCQUFELEVBQVYsRUFDSixJQURJLENBQ0MsS0FBSyxhQUFMLENBQW1CLElBQW5CLENBQXdCLElBQXhCLENBREQsRUFFSixJQUZJLENBRUMsVUFBQyxJQUFELEVBQVM7QUFDYixlQUFPLGlCQUFFLE1BQUYsQ0FBUyxJQUFULEVBQWUsRUFBQyxPQUFPLEVBQUMsTUFBTSxPQUFLLE9BQUwsQ0FBYSxRQUFiLENBQVAsRUFBK0IsT0FBTyxLQUFLLGFBQTNDLEVBQVIsRUFBZixDQUFQO0FBQ0QsT0FKSSxFQUtKLElBTEksQ0FLQyw2REFBYSxJQUFiLENBQWtCLElBQWxCLENBTEQsQ0FBUDtBQU1EOzs7NkJBRVEsUSxFQUFVLEcsRUFBSztBQUN0QixhQUFPLDBFQUFlLEVBQUMsa0JBQUQsRUFBZixFQUNKLElBREksQ0FDQyxVQUFDLElBQUQsRUFBUztBQUNiLGVBQU8sRUFBQyxRQUFELEVBQU0sVUFBTixFQUFQO0FBQ0QsT0FISSxFQUlKLElBSkksQ0FJQyxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLElBQWhCLENBSkQsRUFLSixJQUxJLENBS0MsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUxELENBQVA7QUFNRDs7Ozs7O2tCQUVZLEsiLCJmaWxlIjoibWVkaWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMzEuXG4gKi9cbmltcG9ydCBCYXNlIGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuY2xhc3MgTWVkaWEgZXh0ZW5kcyBCYXNlIHtcbiAgbWltZSA9IHtcbiAgICAnLmpwZyc6ICdpbWFnZScsXG4gICAgJy5wbmcnOiAnaW1hZ2UnLFxuICAgICcuYW1yJzogJ3ZvaWNlJ1xuICB9O1xuXG4gIGdldFR5cGUoZmlsZVBhdGgpIHtcbiAgICByZXR1cm4gXy5oYXModGhpcy5taW1lLCBwYXRoLmV4dG5hbWUoZmlsZVBhdGgpKSA/IHRoaXMubWltZVtwYXRoLmV4dG5hbWUoZmlsZVBhdGgpXSA6ICdmaWxlJztcbiAgfVxuXG4gIHdyaXRlKG9wdGlvbnMpIHtcbiAgICBsZXQge2RpciwgZGF0YX09b3B0aW9ucztcbiAgICB2YXIgZmlsZVBhdGggPSBwYXRoLmpvaW4oZGlyLCBwYXRoLmJhc2VuYW1lKGRhdGEucmVkaXJlY3RzWzBdKSk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuICAgICAgZnMud3JpdGVGaWxlKGZpbGVQYXRoLCBkYXRhLmJvZHksIChlcnIpPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNvbHZlKHtmaWxlUGF0aH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGxvYWQoZmlsZVBhdGgpIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkKHtmaWxlUGF0aH0pXG4gICAgICAudGhlbih0aGlzLmJ1aWxkRm9ybURhdGEuYmluZCh0aGlzKSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIF8uYXNzaWduKGRhdGEsIHtxdWVyeToge3R5cGU6IHRoaXMuZ2V0VHlwZShmaWxlUGF0aCksIG1lZGlhOiBkYXRhLmNvbnRlbnRIZWFkZXJ9fSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc3VwZXIudXBsb2FkLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZG93bmxvYWQobWVkaWFfaWQsIGRpcikge1xuICAgIHJldHVybiBzdXBlci5kb3dubG9hZCh7bWVkaWFfaWR9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4ge2RpciwgZGF0YX07XG4gICAgICB9KVxuICAgICAgLnRoZW4odGhpcy53cml0ZS5iaW5kKHRoaXMpKVxuICAgICAgLnRoZW4odGhpcy5hc3NlbWJsZS5iaW5kKHRoaXMpKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTWVkaWE7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
