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
  }]);

  return Media;
}(_base2.default);

exports.default = Media;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lZGlhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQUxBOzs7OztJQU1NLEs7Ozs7Ozs7Ozs7OzRCQUVJLE8sRUFBUztBQUNmLFVBQUksV0FBVyxlQUFLLElBQUwsQ0FBVSxRQUFRLElBQWxCLEVBQXdCLGVBQUssUUFBTCxDQUFjLFFBQVEsSUFBUixDQUFhLFNBQWIsQ0FBdUIsQ0FBdkIsQ0FBZCxDQUF4QixDQUFmO0FBQ0EsYUFBUSxVQUFDLEtBQUQsRUFBVTtBQUNoQixlQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBb0I7QUFDckMsdUJBQUcsU0FBSCxDQUFhLFFBQWIsRUFBdUIsUUFBUSxJQUFSLENBQWEsSUFBcEMsRUFBMEMsVUFBQyxHQUFELEVBQVE7QUFDaEQsZ0JBQUksR0FBSixFQUFTO0FBQ1AscUJBQU8sT0FBTyxHQUFQLENBQVA7QUFDRDtBQUNELG1CQUFPLFFBQVEsTUFBTSxRQUFOLENBQWUsRUFBQyxrQkFBRCxFQUFmLENBQVIsQ0FBUDtBQUNELFdBTEQ7QUFNRCxTQVBNLENBQVA7QUFRRCxPQVRNLENBU0osSUFUSSxDQUFQO0FBVUQ7Ozs7OztrQkFFWSxLIiwiZmlsZSI6Im1lZGlhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzMxLlxuICovXG5pbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuY2xhc3MgTWVkaWEgZXh0ZW5kcyBCYXNlIHtcblxuICB0b01lZGlhKG9wdGlvbnMpIHtcbiAgICB2YXIgZmlsZXBhdGggPSBwYXRoLmpvaW4ob3B0aW9ucy5wYXRoLCBwYXRoLmJhc2VuYW1lKG9wdGlvbnMuZGF0YS5yZWRpcmVjdHNbMF0pKTtcbiAgICByZXR1cm4gKChfdGhpcyk9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICAgIGZzLndyaXRlRmlsZShmaWxlcGF0aCwgb3B0aW9ucy5kYXRhLmJvZHksIChlcnIpPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMuYXNzZW1ibGUoe2ZpbGVwYXRofSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pKHRoaXMpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBNZWRpYTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
