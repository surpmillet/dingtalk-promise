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

      return this.fromMedia(filepath).then(this.toBlocks.bind(this)).then(function (data) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBUkE7Ozs7O0lBU00sSTs7Ozs7Ozs7Ozs7aUNBQ1MsUSxFQUFVO0FBQ3JCLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFvQjtBQUNyQyxxQkFBRyxJQUFILENBQVEsUUFBUixFQUFrQixVQUFVLEdBQVYsRUFBZSxJQUFmLEVBQXFCO0FBQ3JDLGNBQUksR0FBSixFQUFTO0FBQ1AsbUJBQU8sT0FBTyxHQUFQLENBQVA7QUFDRDtBQUNELGlCQUFPLFFBQVEsRUFBQyxNQUFNLEtBQUssSUFBWixFQUFSLENBQVA7QUFDRCxTQUxEO0FBTUQsT0FQTSxDQUFQO0FBUUQ7OztpQ0FFWSxPLEVBQVM7QUFDcEIsYUFBTyxxQkFDSixHQURJLENBQ0EsS0FBSyxNQUFMLENBQVksZUFBWixDQURBLEVBRUosS0FGSSxDQUVFLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FGRixFQUdKLElBSEksQ0FHQyxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLElBQWhCLENBSEQsQ0FBUDtBQUlEOzs7NkJBRVEsTyxFQUFTO0FBQUEsVUFDWCxJQURXLEdBQ2dCLE9BRGhCLENBQ1gsSUFEVztBQUFBLDBCQUNnQixPQURoQixDQUNMLElBREs7QUFBQSxVQUNMLElBREssaUNBQ0UsTUFBTSxJQURSOztBQUVoQixVQUFJLFFBQVEsS0FBSyxJQUFMLENBQVUsS0FBSyxNQUFMLEdBQWMsSUFBeEIsQ0FBWjtBQUNBLFVBQUksU0FBUyxzQkFBRSxJQUFGLEVBQVEsS0FBUixDQUFjLEtBQWQsRUFBcUIsR0FBckIsQ0FBeUIsVUFBQyxJQUFELEVBQU8sS0FBUCxFQUFnQjtBQUNwRCxZQUFJLFFBQVEsUUFBUSxJQUFwQjtBQUNBLFlBQUksTUFBTSxTQUFTLFFBQVEsQ0FBakIsR0FBcUIsS0FBSyxNQUFMLEdBQWMsQ0FBbkMsR0FBdUMsQ0FBQyxRQUFRLENBQVQsSUFBYyxJQUEvRDtBQUNBLGVBQU8sRUFBQyxNQUFNLElBQVAsRUFBYSxZQUFiLEVBQW9CLFFBQXBCLEVBQVA7QUFDRCxPQUpZLENBQWI7QUFLQSxhQUFPLE1BQVA7QUFDRDs7O2dDQUVXLFEsRUFBVTtBQUFBOztBQUNwQixhQUFPLEtBQUssU0FBTCxDQUFlLFFBQWYsRUFDSixJQURJLENBQ0MsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQURELEVBRUosSUFGSSxDQUVDLFVBQUMsSUFBRCxFQUFTO0FBQ2IsZUFBTyxLQUFLLEdBQUwsQ0FBUyxVQUFDLElBQUQsRUFBUztBQUN2QixpQkFBTyxzQkFBRSxJQUFGLEVBQVEsTUFBUixDQUFlLEVBQUMsa0JBQUQsRUFBZixDQUFQO0FBQ0QsU0FGTSxDQUFQO0FBR0QsT0FOSSxFQU9KLElBUEksQ0FPQyxVQUFDLElBQUQsRUFBUztBQUNiLGVBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFvQjtBQUNyQyxjQUFJLE9BQUo7QUFDQSwwQkFBTSxNQUFOLENBQWEsSUFBYixFQUFtQixJQUFuQixFQUF5QixVQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsRUFBYixFQUFtQjtBQUFBLGdCQUNyQyxJQURxQyxHQUNqQixJQURpQixDQUNyQyxJQURxQztBQUFBLGdCQUMvQixLQUQrQixHQUNqQixJQURpQixDQUMvQixLQUQrQjtBQUFBLGdCQUN4QixHQUR3QixHQUNqQixJQURpQixDQUN4QixHQUR3Qjs7QUFFMUMsc0JBQVUsRUFBQyxrQkFBRCxFQUFXLFVBQVgsRUFBaUIsZUFBZSxvQ0FBbUIsS0FBbkIsU0FBNEIsR0FBNUIsQ0FBaEMsRUFBVjtBQUNBLG1CQUFLLGFBQUwsQ0FBbUIsT0FBbkIsRUFDRyxJQURILENBQ1EsT0FBSyxNQUFMLENBQVksSUFBWixRQURSLEVBRUcsSUFGSCxDQUVRLFVBQUMsSUFBRCxFQUFTO0FBQ2Isa0JBQUksS0FBSyxJQUFULEVBQWU7QUFDYix1QkFBTyxHQUFHLElBQUksS0FBSixDQUFVLEtBQUssR0FBZixDQUFILENBQVA7QUFDRDtBQUNELHFCQUFPLEtBQUssUUFBWjtBQUNELGFBUEg7QUFRRCxXQVhELEVBV0csVUFBQyxHQUFELEVBQU0sSUFBTixFQUFjO0FBQ2YsZ0JBQUksR0FBSixFQUFTO0FBQ1AscUJBQU8sT0FBTyxHQUFQLENBQVA7QUFDRDtBQUNELG1CQUFPLFFBQVEsSUFBUixDQUFQO0FBQ0QsV0FoQkQ7QUFpQkQsU0FuQk0sQ0FBUDtBQW9CRCxPQTVCSSxDQUFQO0FBNkJEOzs7MEJBRUssSSxFQUFNO0FBQ1YsYUFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLElBQWhCLENBQVA7QUFDRDs7Ozs7O2tCQUVZLEkiLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvOC8yLlxuICovXG5pbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAnc3VwZXJhZ2VudCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBhc3luYyBmcm9tICdhc3luYyc7XG5pbXBvcnQgdXJsZW5jb2RlIGZyb20gJ3VybGVuY29kZSc7XG5jbGFzcyBGaWxlIGV4dGVuZHMgQmFzZSB7XG4gIGdldE1lZGlhU2l6ZShmaWxlcGF0aCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcbiAgICAgIGZzLnN0YXQoZmlsZXBhdGgsIGZ1bmN0aW9uIChlcnIsIHN0YXQpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzb2x2ZSh7c2l6ZTogc3RhdC5zaXplfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwbG9hZENyZWF0ZShvcHRpb25zKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoJ3VwbG9hZC9jcmVhdGUnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KG9wdGlvbnMpKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHRvQmxvY2tzKG9wdGlvbnMpIHtcbiAgICBsZXQge2RhdGEsIHNpemUgPSA1MTIgKiAxMDI0fSA9IG9wdGlvbnM7XG4gICAgdmFyIGNvdW50ID0gTWF0aC5jZWlsKGRhdGEubGVuZ3RoIC8gc2l6ZSk7XG4gICAgdmFyIGJsb2NrcyA9IF8oZGF0YSkuY2h1bmsoY291bnQpLm1hcCgoaXRlbSwgaW5kZXgpPT4ge1xuICAgICAgdmFyIHN0YXJ0ID0gaW5kZXggKiBzaXplO1xuICAgICAgdmFyIGVuZCA9IGluZGV4ID09IGNvdW50IC0gMSA/IGRhdGEubGVuZ3RoIC0gMSA6IChpbmRleCArIDEpICogc2l6ZTtcbiAgICAgIHJldHVybiB7ZGF0YTogaXRlbSwgc3RhcnQsIGVuZH07XG4gICAgfSk7XG4gICAgcmV0dXJuIGJsb2NrcztcbiAgfVxuXG4gIGFzeW5jVXBsb2FkKGZpbGVwYXRoKSB7XG4gICAgcmV0dXJuIHRoaXMuZnJvbU1lZGlhKGZpbGVwYXRoKVxuICAgICAgLnRoZW4odGhpcy50b0Jsb2Nrcy5iaW5kKHRoaXMpKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YS5tYXAoKGl0ZW0pPT4ge1xuICAgICAgICAgIHJldHVybiBfKGl0ZW0pLmFzc2lnbih7ZmlsZXBhdGh9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKGNvbGwpPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICAgICAgdmFyIG9wdGlvbnM7XG4gICAgICAgICAgYXN5bmMucmVkdWNlKGNvbGwsIG51bGwsIChtZW1vLCBpdGVtLCBjYik9PiB7XG4gICAgICAgICAgICBsZXQge2RhdGEsIHN0YXJ0LCBlbmR9ID0gaXRlbTtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7ZmlsZXBhdGgsIGRhdGEsICdORFBhcnRpdGlvbic6IHVybGVuY29kZShgYnl0ZXM9JHtzdGFydH0tJHtlbmR9YCl9O1xuICAgICAgICAgICAgdGhpcy5idWlsZEZvcm1EYXRhKG9wdGlvbnMpXG4gICAgICAgICAgICAgIC50aGVuKHRoaXMudXBsb2FkLmJpbmQodGhpcykpXG4gICAgICAgICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5jb2RlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY2IobmV3IEVycm9yKGRhdGEubXNnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmZpbGVwYXRoO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LCAoZXJyLCBkYXRhKT0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwYXJzZShkYXRhKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YS50ZXh0KTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRmlsZTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
