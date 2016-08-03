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

      return _superagent2.default.post(this.getUrl('upload')).set(header).query(this.getQuery(query)).send(buffer).then(this.parse.bind(this));
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
        return _lodash2.default.assignIn(data, { errcode: 0 }, { errmsg: 'ok' });
      } else {
        return { errcode: -1, errmsg: errmsg };
      }
    }
  }, {
    key: 'read',
    value: function read(options) {
      var filePath = options.filePath;

      return new Promise(function (resolve, reject) {
        _fs2.default.readFile(filePath, function (err, buffer) {
          if (err) {
            return reject(err);
          }
          return resolve(_lodash2.default.assignIn(options, { buffer: buffer }));
        });
      });
    }
  }, {
    key: 'buildFormData',
    value: function buildFormData(options) {
      var buffer = options.buffer;
      var filePath = options.filePath;
      var _options$header = options.header;
      var header = _options$header === undefined ? {} : _options$header;

      var boundary = _service2.default.getNonceSecurityString();
      var contentType = 'multipart/form-data; boundary=' + boundary;
      var contentDisposition = 'form-data;name="media";filename="' + _path2.default.basename(filePath) + '"';
      var contentHeader = '--' + boundary + '\r\nContent-Disposition:' + contentDisposition + '\r\nContent-Type:multipart/form-data;boundary=----' + _service2.default.getNonceSecurityString() + '\r\n\r\n';
      var headerBuffer = new Buffer(contentHeader);
      var endBuffer = new Buffer('\r\n--' + boundary + '--\r\n');
      buffer = Buffer.concat([headerBuffer, buffer, endBuffer]);
      _lodash2.default.assignIn(header, { 'Content-Type': contentType });
      return _lodash2.default.assignIn(options, { buffer: buffer, header: header, contentHeader: contentHeader });
    }
  }]);

  return Base;
}();

