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
    key: 'fromMedia',
    value: function fromMedia(filepath) {
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
    key: 'toMedia',
    value: function toMedia(options) {
      var filepath = _path2.default.join(options.path, _path2.default.basename(options.data.redirects[0]));
      return function (_this) {
        return new Promise(function (resolve, reject) {
          _fs2.default.writeFile(filepath, options.data.body, function (err) {
            if (err) {
              return reject(err);
            }
            return resolve(_this.assemble({ filepath: filepath }));
          });
        });
      }(this);
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
      var basename = _path2.default.basename(filepath);
      var disposition = 'form-data;name="media";filename="' + basename + '"';
      var header = '--' + boundary + '\r\nContent-Disposition:' + disposition + '\r\nContent-Type:application/octet-stream\r\n\r\n';
      var headerBuffer = new Buffer(header, 'utf8');
      var endBuffer = new Buffer('\r\n--' + boundary + '--\r\n', 'utf8');
      var buffer = Buffer.concat([headerBuffer, data, endBuffer]);
      return {
        query: { type: _lodash2.default.has(mime, _path2.default.extname(filepath)) ? mime[_path2.default.extname(filepath)] : 'file', 'media': header },
        contentType: contentType,
        disposition: disposition,
        buffer: buffer
      };
    }
  }]);

  return Media;
}(_base2.default);

