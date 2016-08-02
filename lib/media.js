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
      return this.fromMedia(filepath).then(function (data) {
        return { data: data, filepath: filepath };
      }).then(this.buildFormData.bind(this)).then(_get(Object.getPrototypeOf(Media.prototype), 'upload', this).bind(this));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lZGlhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBTEE7Ozs7O0lBTU0sSzs7Ozs7Ozs7Ozs7NEJBRUksTyxFQUFTO0FBQUEsVUFDVixHQURVLEdBQ0MsT0FERCxDQUNWLEdBRFU7QUFBQSxVQUNMLElBREssR0FDQyxPQURELENBQ0wsSUFESzs7QUFFZixVQUFJLFdBQVcsZUFBSyxJQUFMLENBQVUsR0FBVixFQUFlLGVBQUssUUFBTCxDQUFjLEtBQUssU0FBTCxDQUFlLENBQWYsQ0FBZCxDQUFmLENBQWY7QUFDQSxhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBb0I7QUFDckMscUJBQUcsU0FBSCxDQUFhLFFBQWIsRUFBdUIsS0FBSyxJQUE1QixFQUFrQyxVQUFDLEdBQUQsRUFBUTtBQUN4QyxjQUFJLEdBQUosRUFBUztBQUNQLG1CQUFPLE9BQU8sR0FBUCxDQUFQO0FBQ0Q7QUFDRCxpQkFBTyxRQUFRLEVBQUMsa0JBQUQsRUFBUixDQUFQO0FBQ0QsU0FMRDtBQU1ELE9BUE0sQ0FBUDtBQVFEOzs7MkJBRU0sUSxFQUFVO0FBQ2YsYUFBTyxLQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQ0osSUFESSxDQUNDLFVBQUMsSUFBRCxFQUFTO0FBQ2IsZUFBTyxFQUFDLFVBQUQsRUFBTyxrQkFBUCxFQUFQO0FBQ0QsT0FISSxFQUlKLElBSkksQ0FJQyxLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FKRCxFQUtKLElBTEksQ0FLQyw2REFBYSxJQUFiLENBQWtCLElBQWxCLENBTEQsQ0FBUDtBQU1EOzs7NkJBRVEsUSxFQUFVLEcsRUFBSztBQUN0QixhQUFPLDBFQUFlLEVBQUMsa0JBQUQsRUFBZixFQUNKLElBREksQ0FDQyxVQUFDLElBQUQsRUFBUztBQUNiLGVBQU8sRUFBQyxRQUFELEVBQU0sVUFBTixFQUFQO0FBQ0QsT0FISSxFQUlKLElBSkksQ0FJQyxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBSkQsRUFLSixJQUxJLENBS0MsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUxELENBQVA7QUFNRDs7Ozs7O2tCQUVZLEsiLCJmaWxlIjoibWVkaWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWljaGFvIG9uIDE2LzcvMzEuXG4gKi9cbmltcG9ydCBCYXNlIGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5jbGFzcyBNZWRpYSBleHRlbmRzIEJhc2Uge1xuXG4gIHRvTWVkaWEob3B0aW9ucykge1xuICAgIGxldCB7ZGlyLCBkYXRhfT1vcHRpb25zO1xuICAgIHZhciBmaWxlcGF0aCA9IHBhdGguam9pbihkaXIsIHBhdGguYmFzZW5hbWUoZGF0YS5yZWRpcmVjdHNbMF0pKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG4gICAgICBmcy53cml0ZUZpbGUoZmlsZXBhdGgsIGRhdGEuYm9keSwgKGVycik9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc29sdmUoe2ZpbGVwYXRofSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwbG9hZChmaWxlcGF0aCkge1xuICAgIHJldHVybiB0aGlzLmZyb21NZWRpYShmaWxlcGF0aClcbiAgICAgIC50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgcmV0dXJuIHtkYXRhLCBmaWxlcGF0aH07XG4gICAgICB9KVxuICAgICAgLnRoZW4odGhpcy5idWlsZEZvcm1EYXRhLmJpbmQodGhpcykpXG4gICAgICAudGhlbihzdXBlci51cGxvYWQuYmluZCh0aGlzKSk7XG4gIH1cblxuICBkb3dubG9hZChtZWRpYV9pZCwgZGlyKSB7XG4gICAgcmV0dXJuIHN1cGVyLmRvd25sb2FkKHttZWRpYV9pZH0pXG4gICAgICAudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHJldHVybiB7ZGlyLCBkYXRhfTtcbiAgICAgIH0pXG4gICAgICAudGhlbih0aGlzLnRvTWVkaWEuYmluZCh0aGlzKSlcbiAgICAgIC50aGVuKHRoaXMuYXNzZW1ibGUuYmluZCh0aGlzKSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE1lZGlhOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
