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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _urlencode = require('urlencode');

var _urlencode2 = _interopRequireDefault(_urlencode);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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
    key: 'getFileSize',
    value: function getFileSize(filePath) {
      return new Promise(function (resolve, reject) {
        _fs2.default.stat(filePath, function (err, stat) {
          if (err) {
            return reject(err);
          }
          return resolve({ size: stat.size });
        });
      });
    }
  }, {
    key: 'getUploadId',
    value: function getUploadId(options) {
      return _superagent2.default.get(this.getUrl('upload/create')).query(this.getQuery(options)).then(this.parse.bind(this));
    }
  }, {
    key: 'upload',
    value: function upload(filePath) {
      var _this2 = this;

      return this.getFileSize(filePath).then(this.getUploadId.bind(this)).then(function (data) {
        return { uploadId: data.uploadid, filePath: filePath };
      }).then(this.read.bind(this)).then(function (data) {
        var buffer = data.buffer;
        var uploadId = data.uploadId;
        var filePath = data.filePath;

        var blockSize = 512 * 1024;
        return new Promise(function (resolve, reject) {
          var blocks = _lodash2.default.chunk(buffer, blockSize);
          _async2.default.reduce(blocks, { index: 0 }, function (memo, item, cb) {
            var start = memo.index;
            var end = Math.min(buffer.length, start + blockSize);
            var options = {
              uploadId: uploadId,
              filePath: filePath,
              buffer: new Buffer(item),
              header: { NDPatition: (0, _urlencode2.default)('bytes=' + start + '-' + end) }
            };
            Promise.resolve(options).then(_this2.buildFormData.bind(_this2)).then(function (data) {
              var uploadId = data.uploadId;

              data.query = { uploadid: uploadId };
              return data;
            }).then(_get(Object.getPrototypeOf(File.prototype), 'upload', _this2).bind(_this2)).then(function (data) {
              if (data.code != 0) {
                cb(new Error(data.msg));
              }
              cb(null, { index: end, data: data });
            }).catch(function (err) {
              cb(err);
            });
          }, function (err, result) {
            if (err) {
              return reject(err);
            }
            return resolve(result.data);
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
//# sourceMappingURL=data:application/json;base64,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YSxVQUFiLEVBQVQ7QUFDRCxhQWJILEVBY0csS0FkSCxDQWNTLFVBQUMsR0FBRCxFQUFRO0FBQ2IsaUJBQUcsR0FBSDtBQUNELGFBaEJIO0FBaUJELFdBMUJELEVBMEJHLFVBQUMsR0FBRCxFQUFNLE1BQU4sRUFBZ0I7QUFDakIsZ0JBQUksR0FBSixFQUFTO0FBQ1AscUJBQU8sT0FBTyxHQUFQLENBQVA7QUFDRDtBQUNELG1CQUFPLFFBQVEsT0FBTyxJQUFmLENBQVA7QUFDRCxXQS9CRDtBQWdDRCxTQWxDTSxDQUFQO0FBbUNELE9BNUNJLENBQVA7QUE2Q0Q7OzswQkFFSyxJLEVBQU07QUFDVixhQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssSUFBaEIsQ0FBUDtBQUNEOzs7Ozs7a0JBRVksSSIsImZpbGUiOiJmaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi84LzIuXG4gKi9cbmltcG9ydCBCYXNlIGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICdzdXBlcmFnZW50JztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgYXN5bmMgZnJvbSAnYXN5bmMnO1xuaW1wb3J0IHVybGVuY29kZSBmcm9tICd1cmxlbmNvZGUnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmNsYXNzIEZpbGUgZXh0ZW5kcyBCYXNlIHtcbiAgZ2V0RmlsZVNpemUoZmlsZVBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICBmcy5zdGF0KGZpbGVQYXRoLCBmdW5jdGlvbiAoZXJyLCBzdGF0KSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc29sdmUoe3NpemU6IHN0YXQuc2l6ZX0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRVcGxvYWRJZChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoJ3VwbG9hZC9jcmVhdGUnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KG9wdGlvbnMpKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgdXBsb2FkKGZpbGVQYXRoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RmlsZVNpemUoZmlsZVBhdGgpXG4gICAgICAudGhlbih0aGlzLmdldFVwbG9hZElkLmJpbmQodGhpcykpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiB7dXBsb2FkSWQ6IGRhdGEudXBsb2FkaWQsIGZpbGVQYXRofTtcbiAgICAgIH0pXG4gICAgICAudGhlbih0aGlzLnJlYWQuYmluZCh0aGlzKSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgbGV0IHtidWZmZXIsIHVwbG9hZElkLCBmaWxlUGF0aH0gPSBkYXRhO1xuICAgICAgICBsZXQgYmxvY2tTaXplID0gNTEyICogMTAyNDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuICAgICAgICAgIGxldCBibG9ja3MgPSBfLmNodW5rKGJ1ZmZlciwgYmxvY2tTaXplKTtcbiAgICAgICAgICBhc3luYy5yZWR1Y2UoYmxvY2tzLCB7aW5kZXg6IDB9LCAobWVtbywgaXRlbSwgY2IpPT4ge1xuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gbWVtby5pbmRleDtcbiAgICAgICAgICAgIGxldCBlbmQgPSBNYXRoLm1pbihidWZmZXIubGVuZ3RoLCAoc3RhcnQgKyBibG9ja1NpemUpKTtcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICB1cGxvYWRJZCxcbiAgICAgICAgICAgICAgZmlsZVBhdGgsXG4gICAgICAgICAgICAgIGJ1ZmZlcjogbmV3IEJ1ZmZlcihpdGVtKSxcbiAgICAgICAgICAgICAgaGVhZGVyOiB7TkRQYXRpdGlvbjogdXJsZW5jb2RlKGBieXRlcz0ke3N0YXJ0fS0ke2VuZH1gKX1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUob3B0aW9ucylcbiAgICAgICAgICAgICAgLnRoZW4odGhpcy5idWlsZEZvcm1EYXRhLmJpbmQodGhpcykpXG4gICAgICAgICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICBsZXQge3VwbG9hZElkfSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgZGF0YS5xdWVyeSA9IHt1cGxvYWRpZDogdXBsb2FkSWR9O1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbihzdXBlci51cGxvYWQuYmluZCh0aGlzKSlcbiAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmNvZGUgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgY2IobmV3IEVycm9yKGRhdGEubXNnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNiKG51bGwsIHtpbmRleDogZW5kLCBkYXRhfSk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaCgoZXJyKT0+IHtcbiAgICAgICAgICAgICAgICBjYihlcnIpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LCAoZXJyLCByZXN1bHQpPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwYXJzZShkYXRhKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YS50ZXh0KTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRmlsZTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