exports.default = Media;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lZGlhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFQQTs7Ozs7SUFRTSxLOzs7Ozs7Ozs7Ozs4QkFDTSxRLEVBQVU7QUFDbEIsYUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQW9CO0FBQ3JDLHFCQUFHLFFBQUgsQ0FBWSxRQUFaLEVBQXNCLFVBQVUsR0FBVixFQUFlLElBQWYsRUFBcUI7QUFDekMsY0FBSSxHQUFKLEVBQVM7QUFDUCxtQkFBTyxPQUFPLEdBQVAsQ0FBUDtBQUNEO0FBQ0QsaUJBQU8sUUFBUSxFQUFDLGtCQUFELEVBQVcsVUFBWCxFQUFSLENBQVA7QUFDRCxTQUxEO0FBTUQsT0FQTSxDQUFQO0FBUUQ7Ozs0QkFFTyxPLEVBQVM7QUFDZixVQUFJLFdBQVcsZUFBSyxJQUFMLENBQVUsUUFBUSxJQUFsQixFQUF3QixlQUFLLFFBQUwsQ0FBYyxRQUFRLElBQVIsQ0FBYSxTQUFiLENBQXVCLENBQXZCLENBQWQsQ0FBeEIsQ0FBZjtBQUNBLGFBQVEsVUFBQyxLQUFELEVBQVU7QUFDaEIsZUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQW9CO0FBQ3JDLHVCQUFHLFNBQUgsQ0FBYSxRQUFiLEVBQXVCLFFBQVEsSUFBUixDQUFhLElBQXBDLEVBQTBDLFVBQUMsR0FBRCxFQUFRO0FBQ2hELGdCQUFJLEdBQUosRUFBUztBQUNQLHFCQUFPLE9BQU8sR0FBUCxDQUFQO0FBQ0Q7QUFDRCxtQkFBTyxRQUFRLE1BQU0sUUFBTixDQUFlLEVBQUMsa0JBQUQsRUFBZixDQUFSLENBQVA7QUFDRCxXQUxEO0FBTUQsU0FQTSxDQUFQO0FBUUQsT0FUTSxDQVNKLElBVEksQ0FBUDtBQVVEOzs7a0NBRWEsTyxFQUFTO0FBQ3JCLFVBQUksT0FBTztBQUNULGdCQUFRLE9BREM7QUFFVCxnQkFBUSxPQUZDO0FBR1QsZ0JBQVE7QUFIQyxPQUFYO0FBS0EsVUFBSSxXQUFXLFFBQVEsUUFBdkI7QUFDQSxVQUFJLE9BQU8sUUFBUSxJQUFuQjtBQUNBLFVBQUksV0FBVyxrQkFBUSxzQkFBUixFQUFmO0FBQ0EsVUFBSSxjQUFjLG1DQUFtQyxRQUFyRDtBQUNBLFVBQUksV0FBVyxlQUFLLFFBQUwsQ0FBYyxRQUFkLENBQWY7QUFDQSxVQUFJLG9EQUFxRCxRQUFyRCxNQUFKO0FBQ0EsVUFBSSxnQkFBYyxRQUFkLGdDQUFpRCxXQUFqRCxzREFBSjtBQUNBLFVBQUksZUFBZSxJQUFJLE1BQUosQ0FBVyxNQUFYLEVBQW1CLE1BQW5CLENBQW5CO0FBQ0EsVUFBSSxZQUFZLElBQUksTUFBSixZQUFvQixRQUFwQixhQUFzQyxNQUF0QyxDQUFoQjtBQUNBLFVBQUksU0FBUyxPQUFPLE1BQVAsQ0FBYyxDQUFDLFlBQUQsRUFBZSxJQUFmLEVBQXFCLFNBQXJCLENBQWQsQ0FBYjtBQUNBLGFBQU87QUFDTCxlQUFPLEVBQUMsTUFBTSxpQkFBRSxHQUFGLENBQU0sSUFBTixFQUFZLGVBQUssT0FBTCxDQUFhLFFBQWIsQ0FBWixJQUFzQyxLQUFLLGVBQUssT0FBTCxDQUFhLFFBQWIsQ0FBTCxDQUF0QyxHQUFxRSxNQUE1RSxFQUFvRixTQUFTLE1BQTdGLEVBREY7QUFFTCxnQ0FGSztBQUdMLGdDQUhLO0FBSUw7QUFKSyxPQUFQO0FBTUQ7Ozs7OztrQkFFWSxLIiwiZmlsZSI6Im1lZGlhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzMxLlxuICovXG5pbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5jbGFzcyBNZWRpYSBleHRlbmRzIEJhc2Uge1xuICBmcm9tTWVkaWEoZmlsZXBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICBmcy5yZWFkRmlsZShmaWxlcGF0aCwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNvbHZlKHtmaWxlcGF0aCwgZGF0YX0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB0b01lZGlhKG9wdGlvbnMpIHtcbiAgICB2YXIgZmlsZXBhdGggPSBwYXRoLmpvaW4ob3B0aW9ucy5wYXRoLCBwYXRoLmJhc2VuYW1lKG9wdGlvbnMuZGF0YS5yZWRpcmVjdHNbMF0pKTtcbiAgICByZXR1cm4gKChfdGhpcyk9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICAgIGZzLndyaXRlRmlsZShmaWxlcGF0aCwgb3B0aW9ucy5kYXRhLmJvZHksIChlcnIpPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMuYXNzZW1ibGUoe2ZpbGVwYXRofSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pKHRoaXMpO1xuICB9XG5cbiAgYnVpbGRGb3JtRGF0YShvcHRpb25zKSB7XG4gICAgdmFyIG1pbWUgPSB7XG4gICAgICAnLmpwZyc6ICdpbWFnZScsXG4gICAgICAnLnBuZyc6ICdpbWFnZScsXG4gICAgICAnLmFtcic6ICd2b2ljZSdcbiAgICB9O1xuICAgIHZhciBmaWxlcGF0aCA9IG9wdGlvbnMuZmlsZXBhdGg7XG4gICAgdmFyIGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgdmFyIGJvdW5kYXJ5ID0gU2VydmljZS5nZXROb25jZVNlY3VyaXR5U3RyaW5nKCk7XG4gICAgdmFyIGNvbnRlbnRUeXBlID0gJ211bHRpcGFydC9mb3JtLWRhdGE7IGJvdW5kYXJ5PScgKyBib3VuZGFyeTtcbiAgICB2YXIgYmFzZW5hbWUgPSBwYXRoLmJhc2VuYW1lKGZpbGVwYXRoKTtcbiAgICB2YXIgZGlzcG9zaXRpb24gPSBgZm9ybS1kYXRhO25hbWU9XFxcIm1lZGlhXFxcIjtmaWxlbmFtZT1cXFwiJHtiYXNlbmFtZX1cXFwiYDtcbiAgICB2YXIgaGVhZGVyID0gYC0tJHtib3VuZGFyeX1cXHJcXG5Db250ZW50LURpc3Bvc2l0aW9uOiR7ZGlzcG9zaXRpb259XFxyXFxuQ29udGVudC1UeXBlOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVxcclxcblxcclxcbmA7XG4gICAgdmFyIGhlYWRlckJ1ZmZlciA9IG5ldyBCdWZmZXIoaGVhZGVyLCAndXRmOCcpO1xuICAgIHZhciBlbmRCdWZmZXIgPSBuZXcgQnVmZmVyKGBcXHJcXG4tLSR7Ym91bmRhcnl9LS1cXHJcXG5gLCAndXRmOCcpO1xuICAgIHZhciBidWZmZXIgPSBCdWZmZXIuY29uY2F0KFtoZWFkZXJCdWZmZXIsIGRhdGEsIGVuZEJ1ZmZlcl0pO1xuICAgIHJldHVybiB7XG4gICAgICBxdWVyeToge3R5cGU6IF8uaGFzKG1pbWUsIHBhdGguZXh0bmFtZShmaWxlcGF0aCkpID8gbWltZVtwYXRoLmV4dG5hbWUoZmlsZXBhdGgpXSA6ICdmaWxlJywgJ21lZGlhJzogaGVhZGVyfSxcbiAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAgZGlzcG9zaXRpb24sXG4gICAgICBidWZmZXJcbiAgICB9O1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBNZWRpYTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
