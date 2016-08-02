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
//# sourceMappingURL=data:application/json;base64,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LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzE4LlxuICovXG5pbXBvcnQgcmVxdWVzdCBmcm9tICdzdXBlcmFnZW50JztcbmltcG9ydCB1cmwgZnJvbSd1cmwnO1xuaW1wb3J0IHBhdGggZnJvbSdwYXRoJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgU2VydmljZSBmcm9tICcuL3NlcnZpY2UnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmNsYXNzIEJhc2Uge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICB0aGlzLnNlcnZpY2UgPSBjb25maWcuc2VydmljZTtcbiAgICB0aGlzLmJhc2VQYXRoID0gY29uZmlnLmJhc2VQYXRoO1xuICB9XG5cbiAgZ2V0VXJsKHBhdGhOYW1lKSB7XG4gICAgdmFyIHVybE9iaiA9IHVybC5mb3JtYXQoe1xuICAgICAgJ3Byb3RvY29sJzogJ2h0dHBzJyxcbiAgICAgICdob3N0JzogJ29hcGkuZGluZ3RhbGsuY29tJyxcbiAgICAgICdwYXRobmFtZSc6IHBhdGguam9pbih0aGlzLmJhc2VQYXRoLCBwYXRoTmFtZSlcbiAgICB9KTtcbiAgICByZXR1cm4gdXJsT2JqO1xuICB9XG5cbiAgZ2V0UXVlcnkocXVlcnkgPSB7fSkge1xuICAgIE9iamVjdC5hc3NpZ24ocXVlcnksIHsnYWNjZXNzX3Rva2VuJzogdGhpcy5zZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCl9KTtcbiAgICByZXR1cm4gcXVlcnk7XG4gIH1cblxuICBnZXRMaXN0KHF1ZXJ5ID0ge30pIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLmdldCh0aGlzLmdldFVybCgnbGlzdCcpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkocXVlcnkpKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGdldERldGFpbChxdWVyeSkge1xuICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAuZ2V0KHRoaXMuZ2V0VXJsKCdnZXQnKSlcbiAgICAgIC5xdWVyeSh0aGlzLmdldFF1ZXJ5KHF1ZXJ5KSlcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICBjcmVhdGUob3B0aW9ucykge1xuICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAucG9zdCh0aGlzLmdldFVybCgnY3JlYXRlJykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeSgpKVxuICAgICAgLnNlbmQob3B0aW9ucylcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICB1cGRhdGUob3B0aW9ucykge1xuICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAucG9zdCh0aGlzLmdldFVybCgndXBkYXRlJykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeSgpKVxuICAgICAgLnNlbmQob3B0aW9ucylcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICByZW1vdmUocXVlcnkpIHtcbiAgICByZXR1cm4gcmVxdWVzdFxuICAgICAgLmdldCh0aGlzLmdldFVybCgnZGVsZXRlJykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeShxdWVyeSkpXG4gICAgICAudGhlbih0aGlzLnBhcnNlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgc2VuZChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5wb3N0KHRoaXMuZ2V0VXJsKCdzZW5kJykpXG4gICAgICAucXVlcnkodGhpcy5nZXRRdWVyeSgpKVxuICAgICAgLnNlbmQob3B0aW9ucylcbiAgICAgIC50aGVuKHRoaXMucGFyc2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICB1cGxvYWQob3B0aW9ucykge1xuICAgIGxldCB7aGVhZGVyLCBxdWVyeSwgYnVmZmVyfSA9IG9wdGlvbnM7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5wb3N0KHRoaXMuZ2V0VXJsKCd1cGxvYWQnKSlcbiAgICAgIC50eXBlKCdmb3JtJylcbiAgICAgIC5zZXQoaGVhZGVyKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkocXVlcnkpKVxuICAgICAgLnNlbmQoYnVmZmVyKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGRvd25sb2FkKHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgIC5nZXQodGhpcy5nZXRVcmwoJ2dldCcpKVxuICAgICAgLnF1ZXJ5KHRoaXMuZ2V0UXVlcnkocXVlcnkpKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHBhcnNlKGRhdGEpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YS5ib2R5O1xuICAgIGlmIChyZXN1bHQuZXJyY29kZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAocmVzdWx0LmVycmNvZGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihyZXN1bHQuZXJybXNnKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGFzc2VtYmxlKGRhdGEsIGVycm1zZyA9IG51bGwpIHtcbiAgICBpZiAoIWVycm1zZykge1xuICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCB7ZXJyY29kZTogMH0sIHtlcnJtc2c6ICdvayd9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBPYmplY3QuYXNzaWduKHtlcnJjb2RlOiAtMX0sIHtlcnJtc2d9KTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBmcm9tTWVkaWEoZmlsZXBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICBmcy5yZWFkRmlsZShmaWxlcGF0aCwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNvbHZlKGRhdGEpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBidWlsZEZvcm1EYXRhKG9wdGlvbnMpIHtcbiAgICBsZXQge2RhdGEsIGZpbGVwYXRoLCBuZFBhcnRpdGlvbiA9IHt9fSA9IG9wdGlvbnM7XG4gICAgdmFyIG1pbWUgPSB7XG4gICAgICAnLmpwZyc6ICdpbWFnZScsXG4gICAgICAnLnBuZyc6ICdpbWFnZScsXG4gICAgICAnLmFtcic6ICd2b2ljZSdcbiAgICB9O1xuICAgIHZhciBib3VuZGFyeSA9IFNlcnZpY2UuZ2V0Tm9uY2VTZWN1cml0eVN0cmluZygpO1xuICAgIHZhciBjb250ZW50VHlwZSA9IGBtdWx0aXBhcnQvZm9ybS1kYXRhOyBib3VuZGFyeT0ke2JvdW5kYXJ5fWA7XG4gICAgdmFyIGNvbnRlbnREaXNwb3NpdGlvbiA9IGBmb3JtLWRhdGE7bmFtZT1cXFwibWVkaWFcXFwiO2ZpbGVuYW1lPVxcXCIke3BhdGguYmFzZW5hbWUoZmlsZXBhdGgpfVxcXCJgO1xuICAgIHZhciBoZWFkZXIgPSBgLS0ke2JvdW5kYXJ5fVxcclxcbkNvbnRlbnQtRGlzcG9zaXRpb246JHtjb250ZW50RGlzcG9zaXRpb259XFxyXFxuQ29udGVudC1UeXBlOm11bHRpcGFydC9mb3JtLWRhdGE7Ym91bmRhcnk9LS0tLSR7Ym91bmRhcnl9XFxyXFxuXFxyXFxuYDtcbiAgICB2YXIgaGVhZGVyQnVmZmVyID0gbmV3IEJ1ZmZlcihoZWFkZXIsICd1dGY4Jyk7XG4gICAgdmFyIGVuZEJ1ZmZlciA9IG5ldyBCdWZmZXIoYFxcclxcbi0tJHtib3VuZGFyeX0tLVxcclxcbmAsICd1dGY4Jyk7XG4gICAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5jb25jYXQoW2hlYWRlckJ1ZmZlciwgZGF0YSwgZW5kQnVmZmVyXSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHF1ZXJ5OiB7dHlwZTogXy5oYXMobWltZSwgcGF0aC5leHRuYW1lKGZpbGVwYXRoKSkgPyBtaW1lW3BhdGguZXh0bmFtZShmaWxlcGF0aCldIDogJ2ZpbGUnLCAnbWVkaWEnOiBoZWFkZXJ9LFxuICAgICAgaGVhZGVyOiBPYmplY3QuYXNzaWduKHsnQ29udGVudC1UeXBlJzogY29udGVudFR5cGV9LCBuZFBhcnRpdGlvbiksXG4gICAgICBidWZmZXJcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2U7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
