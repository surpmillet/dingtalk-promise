'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by michao on 16/7/18.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
  function Base(config) {
    _classCallCheck(this, Base);

    this.service = config.service;
    this.basePath = config.basePath;
  }

  _createClass(Base, [{
    key: 'getUrl',
    value: function getUrl(pathName) {
      var urlObj = _url2.default.format({
        'protocol': 'https',
        'host': 'oapi.dingtalk.com',
        'pathname': _path2.default.join(this.basePath, pathName)
      });
      return urlObj;
    }
  }, {
    key: 'getQuery',
    value: function getQuery() {
      var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      Object.assign(query, { 'access_token': this.service.getAccessToken() });
      return query;
    }
  }, {
    key: 'getList',
    value: function getList() {
      var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return _superagent2.default.get(this.getUrl('list')).query(this.getQuery(query)).then(this.parse.bind(this));
    }
  }, {
    key: 'getDetail',
    value: function getDetail(query) {
      return _superagent2.default.get(this.getUrl('get')).query(this.getQuery(query)).then(this.parse.bind(this));
    }
  }, {
    key: 'create',
    value: function create(options) {
      return _superagent2.default.post(this.getUrl('create')).query(this.getQuery()).send(options).then(this.parse.bind(this));
    }
  }, {
    key: 'update',
    value: function update(options) {
      return _superagent2.default.post(this.getUrl('update')).query(this.getQuery()).send(options).then(this.parse.bind(this));
    }
  }, {
    key: 'remove',
    value: function remove(query) {
      return _superagent2.default.get(this.getUrl('delete')).query(this.getQuery(query)).then(this.parse.bind(this));
    }
  }, {
    key: 'send',
    value: function send(options) {
      return _superagent2.default.post(this.getUrl('send')).query(this.getQuery()).send(options).then(this.parse.bind(this));
    }
  }, {
    key: 'upload',
    value: function upload(options) {
      var header = options.header;
      var query = options.query;
      var buffer = options.buffer;

      return _superagent2.default.post(this.getUrl('upload')).type('form').set(header).query(this.getQuery(query)).send(buffer).then(this.parse.bind(this));
    }
  }, {
    key: 'download',
    value: function download(query) {
      return _superagent2.default.get(this.getUrl('get')).query(this.getQuery(query)).then(this.parse.bind(this));
    }
  }, {
    key: 'parse',
    value: function parse(data) {
      var result = data.body;
      if (result.errcode == undefined) {
        return data;
      }
      if (result.errcode) {
        throw new Error(result.errmsg);
      }
      return result;
    }
  }, {
    key: 'assemble',
    value: function assemble(data) {
      var errmsg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (!errmsg) {
        Object.assign(data, { errcode: 0 }, { errmsg: 'ok' });
      } else {
        Object.assign({ errcode: -1 }, { errmsg: errmsg });
      }
      return data;
    }
  }, {
    key: 'fromMedia',
    value: function fromMedia(options) {
      var filepath = options.filepath;

      return new Promise(function (resolve, reject) {
        _fs2.default.readFile(filepath, function (err, fileBuffer) {
          if (err) {
            return reject(err);
          }
          return resolve((0, _lodash2.default)(options).assign({ fileBuffer: fileBuffer }).value());
        });
      });
    }
  }, {
    key: 'buildFormData',
    value: function buildFormData(options) {
      var fileBuffer = options.fileBuffer;
      var filepath = options.filepath;
      var _options$partition = options.partition;
      var partition = _options$partition === undefined ? {} : _options$partition;

      var mime = {
        '.jpg': 'image',
        '.png': 'image',
        '.amr': 'voice'
      };
      var boundary = _service2.default.getNonceSecurityString();
      var contentType = 'multipart/form-data; boundary=' + boundary;
      var contentDisposition = 'form-data;name="media";filename="' + _path2.default.basename(filepath) + '"';
      var header = '--' + boundary + '\r\nContent-Disposition:' + contentDisposition + '\r\nContent-Type:multipart/form-data;boundary=----' + boundary + '\r\n\r\n';
      var headerBuffer = new Buffer(header, 'utf8');
      var endBuffer = new Buffer('\r\n--' + boundary + '--\r\n', 'utf8');
      var buffer = Buffer.concat([headerBuffer, fileBuffer, endBuffer]);
      return (0, _lodash2.default)(options).assign({
        query: { type: _lodash2.default.has(mime, _path2.default.extname(filepath)) ? mime[_path2.default.extname(filepath)] : 'file', 'media': header },
        header: Object.assign({ 'Content-Type': contentType }, partition),
        buffer: buffer
      }).value();
    }
  }]);

  return Base;
}();

