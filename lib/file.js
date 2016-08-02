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
    value: function getMediaSize(filePath) {
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
    key: 'uploadCreate',
    value: function uploadCreate(options) {
      return _superagent2.default.get(this.getUrl('upload/create')).query(this.getQuery(options)).then(this.parse.bind(this));
    }
  }, {
    key: 'upload',
    value: function upload(filePath) {
      return this.getMediaSize(filePath).then(this.uploadCreate.bind(this)).then(function (data) {
        return { uploadid: data.uploadid, filePath: filePath };
      }).then(this.fromMedia.bind(this)).then(function (data) {
        var filePath = data.filePath;
        var fileBuffer = data.fileBuffer;
        var uploadid = data.uploadid;

        return {
          uploadid: uploadid,
          filePath: filePath,
          fileBuffer: fileBuffer,
          postHeader: { NDPatition: (0, _urlencode2.default)('bytes=0-' + (fileBuffer.length - 1)) }
        };
      }).then(this.buildFormData.bind(this)).then(function (data) {
        var uploadid = data.uploadid;
        var buffer = data.buffer;

        data.query = { uploadid: uploadid };
        data.buffer = buffer;
        return data;
      }).then(_get(Object.getPrototypeOf(File.prototype), 'upload', this).bind(this));
    }
  }, {
    key: 'toBlocks',
    value: function toBlocks(options) {
      var fileBuffer = options.fileBuffer;
      var _options$size = options.size;
      var size = _options$size === undefined ? 512 * 1024 : _options$size;

      var count = Math.ceil(fileBuffer.length / size);
      var blocks = (0, _lodash2.default)(fileBuffer).chunk(size).map(function (item, index) {
        var start = index * size;
        var end = index == count - 1 ? fileBuffer.length - 1 : (index + 1) * size;
        return { block: new Buffer(item), start: start, end: end };
      }).value();
      return (0, _lodash2.default)(options).assign({ blocks: blocks }).value();
    }
  }, {
    key: 'asyncUpload',
    value: function asyncUpload(filePath) {
      var _this2 = this;

      return this.getMediaSize(filePath).then(this.uploadCreate.bind(this)).then(function (data) {
        return { uploadid: data.uploadid, filePath: filePath };
      }).then(this.fromMedia.bind(this)).then(this.toBlocks.bind(this)).then(function (coll) {
        var uploadid = coll.uploadid;
        var blocks = coll.blocks;
        var _blocks$ = blocks[0];
        var block = _blocks$.block;
        var start = _blocks$.start;
        var end = _blocks$.end;

        var options = { filePath: filePath, fileBuffer: block, NDPatition: { NDPartition: (0, _urlencode2.default)('bytes=' + start + '-' + end) } };
        return Promise.resolve(options).then(_this2.buildFormData.bind(_this2)).then(function (data) {
          data.query = { uploadid: uploadid };
          data.buffer = _fs2.default.createReadStream(data.buffer);
          return data;
        }).then(_this2.upload.bind(_this2));
        // .then((data)=> {
        //   if (data.code) {
        //     return cb(new Error(data.msg));
        //   }
        //   return cb(null, data.filepath);
        // });
        // return new Promise((resolve, reject)=> {
        //   var options;
        //   async.reduce(blocks, {}, (memo, item, cb)=> {
        //
        //   }, (err, data)=> {
        //     if (err) {
        //       return reject(err);
        //     }
        //     return resolve(data);
        //   });
        // });
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
//# sourceMappingURL=data:application/json;base64,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LGFBQUcsZ0JBQUgsQ0FBb0IsS0FBSyxNQUF6QixDQUFkO0FBQ0EsaUJBQU8sSUFBUDtBQUNELFNBTkksRUFPSixJQVBJLENBT0MsT0FBSyxNQUFMLENBQVksSUFBWixRQVBELENBQVA7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0QsT0FwQ0ksQ0FBUDtBQXFDRDs7OzBCQUVLLEksRUFBTTtBQUNWLGFBQU8sS0FBSyxLQUFMLENBQVcsS0FBSyxJQUFoQixDQUFQO0FBQ0Q7Ozs7OztrQkFFWSxJIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzgvMi5cbiAqL1xuaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3N1cGVyYWdlbnQnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgYXN5bmMgZnJvbSAnYXN5bmMnO1xuaW1wb3J0IHVybGVuY29kZSBmcm9tICd1cmxlbmNvZGUnO1xuY2xhc3MgRmlsZSBleHRlbmRzIEJhc2Uge1xuICBnZXRNZWRpYVNpemUoZmlsZVBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICBmcy5zdGF0KGZpbGVQYXRoLCBmdW5jdGlvbiAoZXJyLCBzdGF0KSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc29sdmUoe3NpemU6IHN0YXQuc2l6ZX0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGxvYWRDcmVhdGUob3B0aW9ucykge1xuICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAuZ2V0KHRoaXMuZ2V0VXJsKCd1cGxvYWQvY3JlYXRlJykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShvcHRpb25zKSlcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSlcbiAgfVxuXG4gIHVwbG9hZChmaWxlUGF0aCkge1xuICAgIHJldHVybiB0aGlzLmdldE1lZGlhU2l6ZShmaWxlUGF0aClcbiAgICAgIC50aGVuKHRoaXMudXBsb2FkQ3JlYXRlLmJpbmQodGhpcykpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiB7dXBsb2FkaWQ6IGRhdGEudXBsb2FkaWQsIGZpbGVQYXRofTtcbiAgICAgIH0pXG4gICAgICAudGhlbih0aGlzLmZyb21NZWRpYS5iaW5kKHRoaXMpKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICBsZXQge2ZpbGVQYXRoLCBmaWxlQnVmZmVyLCB1cGxvYWRpZH0gPSBkYXRhO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHVwbG9hZGlkLFxuICAgICAgICAgIGZpbGVQYXRoLFxuICAgICAgICAgIGZpbGVCdWZmZXI6IGZpbGVCdWZmZXIsXG4gICAgICAgICAgcG9zdEhlYWRlcjoge05EUGF0aXRpb246IHVybGVuY29kZShgYnl0ZXM9MC0ke2ZpbGVCdWZmZXIubGVuZ3RoIC0gMX1gKX1cbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAudGhlbih0aGlzLmJ1aWxkRm9ybURhdGEuYmluZCh0aGlzKSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgbGV0IHt1cGxvYWRpZCwgYnVmZmVyfSA9IGRhdGE7XG4gICAgICAgIGRhdGEucXVlcnkgPSB7dXBsb2FkaWR9O1xuICAgICAgICBkYXRhLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc3VwZXIudXBsb2FkLmJpbmQodGhpcykpO1xuICB9XG5cbiAgdG9CbG9ja3Mob3B0aW9ucykge1xuICAgIGxldCB7ZmlsZUJ1ZmZlciwgc2l6ZSA9IDUxMiAqIDEwMjR9ID0gb3B0aW9ucztcbiAgICB2YXIgY291bnQgPSBNYXRoLmNlaWwoZmlsZUJ1ZmZlci5sZW5ndGggLyBzaXplKTtcbiAgICB2YXIgYmxvY2tzID0gXyhmaWxlQnVmZmVyKS5jaHVuayhzaXplKS5tYXAoKGl0ZW0sIGluZGV4KT0+IHtcbiAgICAgIHZhciBzdGFydCA9IGluZGV4ICogc2l6ZTtcbiAgICAgIHZhciBlbmQgPSBpbmRleCA9PSBjb3VudCAtIDEgPyBmaWxlQnVmZmVyLmxlbmd0aCAtIDEgOiAoaW5kZXggKyAxKSAqIHNpemU7XG4gICAgICByZXR1cm4ge2Jsb2NrOiBuZXcgQnVmZmVyKGl0ZW0pLCBzdGFydCwgZW5kfTtcbiAgICB9KS52YWx1ZSgpO1xuICAgIHJldHVybiBfKG9wdGlvbnMpLmFzc2lnbih7YmxvY2tzfSkudmFsdWUoKTtcbiAgfVxuXG4gIGFzeW5jVXBsb2FkKGZpbGVQYXRoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TWVkaWFTaXplKGZpbGVQYXRoKVxuICAgICAgLnRoZW4odGhpcy51cGxvYWRDcmVhdGUuYmluZCh0aGlzKSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIHt1cGxvYWRpZDogZGF0YS51cGxvYWRpZCwgZmlsZVBhdGh9O1xuICAgICAgfSlcbiAgICAgIC50aGVuKHRoaXMuZnJvbU1lZGlhLmJpbmQodGhpcykpXG4gICAgICAudGhlbih0aGlzLnRvQmxvY2tzLmJpbmQodGhpcykpXG4gICAgICAudGhlbigoY29sbCk9PiB7XG4gICAgICAgIGxldCB7dXBsb2FkaWQsIGJsb2Nrc309Y29sbDtcbiAgICAgICAgbGV0IHtibG9jaywgc3RhcnQsIGVuZH0gPSBibG9ja3NbMF07XG4gICAgICAgIHZhciBvcHRpb25zID0ge2ZpbGVQYXRoLCBmaWxlQnVmZmVyOiBibG9jaywgTkRQYXRpdGlvbjoge05EUGFydGl0aW9uOiB1cmxlbmNvZGUoYGJ5dGVzPSR7c3RhcnR9LSR7ZW5kfWApfX07XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUob3B0aW9ucylcbiAgICAgICAgICAudGhlbih0aGlzLmJ1aWxkRm9ybURhdGEuYmluZCh0aGlzKSlcbiAgICAgICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgICAgICBkYXRhLnF1ZXJ5ID0ge3VwbG9hZGlkfTtcbiAgICAgICAgICAgIGRhdGEuYnVmZmVyID0gZnMuY3JlYXRlUmVhZFN0cmVhbShkYXRhLmJ1ZmZlcik7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKHRoaXMudXBsb2FkLmJpbmQodGhpcykpO1xuICAgICAgICAvLyAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIC8vICAgaWYgKGRhdGEuY29kZSkge1xuICAgICAgICAvLyAgICAgcmV0dXJuIGNiKG5ldyBFcnJvcihkYXRhLm1zZykpO1xuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gICByZXR1cm4gY2IobnVsbCwgZGF0YS5maWxlcGF0aCk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICAgIC8vICAgdmFyIG9wdGlvbnM7XG4gICAgICAgIC8vICAgYXN5bmMucmVkdWNlKGJsb2Nrcywge30sIChtZW1vLCBpdGVtLCBjYik9PiB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgfSwgKGVyciwgZGF0YSk9PiB7XG4gICAgICAgIC8vICAgICBpZiAoZXJyKSB7XG4gICAgICAgIC8vICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIHJldHVybiByZXNvbHZlKGRhdGEpO1xuICAgICAgICAvLyAgIH0pO1xuICAgICAgICAvLyB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcGFyc2UoZGF0YSkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEudGV4dCk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEZpbGU7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
