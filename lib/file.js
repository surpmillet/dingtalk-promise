'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _urlencode = require('urlencode');

var _urlencode2 = _interopRequireDefault(_urlencode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by michao on 16/8/2.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var File = function (_Base) {
  _inherits(File, _Base);

  function File() {
    _classCallCheck(this, File);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(File).apply(this, arguments));
  }

  _createClass(File, [{
    key: 'getMediaSize',
    value: function getMediaSize(filepath) {
      return new Promise(function (resolve, reject) {
        _fs2.default.stat(filepath, function (err, stat) {
          if (err) {
            return reject(err);
          }
          return resolve({ size: stat.size });
        });
      });
    }
  }, {
    key: 'uploadCreate',
    value: function uploadCreate(options) {
      return _superagent2.default.get(this.getUrl('upload/create')).query(this.getQuery(options)).then(this.parse.bind(this));
    }
  }, {
    key: 'toBlocks',
    value: function toBlocks(options) {
      var data = options.data;
      var _options$size = options.size;
      var size = _options$size === undefined ? 512 * 1024 : _options$size;

      var count = Math.ceil(data.length / size);
      var blocks = (0, _lodash2.default)(data).chunk(count).map(function (item, index) {
        var start = index * size;
        var end = index == count - 1 ? data.length - 1 : (index + 1) * size;
        return { data: item, start: start, end: end };
      });
      return blocks;
    }
  }, {
    key: 'asyncUpload',
    value: function asyncUpload(filepath) {
      var _this2 = this;

      var fileData;
      var uploadid;
      return this.fromMedia(filepath).then(function (data) {
        fileData = data;
        return fileData.length;
      }).then(this.uploadCreate.bind(this)).then(function (data) {
        uploadid = data.uploadid;
      }).then(this.toBlocks.bind(this)).then(function (data) {
        return data.map(function (item) {
          return (0, _lodash2.default)(item).assign({ filepath: filepath });
        });
      }).then(function (coll) {
        return new Promise(function (resolve, reject) {
          var options;
          _async2.default.reduce(coll, null, function (memo, item, cb) {
            var data = item.data;
            var start = item.start;
            var end = item.end;

            options = { filepath: filepath, data: data, 'NDPartition': (0, _urlencode2.default)('bytes=' + start + '-' + end) };
            _this2.buildFormData(options).then(_this2.upload.bind(_this2)).then(function (data) {
              if (data.code) {
                return cb(new Error(data.msg));
              }
              return data.filepath;
            });
          }, function (err, data) {
            if (err) {
              return reject(err);
            }
            return resolve(data);
          });
        });
      });
    }
  }, {
    key: 'parse',
    value: function parse(data) {
      return JSON.parse(data.text);
    }
  }]);

  return File;
}(_base2.default);

