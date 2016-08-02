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

        var options = { filePath: filePath, fileBuffer: block, partition: { NDPartition: (0, _urlencode2.default)('bytes=' + start + '-' + end) } };
        return Promise.resolve(options).then(_this2.buildFormData.bind(_this2)).then(function (data) {
          data.query = { uploadid: uploadid };
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
//# sourceMappingURL=data:application/json;base64,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REQsRUFFSixJQUZJLENBRUMsVUFBQyxJQUFELEVBQVM7QUFDYixlQUFLLEtBQUwsR0FBYSxFQUFDLGtCQUFELEVBQWI7QUFDQSxpQkFBTyxJQUFQO0FBQ0QsU0FMSSxFQU1KLElBTkksQ0FNQyxPQUFLLE1BQUwsQ0FBWSxJQUFaLFFBTkQsQ0FBUDtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRCxPQW5DSSxDQUFQO0FBb0NEOzs7MEJBRUssSSxFQUFNO0FBQ1YsYUFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLElBQWhCLENBQVA7QUFDRDs7Ozs7O2tCQUVZLEkiLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvOC8yLlxuICovXG5pbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAnc3VwZXJhZ2VudCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBhc3luYyBmcm9tICdhc3luYyc7XG5pbXBvcnQgdXJsZW5jb2RlIGZyb20gJ3VybGVuY29kZSc7XG5jbGFzcyBGaWxlIGV4dGVuZHMgQmFzZSB7XG4gIGdldE1lZGlhU2l6ZShmaWxlUGF0aCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcbiAgICAgIGZzLnN0YXQoZmlsZVBhdGgsIGZ1bmN0aW9uIChlcnIsIHN0YXQpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzb2x2ZSh7c2l6ZTogc3RhdC5zaXplfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwbG9hZENyZWF0ZShvcHRpb25zKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoJ3VwbG9hZC9jcmVhdGUnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KG9wdGlvbnMpKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgdG9CbG9ja3Mob3B0aW9ucykge1xuICAgIGxldCB7ZmlsZUJ1ZmZlciwgc2l6ZSA9IDUxMiAqIDEwMjR9ID0gb3B0aW9ucztcbiAgICB2YXIgY291bnQgPSBNYXRoLmNlaWwoZmlsZUJ1ZmZlci5sZW5ndGggLyBzaXplKTtcbiAgICB2YXIgYmxvY2tzID0gXyhmaWxlQnVmZmVyKS5jaHVuayhzaXplKS5tYXAoKGl0ZW0sIGluZGV4KT0+IHtcbiAgICAgIHZhciBzdGFydCA9IGluZGV4ICogc2l6ZTtcbiAgICAgIHZhciBlbmQgPSBpbmRleCA9PSBjb3VudCAtIDEgPyBmaWxlQnVmZmVyLmxlbmd0aCAtIDEgOiAoaW5kZXggKyAxKSAqIHNpemU7XG4gICAgICByZXR1cm4ge2Jsb2NrOiBuZXcgQnVmZmVyKGl0ZW0pLCBzdGFydCwgZW5kfTtcbiAgICB9KS52YWx1ZSgpO1xuICAgIHJldHVybiBfKG9wdGlvbnMpLmFzc2lnbih7YmxvY2tzfSkudmFsdWUoKTtcbiAgfVxuXG4gIGFzeW5jVXBsb2FkKGZpbGVQYXRoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TWVkaWFTaXplKGZpbGVQYXRoKVxuICAgICAgLnRoZW4odGhpcy51cGxvYWRDcmVhdGUuYmluZCh0aGlzKSlcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIHt1cGxvYWRpZDogZGF0YS51cGxvYWRpZCwgZmlsZVBhdGh9O1xuICAgICAgfSlcbiAgICAgIC50aGVuKHRoaXMuZnJvbU1lZGlhLmJpbmQodGhpcykpXG4gICAgICAudGhlbih0aGlzLnRvQmxvY2tzLmJpbmQodGhpcykpXG4gICAgICAudGhlbigoY29sbCk9PiB7XG4gICAgICAgIGxldCB7dXBsb2FkaWQsIGJsb2Nrc309Y29sbDtcbiAgICAgICAgbGV0IHtibG9jaywgc3RhcnQsIGVuZH0gPSBibG9ja3NbMF07XG4gICAgICAgIHZhciBvcHRpb25zID0ge2ZpbGVQYXRoLCBmaWxlQnVmZmVyOiBibG9jaywgcGFydGl0aW9uOiB7TkRQYXJ0aXRpb246IHVybGVuY29kZShgYnl0ZXM9JHtzdGFydH0tJHtlbmR9YCl9fTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShvcHRpb25zKVxuICAgICAgICAgIC50aGVuKHRoaXMuYnVpbGRGb3JtRGF0YS5iaW5kKHRoaXMpKVxuICAgICAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgIGRhdGEucXVlcnkgPSB7dXBsb2FkaWR9O1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbih0aGlzLnVwbG9hZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgLy8gLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAvLyAgIGlmIChkYXRhLmNvZGUpIHtcbiAgICAgICAgLy8gICAgIHJldHVybiBjYihuZXcgRXJyb3IoZGF0YS5tc2cpKTtcbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vICAgcmV0dXJuIGNiKG51bGwsIGRhdGEuZmlsZXBhdGgpO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuICAgICAgICAvLyAgIHZhciBvcHRpb25zO1xuICAgICAgICAvLyAgIGFzeW5jLnJlZHVjZShibG9ja3MsIHt9LCAobWVtbywgaXRlbSwgY2IpPT4ge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgIH0sIChlcnIsIGRhdGEpPT4ge1xuICAgICAgICAvLyAgICAgaWYgKGVycikge1xuICAgICAgICAvLyAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICByZXR1cm4gcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgLy8gICB9KTtcbiAgICAgICAgLy8gfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHBhcnNlKGRhdGEpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhLnRleHQpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBGaWxlOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
