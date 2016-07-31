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
    key: 'parse',
    value: function parse(data) {
      data = data.body;
      if (data.errcode != 0) {
        throw new Error(data.errmsg);
      }
      return data;
    }
  }]);

  return Base;
}();

exports.default = Base;
//# sourceMappingURL=data:application/json;base64,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S0FBSyxPQUFMLElBQWdCLENBQXBCLEVBQXVCO0FBQ3JCLGNBQU0sSUFBSSxLQUFKLENBQVUsS0FBSyxNQUFmLENBQU47QUFDRDtBQUNELGFBQU8sSUFBUDtBQUNEOzs7Ozs7a0JBR1ksSSIsImZpbGUiOiJiYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzE4LlxuICovXG5pbXBvcnQgcmVxdWVzdCBmcm9tICdzdXBlcmFnZW50JztcbmltcG9ydCB1cmwgZnJvbSd1cmwnO1xuaW1wb3J0IHBhdGggZnJvbSdwYXRoJztcbmNsYXNzIEJhc2Uge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICB0aGlzLnNlcnZpY2UgPSBjb25maWcuc2VydmljZTtcbiAgICB0aGlzLmJhc2VQYXRoID0gY29uZmlnLm5hbWU7XG4gIH1cblxuICBnZXRVcmwocGF0aE5hbWUpIHtcbiAgICB2YXIgdXJsT2JqID0gdXJsLmZvcm1hdCh7XG4gICAgICAncHJvdG9jb2wnOiAnaHR0cHMnLFxuICAgICAgJ2hvc3QnOiAnb2FwaS5kaW5ndGFsay5jb20nLFxuICAgICAgJ3BhdGhuYW1lJzogcGF0aC5qb2luKHRoaXMuYmFzZVBhdGgsIHBhdGhOYW1lKVxuICAgIH0pO1xuICAgIHJldHVybiB1cmxPYmo7XG4gIH1cblxuICBnZXRRdWVyeShxdWVyeSA9IHt9KSB7XG4gICAgT2JqZWN0LmFzc2lnbihxdWVyeSwgeydhY2Nlc3NfdG9rZW4nOiB0aGlzLnNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKX0pO1xuICAgIHJldHVybiBxdWVyeTtcbiAgfVxuXG4gIGdldFNpbXBsZUxpc3QocXVlcnkgPSB7fSkge1xuICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAuZ2V0KHRoaXMuZ2V0VXJsKCdzaW1wbGVsaXN0JykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShxdWVyeSkpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZ2V0TGlzdChxdWVyeSA9IHt9KSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoJ2xpc3QnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KHF1ZXJ5KSlcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICBnZXREZXRhaWwocXVlcnkpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLmdldCh0aGlzLmdldFVybCgnZ2V0JykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShxdWVyeSkpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgY3JlYXRlKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLnBvc3QodGhpcy5nZXRVcmwoJ2NyZWF0ZScpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkoKSlcbiAgICAgIC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgdXBkYXRlKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLnBvc3QodGhpcy5nZXRVcmwoJ3VwZGF0ZScpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkoKSlcbiAgICAgIC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcmVtb3ZlKHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoJ2RlbGV0ZScpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkocXVlcnkpKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHJlbW92ZUFsbChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5wb3N0KHRoaXMuZ2V0VXJsKCdiYXRjaGRlbGV0ZScpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkoKSlcbiAgICAgIC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcGFyc2UoZGF0YSkge1xuICAgIGRhdGEgPSBkYXRhLmJvZHk7XG4gICAgaWYgKGRhdGEuZXJyY29kZSAhPSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJtc2cpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
