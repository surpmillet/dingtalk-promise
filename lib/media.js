'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by michao on 16/7/31.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Media = function (_Base) {
  _inherits(Media, _Base);

  function Media() {
    _classCallCheck(this, Media);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Media).apply(this, arguments));
  }

  _createClass(Media, [{
    key: 'getMediaData',
    value: function getMediaData(filepath) {
      return new Promise(function (resolve, reject) {
        _fs2.default.readFile(filepath, function (err, data) {
          if (err) {
            return reject(err);
          }
          return resolve({ filepath: filepath, data: data });
        });
      });
    }
  }, {
    key: 'buildFormData',
    value: function buildFormData(options) {
      var mime = {
        '.jpg': 'image',
        '.png': 'image',
        '.doc': 'file',
        '.docx': 'file',
        '.xls': 'file',
        '.xlsx': 'file',
        '.ppt': 'file',
        '.pptx': 'file',
        '.txt': 'file',
        '.amr': 'voice'
      };
      var filepath = options.filepath;
      var data = options.data;
      var boundary = _service2.default.getNonceSecurityString();
      var contentType = 'multipart/form-data; boundary=' + boundary;
      var header = '--' + boundary + '\r\nContent-Disposition:form-data;name="media";filename="' + _path2.default.basename(filepath) + '"\r\nContent-Type:application/octet-stream\r\n\r\n';
      var headerBuffer = new Buffer(header, 'utf8');
      var endBuffer = new Buffer('\r\n--' + boundary + '--\r\n', 'utf8');
      var buffer = Buffer.concat([headerBuffer, data, endBuffer]);
      return { query: { type: mime[_path2.default.extname(filepath)], 'media': header }, contentType: contentType, buffer: buffer };
    }
  }]);

  return Media;
}(_base2.default);