exports.default = Base;
//# sourceMappingURL=data:application/json;base64,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QUFPLE9BQU8sR0FBUCxDQUFQO0FBQ0Q7QUFDRCxpQkFBTyxRQUFRLGlCQUFFLFFBQUYsQ0FBVyxPQUFYLEVBQW9CLEVBQUMsY0FBRCxFQUFwQixDQUFSLENBQVA7QUFDRCxTQUxEO0FBTUQsT0FQTSxDQUFQO0FBUUQ7OztrQ0FFYSxPLEVBQVM7QUFBQSxVQUNoQixNQURnQixHQUNpQixPQURqQixDQUNoQixNQURnQjtBQUFBLFVBQ1IsUUFEUSxHQUNpQixPQURqQixDQUNSLFFBRFE7QUFBQSw0QkFDaUIsT0FEakIsQ0FDRSxNQURGO0FBQUEsVUFDRSxNQURGLG1DQUNXLEVBRFg7O0FBRXJCLFVBQUksV0FBVyxrQkFBUSxzQkFBUixFQUFmO0FBQ0EsVUFBSSxpREFBK0MsUUFBbkQ7QUFDQSxVQUFJLDJEQUE0RCxlQUFLLFFBQUwsQ0FBYyxRQUFkLENBQTVELE1BQUo7QUFDQSxVQUFJLHVCQUFxQixRQUFyQixnQ0FBd0Qsa0JBQXhELDBEQUErSCxrQkFBUSxzQkFBUixFQUEvSCxhQUFKO0FBQ0EsVUFBSSxlQUFlLElBQUksTUFBSixDQUFXLGFBQVgsQ0FBbkI7QUFDQSxVQUFJLFlBQVksSUFBSSxNQUFKLFlBQW9CLFFBQXBCLFlBQWhCO0FBQ0EsZUFBUyxPQUFPLE1BQVAsQ0FBYyxDQUFDLFlBQUQsRUFBZSxNQUFmLEVBQXVCLFNBQXZCLENBQWQsQ0FBVDtBQUNBLHVCQUFFLFFBQUYsQ0FBVyxNQUFYLEVBQW1CLEVBQUMsZ0JBQWdCLFdBQWpCLEVBQW5CO0FBQ0EsYUFBTyxpQkFBRSxRQUFGLENBQVcsT0FBWCxFQUFvQixFQUFDLGNBQUQsRUFBUyxjQUFULEVBQWlCLDRCQUFqQixFQUFwQixDQUFQO0FBQ0Q7Ozs7OztrQkFHWSxJIiwiZmlsZSI6ImJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMTguXG4gKi9cbmltcG9ydCByZXF1ZXN0IGZyb20gJ3N1cGVyYWdlbnQnO1xuaW1wb3J0IHVybCBmcm9tJ3VybCc7XG5pbXBvcnQgcGF0aCBmcm9tJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBTZXJ2aWNlIGZyb20gJy4vc2VydmljZSc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuY2xhc3MgQmFzZSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHRoaXMuc2VydmljZSA9IGNvbmZpZy5zZXJ2aWNlO1xuICAgIHRoaXMuYmFzZVBhdGggPSBjb25maWcuYmFzZVBhdGg7XG4gIH1cblxuICBnZXRVcmwocGF0aE5hbWUpIHtcbiAgICB2YXIgdXJsT2JqID0gdXJsLmZvcm1hdCh7XG4gICAgICAncHJvdG9jb2wnOiAnaHR0cHMnLFxuICAgICAgJ2hvc3QnOiAnb2FwaS5kaW5ndGFsay5jb20nLFxuICAgICAgJ3BhdGhuYW1lJzogcGF0aC5qb2luKHRoaXMuYmFzZVBhdGgsIHBhdGhOYW1lKVxuICAgIH0pO1xuICAgIHJldHVybiB1cmxPYmo7XG4gIH1cblxuICBnZXRRdWVyeShxdWVyeSA9IHt9KSB7XG4gICAgXyhxdWVyeSkuYXNzaWduKHsnYWNjZXNzX3Rva2VuJzogdGhpcy5zZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCl9KS52YWx1ZSgpO1xuICAgIHJldHVybiBxdWVyeTtcbiAgfVxuXG4gIGdldExpc3QocXVlcnkgPSB7fSkge1xuICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAuZ2V0KHRoaXMuZ2V0VXJsKCdsaXN0JykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShxdWVyeSkpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZ2V0RGV0YWlsKHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoJ2dldCcpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkocXVlcnkpKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGNyZWF0ZShvcHRpb25zKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5wb3N0KHRoaXMuZ2V0VXJsKCdjcmVhdGUnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KCkpXG4gICAgICAuc2VuZChvcHRpb25zKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHVwZGF0ZShvcHRpb25zKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5wb3N0KHRoaXMuZ2V0VXJsKCd1cGRhdGUnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KCkpXG4gICAgICAuc2VuZChvcHRpb25zKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHJlbW92ZShxdWVyeSkge1xuICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAuZ2V0KHRoaXMuZ2V0VXJsKCdkZWxldGUnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KHF1ZXJ5KSlcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZW5kKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLnBvc3QodGhpcy5nZXRVcmwoJ3NlbmQnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KCkpXG4gICAgICAuc2VuZChvcHRpb25zKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHVwbG9hZChvcHRpb25zKSB7XG4gICAgbGV0IHtoZWFkZXIsIHF1ZXJ5LCBidWZmZXJ9ID0gb3B0aW9ucztcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLnBvc3QodGhpcy5nZXRVcmwoJ3VwbG9hZCcpKVxuICAgICAgLnNldChoZWFkZXIpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShxdWVyeSkpXG4gICAgICAuc2VuZChidWZmZXIpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZG93bmxvYWQocXVlcnkpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLmdldCh0aGlzLmdldFVybCgnZ2V0JykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShxdWVyeSkpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcGFyc2UoZGF0YSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhLmJvZHk7XG4gICAgaWYgKHJlc3VsdC5lcnJjb2RlID09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmIChyZXN1bHQuZXJyY29kZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5lcnJtc2cpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgYXNzZW1ibGUoZGF0YSwgZXJybXNnID0gbnVsbCkge1xuICAgIGlmICghZXJybXNnKSB7XG4gICAgICByZXR1cm4gXy5hc3NpZ25JbihkYXRhLCB7ZXJyY29kZTogMH0sIHtlcnJtc2c6ICdvayd9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4ge2VycmNvZGU6IC0xLCBlcnJtc2d9O1xuICAgIH1cbiAgfVxuXG4gIHJlYWQob3B0aW9ucykge1xuICAgIGxldCB7ZmlsZVBhdGh9ID0gb3B0aW9ucztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICBmcy5yZWFkRmlsZShmaWxlUGF0aCwgZnVuY3Rpb24gKGVyciwgYnVmZmVyKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc29sdmUoXy5hc3NpZ25JbihvcHRpb25zLCB7YnVmZmVyfSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBidWlsZEZvcm1EYXRhKG9wdGlvbnMpIHtcbiAgICBsZXQge2J1ZmZlciwgZmlsZVBhdGgsIGhlYWRlciA9IHt9fSA9IG9wdGlvbnM7XG4gICAgdmFyIGJvdW5kYXJ5ID0gU2VydmljZS5nZXROb25jZVNlY3VyaXR5U3RyaW5nKCk7XG4gICAgdmFyIGNvbnRlbnRUeXBlID0gYG11bHRpcGFydC9mb3JtLWRhdGE7IGJvdW5kYXJ5PSR7Ym91bmRhcnl9YDtcbiAgICB2YXIgY29udGVudERpc3Bvc2l0aW9uID0gYGZvcm0tZGF0YTtuYW1lPVxcXCJtZWRpYVxcXCI7ZmlsZW5hbWU9XFxcIiR7cGF0aC5iYXNlbmFtZShmaWxlUGF0aCl9XFxcImA7XG4gICAgdmFyIGNvbnRlbnRIZWFkZXIgPSBgLS0ke2JvdW5kYXJ5fVxcclxcbkNvbnRlbnQtRGlzcG9zaXRpb246JHtjb250ZW50RGlzcG9zaXRpb259XFxyXFxuQ29udGVudC1UeXBlOm11bHRpcGFydC9mb3JtLWRhdGE7Ym91bmRhcnk9LS0tLSR7U2VydmljZS5nZXROb25jZVNlY3VyaXR5U3RyaW5nKCl9XFxyXFxuXFxyXFxuYDtcbiAgICB2YXIgaGVhZGVyQnVmZmVyID0gbmV3IEJ1ZmZlcihjb250ZW50SGVhZGVyKTtcbiAgICB2YXIgZW5kQnVmZmVyID0gbmV3IEJ1ZmZlcihgXFxyXFxuLS0ke2JvdW5kYXJ5fS0tXFxyXFxuYCk7XG4gICAgYnVmZmVyID0gQnVmZmVyLmNvbmNhdChbaGVhZGVyQnVmZmVyLCBidWZmZXIsIGVuZEJ1ZmZlcl0pO1xuICAgIF8uYXNzaWduSW4oaGVhZGVyLCB7J0NvbnRlbnQtVHlwZSc6IGNvbnRlbnRUeXBlfSk7XG4gICAgcmV0dXJuIF8uYXNzaWduSW4ob3B0aW9ucywge2J1ZmZlciwgaGVhZGVyLCBjb250ZW50SGVhZGVyfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