exports.default = Base;
//# sourceMappingURL=data:application/json;base64,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QUE3RixFQURnQjtBQUV2QixnQkFBUSxPQUFPLE1BQVAsQ0FBYyxFQUFDLGdCQUFnQixXQUFqQixFQUFkLEVBQTZDLFNBQTdDLENBRmU7QUFHdkI7QUFIdUIsT0FBbEIsRUFJSixLQUpJLEVBQVA7QUFLRDs7Ozs7O2tCQUdZLEkiLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8xOC5cbiAqL1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAnc3VwZXJhZ2VudCc7XG5pbXBvcnQgdXJsIGZyb20ndXJsJztcbmltcG9ydCBwYXRoIGZyb20ncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5jbGFzcyBCYXNlIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgdGhpcy5zZXJ2aWNlID0gY29uZmlnLnNlcnZpY2U7XG4gICAgdGhpcy5iYXNlUGF0aCA9IGNvbmZpZy5iYXNlUGF0aDtcbiAgfVxuXG4gIGdldFVybChwYXRoTmFtZSkge1xuICAgIHZhciB1cmxPYmogPSB1cmwuZm9ybWF0KHtcbiAgICAgICdwcm90b2NvbCc6ICdodHRwcycsXG4gICAgICAnaG9zdCc6ICdvYXBpLmRpbmd0YWxrLmNvbScsXG4gICAgICAncGF0aG5hbWUnOiBwYXRoLmpvaW4odGhpcy5iYXNlUGF0aCwgcGF0aE5hbWUpXG4gICAgfSk7XG4gICAgcmV0dXJuIHVybE9iajtcbiAgfVxuXG4gIGdldFF1ZXJ5KHF1ZXJ5ID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHF1ZXJ5LCB7J2FjY2Vzc190b2tlbic6IHRoaXMuc2VydmljZS5nZXRBY2Nlc3NUb2tlbigpfSk7XG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9XG5cbiAgZ2V0TGlzdChxdWVyeSA9IHt9KSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoJ2xpc3QnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KHF1ZXJ5KSlcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICBnZXREZXRhaWwocXVlcnkpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLmdldCh0aGlzLmdldFVybCgnZ2V0JykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShxdWVyeSkpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgY3JlYXRlKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLnBvc3QodGhpcy5nZXRVcmwoJ2NyZWF0ZScpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkoKSlcbiAgICAgIC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgdXBkYXRlKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLnBvc3QodGhpcy5nZXRVcmwoJ3VwZGF0ZScpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkoKSlcbiAgICAgIC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcmVtb3ZlKHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoJ2RlbGV0ZScpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkocXVlcnkpKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHNlbmQob3B0aW9ucykge1xuICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAucG9zdCh0aGlzLmdldFVybCgnc2VuZCcpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkoKSlcbiAgICAgIC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgdXBsb2FkKG9wdGlvbnMpIHtcbiAgICBsZXQge2hlYWRlciwgcXVlcnksIGJ1ZmZlcn0gPSBvcHRpb25zO1xuICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAucG9zdCh0aGlzLmdldFVybCgndXBsb2FkJykpXG4gICAgICAudHlwZSgnZm9ybScpXG4gICAgICAuc2V0KGhlYWRlcilcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KHF1ZXJ5KSlcbiAgICAgIC5zZW5kKGJ1ZmZlcilcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICBkb3dubG9hZChxdWVyeSkge1xuICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAuZ2V0KHRoaXMuZ2V0VXJsKCdnZXQnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KHF1ZXJ5KSlcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICBwYXJzZShkYXRhKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGEuYm9keTtcbiAgICBpZiAocmVzdWx0LmVycmNvZGUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdC5lcnJjb2RlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm1zZyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBhc3NlbWJsZShkYXRhLCBlcnJtc2cgPSBudWxsKSB7XG4gICAgaWYgKCFlcnJtc2cpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwge2VycmNvZGU6IDB9LCB7ZXJybXNnOiAnb2snfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgT2JqZWN0LmFzc2lnbih7ZXJyY29kZTogLTF9LCB7ZXJybXNnfSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgZnJvbU1lZGlhKG9wdGlvbnMpIHtcbiAgICBsZXQge2ZpbGVwYXRofSA9IG9wdGlvbnM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuICAgICAgZnMucmVhZEZpbGUoZmlsZXBhdGgsIGZ1bmN0aW9uIChlcnIsIGZpbGVCdWZmZXIpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzb2x2ZShfKG9wdGlvbnMpLmFzc2lnbih7ZmlsZUJ1ZmZlcn0pLnZhbHVlKCkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBidWlsZEZvcm1EYXRhKG9wdGlvbnMpIHtcbiAgICBsZXQge2ZpbGVCdWZmZXIsIGZpbGVwYXRoLCBwYXJ0aXRpb24gPSB7fX0gPSBvcHRpb25zO1xuICAgIHZhciBtaW1lID0ge1xuICAgICAgJy5qcGcnOiAnaW1hZ2UnLFxuICAgICAgJy5wbmcnOiAnaW1hZ2UnLFxuICAgICAgJy5hbXInOiAndm9pY2UnXG4gICAgfTtcbiAgICB2YXIgYm91bmRhcnkgPSBTZXJ2aWNlLmdldE5vbmNlU2VjdXJpdHlTdHJpbmcoKTtcbiAgICB2YXIgY29udGVudFR5cGUgPSBgbXVsdGlwYXJ0L2Zvcm0tZGF0YTsgYm91bmRhcnk9JHtib3VuZGFyeX1gO1xuICAgIHZhciBjb250ZW50RGlzcG9zaXRpb24gPSBgZm9ybS1kYXRhO25hbWU9XFxcIm1lZGlhXFxcIjtmaWxlbmFtZT1cXFwiJHtwYXRoLmJhc2VuYW1lKGZpbGVwYXRoKX1cXFwiYDtcbiAgICB2YXIgaGVhZGVyID0gYC0tJHtib3VuZGFyeX1cXHJcXG5Db250ZW50LURpc3Bvc2l0aW9uOiR7Y29udGVudERpc3Bvc2l0aW9ufVxcclxcbkNvbnRlbnQtVHlwZTptdWx0aXBhcnQvZm9ybS1kYXRhO2JvdW5kYXJ5PS0tLS0ke2JvdW5kYXJ5fVxcclxcblxcclxcbmA7XG4gICAgdmFyIGhlYWRlckJ1ZmZlciA9IG5ldyBCdWZmZXIoaGVhZGVyLCAndXRmOCcpO1xuICAgIHZhciBlbmRCdWZmZXIgPSBuZXcgQnVmZmVyKGBcXHJcXG4tLSR7Ym91bmRhcnl9LS1cXHJcXG5gLCAndXRmOCcpO1xuICAgIHZhciBidWZmZXIgPSBCdWZmZXIuY29uY2F0KFtoZWFkZXJCdWZmZXIsIGZpbGVCdWZmZXIsIGVuZEJ1ZmZlcl0pO1xuICAgIHJldHVybiBfKG9wdGlvbnMpLmFzc2lnbih7XG4gICAgICBxdWVyeToge3R5cGU6IF8uaGFzKG1pbWUsIHBhdGguZXh0bmFtZShmaWxlcGF0aCkpID8gbWltZVtwYXRoLmV4dG5hbWUoZmlsZXBhdGgpXSA6ICdmaWxlJywgJ21lZGlhJzogaGVhZGVyfSxcbiAgICAgIGhlYWRlcjogT2JqZWN0LmFzc2lnbih7J0NvbnRlbnQtVHlwZSc6IGNvbnRlbnRUeXBlfSwgcGFydGl0aW9uKSxcbiAgICAgIGJ1ZmZlclxuICAgIH0pLnZhbHVlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