exports.default = Media;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lZGlhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBTkE7Ozs7O0lBT00sSzs7Ozs7Ozs7Ozs7aUNBQ1MsUSxFQUFVO0FBQ3JCLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFvQjtBQUNyQyxxQkFBRyxRQUFILENBQVksUUFBWixFQUFzQixVQUFVLEdBQVYsRUFBZSxJQUFmLEVBQXFCO0FBQ3pDLGNBQUksR0FBSixFQUFTO0FBQ1AsbUJBQU8sT0FBTyxHQUFQLENBQVA7QUFDRDtBQUNELGlCQUFPLFFBQVEsRUFBQyxrQkFBRCxFQUFXLFVBQVgsRUFBUixDQUFQO0FBQ0QsU0FMRDtBQU1ELE9BUE0sQ0FBUDtBQVFEOzs7a0NBRWEsTyxFQUFTO0FBQ3JCLFVBQUksT0FBTztBQUNULGdCQUFRLE9BREM7QUFFVCxnQkFBUSxPQUZDO0FBR1QsZ0JBQVEsTUFIQztBQUlULGlCQUFTLE1BSkE7QUFLVCxnQkFBUSxNQUxDO0FBTVQsaUJBQVMsTUFOQTtBQU9ULGdCQUFRLE1BUEM7QUFRVCxpQkFBUyxNQVJBO0FBU1QsZ0JBQVEsTUFUQztBQVVULGdCQUFRO0FBVkMsT0FBWDtBQVlBLFVBQUksV0FBVyxRQUFRLFFBQXZCO0FBQ0EsVUFBSSxPQUFPLFFBQVEsSUFBbkI7QUFDQSxVQUFJLFdBQVcsa0JBQVEsc0JBQVIsRUFBZjtBQUNBLFVBQUksY0FBYyxtQ0FBbUMsUUFBckQ7QUFDQSxVQUFJLGdCQUFjLFFBQWQsaUVBQXFGLGVBQUssUUFBTCxDQUFjLFFBQWQsQ0FBckYsdURBQUo7QUFDQSxVQUFJLGVBQWUsSUFBSSxNQUFKLENBQVcsTUFBWCxFQUFtQixNQUFuQixDQUFuQjtBQUNBLFVBQUksWUFBWSxJQUFJLE1BQUosWUFBb0IsUUFBcEIsYUFBc0MsTUFBdEMsQ0FBaEI7QUFDQSxVQUFJLFNBQVMsT0FBTyxNQUFQLENBQWMsQ0FBQyxZQUFELEVBQWUsSUFBZixFQUFxQixTQUFyQixDQUFkLENBQWI7QUFDQSxhQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sS0FBSyxlQUFLLE9BQUwsQ0FBYSxRQUFiLENBQUwsQ0FBUCxFQUFxQyxTQUFTLE1BQTlDLEVBQVIsRUFBK0Qsd0JBQS9ELEVBQTRFLGNBQTVFLEVBQVA7QUFDRDs7Ozs7O2tCQUVZLEsiLCJmaWxlIjoibWVkaWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMzEuXG4gKi9cbmltcG9ydCBCYXNlIGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgU2VydmljZSBmcm9tICcuL3NlcnZpY2UnO1xuY2xhc3MgTWVkaWEgZXh0ZW5kcyBCYXNlIHtcbiAgZ2V0TWVkaWFEYXRhKGZpbGVwYXRoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuICAgICAgZnMucmVhZEZpbGUoZmlsZXBhdGgsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzb2x2ZSh7ZmlsZXBhdGgsIGRhdGF9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYnVpbGRGb3JtRGF0YShvcHRpb25zKSB7XG4gICAgdmFyIG1pbWUgPSB7XG4gICAgICAnLmpwZyc6ICdpbWFnZScsXG4gICAgICAnLnBuZyc6ICdpbWFnZScsXG4gICAgICAnLmRvYyc6ICdmaWxlJyxcbiAgICAgICcuZG9jeCc6ICdmaWxlJyxcbiAgICAgICcueGxzJzogJ2ZpbGUnLFxuICAgICAgJy54bHN4JzogJ2ZpbGUnLFxuICAgICAgJy5wcHQnOiAnZmlsZScsXG4gICAgICAnLnBwdHgnOiAnZmlsZScsXG4gICAgICAnLnR4dCc6ICdmaWxlJyxcbiAgICAgICcuYW1yJzogJ3ZvaWNlJ1xuICAgIH07XG4gICAgdmFyIGZpbGVwYXRoID0gb3B0aW9ucy5maWxlcGF0aDtcbiAgICB2YXIgZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICB2YXIgYm91bmRhcnkgPSBTZXJ2aWNlLmdldE5vbmNlU2VjdXJpdHlTdHJpbmcoKTtcbiAgICB2YXIgY29udGVudFR5cGUgPSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YTsgYm91bmRhcnk9JyArIGJvdW5kYXJ5O1xuICAgIHZhciBoZWFkZXIgPSBgLS0ke2JvdW5kYXJ5fVxcclxcbkNvbnRlbnQtRGlzcG9zaXRpb246Zm9ybS1kYXRhO25hbWU9XFxcIm1lZGlhXFxcIjtmaWxlbmFtZT1cXFwiJHtwYXRoLmJhc2VuYW1lKGZpbGVwYXRoKX1cXFwiXFxyXFxuQ29udGVudC1UeXBlOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVxcclxcblxcclxcbmA7XG4gICAgdmFyIGhlYWRlckJ1ZmZlciA9IG5ldyBCdWZmZXIoaGVhZGVyLCAndXRmOCcpO1xuICAgIHZhciBlbmRCdWZmZXIgPSBuZXcgQnVmZmVyKGBcXHJcXG4tLSR7Ym91bmRhcnl9LS1cXHJcXG5gLCAndXRmOCcpO1xuICAgIHZhciBidWZmZXIgPSBCdWZmZXIuY29uY2F0KFtoZWFkZXJCdWZmZXIsIGRhdGEsIGVuZEJ1ZmZlcl0pO1xuICAgIHJldHVybiB7cXVlcnk6IHt0eXBlOiBtaW1lW3BhdGguZXh0bmFtZShmaWxlcGF0aCldLCAnbWVkaWEnOiBoZWFkZXJ9LCBjb250ZW50VHlwZSwgYnVmZmVyfTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTWVkaWE7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