exports.default = File;
//# sourceMappingURL=data:application/json;base64,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aUIsQ0FDeEIsR0FEd0I7O0FBRTFDLHNCQUFVLEVBQUMsa0JBQUQsRUFBVyxVQUFYLEVBQWlCLGVBQWUsb0NBQW1CLEtBQW5CLFNBQTRCLEdBQTVCLENBQWhDLEVBQVY7QUFDQSxtQkFBSyxhQUFMLENBQW1CLE9BQW5CLEVBQ0csSUFESCxDQUNRLE9BQUssTUFBTCxDQUFZLElBQVosUUFEUixFQUVHLElBRkgsQ0FFUSxVQUFDLElBQUQsRUFBUztBQUNiLGtCQUFJLEtBQUssSUFBVCxFQUFlO0FBQ2IsdUJBQU8sR0FBRyxJQUFJLEtBQUosQ0FBVSxLQUFLLEdBQWYsQ0FBSCxDQUFQO0FBQ0Q7QUFDRCxxQkFBTyxLQUFLLFFBQVo7QUFDRCxhQVBIO0FBUUQsV0FYRCxFQVdHLFVBQUMsR0FBRCxFQUFNLElBQU4sRUFBYztBQUNmLGdCQUFJLEdBQUosRUFBUztBQUNQLHFCQUFPLE9BQU8sR0FBUCxDQUFQO0FBQ0Q7QUFDRCxtQkFBTyxRQUFRLElBQVIsQ0FBUDtBQUNELFdBaEJEO0FBaUJELFNBbkJNLENBQVA7QUFvQkQsT0FwQ0ksQ0FBUDtBQXFDRDs7OzBCQUVLLEksRUFBTTtBQUNWLGFBQU8sS0FBSyxLQUFMLENBQVcsS0FBSyxJQUFoQixDQUFQO0FBQ0Q7Ozs7OztrQkFFWSxJIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzgvMi5cbiAqL1xuaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3N1cGVyYWdlbnQnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgYXN5bmMgZnJvbSAnYXN5bmMnO1xuaW1wb3J0IHVybGVuY29kZSBmcm9tICd1cmxlbmNvZGUnO1xuY2xhc3MgRmlsZSBleHRlbmRzIEJhc2Uge1xuICBnZXRNZWRpYVNpemUoZmlsZXBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICBmcy5zdGF0KGZpbGVwYXRoLCBmdW5jdGlvbiAoZXJyLCBzdGF0KSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc29sdmUoe3NpemU6IHN0YXQuc2l6ZX0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGxvYWRDcmVhdGUob3B0aW9ucykge1xuICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAuZ2V0KHRoaXMuZ2V0VXJsKCd1cGxvYWQvY3JlYXRlJykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShvcHRpb25zKSlcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICB0b0Jsb2NrcyhvcHRpb25zKSB7XG4gICAgbGV0IHtkYXRhLCBzaXplID0gNTEyICogMTAyNH0gPSBvcHRpb25zO1xuICAgIHZhciBjb3VudCA9IE1hdGguY2VpbChkYXRhLmxlbmd0aCAvIHNpemUpO1xuICAgIHZhciBibG9ja3MgPSBfKGRhdGEpLmNodW5rKGNvdW50KS5tYXAoKGl0ZW0sIGluZGV4KT0+IHtcbiAgICAgIHZhciBzdGFydCA9IGluZGV4ICogc2l6ZTtcbiAgICAgIHZhciBlbmQgPSBpbmRleCA9PSBjb3VudCAtIDEgPyBkYXRhLmxlbmd0aCAtIDEgOiAoaW5kZXggKyAxKSAqIHNpemU7XG4gICAgICByZXR1cm4ge2RhdGE6IGl0ZW0sIHN0YXJ0LCBlbmR9O1xuICAgIH0pO1xuICAgIHJldHVybiBibG9ja3M7XG4gIH1cblxuICBhc3luY1VwbG9hZChmaWxlcGF0aCkge1xuICAgIHZhciBmaWxlRGF0YTtcbiAgICB2YXIgdXBsb2FkaWQ7XG4gICAgcmV0dXJuIHRoaXMuZnJvbU1lZGlhKGZpbGVwYXRoKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBmaWxlRGF0YSA9IGRhdGE7XG4gICAgICAgIHJldHVybiBmaWxlRGF0YS5sZW5ndGg7XG4gICAgICB9KVxuICAgICAgLnRoZW4odGhpcy51cGxvYWRDcmVhdGUuYmluZCh0aGlzKSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgdXBsb2FkaWQgPSBkYXRhLnVwbG9hZGlkO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHRoaXMudG9CbG9ja3MuYmluZCh0aGlzKSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEubWFwKChpdGVtKT0+IHtcbiAgICAgICAgICByZXR1cm4gXyhpdGVtKS5hc3NpZ24oe2ZpbGVwYXRofSk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChjb2xsKT0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuICAgICAgICAgIHZhciBvcHRpb25zO1xuICAgICAgICAgIGFzeW5jLnJlZHVjZShjb2xsLCBudWxsLCAobWVtbywgaXRlbSwgY2IpPT4ge1xuICAgICAgICAgICAgbGV0IHtkYXRhLCBzdGFydCwgZW5kfSA9IGl0ZW07XG4gICAgICAgICAgICBvcHRpb25zID0ge2ZpbGVwYXRoLCBkYXRhLCAnTkRQYXJ0aXRpb24nOiB1cmxlbmNvZGUoYGJ5dGVzPSR7c3RhcnR9LSR7ZW5kfWApfTtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRGb3JtRGF0YShvcHRpb25zKVxuICAgICAgICAgICAgICAudGhlbih0aGlzLnVwbG9hZC5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuY29kZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKG5ldyBFcnJvcihkYXRhLm1zZykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5maWxlcGF0aDtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgKGVyciwgZGF0YSk9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcGFyc2UoZGF0YSkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEudGV4dCk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEZpbGU7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
