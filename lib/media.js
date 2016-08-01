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
      var mime = { '.jpg': 'image', '.png': 'image' };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lZGlhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBTkE7Ozs7O0lBT00sSzs7Ozs7Ozs7Ozs7aUNBQ1MsUSxFQUFVO0FBQ3JCLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFvQjtBQUNyQyxxQkFBRyxRQUFILENBQVksUUFBWixFQUFzQixVQUFVLEdBQVYsRUFBZSxJQUFmLEVBQXFCO0FBQ3pDLGNBQUksR0FBSixFQUFTO0FBQ1AsbUJBQU8sT0FBTyxHQUFQLENBQVA7QUFDRDtBQUNELGlCQUFPLFFBQVEsRUFBQyxrQkFBRCxFQUFXLFVBQVgsRUFBUixDQUFQO0FBQ0QsU0FMRDtBQU1ELE9BUE0sQ0FBUDtBQVFEOzs7a0NBRWEsTyxFQUFTO0FBQ3JCLFVBQUksT0FBTyxFQUFDLFFBQVEsT0FBVCxFQUFrQixRQUFRLE9BQTFCLEVBQVg7QUFDQSxVQUFJLFdBQVcsUUFBUSxRQUF2QjtBQUNBLFVBQUksT0FBTyxRQUFRLElBQW5CO0FBQ0EsVUFBSSxXQUFXLGtCQUFRLHNCQUFSLEVBQWY7QUFDQSxVQUFJLGNBQWMsbUNBQW1DLFFBQXJEO0FBQ0EsVUFBSSxnQkFBYyxRQUFkLGlFQUFxRixlQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXJGLHVEQUFKO0FBQ0EsVUFBSSxlQUFlLElBQUksTUFBSixDQUFXLE1BQVgsRUFBbUIsTUFBbkIsQ0FBbkI7QUFDQSxVQUFJLFlBQVksSUFBSSxNQUFKLFlBQW9CLFFBQXBCLGFBQXNDLE1BQXRDLENBQWhCO0FBQ0EsVUFBSSxTQUFTLE9BQU8sTUFBUCxDQUFjLENBQUMsWUFBRCxFQUFlLElBQWYsRUFBcUIsU0FBckIsQ0FBZCxDQUFiO0FBQ0EsYUFBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLEtBQUssZUFBSyxPQUFMLENBQWEsUUFBYixDQUFMLENBQVAsRUFBcUMsU0FBUyxNQUE5QyxFQUFSLEVBQStELHdCQUEvRCxFQUE0RSxjQUE1RSxFQUFQO0FBQ0Q7Ozs7OztrQkFFWSxLIiwiZmlsZSI6Im1lZGlhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzMxLlxuICovXG5pbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlJztcbmNsYXNzIE1lZGlhIGV4dGVuZHMgQmFzZSB7XG4gIGdldE1lZGlhRGF0YShmaWxlcGF0aCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcbiAgICAgIGZzLnJlYWRGaWxlKGZpbGVwYXRoLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc29sdmUoe2ZpbGVwYXRoLCBkYXRhfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGJ1aWxkRm9ybURhdGEob3B0aW9ucykge1xuICAgIHZhciBtaW1lID0geycuanBnJzogJ2ltYWdlJywgJy5wbmcnOiAnaW1hZ2UnfTtcbiAgICB2YXIgZmlsZXBhdGggPSBvcHRpb25zLmZpbGVwYXRoO1xuICAgIHZhciBkYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgIHZhciBib3VuZGFyeSA9IFNlcnZpY2UuZ2V0Tm9uY2VTZWN1cml0eVN0cmluZygpO1xuICAgIHZhciBjb250ZW50VHlwZSA9ICdtdWx0aXBhcnQvZm9ybS1kYXRhOyBib3VuZGFyeT0nICsgYm91bmRhcnk7XG4gICAgdmFyIGhlYWRlciA9IGAtLSR7Ym91bmRhcnl9XFxyXFxuQ29udGVudC1EaXNwb3NpdGlvbjpmb3JtLWRhdGE7bmFtZT1cXFwibWVkaWFcXFwiO2ZpbGVuYW1lPVxcXCIke3BhdGguYmFzZW5hbWUoZmlsZXBhdGgpfVxcXCJcXHJcXG5Db250ZW50LVR5cGU6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXFxyXFxuXFxyXFxuYDtcbiAgICB2YXIgaGVhZGVyQnVmZmVyID0gbmV3IEJ1ZmZlcihoZWFkZXIsICd1dGY4Jyk7XG4gICAgdmFyIGVuZEJ1ZmZlciA9IG5ldyBCdWZmZXIoYFxcclxcbi0tJHtib3VuZGFyeX0tLVxcclxcbmAsICd1dGY4Jyk7XG4gICAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5jb25jYXQoW2hlYWRlckJ1ZmZlciwgZGF0YSwgZW5kQnVmZmVyXSk7XG4gICAgcmV0dXJuIHtxdWVyeToge3R5cGU6IG1pbWVbcGF0aC5leHRuYW1lKGZpbGVwYXRoKV0sICdtZWRpYSc6IGhlYWRlcn0sIGNvbnRlbnRUeXBlLCBidWZmZXJ9O1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBNZWRpYTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
