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
      return _superagent2.default.post(this.getUrl('upload')).type('form').set(options.header).query(this.getQuery(options.query)).send(options.buffer).then(this.parse.bind(this));
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
  }, {
    key: 'fromMedia',
    value: function fromMedia(filepath) {
      return new Promise(function (resolve, reject) {
        _fs2.default.readFile(filepath, function (err, data) {
          if (err) {
            return reject(err);
          }
          return resolve(data);
        });
      });
    }
  }, {
    key: 'buildFormData',
    value: function buildFormData(options) {
      var data = options.data;
      var filepath = options.filepath;
      var _options$ndPartition = options.ndPartition;
      var ndPartition = _options$ndPartition === undefined ? {} : _options$ndPartition;

      var mime = {
        '.jpg': 'image',
        '.png': 'image',
        '.amr': 'voice'
      };
      var boundary = _service2.default.getNonceSecurityString();
      var contentType = 'multipart/form-data; boundary=' + boundary;
      var contentDisposition = 'form-data;name="media";filename="' + _path2.default.basename(filepath) + '"';
      // var header = `--${boundary}\r\nContent-Disposition:${contentDisposition}\r\nContent-Type:application/octet-stream\r\n\r\n`;
      var header = '--' + boundary + '\r\nContent-Disposition:' + contentDisposition + '\r\nContent-Type:multipart/form-data;boundary=----' + boundary + '\r\n\r\n';
      var headerBuffer = new Buffer(header, 'utf8');
      var endBuffer = new Buffer('\r\n--' + boundary + '--\r\n', 'utf8');
      var buffer = Buffer.concat([headerBuffer, data, endBuffer]);
      return {
        query: { type: _lodash2.default.has(mime, _path2.default.extname(filepath)) ? mime[_path2.default.extname(filepath)] : 'file', 'media': header },
        header: Object.assign({ 'Content-Type': contentType }, ndPartition),
        buffer: buffer
      };
    }
  }]);

  return Base;
}();

