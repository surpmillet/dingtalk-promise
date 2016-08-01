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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
  function Base(config) {
    _classCallCheck(this, Base);

    this.service = config.service;
    this.basePath = config.name;
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
    key: 'getSimpleList',
    value: function getSimpleList() {
      var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return _superagent2.default.get(this.getUrl('simplelist')).query(this.getQuery(query)).then(this.parse.bind(this));
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
    key: 'removeAll',
    value: function removeAll(options) {
      return _superagent2.default.post(this.getUrl('batchdelete')).query(this.getQuery()).send(options).then(this.parse.bind(this));
    }
  }, {
    key: 'send',
    value: function send(options) {
      return _superagent2.default.post(this.getUrl('send')).query(this.getQuery()).send(options).then(this.parse.bind(this));
    }
  }, {
    key: 'upload',
    value: function upload(options) {
      return _superagent2.default.post(this.getUrl('upload')).type('form').set('Content-Type', options.contentType).set('Content-Disposition', options.disposition).query(this.getQuery(options.query)).send(options.buffer).then(this.parse.bind(this));
    }
  }, {
    key: 'download',
    value: function download(query, path) {
      return _superagent2.default.get(this.getUrl('get')).query(this.getQuery(query)).then(this.parse.bind(this)).then(function (data) {
        return { data: data, path: path };
      });
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
  }]);

  return Base;
}();

exports.default = Base;
//# sourceMappingURL=data:application/json;base64,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ZSx5REFBTixJQUFNOztBQUM1QixVQUFJLENBQUMsTUFBTCxFQUFhO0FBQ1gsZUFBTyxNQUFQLENBQWMsSUFBZCxFQUFvQixFQUFDLFNBQVMsQ0FBVixFQUFwQixFQUFrQyxFQUFDLFFBQVEsSUFBVCxFQUFsQztBQUNELE9BRkQsTUFHSztBQUNILGVBQU8sTUFBUCxDQUFjLEVBQUMsU0FBUyxDQUFDLENBQVgsRUFBZCxFQUE2QixFQUFDLGNBQUQsRUFBN0I7QUFDRDtBQUNELGFBQU8sSUFBUDtBQUNEOzs7Ozs7a0JBR1ksSSIsImZpbGUiOiJiYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzE4LlxuICovXG5pbXBvcnQgcmVxdWVzdCBmcm9tICdzdXBlcmFnZW50JztcbmltcG9ydCB1cmwgZnJvbSd1cmwnO1xuaW1wb3J0IHBhdGggZnJvbSdwYXRoJztcbmNsYXNzIEJhc2Uge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICB0aGlzLnNlcnZpY2UgPSBjb25maWcuc2VydmljZTtcbiAgICB0aGlzLmJhc2VQYXRoID0gY29uZmlnLm5hbWU7XG4gIH1cblxuICBnZXRVcmwocGF0aE5hbWUpIHtcbiAgICB2YXIgdXJsT2JqID0gdXJsLmZvcm1hdCh7XG4gICAgICAncHJvdG9jb2wnOiAnaHR0cHMnLFxuICAgICAgJ2hvc3QnOiAnb2FwaS5kaW5ndGFsay5jb20nLFxuICAgICAgJ3BhdGhuYW1lJzogcGF0aC5qb2luKHRoaXMuYmFzZVBhdGgsIHBhdGhOYW1lKVxuICAgIH0pO1xuICAgIHJldHVybiB1cmxPYmo7XG4gIH1cblxuICBnZXRRdWVyeShxdWVyeSA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbihxdWVyeSwgeydhY2Nlc3NfdG9rZW4nOiB0aGlzLnNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKX0pO1xuICAgIHJldHVybiBxdWVyeTtcbiAgfVxuXG4gIGdldFNpbXBsZUxpc3QocXVlcnkgPSB7fSkge1xuICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAuZ2V0KHRoaXMuZ2V0VXJsKCdzaW1wbGVsaXN0JykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShxdWVyeSkpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZ2V0TGlzdChxdWVyeSA9IHt9KSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoJ2xpc3QnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KHF1ZXJ5KSlcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICBnZXREZXRhaWwocXVlcnkpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLmdldCh0aGlzLmdldFVybCgnZ2V0JykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShxdWVyeSkpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgY3JlYXRlKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLnBvc3QodGhpcy5nZXRVcmwoJ2NyZWF0ZScpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkoKSlcbiAgICAgIC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgdXBkYXRlKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLnBvc3QodGhpcy5nZXRVcmwoJ3VwZGF0ZScpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkoKSlcbiAgICAgIC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcmVtb3ZlKHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoJ2RlbGV0ZScpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkocXVlcnkpKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHJlbW92ZUFsbChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5wb3N0KHRoaXMuZ2V0VXJsKCdiYXRjaGRlbGV0ZScpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkoKSlcbiAgICAgIC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgc2VuZChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5wb3N0KHRoaXMuZ2V0VXJsKCdzZW5kJykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeSgpKVxuICAgICAgLnNlbmQob3B0aW9ucylcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICB1cGxvYWQob3B0aW9ucykge1xuICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAucG9zdCh0aGlzLmdldFVybCgndXBsb2FkJykpXG4gICAgICAudHlwZSgnZm9ybScpXG4gICAgICAuc2V0KCdDb250ZW50LVR5cGUnLCBvcHRpb25zLmNvbnRlbnRUeXBlKVxuICAgICAgLnNldCgnQ29udGVudC1EaXNwb3NpdGlvbicsIG9wdGlvbnMuZGlzcG9zaXRpb24pXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShvcHRpb25zLnF1ZXJ5KSlcbiAgICAgIC5zZW5kKG9wdGlvbnMuYnVmZmVyKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGRvd25sb2FkKHF1ZXJ5LCBwYXRoKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoJ2dldCcpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkocXVlcnkpKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4ge2RhdGEsIHBhdGh9O1xuICAgICAgfSk7XG4gIH1cblxuICBwYXJzZShkYXRhKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGEuYm9keTtcbiAgICBpZiAocmVzdWx0LmVycmNvZGUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdC5lcnJjb2RlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm1zZyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBhc3NlbWJsZShkYXRhLCBlcnJtc2cgPSBudWxsKSB7XG4gICAgaWYgKCFlcnJtc2cpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwge2VycmNvZGU6IDB9LCB7ZXJybXNnOiAnb2snfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgT2JqZWN0LmFzc2lnbih7ZXJyY29kZTogLTF9LCB7ZXJybXNnfSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2U7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
