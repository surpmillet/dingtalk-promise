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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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
      return {
        query: { type: _lodash2.default.has(mime, _path2.default.extname(filepath)) ? mime[_path2.default.extname(filepath)] : 'file', 'media': header },
        contentType: contentType,
        buffer: buffer
      };
    }
  }]);

  return Media;
}(_base2.default);

exports.default = Media;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lZGlhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFQQTs7Ozs7SUFRTSxLOzs7Ozs7Ozs7OztpQ0FDUyxRLEVBQVU7QUFDckIsYUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQW9CO0FBQ3JDLHFCQUFHLFFBQUgsQ0FBWSxRQUFaLEVBQXNCLFVBQVUsR0FBVixFQUFlLElBQWYsRUFBcUI7QUFDekMsY0FBSSxHQUFKLEVBQVM7QUFDUCxtQkFBTyxPQUFPLEdBQVAsQ0FBUDtBQUNEO0FBQ0QsaUJBQU8sUUFBUSxFQUFDLGtCQUFELEVBQVcsVUFBWCxFQUFSLENBQVA7QUFDRCxTQUxEO0FBTUQsT0FQTSxDQUFQO0FBUUQ7OztrQ0FFYSxPLEVBQVM7QUFDckIsVUFBSSxPQUFPO0FBQ1QsZ0JBQVEsT0FEQztBQUVULGdCQUFRLE9BRkM7QUFHVCxnQkFBUTtBQUhDLE9BQVg7QUFLQSxVQUFJLFdBQVcsUUFBUSxRQUF2QjtBQUNBLFVBQUksT0FBTyxRQUFRLElBQW5CO0FBQ0EsVUFBSSxXQUFXLGtCQUFRLHNCQUFSLEVBQWY7QUFDQSxVQUFJLGNBQWMsbUNBQW1DLFFBQXJEO0FBQ0EsVUFBSSxnQkFBYyxRQUFkLGlFQUFxRixlQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXJGLHVEQUFKO0FBQ0EsVUFBSSxlQUFlLElBQUksTUFBSixDQUFXLE1BQVgsRUFBbUIsTUFBbkIsQ0FBbkI7QUFDQSxVQUFJLFlBQVksSUFBSSxNQUFKLFlBQW9CLFFBQXBCLGFBQXNDLE1BQXRDLENBQWhCO0FBQ0EsVUFBSSxTQUFTLE9BQU8sTUFBUCxDQUFjLENBQUMsWUFBRCxFQUFlLElBQWYsRUFBcUIsU0FBckIsQ0FBZCxDQUFiO0FBQ0EsYUFBTztBQUNMLGVBQU8sRUFBQyxNQUFNLGlCQUFFLEdBQUYsQ0FBTSxJQUFOLEVBQVksZUFBSyxPQUFMLENBQWEsUUFBYixDQUFaLElBQXNDLEtBQUssZUFBSyxPQUFMLENBQWEsUUFBYixDQUFMLENBQXRDLEdBQXFFLE1BQTVFLEVBQW9GLFNBQVMsTUFBN0YsRUFERjtBQUVMLGdDQUZLO0FBR0w7QUFISyxPQUFQO0FBS0Q7Ozs7OztrQkFFWSxLIiwiZmlsZSI6Im1lZGlhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzMxLlxuICovXG5pbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5jbGFzcyBNZWRpYSBleHRlbmRzIEJhc2Uge1xuICBnZXRNZWRpYURhdGEoZmlsZXBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICBmcy5yZWFkRmlsZShmaWxlcGF0aCwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNvbHZlKHtmaWxlcGF0aCwgZGF0YX0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBidWlsZEZvcm1EYXRhKG9wdGlvbnMpIHtcbiAgICB2YXIgbWltZSA9IHtcbiAgICAgICcuanBnJzogJ2ltYWdlJyxcbiAgICAgICcucG5nJzogJ2ltYWdlJyxcbiAgICAgICcuYW1yJzogJ3ZvaWNlJ1xuICAgIH07XG4gICAgdmFyIGZpbGVwYXRoID0gb3B0aW9ucy5maWxlcGF0aDtcbiAgICB2YXIgZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICB2YXIgYm91bmRhcnkgPSBTZXJ2aWNlLmdldE5vbmNlU2VjdXJpdHlTdHJpbmcoKTtcbiAgICB2YXIgY29udGVudFR5cGUgPSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YTsgYm91bmRhcnk9JyArIGJvdW5kYXJ5O1xuICAgIHZhciBoZWFkZXIgPSBgLS0ke2JvdW5kYXJ5fVxcclxcbkNvbnRlbnQtRGlzcG9zaXRpb246Zm9ybS1kYXRhO25hbWU9XFxcIm1lZGlhXFxcIjtmaWxlbmFtZT1cXFwiJHtwYXRoLmJhc2VuYW1lKGZpbGVwYXRoKX1cXFwiXFxyXFxuQ29udGVudC1UeXBlOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVxcclxcblxcclxcbmA7XG4gICAgdmFyIGhlYWRlckJ1ZmZlciA9IG5ldyBCdWZmZXIoaGVhZGVyLCAndXRmOCcpO1xuICAgIHZhciBlbmRCdWZmZXIgPSBuZXcgQnVmZmVyKGBcXHJcXG4tLSR7Ym91bmRhcnl9LS1cXHJcXG5gLCAndXRmOCcpO1xuICAgIHZhciBidWZmZXIgPSBCdWZmZXIuY29uY2F0KFtoZWFkZXJCdWZmZXIsIGRhdGEsIGVuZEJ1ZmZlcl0pO1xuICAgIHJldHVybiB7XG4gICAgICBxdWVyeToge3R5cGU6IF8uaGFzKG1pbWUsIHBhdGguZXh0bmFtZShmaWxlcGF0aCkpID8gbWltZVtwYXRoLmV4dG5hbWUoZmlsZXBhdGgpXSA6ICdmaWxlJywgJ21lZGlhJzogaGVhZGVyfSxcbiAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAgYnVmZmVyXG4gICAgfTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTWVkaWE7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
