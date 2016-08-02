'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
      var dir = options.dir;
      var data = options.data;

      var filepath = _path2.default.join(dir, _path2.default.basename(data.redirects[0]));
      return new Promise(function (resolve, reject) {
        _fs2.default.writeFile(filepath, data.body, function (err) {
          if (err) {
            return reject(err);
          }
          return resolve({ filepath: filepath });
        });
      });
    }
  }, {
    key: 'upload',
    value: function upload(filepath) {
      return this.fromMedia({ filepath: filepath }).then(this.buildFormData.bind(this)).then(_get(Object.getPrototypeOf(Media.prototype), 'upload', this).bind(this));
    }
  }, {
    key: 'download',
    value: function download(media_id, dir) {
      return _get(Object.getPrototypeOf(Media.prototype), 'download', this).call(this, { media_id: media_id }).then(function (data) {
        return { dir: dir, data: data };
      }).then(this.toMedia.bind(this)).then(this.assemble.bind(this));
    }
  }]);

  return Media;
}(_base2.default);

exports.default = Media;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lZGlhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBTEE7Ozs7O0lBTU0sSzs7Ozs7Ozs7Ozs7NEJBRUksTyxFQUFTO0FBQUEsVUFDVixHQURVLEdBQ0MsT0FERCxDQUNWLEdBRFU7QUFBQSxVQUNMLElBREssR0FDQyxPQURELENBQ0wsSUFESzs7QUFFZixVQUFJLFdBQVcsZUFBSyxJQUFMLENBQVUsR0FBVixFQUFlLGVBQUssUUFBTCxDQUFjLEtBQUssU0FBTCxDQUFlLENBQWYsQ0FBZCxDQUFmLENBQWY7QUFDQSxhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBb0I7QUFDckMscUJBQUcsU0FBSCxDQUFhLFFBQWIsRUFBdUIsS0FBSyxJQUE1QixFQUFrQyxVQUFDLEdBQUQsRUFBUTtBQUN4QyxjQUFJLEdBQUosRUFBUztBQUNQLG1CQUFPLE9BQU8sR0FBUCxDQUFQO0FBQ0Q7QUFDRCxpQkFBTyxRQUFRLEVBQUMsa0JBQUQsRUFBUixDQUFQO0FBQ0QsU0FMRDtBQU1ELE9BUE0sQ0FBUDtBQVFEOzs7MkJBRU0sUSxFQUFVO0FBQ2YsYUFBTyxLQUFLLFNBQUwsQ0FBZSxFQUFDLGtCQUFELEVBQWYsRUFDSixJQURJLENBQ0MsS0FBSyxhQUFMLENBQW1CLElBQW5CLENBQXdCLElBQXhCLENBREQsRUFFSixJQUZJLENBRUMsNkRBQWEsSUFBYixDQUFrQixJQUFsQixDQUZELENBQVA7QUFHRDs7OzZCQUVRLFEsRUFBVSxHLEVBQUs7QUFDdEIsYUFBTywwRUFBZSxFQUFDLGtCQUFELEVBQWYsRUFDSixJQURJLENBQ0MsVUFBQyxJQUFELEVBQVM7QUFDYixlQUFPLEVBQUMsUUFBRCxFQUFNLFVBQU4sRUFBUDtBQUNELE9BSEksRUFJSixJQUpJLENBSUMsS0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixJQUFsQixDQUpELEVBS0osSUFMSSxDQUtDLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsSUFBbkIsQ0FMRCxDQUFQO0FBTUQ7Ozs7OztrQkFFWSxLIiwiZmlsZSI6Im1lZGlhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1pY2hhbyBvbiAxNi83LzMxLlxuICovXG5pbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuY2xhc3MgTWVkaWEgZXh0ZW5kcyBCYXNlIHtcblxuICB0b01lZGlhKG9wdGlvbnMpIHtcbiAgICBsZXQge2RpciwgZGF0YX09b3B0aW9ucztcbiAgICB2YXIgZmlsZXBhdGggPSBwYXRoLmpvaW4oZGlyLCBwYXRoLmJhc2VuYW1lKGRhdGEucmVkaXJlY3RzWzBdKSk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuICAgICAgZnMud3JpdGVGaWxlKGZpbGVwYXRoLCBkYXRhLmJvZHksIChlcnIpPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNvbHZlKHtmaWxlcGF0aH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGxvYWQoZmlsZXBhdGgpIHtcbiAgICByZXR1cm4gdGhpcy5mcm9tTWVkaWEoe2ZpbGVwYXRofSlcbiAgICAgIC50aGVuKHRoaXMuYnVpbGRGb3JtRGF0YS5iaW5kKHRoaXMpKVxuICAgICAgLnRoZW4oc3VwZXIudXBsb2FkLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZG93bmxvYWQobWVkaWFfaWQsIGRpcikge1xuICAgIHJldHVybiBzdXBlci5kb3dubG9hZCh7bWVkaWFfaWR9KVxuICAgICAgLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICByZXR1cm4ge2RpciwgZGF0YX07XG4gICAgICB9KVxuICAgICAgLnRoZW4odGhpcy50b01lZGlhLmJpbmQodGhpcykpXG4gICAgICAudGhlbih0aGlzLmFzc2VtYmxlLmJpbmQodGhpcykpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBNZWRpYTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