exports.default = Base;
//# sourceMappingURL=data:application/json;base64,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dXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtaWNoYW8gb24gMTYvNy8xOC5cbiAqL1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAnc3VwZXJhZ2VudCc7XG5pbXBvcnQgdXJsIGZyb20ndXJsJztcbmltcG9ydCBwYXRoIGZyb20ncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5jbGFzcyBCYXNlIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgdGhpcy5zZXJ2aWNlID0gY29uZmlnLnNlcnZpY2U7XG4gICAgdGhpcy5iYXNlUGF0aCA9IGNvbmZpZy5iYXNlUGF0aDtcbiAgfVxuXG4gIGdldFVybChwYXRoTmFtZSkge1xuICAgIHZhciB1cmxPYmogPSB1cmwuZm9ybWF0KHtcbiAgICAgICdwcm90b2NvbCc6ICdodHRwcycsXG4gICAgICAnaG9zdCc6ICdvYXBpLmRpbmd0YWxrLmNvbScsXG4gICAgICAncGF0aG5hbWUnOiBwYXRoLmpvaW4odGhpcy5iYXNlUGF0aCwgcGF0aE5hbWUpXG4gICAgfSk7XG4gICAgcmV0dXJuIHVybE9iajtcbiAgfVxuXG4gIGdldFF1ZXJ5KHF1ZXJ5ID0ge30pIHtcbiAgICBPYmplY3QuYXNzaWduKHF1ZXJ5LCB7J2FjY2Vzc190b2tlbic6IHRoaXMuc2VydmljZS5nZXRBY2Nlc3NUb2tlbigpfSk7XG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9XG5cbiAgZ2V0TGlzdChxdWVyeSA9IHt9KSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoJ2xpc3QnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KHF1ZXJ5KSlcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICBnZXREZXRhaWwocXVlcnkpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLmdldCh0aGlzLmdldFVybCgnZ2V0JykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShxdWVyeSkpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgY3JlYXRlKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLnBvc3QodGhpcy5nZXRVcmwoJ2NyZWF0ZScpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkoKSlcbiAgICAgIC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgdXBkYXRlKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLnBvc3QodGhpcy5nZXRVcmwoJ3VwZGF0ZScpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkoKSlcbiAgICAgIC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcmVtb3ZlKHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoJ2RlbGV0ZScpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkocXVlcnkpKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHNlbmQob3B0aW9ucykge1xuICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAucG9zdCh0aGlzLmdldFVybCgnc2VuZCcpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkoKSlcbiAgICAgIC5zZW5kKG9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgdXBsb2FkKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLnBvc3QodGhpcy5nZXRVcmwoJ3VwbG9hZCcpKVxuICAgICAgLnR5cGUoJ2Zvcm0nKVxuICAgICAgLnNldChvcHRpb25zLmhlYWRlcilcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KG9wdGlvbnMucXVlcnkpKVxuICAgICAgLnNlbmQob3B0aW9ucy5idWZmZXIpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZG93bmxvYWQocXVlcnksIHBhdGgpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLmdldCh0aGlzLmdldFVybCgnZ2V0JykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShxdWVyeSkpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiB7ZGF0YSwgcGF0aH07XG4gICAgICB9KTtcbiAgfVxuXG4gIHBhcnNlKGRhdGEpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YS5ib2R5O1xuICAgIGlmIChyZXN1bHQuZXJyY29kZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAocmVzdWx0LmVycmNvZGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihyZXN1bHQuZXJybXNnKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGFzc2VtYmxlKGRhdGEsIGVycm1zZyA9IG51bGwpIHtcbiAgICBpZiAoIWVycm1zZykge1xuICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCB7ZXJyY29kZTogMH0sIHtlcnJtc2c6ICdvayd9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBPYmplY3QuYXNzaWduKHtlcnJjb2RlOiAtMX0sIHtlcnJtc2d9KTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBmcm9tTWVkaWEoZmlsZXBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICBmcy5yZWFkRmlsZShmaWxlcGF0aCwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNvbHZlKGRhdGEpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBidWlsZEZvcm1EYXRhKG9wdGlvbnMpIHtcbiAgICBsZXQge2RhdGEsIGZpbGVwYXRoLCBuZFBhcnRpdGlvbiA9IHt9fSA9IG9wdGlvbnM7XG4gICAgdmFyIG1pbWUgPSB7XG4gICAgICAnLmpwZyc6ICdpbWFnZScsXG4gICAgICAnLnBuZyc6ICdpbWFnZScsXG4gICAgICAnLmFtcic6ICd2b2ljZSdcbiAgICB9O1xuICAgIHZhciBib3VuZGFyeSA9IFNlcnZpY2UuZ2V0Tm9uY2VTZWN1cml0eVN0cmluZygpO1xuICAgIHZhciBjb250ZW50VHlwZSA9IGBtdWx0aXBhcnQvZm9ybS1kYXRhOyBib3VuZGFyeT0ke2JvdW5kYXJ5fWA7XG4gICAgdmFyIGNvbnRlbnREaXNwb3NpdGlvbiA9IGBmb3JtLWRhdGE7bmFtZT1cXFwibWVkaWFcXFwiO2ZpbGVuYW1lPVxcXCIke3BhdGguYmFzZW5hbWUoZmlsZXBhdGgpfVxcXCJgO1xuICAgIC8vIHZhciBoZWFkZXIgPSBgLS0ke2JvdW5kYXJ5fVxcclxcbkNvbnRlbnQtRGlzcG9zaXRpb246JHtjb250ZW50RGlzcG9zaXRpb259XFxyXFxuQ29udGVudC1UeXBlOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVxcclxcblxcclxcbmA7XG4gICAgdmFyIGhlYWRlciA9IGAtLSR7Ym91bmRhcnl9XFxyXFxuQ29udGVudC1EaXNwb3NpdGlvbjoke2NvbnRlbnREaXNwb3NpdGlvbn1cXHJcXG5Db250ZW50LVR5cGU6bXVsdGlwYXJ0L2Zvcm0tZGF0YTtib3VuZGFyeT0tLS0tJHtib3VuZGFyeX1cXHJcXG5cXHJcXG5gO1xuICAgIHZhciBoZWFkZXJCdWZmZXIgPSBuZXcgQnVmZmVyKGhlYWRlciwgJ3V0ZjgnKTtcbiAgICB2YXIgZW5kQnVmZmVyID0gbmV3IEJ1ZmZlcihgXFxyXFxuLS0ke2JvdW5kYXJ5fS0tXFxyXFxuYCwgJ3V0ZjgnKTtcbiAgICB2YXIgYnVmZmVyID0gQnVmZmVyLmNvbmNhdChbaGVhZGVyQnVmZmVyLCBkYXRhLCBlbmRCdWZmZXJdKTtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlcnk6IHt0eXBlOiBfLmhhcyhtaW1lLCBwYXRoLmV4dG5hbWUoZmlsZXBhdGgpKSA/IG1pbWVbcGF0aC5leHRuYW1lKGZpbGVwYXRoKV0gOiAnZmlsZScsICdtZWRpYSc6IGhlYWRlcn0sXG4gICAgICBoZWFkZXI6IE9iamVjdC5hc3NpZ24oeydDb250ZW50LVR5cGUnOiBjb250ZW50VHlwZX0sIG5kUGFydGl0aW9uKSxcbiAgICAgIGJ1ZmZlclxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
