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
        query: { type: mime.has(_path2.default.extname(filepath)) ? mime[_path2.default.extname(filepath)] : 'file', 'media': header },
        contentType: contentType,
        buffer: buffer
      };
    }
  }]);

  return Media;
}(_base2.default);

exports.default = Media;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lZGlhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBTkE7Ozs7O0lBT00sSzs7Ozs7Ozs7Ozs7aUNBQ1MsUSxFQUFVO0FBQ3JCLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFvQjtBQUNyQyxxQkFBRyxRQUFILENBQVksUUFBWixFQUFzQixVQUFVLEdBQVYsRUFBZSxJQUFmLEVBQXFCO0FBQ3pDLGNBQUksR0FBSixFQUFTO0FBQ1AsbUJBQU8sT0FBTyxHQUFQLENBQVA7QUFDRDtBQUNELGlCQUFPLFFBQVEsRUFBQyxrQkFBRCxFQUFXLFVBQVgsRUFBUixDQUFQO0FBQ0QsU0FMRDtBQU1ELE9BUE0sQ0FBUDtBQVFEOzs7a0NBRWEsTyxFQUFTO0FBQ3JCLFVBQUksT0FBTztBQUNULGdCQUFRLE9BREM7QUFFVCxnQkFBUSxPQUZDO0FBR1QsZ0JBQVE7QUFIQyxPQUFYO0FBS0EsVUFBSSxXQUFXLFFBQVEsUUFBdkI7QUFDQSxVQUFJLE9BQU8sUUFBUSxJQUFuQjtBQUNBLFVBQUksV0FBVyxrQkFBUSxzQkFBUixFQUFmO0FBQ0EsVUFBSSxjQUFjLG1DQUFtQyxRQUFyRDtBQUNBLFVBQUksZ0JBQWMsUUFBZCxpRUFBcUYsZUFBSyxRQUFMLENBQWMsUUFBZCxDQUFyRix1REFBSjtBQUNBLFVBQUksZUFBZSxJQUFJLE1BQUosQ0FBVyxNQUFYLEVBQW1CLE1BQW5CLENBQW5CO0FBQ0EsVUFBSSxZQUFZLElBQUksTUFBSixZQUFvQixRQUFwQixhQUFzQyxNQUF0QyxDQUFoQjtBQUNBLFVBQUksU0FBUyxPQUFPLE1BQVAsQ0FBYyxDQUFDLFlBQUQsRUFBZSxJQUFmLEVBQXFCLFNBQXJCLENBQWQsQ0FBYjtBQUNBLGFBQU87QUFDTCxlQUFPLEVBQUMsTUFBTSxLQUFLLEdBQUwsQ0FBUyxlQUFLLE9BQUwsQ0FBYSxRQUFiLENBQVQsSUFBbUMsS0FBSyxlQUFLLE9BQUwsQ0FBYSxRQUFiLENBQUwsQ0FBbkMsR0FBa0UsTUFBekUsRUFBaUYsU0FBUyxNQUExRixFQURGO0FBRUwsZ0NBRks7QUFHTDtBQUhLLE9BQVA7QUFLRDs7Ozs7O2tCQUVZLEsiLCJmaWxlIjoibWVkaWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMzEuXG4gKi9cbmltcG9ydCBCYXNlIGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgU2VydmljZSBmcm9tICcuL3NlcnZpY2UnO1xuY2xhc3MgTWVkaWEgZXh0ZW5kcyBCYXNlIHtcbiAgZ2V0TWVkaWFEYXRhKGZpbGVwYXRoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuICAgICAgZnMucmVhZEZpbGUoZmlsZXBhdGgsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzb2x2ZSh7ZmlsZXBhdGgsIGRhdGF9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYnVpbGRGb3JtRGF0YShvcHRpb25zKSB7XG4gICAgdmFyIG1pbWUgPSB7XG4gICAgICAnLmpwZyc6ICdpbWFnZScsXG4gICAgICAnLnBuZyc6ICdpbWFnZScsXG4gICAgICAnLmFtcic6ICd2b2ljZSdcbiAgICB9O1xuICAgIHZhciBmaWxlcGF0aCA9IG9wdGlvbnMuZmlsZXBhdGg7XG4gICAgdmFyIGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgdmFyIGJvdW5kYXJ5ID0gU2VydmljZS5nZXROb25jZVNlY3VyaXR5U3RyaW5nKCk7XG4gICAgdmFyIGNvbnRlbnRUeXBlID0gJ211bHRpcGFydC9mb3JtLWRhdGE7IGJvdW5kYXJ5PScgKyBib3VuZGFyeTtcbiAgICB2YXIgaGVhZGVyID0gYC0tJHtib3VuZGFyeX1cXHJcXG5Db250ZW50LURpc3Bvc2l0aW9uOmZvcm0tZGF0YTtuYW1lPVxcXCJtZWRpYVxcXCI7ZmlsZW5hbWU9XFxcIiR7cGF0aC5iYXNlbmFtZShmaWxlcGF0aCl9XFxcIlxcclxcbkNvbnRlbnQtVHlwZTphcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cXHJcXG5cXHJcXG5gO1xuICAgIHZhciBoZWFkZXJCdWZmZXIgPSBuZXcgQnVmZmVyKGhlYWRlciwgJ3V0ZjgnKTtcbiAgICB2YXIgZW5kQnVmZmVyID0gbmV3IEJ1ZmZlcihgXFxyXFxuLS0ke2JvdW5kYXJ5fS0tXFxyXFxuYCwgJ3V0ZjgnKTtcbiAgICB2YXIgYnVmZmVyID0gQnVmZmVyLmNvbmNhdChbaGVhZGVyQnVmZmVyLCBkYXRhLCBlbmRCdWZmZXJdKTtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlcnk6IHt0eXBlOiBtaW1lLmhhcyhwYXRoLmV4dG5hbWUoZmlsZXBhdGgpKSA/IG1pbWVbcGF0aC5leHRuYW1lKGZpbGVwYXRoKV0gOiAnZmlsZScsICdtZWRpYSc6IGhlYWRlcn0sXG4gICAgICBjb250ZW50VHlwZSxcbiAgICAgIGJ1ZmZlclxuICAgIH07XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE1lZGlhOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
