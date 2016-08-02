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

      (0, _lodash2.default)(query).assign({ 'access_token': this.service.getAccessToken() }).value();
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
        return (0, _lodash2.default)(data).assign({ errcode: 0 }, { errmsg: 'ok' }).value();
      } else {
        return { errcode: -1, errmsg: errmsg };
      }
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
        header: (0, _lodash2.default)(partition).assign({ 'Content-Type': contentType }).value(),
        buffer: buffer
      }).value();
    }
  }]);

  return Base;
}();

exports.default = Base;
//# sourceMappingURL=data:application/json;base64,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RixFQURnQjtBQUV2QixnQkFBUSxzQkFBRSxTQUFGLEVBQWEsTUFBYixDQUFvQixFQUFDLGdCQUFnQixXQUFqQixFQUFwQixFQUFtRCxLQUFuRCxFQUZlO0FBR3ZCO0FBSHVCLE9BQWxCLEVBSUosS0FKSSxFQUFQO0FBS0Q7Ozs7OztrQkFHWSxJIiwiZmlsZSI6ImJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMTguXG4gKi9cbmltcG9ydCByZXF1ZXN0IGZyb20gJ3N1cGVyYWdlbnQnO1xuaW1wb3J0IHVybCBmcm9tJ3VybCc7XG5pbXBvcnQgcGF0aCBmcm9tJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBTZXJ2aWNlIGZyb20gJy4vc2VydmljZSc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuY2xhc3MgQmFzZSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHRoaXMuc2VydmljZSA9IGNvbmZpZy5zZXJ2aWNlO1xuICAgIHRoaXMuYmFzZVBhdGggPSBjb25maWcuYmFzZVBhdGg7XG4gIH1cblxuICBnZXRVcmwocGF0aE5hbWUpIHtcbiAgICB2YXIgdXJsT2JqID0gdXJsLmZvcm1hdCh7XG4gICAgICAncHJvdG9jb2wnOiAnaHR0cHMnLFxuICAgICAgJ2hvc3QnOiAnb2FwaS5kaW5ndGFsay5jb20nLFxuICAgICAgJ3BhdGhuYW1lJzogcGF0aC5qb2luKHRoaXMuYmFzZVBhdGgsIHBhdGhOYW1lKVxuICAgIH0pO1xuICAgIHJldHVybiB1cmxPYmo7XG4gIH1cblxuICBnZXRRdWVyeShxdWVyeSA9IHt9KSB7XG4gICAgXyhxdWVyeSkuYXNzaWduKHsnYWNjZXNzX3Rva2VuJzogdGhpcy5zZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCl9KS52YWx1ZSgpO1xuICAgIHJldHVybiBxdWVyeTtcbiAgfVxuXG4gIGdldExpc3QocXVlcnkgPSB7fSkge1xuICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAuZ2V0KHRoaXMuZ2V0VXJsKCdsaXN0JykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShxdWVyeSkpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZ2V0RGV0YWlsKHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoJ2dldCcpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkocXVlcnkpKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGNyZWF0ZShvcHRpb25zKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5wb3N0KHRoaXMuZ2V0VXJsKCdjcmVhdGUnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KCkpXG4gICAgICAuc2VuZChvcHRpb25zKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHVwZGF0ZShvcHRpb25zKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5wb3N0KHRoaXMuZ2V0VXJsKCd1cGRhdGUnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KCkpXG4gICAgICAuc2VuZChvcHRpb25zKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHJlbW92ZShxdWVyeSkge1xuICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAuZ2V0KHRoaXMuZ2V0VXJsKCdkZWxldGUnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KHF1ZXJ5KSlcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZW5kKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLnBvc3QodGhpcy5nZXRVcmwoJ3NlbmQnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KCkpXG4gICAgICAuc2VuZChvcHRpb25zKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHVwbG9hZChvcHRpb25zKSB7XG4gICAgbGV0IHtoZWFkZXIsIHF1ZXJ5LCBidWZmZXJ9ID0gb3B0aW9ucztcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLnBvc3QodGhpcy5nZXRVcmwoJ3VwbG9hZCcpKVxuICAgICAgLnR5cGUoJ2Zvcm0nKVxuICAgICAgLnNldChoZWFkZXIpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShxdWVyeSkpXG4gICAgICAuc2VuZChidWZmZXIpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZG93bmxvYWQocXVlcnkpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLmdldCh0aGlzLmdldFVybCgnZ2V0JykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShxdWVyeSkpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcGFyc2UoZGF0YSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhLmJvZHk7XG4gICAgaWYgKHJlc3VsdC5lcnJjb2RlID09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmIChyZXN1bHQuZXJyY29kZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5lcnJtc2cpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgYXNzZW1ibGUoZGF0YSwgZXJybXNnID0gbnVsbCkge1xuICAgIGlmICghZXJybXNnKSB7XG4gICAgICByZXR1cm4gXyhkYXRhKS5hc3NpZ24oe2VycmNvZGU6IDB9LCB7ZXJybXNnOiAnb2snfSkudmFsdWUoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4ge2VycmNvZGU6IC0xLCBlcnJtc2d9O1xuICAgIH1cbiAgfVxuXG4gIGZyb21NZWRpYShvcHRpb25zKSB7XG4gICAgbGV0IHtmaWxlcGF0aH0gPSBvcHRpb25zO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcbiAgICAgIGZzLnJlYWRGaWxlKGZpbGVwYXRoLCBmdW5jdGlvbiAoZXJyLCBmaWxlQnVmZmVyKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc29sdmUoXyhvcHRpb25zKS5hc3NpZ24oe2ZpbGVCdWZmZXJ9KS52YWx1ZSgpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYnVpbGRGb3JtRGF0YShvcHRpb25zKSB7XG4gICAgbGV0IHtmaWxlQnVmZmVyLCBmaWxlcGF0aCwgcGFydGl0aW9uID0ge319ID0gb3B0aW9ucztcbiAgICB2YXIgbWltZSA9IHtcbiAgICAgICcuanBnJzogJ2ltYWdlJyxcbiAgICAgICcucG5nJzogJ2ltYWdlJyxcbiAgICAgICcuYW1yJzogJ3ZvaWNlJ1xuICAgIH07XG4gICAgdmFyIGJvdW5kYXJ5ID0gU2VydmljZS5nZXROb25jZVNlY3VyaXR5U3RyaW5nKCk7XG4gICAgdmFyIGNvbnRlbnRUeXBlID0gYG11bHRpcGFydC9mb3JtLWRhdGE7IGJvdW5kYXJ5PSR7Ym91bmRhcnl9YDtcbiAgICB2YXIgY29udGVudERpc3Bvc2l0aW9uID0gYGZvcm0tZGF0YTtuYW1lPVxcXCJtZWRpYVxcXCI7ZmlsZW5hbWU9XFxcIiR7cGF0aC5iYXNlbmFtZShmaWxlcGF0aCl9XFxcImA7XG4gICAgdmFyIGhlYWRlciA9IGAtLSR7Ym91bmRhcnl9XFxyXFxuQ29udGVudC1EaXNwb3NpdGlvbjoke2NvbnRlbnREaXNwb3NpdGlvbn1cXHJcXG5Db250ZW50LVR5cGU6bXVsdGlwYXJ0L2Zvcm0tZGF0YTtib3VuZGFyeT0tLS0tJHtib3VuZGFyeX1cXHJcXG5cXHJcXG5gO1xuICAgIHZhciBoZWFkZXJCdWZmZXIgPSBuZXcgQnVmZmVyKGhlYWRlciwgJ3V0ZjgnKTtcbiAgICB2YXIgZW5kQnVmZmVyID0gbmV3IEJ1ZmZlcihgXFxyXFxuLS0ke2JvdW5kYXJ5fS0tXFxyXFxuYCwgJ3V0ZjgnKTtcbiAgICB2YXIgYnVmZmVyID0gQnVmZmVyLmNvbmNhdChbaGVhZGVyQnVmZmVyLCBmaWxlQnVmZmVyLCBlbmRCdWZmZXJdKTtcbiAgICByZXR1cm4gXyhvcHRpb25zKS5hc3NpZ24oe1xuICAgICAgcXVlcnk6IHt0eXBlOiBfLmhhcyhtaW1lLCBwYXRoLmV4dG5hbWUoZmlsZXBhdGgpKSA/IG1pbWVbcGF0aC5leHRuYW1lKGZpbGVwYXRoKV0gOiAnZmlsZScsICdtZWRpYSc6IGhlYWRlcn0sXG4gICAgICBoZWFkZXI6IF8ocGFydGl0aW9uKS5hc3NpZ24oeydDb250ZW50LVR5cGUnOiBjb250ZW50VHlwZX0pLnZhbHVlKCksXG4gICAgICBidWZmZXJcbiAgICB9KS52YWx1ZSgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2U7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
